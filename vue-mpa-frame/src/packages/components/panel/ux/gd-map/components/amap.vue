<template>
  <div class="base-vue-amap-container">
    <div class="base-vue-amap"></div>
    <slot></slot>
  </div>
</template>
<script>
import CONST from '../utils/constant.js';
import guid from '../utils/guid.js';
import { lngLatTo, isObj, toPixel, toLngLat } from '../utils/convert-helper.js';
import { lazyAMapApiLoaderInstance } from '../index.js';
import registerMixin from '../mixins/register-component.js';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _filter from 'lodash/filter';

export default {
  name: 'BaseAmap',
  mixins: [registerMixin],
  props: {
    /* 自V1.4.0开始支持 start */
    // 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果
    viewMode: {
      type: String,
      default: '2D'
    },
    // 调整天空颜色，配合自定义地图，3D视图有效，如‘#ff0000’
    skyColor: {
      type: String
    },
    // 地图是否可旋转，3D视图默认为true，2D视图默认false
    rotateEnable: {
      type: Boolean,
      default: false
    },
    // 俯仰角度，默认0，[0,83]，2D地图下无效
    pitch: {
      type: Number
    },
    // 楼块出现是否带动画，3D时可以设置 true
    buildingAnimation: {
      type: Boolean,
      default: false
    },
    // 是否允许设置俯仰角度，3D视图下为true，2D视图下无效
    pitchEnable: {
      type: Boolean,
      default: false
    },
    /* end */
    vid: {
      type: String
    },
    // 事件
    events: {
      type: Object
    },
    // 禁止拖动
    dragEnable: {
      type: Boolean,
      default: true
    },
    // 地图是否使用缓动效果
    jogEnable: {
      type: Boolean,
      default: true
    },
    // 地图是否可通过鼠标滚轮缩放浏览
    scrollWheel: {
      type: Boolean,
      default: true
    },
    // 地图在移动终端上是否可通过多点触控缩放浏览地图
    touchZoom: {
      type: Boolean,
      default: true
    },
    // 地图是否可通过双击鼠标放大地图
    doubleClickZoom: {
      type: Boolean,
      default: true
    },
    // 地图是否可通过键盘控制
    keyboardEnable: {
      type: Boolean,
      default: true
    },
    // 中心点
    center: {
      type: Array,
      default() {
        return [120.168251, 30.252115];
      }
    },
    // 地图显示的缩放级别范围 在PC上，默认为[3,18]，取值范围[3-18]；在移动设备上，默认为[3,19],取值范围[3-19]
    zooms: {
      type: Array,
      default() {
        return [3, 18];
      }
    },
    // 层级
    zoom: {
      type: [Number, String],
      default: 11
    },
    // 地图是否可缩放，默认值为true
    zoomEnable: {
      type: Boolean,
      default: true
    },
    // 地图语言类型 可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照
    lang: {
      type: String,
      default: 'zh_cn'
    },
    // 地图默认鼠标样式
    defaultCursor: {
      type: String
    },
    // 地图显示的参考坐标系
    crs: {
      type: String
    },
    // 地图平移过程中是否使用动画，默认值为true
    animateEnable: {
      type: Boolean,
      default: true
    },
    // 是否开启地图热点和标注的hover效果
    isHotspot: {
      type: Boolean,
      default: true
    },
    // 当前地图中默认显示的图层
    defaultLayer: {},
    // 是否监控地图容器尺寸变化
    resizeEnable: {
      type: Boolean,
      default: false
    },
    // 是否在有矢量底图的时候自动展示室内地图
    showIndoorMap: {
      type: Boolean,
      default: true
    },
    // 在展示矢量图的时候自动展示室内地图图层，当地图complete之后可以获取到该对象
    indoorMap: {},
    // 是否支持可以扩展最大缩放级别
    expandZoomRange: {
      type: Boolean,
      default: true
    },
    // 设置地图的显示样式
    mapStyle: {
      type: String
    },
    // 设置地图上显示的元素种类 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
    features: {
      type: Array
    },
    // 插件加载方法
    plugin: {
      type: [String, Array]
    },
    // 地图管理 manager
    amapManager: {},
    // 地图偏移
    panBy: {
      type: Array
      /* default(){
        return [-310, -120];
      } */
    }
  },
  computed: {
    /**
     * @desc 转换 prop plugin 插件到 plugins（from 'plugin' to 'plugins'），统一 plugin 参数
     * @return {Array}
     */
    plugins() {
      let plus = [];
      // amap plugin prefix reg
      const AMAP_PREFIX_REG = /^AMap./;

      // parse plugin full name
      const parseFullName = pluginName => {
        return AMAP_PREFIX_REG.test(pluginName)
          ? pluginName
          : 'AMap.' + pluginName;
      };

      // parse plugin short name
      const parseShortName = pluginName => {
        return pluginName.replace(AMAP_PREFIX_REG, '');
      };

      if (_isString(this.plugin)) {
        plus.push({
          pName: parseFullName(this.plugin),
          sName: parseShortName(this.plugin)
        });
      } else if (_isArray(this.plugin)) {
        plus = _map(this.plugin, oPlugin => {
          let nPlugin = {};

          if (_isString(oPlugin)) {
            nPlugin = {
              pName: parseFullName(oPlugin),
              sName: parseShortName(oPlugin)
            };
          } else {
            oPlugin.pName = parseFullName(oPlugin.pName);
            oPlugin.sName = parseShortName(oPlugin.pName);
            nPlugin = oPlugin;
          }
          return nPlugin;
        });
      }
      return plus;
    }
  },
  data() {
    return {
      converters: {
        center(arr) {
          return toLngLat(arr);
        }
      },
      handlers: {
        zoomEnable(flag) {
          this.setStatus({ zoomEnable: flag });
        },
        dragEnable(flag) {
          this.setStatus({ dragEnable: flag });
        },
        rotateEnable(flag) {
          this.setStatus({ rotateEnable: flag });
        }
      }
    };
  },
  beforeCreate() {
    this._loadPromise = lazyAMapApiLoaderInstance.load();
  },
  mounted() {
    this.$nextTick(this.createMap);
  },
  destroyed() {
    this.$amap && this.$amap.destroy();
  },
  methods: {
    /**
     * @desc 创建地图
     */
    createMap() {
      this._loadPromise.then(() => {
        const mapElement = this.$el.querySelector('.base-vue-amap');
        const elementID = this.vid || guid();
        mapElement.id = elementID;
        this.$amap = this.$amapComponent = new AMap.Map(
          elementID,
          this.convertProps()
        );
        if (this.amapManager) {
          this.amapManager.setMap(this.$amap);
        }
        this.$emit(CONST.AMAP_READY_EVENT, this.$amap); // 地图初始化完成
        this.$children.forEach(component => {
          component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
        }); // 通知子组件`地图初始化完成`
        this.$amap.on(CONST.AMAP_COMPLETE, () => {
          this.$emit(CONST.AMAP_COMPLETE, this.$amap);
          if (!_isNil(this.panBy)) {
            this.$amap.panBy(this.panBy[0], this.panBy[1]); // 地图偏移
          }
        }); // 地图加载完成
        if (this.plugins && this.plugins.length) {
          this.addPlugins();
        }
      });
    },
    /**
     * @desc 添加插件
     */
    addPlugins() {
      const _notInjectPlugins = _filter(
        this.plugins,
        _plugin => !AMap[_plugin.sName]
      );
      if (!_notInjectPlugins || !_notInjectPlugins.length) {
        return this.addMapControls();
      }
      return this.$amapComponent.plugin(
        _map(_notInjectPlugins, p => p.pName),
        this.addMapControls
      );
    },
    /**
     * @desc 地图控制器
     */
    addMapControls() {
      if (!this.plugins || !this.plugins.length) {
        return;
      }
      // 用于存储 plugin instances
      this.$plugins = this.$plugins || {};
      for (var i = 0, len = this.plugins.length; i < len; i++) {
        const _plugin = this.plugins[i];
        const realPluginOptions = this.convertAMapPluginProps(_plugin);
        const pluginInstance = (this.$plugins[
          realPluginOptions.pName
        ] = new AMap[realPluginOptions.sName](realPluginOptions));
        // 添加控件到地图
        this.$amapComponent.addControl(pluginInstance);
        // 注册控件事件
        if (_plugin.events) {
          for (const k in _plugin.events) {
            const v = _plugin.events[k];
            if (k === 'init') {
              v(pluginInstance);
            } else {
              AMap.event.addListener(pluginInstance, k, v);
            }
          }
        }
      }
    },
    /**
     * @desc 解析 plugin
     */
    convertAMapPluginProps(plugin) {
      if (isObj(plugin) && plugin.pName) {
        switch (plugin.pName) {
          case 'AMap.ToolBar': {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
          case 'AMap.Scale': {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
        }
        return plugin;
      } else {
        return '';
      }
    },
    /**
     * @desc 获取中心点
     */
    getCenter() {
      if (!this.$amap) return lngLatTo(this.center);
      return lngLatTo(this.$amap.getCenter());
    },
    /**
     * @desc 设置地图参数的状态
     */
    setStatus(option) {
      this.$amap && this.$amap.setStatus(option);
    }
  }
};
</script>

<style lang="less">
.base-vue-amap-container {
  height: 100%;
  .base-vue-amap {
    height: 100%;
  }
}
</style>
