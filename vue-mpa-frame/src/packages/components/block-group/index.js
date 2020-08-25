/**
 * @desc 按钮组
 */
import _isNil from 'lodash/isNil';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _assign from 'lodash/assign';

const BaseBlockGroup = {
  name: 'BaseBlockGroup',
  inheritAttrs: false,
  props: {
    // item 子项的宽度
    width: {
      type: String
    },
    // 当前激活的菜单项（0 是第一个）
    defaultActive: {
      type: Number,
      default: 0
    },
    // 文字颜色
    textColor: {
      type: String,
      default: '#333'
    },
    // 选中文字颜色
    activeTextColor: {
      type: String,
      default: '#fff'
    },
    // 选中的样式
    activeCls: {
      type: String
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: '#877E7E'
    },
    // 配置项
    buttonGroup: {
      type: Array
    }
  },
  data() {
    return {
      isActive: this.defaultActive
    };
  },
  watch: {
    // 监听外部 defaultActive 的修改
    defaultActive(val, oldVal) {
      if (val !== oldVal) {
        this.isActive = val;
        setTimeout(() => {
          this.handleDefaultClick();
        }, 0);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.handleDefaultClick();
    }, 0);
  },
  methods: {
    /**
     * @desc 默认执行 click
     */
    handleDefaultClick() {
      const aChildrenList = _get(
        this.$refs[`${this._uid}-base-button-group`],
        'children',
        []
      );
      if (aChildrenList.length > this.isActive) {
        aChildrenList[this.isActive].click();
      }
    },
    /**
     * @desc 获取 html 节点对象
     */
    getEl() {
      return this.$refs[`${this._uid}-base-button-group`];
    },
    /**
     * @desc 创建 el-dropdown-item
     */
    createItem() {
      const vNodes = [];
      if (!_isNil(this.buttonGroup)) {
        for (let i = 0, len = this.buttonGroup.length; i < len; i++) {
          const option = this.buttonGroup[i];
          let icon = null;
          if (_has(option, 'icon') || _has(option, 'iconUrl')) {
            icon = this.$createElement('i', {
              class: option.icon || option.iconUrl
            });
          }
          const vNode = this.$createElement(
            'div',
            {
              style: {
                width: this.width,
                'background-color':
                  this.backgroundColor && this.isActive !== i
                    ? this.backgroundColor
                    : null
              },
              class: {
                active: this.isActive === i,
                [this.activeCls]: this.activeCls && this.isActive === i
              },
              on: {
                click: event => {
                  if (this.isActive !== i) {
                    this.isActive = i; // 设置选中项
                    this.$emit('update:defaultActive', i);
                  }
                  if (_has(this.$listeners, 'click')) {
                    this.$listeners.click(event, _assign({}, option), i);
                  }
                }
              }
            },
            [
              icon,
              this.$createElement(
                'span',
                {
                  style: {
                    color:
                      this.isActive === i
                        ? this.activeTextColor
                        : this.textColor
                  }
                },
                option.text || option.menuName
              )
            ]
          );
          vNodes.push(vNode);
        }
      }
      return vNodes;
    }
  },
  render(h) {
    return h(
      'div',
      {
        ref: `${this._uid}-base-button-group`,
        attrs: { id: this.$attrs.id },
        class: { 'base-button-group': true }
      },
      this.createItem()
    );
  }
};
export default BaseBlockGroup;
