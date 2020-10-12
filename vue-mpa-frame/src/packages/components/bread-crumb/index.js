/**
 * @desc 面包屑
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _omit from 'lodash/omit';

const BaseBreadCrumb = {
  name: 'BaseBreadCrumb',
  inheritAttrs: false,
  props: {
    // 自定义样式
    ctCls: {
      type: String
    },
    // 子项
    /**
     * @desc 子项
     * @example
     * [
     *   { text: '首页', to: { path: '/user' } },
     *   { text: '活动管理' }
     * ]
     */
    options: {
      type: Array
    }
  },
  methods: {
    /**
     * @desc 创建 el-breadcrumb
     */
    createElBreadcrumb() {
      const vNodes = [];
      if (!_isNil(this.options)) {
        for (let i = 0, len = this.options.length; i < len; i++) {
          const option = this.options[i];
          vNodes.push(
            this.$createElement('el-breadcrumb-item', {
              props: _omit(option, ['text'])
            }, [
              option.text
            ])
          );
        }
      }
      return vNodes;
    }
  },
  render(h) {
    return h('el-breadcrumb', {
      ref: `${this._uid}-base-bread-crumb`,
      attrs: {
        id: this.$attrs.id
      },
      class: { 'base-bread-crumb': true, [this.ctCls]: this.ctCls },
      props: _assign({}, this.$attrs)
    }, this.createElBreadcrumb());
  }
};
export default BaseBreadCrumb;
