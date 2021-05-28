<script>
import _isNil from 'lodash/isNil';
import registerMixin from '../mixins/register-component.js';
import { toPixel, lngLatTo, pixelTo } from '../utils/convert-helper.js';
import Vue from 'vue';

const TAG = 'BaseAmapMarker';
export default {
  name: TAG,
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 标记点的坐标
    position: {
      type: Array,
      default() {
        return [];
      }
    },
    // 点标记显示位置偏移量 [-30,10]
    offset: {
      type: Array
    },
    // 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
    icon: {
      type: [String, Object]
    },
    // 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
    content: {
      type: String
    },
    // 鼠标点击时marker是否置顶，默认false ，不置顶
    topWhenClick: {
      type: Boolean,
      default: false
    },
    // 鼠标移入时marker是否置顶，默认false ，不置顶
    mouseovertopWhenClick: {
      type: Boolean,
      default: false
    },
    // 是否将覆盖物的鼠标或touch等事件冒泡到地图上，默认值：false
    bubble: {
      type: Boolean,
      default: false
    },
    // 设置点标记是否可拖拽移动，默认为false
    draggable: {
      type: Boolean,
      default: false
    },
    // 设置拖拽点标记时是否开启点标记离开地图的效果
    raiseOnDrag: {
      type: Boolean,
      default: false
    },
    // 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
    cursor: {
      type: String
    },
    // 点标记是否可见，默认为true
    visible: {
      type: Boolean,
      default: true
    },
    // 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：100
    zIndex: {
      type: Number,
      default: 100
    },
    // 点标记的旋转角度，广泛用于改变车辆行驶方向，注：angle属性是使用CSS3来实现的，支持IE9及以上版本
    angle: {
      type: Number
    },
    // 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false
    autoRotation: {
      type: Boolean,
      default: false
    },
    // 点标记的动画效果，默认值：“AMAP_ANIMATION_NONE”
    animation: {
      type: String,
      default: 'AMAP_ANIMATION_NONE'
    },
    // 点标记阴影，不设置该属性则点标记无阴影
    shadow: {
      type: Object
    },
    // 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
    title: {
      type: String
    },
    // 点标记是否可点击
    clickable: {
      type: Boolean,
      default: true
    },
    // 设置Marker的可点击区域，在定义的区域内可触发Marker的鼠标点击事件
    shape: {
      type: Object
    },
    // 用户自定义属性
    extData: {
      type: Object
    },
    // 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0）
    label: {
      type: Object
    },
    // 事件
    events: {
      type: Object
    },
    // 触发一次事件
    onceEvents: {
      type: Object
    },
    // 支持传入 Vue 模板
    template: {
      type: String
    },
    // 支持 VNode render 渲染
    contentRender: {
      type: Function
    }
  },
  data() {
    const self = this;
    return {
      $tagName: TAG,
      withSlots: false,
      tmpVM: null,
      // props 参数中的 template和contentRender 重定向指定的参数是`content`
      propsRedirect: {
        template: 'content', // 指的是 marker 点参数中的 content 参数`点标记显示内容`
        contentRender: 'content'
      },
      converters: {
        shape(options) {
          if (!_isNil(options)) {
            return new AMap.MarkerShape(options);
          }
        },
        shadow(options) {
          if (!_isNil(options)) {
            return new AMap.Icon(options);
          }
        },
        template(tpl) {
          if (tpl && tpl.length > 0) {
            // 单纯html代码
            return tpl; // <span>单纯html代码-marker</span>
          }
        },
        contentRender(renderFn) {
          // render 函数
          if (!_isNil(renderFn)) {
            var Profile = Vue.extend({
              // template: '<p>1111</p>' // 不能使用 template 因为我们使用的Vue是`runtime`版本，不支持客户端运行时编译模板为 render 函数
              render(h) {
                return renderFn(h, self);
              }
            });
            this.$customContent = new Profile().$mount();
            return this.$customContent.$el;
          }
        },
        label(options) {
          if (!_isNil(options)) {
            const { content = '', offset = [0, 0] } = options;
            return {
              content: content,
              offset: toPixel(offset)
            };
          }
        },
        offset(options) {
          if (!_isNil(options)) {
            return toPixel(options);
          }
        }
      },
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  created() {
    this.tmpVM = new Vue({
      data() {
        return { node: '' };
      },
      render(h) {
        const { node } = this;
        return h('div', { ref: 'node' }, Array.isArray(node) ? node : [node]);
      }
    }).$mount();
  },
  destroyed() {
    this.tmpVM.$destroy();
    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy();
    }
  },
  render(h) {
    const slots = this.$slots.default || [];
    if (slots.length) {
      this.tmpVM.node = slots;
    }
    return null;
  },
  methods: {
    // 初始化组件
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVM.$refs.node; // 使用插槽来达到自定义 marker 的展示效果
      }
      this.$amapComponent = new AMap.Marker(options); // 这里的 marker 点是通过在 new Marker({map: 地图对象}) 对象时注入 map 对象生成并显示在地图上的并不是通过 add 或者 setMap 生成显示到地图上的
    },
    getExtData() {
      return this.$amapComponent.getExtData();
    },
    getPosition() {
      return lngLatTo(this.$amapComponent.getPosition());
    },
    getOffset() {
      return pixelTo(this.$amapComponent.getOffset());
    }
  }
};
</script>
