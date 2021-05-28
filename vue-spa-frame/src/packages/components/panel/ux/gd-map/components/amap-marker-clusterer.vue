<script>
import registerMixin from '../mixins/register-component.js';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _isBoolean from 'lodash/isBoolean';
import _has from 'lodash/has';
import _forEach from 'lodash/forEach';
import { toPixel, toSize } from '../utils/convert-helper.js';
export default {
  name: 'BaseAmapMarkerClusterer', // 点聚合
  mixins: [registerMixin],
  props: {
    vid: {
      type: Number
    },
    // 聚合计算时网格的像素大小，默认60
    gridSize: {
      type: Number,
      default: 60
    },
    // 聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合
    minClusterSize: {
      type: Number,
      default: 2
    },
    // 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合
    maxZoom: {
      type: Number,
      default: 18
    },
    // 聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
    averageCenter: {
      type: Boolean,
      default: false
    },
    // 指定聚合后的点标记的图标样式，可缺省，缺省时为默认样式
    // https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer
    styles: {
      type: Array
    },
    // 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了renderClusterMarker后styles无效。
    renderClusterMarker: {
      type: Function
    },
    // 点击聚合点时，是否散开，默认值为：true
    zoomOnClick: {
      type: Boolean,
      default: true
    },
    // 事件
    events: {
      type: Object
    }
  },
  data() {
    this.amap = null;
    this.initOptions = {};
    return {
      handlers: {
        gridSize(size) {
          this.setGridSize(size);
        },
        maxZoom(zoom) {
          this.setMaxZoom(zoom);
        },
        minClusterSize(size) {
          this.setMinClusterSize(size);
        },
        averageCenter(state) {
          if (_isBoolean(state)) {
            this.setAverageCenter(state);
          }
        },
        // styles 的 props 属性，如果props中的 styles 属性在父组件中就行了修改，那么会触发到这个方法中
        styles(sts) {
          if (_isNil(sts) || !_isArray(sts) || _isEmpty(sts)) {
            return;
          }
          const curSts = JSON.parse(JSON.stringify(sts));
          for (let i = 0, len = curSts.length; i < len; i++) {
            const uiStyle = curSts[i];
            const typeOffset = Object.prototype.toString
              .call(uiStyle.offset)
              .slice(8, -1);
            const typeSize = Object.prototype.toString
              .call(uiStyle.size)
              .slice(8, -1);
            if (typeOffset === 'Array') {
              uiStyle.offset = toPixel(uiStyle.offset);
            }
            if (typeSize === 'Array') {
              uiStyle.size = toSize(uiStyle.size);
            }
          }
          this.setStyles(curSts);
        }
      }
    };
  },
  render(h) {
    return null;
  },
  methods: {
    // 初始化聚合点绘制
    __initComponent(options) {
      this.amap = options.map;
      this.initOptions = options;
      this.draw();
    },
    // 重新绘制
    draw(outOptions) {
      const clustererOptions = {}; // 默认样式
      const styles = _get(outOptions, 'styles', this.styles);
      const renderClusterMarker = _get(
        outOptions,
        'renderClusterMarker',
        this.renderClusterMarker
      );
      if (!_isNil(renderClusterMarker)) {
        clustererOptions.renderClusterMarker = renderClusterMarker; // 完全自定义
      }
      if (_isNil(renderClusterMarker) && !_isNil(styles) && !_isEmpty(styles)) {
        clustererOptions.styles = this.styles2ClustererStyle(styles); // 自定义图标
      }
      let curMarkers = [];
      if (!_isNil(this.$amapComponent)) {
        curMarkers = this.$amapComponent.getMarkers(); // 获取该点聚合中的点标记集合
        this.$amapComponent.setMap(null);
        this.$amapComponent = null;
      }
      this.$amapComponent = new AMap.MarkerClusterer(
        this.amap,
        curMarkers,
        _assign({}, _omit(this.initOptions, ['styles']), clustererOptions)
      );
      this.$emit('drawComplete', this.$amapComponent); // 绘制完成事件
    },
    // 添加一组需进行聚合的点标记
    addMarkers(markers, isClear) {
      if (!_isNil(isClear) && isClear) {
        this.clearMarkers();
      }
      console.log(
        '添加一组需进行聚合的点标记 ',
        markers[0],
        _has(markers[0], 'CLASS_NAME')
      );
      if (!_isNil(this.$amapComponent) && !_isEmpty(markers)) {
        this.$amapComponent.addMarkers(markers);
      }
    },
    // 添加一组需进行聚合的点坐标
    // [{lnglat: ["113.864691","22.942327"], event: {click: function(p) {}}}, {lnglat: ["113.370643","22.938827"]}]
    addPointMarkers(markers, isClear) {
      if (!_isNil(isClear) && isClear) {
        this.clearMarkers();
      }
      if (!_isEmpty(markers)) {
        const mapMarkers = [];
        for (var i = 0; i < markers.length; i += 1) {
          const marker = new AMap.Marker({
            position: markers[i].lnglat,
            content:
              '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            offset: toPixel([-15, -15])
          });
          if (_has(markers[i], 'event')) {
            _forEach(markers[i].event, (value, key) => {
              marker.on(key, value);
            });
          }
          mapMarkers.push(marker);
        }
        if (!_isNil(this.$amapComponent)) {
          // console.log('mapMarkers', mapMarkers);
          this.$amapComponent.addMarkers(mapMarkers);
        }
        // console.log('mapMarkers', mapMarkers);
      }
    },
    // 从地图上彻底清除所有聚合点标记
    clearMarkers() {
      if (!_isNil(this.$amapComponent)) {
        this.$amapComponent.clearMarkers();
      }
    },
    // 获取该点聚合中的点标记集合
    getMarkers() {
      if (!_isNil(this.$amapComponent)) {
        return this.$amapComponent.getMarkers();
      }
    },
    // 样式转换
    styles2ClustererStyle(sts) {
      const curSts = JSON.parse(JSON.stringify(sts));
      for (let i = 0, len = curSts.length; i < len; i++) {
        const uiStyle = curSts[i];
        const typeOffset = Object.prototype.toString
          .call(uiStyle.offset)
          .slice(8, -1);
        const typeSize = Object.prototype.toString
          .call(uiStyle.size)
          .slice(8, -1);
        if (typeOffset === 'Array') {
          uiStyle.offset = toPixel(uiStyle.offset);
        }
        if (typeSize === 'Array') {
          uiStyle.size = toSize(uiStyle.size);
        }
      }
      return curSts;
    }
  }
};
</script>
