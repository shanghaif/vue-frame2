/**
 * @desc Absolute布局
 */
const BaseAbsoluteLayout = {
  name: 'BaseAbsoluteLayout',
  props: {
    // 一个可选添加的CSS样式类，加入到组件的容器上
    extraCls: {
      type: String
    }
  },
  methods: {
    createNodes() {
      const childSlots = this.$slots.default;
      return childSlots;
    }
  },
  render(h) {
    const style = {};
    const oClassObj = { 'base-absolute-layout_wrapper': true };
    if (this.extraCls) {
      _set(oClassObj, this.extraCls, true);
    }
    return h('div', { class: oClassObj, style }, this.createNodes());
  }
};
export default BaseAbsoluteLayout;
