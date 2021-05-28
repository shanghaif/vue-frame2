/**
 * @desc 渲染组件自身-比如有些情况下只要渲染一个文字的节点但增加一个 span 标签又显得有些多余了，这样可以使用这个组件来渲染传入的内容自身
 */

const BaseRenderSelf = {
  name: 'BaseRenderSelf',
  props: {
    self: {
      type: [Number, String, Object]
    }
  },
  render(h) {
    return h(
      {
        render(h) {
          return this.$scopedSlots.default();
        }
      },
      { scopedSlots: { default: props => this.self } },
      []
    );
  }
};
export default BaseRenderSelf;
