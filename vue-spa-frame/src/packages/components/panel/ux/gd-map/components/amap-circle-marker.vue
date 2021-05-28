<script>
import registerMixin from '../mixins/register-component';
const TAG = 'BaseAmapCircleMarker';

export default {
  name: TAG,
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：100
    zIndex: {
      type: Number,
      default: 100
    },
    // 点标记是否可见，默认为true
    visible: {
      type: Boolean,
      default: true
    },
    // 中心点坐标-圆心位置
    center: {
      type: Array
    },
    // 是否将覆盖物的鼠标或touch等事件冒泡到地图上，默认值：false
    bubble: {
      type: Boolean,
      default: false
    },
    // 圆点半径，单位:px
    radius: {
      type: Number
    },
    // 设置点标记是否可拖拽移动，默认为false
    draggable: {
      type: Boolean,
      default: false
    },
    // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
    strokeColor: {
      type: String,
      default: '#006600'
    },
    // 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    strokeOpacity: {
      type: Number,
      default: 0.9
    },
    // 轮廓线宽度
    strokeWeight: {
      type: Number
    },
    // 椭圆填充颜色,使用16进制颜色代码赋值。默认值为#006600
    fillColor: {
      type: String,
      default: '#006600'
    },
    // 椭圆填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
    fillOpacity: {
      type: Number
    },
    // 用户自定义属性，支持JavaScript API任意数据类型，如Ellipse的id等
    extData: {
      type: Object
    },
    // 事件
    events: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      converters: {},
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      },
      amapTagName: TAG
    };
  },
  render() {
    return null;
  },
  methods: {
    // 初始化组件
    __initComponent(options) {
      this.$amapComponent = new AMap.CircleMarker(options);
    }
  }
};
</script>
