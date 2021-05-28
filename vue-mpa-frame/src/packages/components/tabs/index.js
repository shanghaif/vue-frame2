/**
 * @desc Tabs 标签页
 */
import _isEqual from 'lodash/isEqual';
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
const BaseTabs = {
  name: 'BaseTabs',
  inheritAttrs: false,
  model: {
    prop: 'tabValue',
    event: 'tabChange'
  },
  props: {
    // 绑定值，选中选项卡的 name
    tabValue: {
      type: String,
      required: true
    },
    ctStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      curTabValue: this.tabValue
    };
  },
  created() {
    this.$nextTick(() => {
      const boxHeight = this.$parent.$el.clientHeight - 40;
      const tabsRef = this.$refs[`${this._uid}-el-tabs-ref`];
      if (!_isEmpty(tabsRef.$el.childNodes)) {
        const tabHeader = tabsRef.$el.childNodes[0].clientHeight;
        tabsRef.$el.style.height = `${boxHeight}px`;
        tabsRef.$el.childNodes[1].style.height = `${boxHeight - tabHeader}px`;
      }
    });
  },
  methods: {
    /**
     * @desc 创建tab-panel节点
     */
    createElTabPane() {
      const vNodes = [];
      const h = this.$createElement;
      for (let i = 0, len = this.$slots.default.length; i < len; i++) {
        const slot = this.$slots.default[i];
        if (!slot.context) {
          continue; // 是为文档 vuePress 中的示例添加的判断
        }
        const attrs = _get(slot, 'data.attrs', {});
        const childrenNodes = [];
        for (let n = 0, len = slot.children.length; n < len; n++) {
          const childSlot = slot.children[n];

          if (_has(childSlot, 'data.slot') && childSlot.data.slot === 'label') {
            childrenNodes.push(
              h('template', { slot: 'label' }, childSlot.children)
            );
          } else {
            childrenNodes.push(childSlot);
          }
        }
        vNodes.push(
          h('el-tab-pane', { props: _assign({}, attrs) }, childrenNodes)
        );
      }
      return vNodes;
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign({}, _get(this.$props, 'ctStyle', {})); // { ..._get(this.$props, 'ctStyle', {}) }
    if (this.width !== 'auto') {
      style.width = this.width;
    }
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    return h(
      'el-tabs',
      {
        ref: `${this._uid}-el-tabs-ref`,
        class: _assign({ 'base-tabs': true }, _get(this.$props, 'ctCls', {})),
        style,
        props: _assign({}, this.$attrs, { value: this.tabValue }),
        on: _assign(
          {},
          {
            input: val => {
              this.curTabValue = val;
            }
          },
          this.$listeners
        )
      },
      this.createElTabPane()
    );
  }
};
export default BaseTabs;
