<script>
/* eslint-disable no-unused-vars */
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';
import _assign from 'lodash/assign';
import CONST from '../utils/constant.js';
import registerMixin from '../mixins/register-component.js';

export default {
  name: 'BaseAmapDistrict',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 区域编码由6位数字组成，唯一标识一个区划。全国：100000
    adcode: {
      type: [String, Number],
      default: '330000' // 浙江省
    },
    // 区域等级 0省级 1市级 2区县级
    depth: {
      type: Number,
      default: 1
    },
    // 层级
    zIndex: {
      type: Number,
      default: 12
    },
    // 地图样式
    styles: {
      type: Object,
      default() {
        return {
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'white', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        };
      }
    },
    // 地市或者区县的块颜色
    colorByAdcodeFilter: {
      type: Function
    },
    // 是否初始化绘制
    isInitDraw: {
      type: Boolean,
      default: true
    },
    // 是否启用事件支持，默认false
    eventSupport: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.disProvince = null;
    this.colors = {};
    this.amap = null;
    return {
      handlers: {
        adcode(adcode) {
          this.initPro(adcode, this.depth);
        },
        depth(depth) {
          this.initPro(this.adcode, depth);
        }
      }
    };
  },
  mounted() {},
  render(h) {
    return null;
  },
  methods: {
    // 初始化组件
    __initComponent(options) {
      this.amap = options.map;
      this.initPro(this.adcode, this.depth);
    },
    // 创建区划图层
    initPro(code, dep) {
      this.disProvince && this.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
        zIndex: this.zIndex,
        adcode: [code],
        depth: dep,
        styles: _assign(
          {
            // 外部可以通过下面的 setStyles 方法来达到自定义样式的效果
            fill: properties => {
              // properties为可用于做样式映射的字段，包含
              // NAME_CHN:中文名称
              // adcode_pro
              // adcode_cit
              // adcode
              var adcode = properties.adcode;
              return this.isInitDraw ? this.getColorByAdcode(adcode) : null;
            }
            // 'province-stroke': 'cornflowerblue',
            // 'city-stroke': 'white', // 中国地级市边界
            // 'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
          },
          this.styles
        ),
        map: this.amap
      });
      // this.disProvince.setMap(this.amap);
    },
    // 颜色辅助方法
    getColorByAdcode(adcode) {
      if (!_isNil(this.colorByAdcodeFilter)) {
        return this.colorByAdcodeFilter(this.colors, adcode);
      }
      if (!this.colors[adcode]) {
        var gb = Math.random() * 155 + 50;
        this.colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
      }

      return this.colors[adcode];
    },
    /**
     * @desc 设置省份中 地市或者区县 块的填充色
     * @examples
     * this.$refs['base-amap-district-ref'].getProvince().setStyles({fill: function(props) {return 'yellow';}});
     */
    setStyles(options) {
      if (_isNil(options) || _isEmpty(options)) {
        return;
      }
      // options['city-stroke'] = 'red';
      this.applyIf(options, this.styles);
      this.getProvince().setStyles(options);
    },
    // 获取省份轮廓对象
    getProvince() {
      return this.disProvince;
    },
    // 来源对象覆盖目标源没有的属性
    applyIf(scope, config) {
      for (var i in config) {
        // if (!scope[i])
        if (!Object.prototype.hasOwnProperty.call(scope, i)) {
          scope[i] = config[i];
        }
      }
      return scope;
    }
  }
};
</script>
