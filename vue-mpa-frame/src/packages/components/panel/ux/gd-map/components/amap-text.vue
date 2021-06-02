<script>
import registerMixin from '../mixins/register-component';

const TAG = 'BaseAmapText';
export default {
  name: 'BaseAmapText', // 纯文本标记，继承自Marker，具有Marker的大部分属性、方法和事件
  mixins: [registerMixin],
  props: {
    vid: {
      type: String,
      default: ''
    },
    // 标记显示的文本内容
    text: {
      type: String,
      default: ''
    },
    // 文字对齐方向-水平
    textAlign: {
      type: String,
      default: ''
    },
    // 文字对齐方向-垂直
    verticalAlign: {
      type: String,
      default: ''
    },
    // 点标记在地图上显示的位置，默认为地图中心点
    position: {
      type: Array,
      default() {
        return [0, 0];
      },
      $type: 'LngLat'
    },
    // 点标记显示位置偏移量，默认值为Pixel(0,0)
    offset: {
      type: Array,
      default() {
        return [0, 0];
      },
      $type: 'Pixel'
    },
    // 鼠标点击时是否置顶，默认false ，不置顶
    topWhenClick: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 是否将覆盖物的鼠标或touch等事件冒泡到地图上 默认值：false
    bubble: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 设置点标记是否可拖拽移动，默认为false
    draggable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 设置拖拽点标记时是否开启点标记离开地图的效果
    raiseOnDrag: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
    cursor: {
      type: String,
      default() {
        return '';
      }
    },
    // 点标记是否可见，默认为true
    visible: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示 默认zIndex：100
    zIndex: {
      type: Number,
      default() {
        return 100;
      }
    },
    // 点标记的旋转角度，广泛用于改变车辆行驶方向
    angle: {
      type: Number,
      default() {
        return 0;
      }
    },
    // 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。
    autoRotation: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 点标记的动画效果
    animation: {
      type: String,
      default() {
        return '“AMAP_ANIMATION_NONE”';
      }
    },
    // 点标记阴影，不设置该属性则点标记无阴影
    shadow: {
      type: Object,
      default() {
        return {};
      },
      $type: 'Icon'
    },
    // 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
    title: {
      type: String,
      default() {
        return '';
      }
    },
    // 点标记是否可点击
    clickable: {
      type: Boolean,
      default: true
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
      this.$amapComponent = new AMap.Text(options);
    }
  }
};
</script>
