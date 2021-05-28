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
      const h = this.$createElement;
      const nodes = [];
      for (let i = 0, len = childSlots.length; i < len; i++) {
        const oAttrs = _get(childSlots[i], 'data.attrs', {});
        const x = _get(oAttrs, 'x', 0);
        const y = _get(oAttrs, 'y', 0);
        delete oAttrs.x;
        delete oAttrs.y;
        nodes.push(
          h(
            {
              render(h) {
                return this.$scopedSlots.default();
              }
            },
            {
              style: {
                position: 'absolute',
                top: y + 'px',
                left: x + 'px'
              },
              scopedSlots: { default: props => childSlots[i] }
            },
            []
          )
        );
      }
      return nodes;
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
