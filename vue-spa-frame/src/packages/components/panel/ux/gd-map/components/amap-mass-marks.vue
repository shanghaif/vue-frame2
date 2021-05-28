<script>
import registerMixin from '../mixins/register-component.js';
import { toPixel, toSize } from '../utils/convert-helper.js';
import _isArray from 'lodash/isArray';
import _has from 'lodash/has';
export default {
  name: 'BaseAmapMassMarks', // 海量点标记
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 点集合 [{"lnglat":[116.258446,37.686622],"name":"景县","style":2}]
    data: {
      type: Array
    },
    // 图层叠加的顺序值，0表示最底层。默认zIndex：5
    zIndex: {
      type: Number,
      default: 5
    },
    // 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明
    opacity: {
      type: Number,
      default: 0.8
    },
    // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
    cursor: {
      type: String,
      default: 'pointer'
    },
    // 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19]
    zooms: {
      type: Array,
      default: () => [3 - 18]
    },
    // 表示是否在拖拽缩放过程中实时重绘，默认true，建议超过10000的时候设置false
    alwaysRender: {
      type: Boolean,
      default: true
    },
    // 用于设置点的样式，当点样式一致时传入StyleObject即可；当需要展示多种点样式时，传入StyleObject的数组，此时需要为Data中每个元素指定 style字段为该元素要显示的样式在StyleObject数组中的索引
    // {url: '',anchor: '',size: '',rotation: 0}
    // style 名称为 vue 内置的内联样式style关键字，不能用来作为props的参数
    mapStyle: {
      type: [Object, Array]
    },
    // 事件
    events: {
      type: Object
    },
    // 显示海量点图层
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.amap = null;
    return {
      propsRedirect: {
        mapStyle: 'style'
      },
      converters: {
        mapStyle(style) {
          if (_isArray(style)) {
            for (let i = 0, len = style.length; i < len; i++) {
              const itemStyle = style[i];
              _has(itemStyle, 'anchor') &&
                (itemStyle.anchor = toPixel(itemStyle.anchor));
              _has(itemStyle, 'size') &&
                (itemStyle.size = toSize(itemStyle.size));
            }
          }
          if (Object.prototype.toString.call(style).slice(8, -1) === 'Object') {
            _has(style, 'anchor') && (style.anchor = toPixel(style.anchor));
            _has(style, 'size') && (style.size = toSize(style.size));
          }
          return style;
        }
      },
      handlers: {
        data(data) {
          this.setData(data);
        },
        show(status) {
          if (status) {
            this.show();
          } else {
            this.hide();
          }
        }
      }
    };
  },
  render() {
    return null;
  },
  methods: {
    // 初始化组件
    __initComponent(options) {
      this.amap = options.map;
      this.$amapComponent = new AMap.MassMarks(this.data, options);
      this.$amapComponent.setMap(this.amap);
    },
    /**
     * @desc 输出MassMark的数据集，数据结构同setDatas中的数据集
     */
    getData() {
      return this.$amapComponent.getData();
    },
    /**
     * @desc 清除海量点
     */
    clear() {
      this.$amapComponent.clear();
    }
  }
};
</script>
