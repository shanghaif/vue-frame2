<script>
import { toLngLat } from '../utils/convert-helper.js';
import registerMixin from '../mixins/register-component.js';
import Vue from 'vue';
// 注意：用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示1个信息窗体
export default {
  name: 'BaseAmapInfoWindow',
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },
    // 是否自定义窗体，默认为false
    isCustom: {
      type: Boolean,
      default: false
    },
    // 是否自动调整窗体到视野内
    autoMove: {
      type: Boolean,
      default: true
    },
    // 控制是否在鼠标点击地图后关闭信息窗体，默认false
    closeWhenClickMap: {
      type: Boolean,
      default: false
    },
    // 显示内容，可以是HTML要素字符串或者HTMLElement对象
    content: {
      type: [String, Object]
    },
    // 信息窗体尺寸， size 对象
    size: {
      type: Object
    },
    // 信息窗体显示位置偏移量
    offset: {
      type: Array
    },
    // 信息窗体显示位置偏移量
    position: {
      type: Array
    },
    // 控制是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影
    showShadow: {
      type: Boolean,
      default: false
    },
    // 窗口显示/隐藏
    visible: {
      type: Boolean,
      default: true
    },
    // 事件
    events: {
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
      withSlots: false,
      tmpVM: null,
      propsRedirect: {
        template: 'content',
        contentRender: 'content'
      },
      converters: {
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
        }
      },
      handlers: {
        visible(flag) {
          // fixed Amap info-window reopen
          const position = this.getPosition();
          if (position) {
            flag === false
              ? this.close()
              : this.open(self.$amap, [position.lng, position.lat]);
          }
        },
        template(node) {
          this.setContent(node);
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
    this.$amapComponent.close();
    this.tmpVM.$destroy();
    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy();
    }
  },
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVM.$refs.node;
      }

      // control open / close by visible prop
      delete options.map;

      this.$amapComponent = new AMap.InfoWindow(options);
      if (this.visible !== false) {
        this.$amapComponent.open(this.$amap, toLngLat(this.position));
      }
    }
  },
  render(h) {
    const slots = this.$slots.default || [];
    if (slots.length) {
      this.tmpVM.node = slots;
    }
    return null;
  }
};
</script>
