/**
 * @desc Dropdown 下拉菜单
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _omit from 'lodash/omit';
import _get from 'lodash/get';

const BaseDropDown = {
  name: 'BaseDropDown',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    }
  },
  methods: {
    /**
     * @desc 创建 el-dropdown-item
     */
    createElDropdownItem() {
      const vNodes = [];
      if (!_isNil(this.options)) {
        for (let i = 0, len = this.options.length; i < len; i++) {
          const option = this.options[i];
          vNodes.push(
            this.$createElement('el-dropdown-item', {
              props: _omit(option, ['text', 'listeners']),
              nativeOn: _get(option, 'listeners', {})
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
    return h(
      'el-dropdown',
      {
        ref: `${this._uid}-base-drop-down`,
        attrs: {
          id: this.$attrs.id
        },
        class: { 'base-drop-down': true },
        props: _assign({}, this.$attrs),
        on: this.$listeners
      },
      [
        h(
          'span',
          {
            class: 'el-dropdown-link'
          },
          [this.title, h('i', { class: 'el-icon-arrow-down el-icon--right' })]
        ),
        h('el-dropdown-menu', { slot: 'dropdown' }, this.createElDropdownItem())
      ]
    );
  }
};
export default BaseDropDown;
