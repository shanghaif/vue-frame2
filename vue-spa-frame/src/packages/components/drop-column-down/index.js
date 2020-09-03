/**
 * @desc Dropdown 下拉面板菜单
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _has from 'lodash/has';
import _map from 'lodash/map';

const BaseDropColumnDown = {
  name: 'BaseDropColumnDown',
  inheritAttrs: false,
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 子项
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
          const oOption = this.options[i];
          const oVOption = [];
          for (let n = 0, childLen = oOption.length; n < childLen; n++) {
            const oItem = oOption[n];
            const oChildItem = _map(oItem.list, row => {
              return this.$createElement(
                'div',
                {
                  on: {
                    click: event => {
                      _has(this.$listeners, 'click') && this.$listeners.click(event, JSON.parse(JSON.stringify(row)));
                    }
                  }
                },
                [this.$createElement('i', { class: row.icon }), row.label]
              );
            });
            oVOption.push(
              this.$createElement('div', {}, [
                this.$createElement('div', { class: 'title' }, [oItem.title]),
                oChildItem
              ])
            );
          }
          const vColumn = this.$createElement(
            'div',
            { class: 'column' },
            oVOption
          );
          vNodes.push(vColumn);
        }
      }
      return this.$createElement(
        'div',
        { class: 'base-drop-column-down-menu' },
        vNodes
      );
    }
  },
  render(h) {
    return h(
      'el-dropdown',
      {
        ref: `${this._uid}-base-drop-column-down`,
        attrs: {
          id: this.$attrs.id
        },
        class: { 'base-drop-column-down': true },
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
        h('el-dropdown-menu', { slot: 'dropdown' }, [
          this.createElDropdownItem()
        ])
      ]
    );
  }
};
export default BaseDropColumnDown;