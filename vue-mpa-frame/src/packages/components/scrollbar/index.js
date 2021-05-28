/**
 * @desc 滚动组件-el-scrollbar
 * 在使用时要设置外层容器高度。并且要设置el-scrollbar 的高度为100%
 */
import _set from 'lodash/set';
const scrollbar = {
  name: 'BaseScrollbar',
  inheritAttrs: false,
  props: {
    ctCls: {
      type: String
    }
  },
  render(h) {
    const myClass = {};
    if (!_isNil(this.ctCls)) {
      _set(myClass, this.ctCls, this.ctCls);
    }
    return h('el-scrollbar', { style: { height: '100%' }, class: myClass }, [
      h('template', { slot: 'default' }, [this.$slots.default])
    ]);
  }
};
export default scrollbar;
