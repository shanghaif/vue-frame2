<script>
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';
import _assign from 'lodash/assign';
import _isEqual from 'lodash/isEqual';
import registerMixin from '../mixins/register-component.js';

export default {
  name: 'BaseAmapDistrictExplorer',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 区域编码由6位数字组成，唯一标识一个区划。全国：100000
    adcode: {
      type: Array,
      default() {
        return ['330000'];
      } // 浙江省
    },
    // 区域背景颜色
    colors: {
      type: Array,
      default() {
        return [
          '#3366cc',
          '#dc3912',
          '#ff9900',
          '#109618',
          '#990099',
          '#0099c6',
          '#dd4477',
          '#66aa00',
          '#b82e2e',
          '#316395',
          '#994499',
          '#22aa99',
          '#aaaa11',
          '#6633cc',
          '#e67300',
          '#8b0707',
          '#651067',
          '#329262',
          '#5574a6',
          '#3b3eac'
        ];
      }
    },
    // 事件
    events: {
      type: Object
    },
    // 各个区划的样式
    styles: {
      type: Object
      /* default() {
        return {
          cursor: 'default',
          bubble: true, // 事件监听的对象是map，因此，地图上的覆盖物（多边形，Marker等）需要设置bubble:true, 即允许事件冒泡到地图上
          strokeColor: 'black', // 边框线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 1, // 线宽
          fillOpacity: 0.35 // 填充透明度
        };
      } */
    },
    // 绘制父区域样式
    parentStyles: {
      type: Object
      /* default() {
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: 'black', // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 1, // 线宽
          fillOpacity: 0.35 // 填充透明度
        };
      } */
    },
    // 颜色过滤器
    colorFilter: {
      type: Function
    }
  },
  watch: {
    adcode(val, oldVal) {
      if (!_isEqual(val, oldVal)) {
        // 清除已有的绘制内容
        if (!_isNil(this.districtExplorer)) {
          this.districtExplorer.clearFeaturePolygons();
          setTimeout(() => {
            this.intiDistrictExplorer(val);
          }, 0);
        }
      }
    }
  },
  data() {
    this.districtExplorer = null;
    // https://lbs.amap.com/api/javascript-api/reference/overlay/#polygon
    this.defaultStyles = {
      cursor: 'default',
      bubble: true, // 事件监听的对象是map，因此，地图上的覆盖物（多边形，Marker等）需要设置bubble:true, 即允许事件冒泡到地图上
      strokeColor: 'black', // 边框线颜色
      strokeOpacity: 1, // 线透明度
      strokeWeight: 1, // 线宽
      fillOpacity: 0.35, // 填充透明度
      strokeStyle: 'solid' // 线样式，实线:solid，虚线:dashed
    };
    this.defaultParentStyles = {
      cursor: 'default',
      bubble: true,
      strokeColor: 'black', // 线颜色
      strokeOpacity: 1, // 线透明度
      strokeWeight: 1, // 线宽
      fillOpacity: 0.35, // 填充透明度
      strokeStyle: 'solid' // 线样式，实线:solid，虚线:dashed
    };
    this.districtFeatures = [];
    this.amap = null;
    return {
      /* handlers: {
        adcode(adcode) {
          this.districtExplorer.clearFeaturePolygons();
          setTimeout(() => {
            this.intiDistrictExplorer(adcode);
          }, 0);
        }
      } */
    };
  },
  created() {
    if (!_isNil(this.styles)) {
      this.apply(this.defaultStyles, this.styles);
    }
    if (!_isNil(this.parentStyles)) {
      this.apply(this.defaultParentStyles, this.parentStyles);
    }
  },
  mounted() {},
  render(h) {
    return null;
  },
  beforeDestroy() {
    this.moveEvents();
  },
  methods: {
    // 初始化组件
    __initComponent(options) {
      this.amap = options.map;
      this.intiDistrictExplorer(this.adcode);
    },
    // 创建行政区划图层
    intiDistrictExplorer(adcode) {
      const that = this;
      that.moveEvents();
      window.AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        that.districtExplorer = new DistrictExplorer({
          eventSupport: !_isNil(that.events), // 打开事件支持
          map: that.amap
        });
        // 监听feature的hover事件
        that.districtExplorer.on(
          'featureMouseout featureMouseover',
          that.mouseoutAndOver
        );

        // 监听鼠标在feature上滑动
        that.districtExplorer.on('featureMousemove', this.mousemove);

        // feature被点击
        that.districtExplorer.on('featureClick', this.featureClick);
        // 鼠标点击了无法识别的区域时触发
        that.districtExplorer.on('outsideClick', this.outsideClick);
        // 切换区域后刷新显示内容
        const refreshAreaNode = function(areaNodes) {
          that.districtExplorer.setHoverFeature(null);

          renderAreaPolygons(areaNodes);
        };
        // 绘制某个区域的边界
        const renderAreaPolygons = function(areaNodes) {
          // 更新地图视野
          // that.amap.setBounds(areaNodes.getBounds(), null, null, true);

          // 清除已有的绘制内容
          // that.districtExplorer.clearFeaturePolygons();

          // 绘制子区域
          that.districtExplorer.renderSubFeatures(areaNodes, function(
            feature,
            i
          ) {
            that.districtFeatures.push(_assign({}, feature.properties));
            var fillColor = that.colors[i % that.colors.length];
            var strokeColor = that.defaultStyles.strokeColor; // that.defaultStyles.strokeColor;
            // if (!_has(that.defaultStyles, 'strokeColor')) {
            //   strokeColor =
            //     that.colors[that.colors.length - 1 - (i % that.colors.length)];
            // }
            if (!_isNil(that.colorFilter)) {
              // 调用颜色过滤器返回自定义处理
              const oColor = that.colorFilter(feature, i);
              if (!_isNil(oColor)) {
                _has(oColor, 'fillColor') && (fillColor = oColor.fillColor);
                _has(oColor, 'strokeColor') &&
                  (strokeColor = oColor.strokeColor);
              }
            }
            /* return {
              cursor: 'default',
              bubble: true, // 事件监听的对象是map，因此，地图上的覆盖物（多边形，Marker等）需要设置bubble:true, 即允许事件冒泡到地图上
              strokeColor: strokeColor, // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 1, // 线宽
              fillColor: fillColor, // 填充色
              fillOpacity: 0.35 // 填充透明度
            }; */
            return _assign({}, that.defaultStyles, {
              strokeColor: strokeColor, // 线颜色
              fillColor: fillColor // 填充色
            });
          });
          // 绘制父区域
          /* that.districtExplorer.renderParentFeature(areaNodes, {
            cursor: 'default',
            bubble: true,
            strokeColor: 'black', // 线颜色
            strokeOpacity: 1, // 线透明度
            strokeWeight: 1, // 线宽
            fillColor: areaNodes.getSubFeatures().length
              ? null
              : that.colors[0], // 填充色
            fillOpacity: 0.35 // 填充透明度
          }); */
          const parentStyles = _assign(
            {},
            {
              fillColor: areaNodes.getSubFeatures().length
                ? null
                : that.colors[0]
            },
            that.defaultParentStyles,
            {}
          );
          that.districtExplorer.renderParentFeature(areaNodes, parentStyles);
        };
        // loadMultiAreaNodes 多区域绘制，loadAreaNode 单区域绘制
        // eslint-disable-next-line handle-callback-err
        that.districtExplorer.loadMultiAreaNodes(adcode, function(
          error,
          areaNodes
        ) {
          if (_isNil(areaNodes)) {
            return;
          }
          // 清除已有的绘制内容
          that.districtExplorer.clearFeaturePolygons();
          that.districtFeatures = [];
          if (!_isNil(that.events)) {
            that.districtExplorer.setAreaNodesForLocating(areaNodes); // 如果事件参数 `eventSupport` 是 true，那么对应的 `setAreaNodesForLocating` 就要设置
          }
          for (var i = 0, len = areaNodes.length; i < len; i++) {
            refreshAreaNode(areaNodes[i]); // 绘制多区划
          }
          // 更新地图视野
          that.amap.setFitView(that.districtExplorer.getAllFeaturePolygons());
          setTimeout(() => {
            that.$emit('drawDistrictExplorerComplete'); // 绘制完成
          }, 0);
        });
      });
    },
    /**
     * @desc 移除事件
     */
    moveEvents() {
      if (!_isNil(this.districtExplorer)) {
        this.districtExplorer.off(
          'featureMouseout featureMouseover',
          this.mouseoutAndOver
        );
        this.districtExplorer.off('featureMousemove', this.mousemove);
        this.districtExplorer.off('featureClick', this.featureClick);
        this.districtExplorer.off('outsideClick', this.outsideClick);
        this.districtExplorer = null;
      }
    },
    /**
     * @desc 重新绘制区域
     */
    redraw() {
      if (!_isNil(this.districtExplorer)) {
        this.districtExplorer.clearFeaturePolygons();
        setTimeout(() => {
          this.intiDistrictExplorer(this.adcode);
        }, 0);
      }
    },
    /**
     * @desc 监听feature的hover事件
     */
    mouseoutAndOver(e, feature) {
      if (_has(this.events, 'featureMouseout')) {
        this.events.featureMouseout(e, feature);
      }
      if (_has(this.events, 'featureMouseover')) {
        this.events.featureMouseover(e, feature);
      }
    },
    /**
     * @desc 监听鼠标在feature上滑动
     */
    mousemove(e, feature) {
      if (_has(this.events, 'featureMousemove')) {
        this.events.featureMousemove(e, feature);
      }
    },
    /**
     * @desc feature被点击
     */
    featureClick(e, feature) {
      if (_has(this.events, 'featureClick')) {
        this.events.featureClick(e, feature);
      }
    },
    /**
     * @desc feature被点击
     */
    outsideClick(e, feature) {
      if (_has(this.events, 'outsideClick')) {
        this.events.outsideClick(e, feature);
      }
    },
    /**
     * @desc 获取当前的所有行政区域对象
     */
    getDistrictFeatures() {
      return this.districtFeatures;
    },
    // 来源对象覆盖目标源对象
    apply(scope, config) {
      for (var i in config) {
        scope[i] = config[i];
      }
      return scope;
    }
  }
};
</script>
