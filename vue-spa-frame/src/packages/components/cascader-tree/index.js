/**
 * @desc 级联tree（父子tree，只支持两个单选tree）
 */
import _set from 'lodash/set';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';

const cascaderTree = {
  name: 'BaseCascaderTree',
  inheritAttrs: false,
  model: {
    prop: 'cascaderTreeValue',
    event: 'cascaderTreeChange'
  },
  props: {
    // 定义外部 v-model 值
    cascaderTreeValue: {
      type: [String, Number]
    },
    // 父tree配置参数
    parent: {
      type: Object,
      default() {
        return {
          lazy: false,
          'collapse-tags': false,
          isReloadTree: false,
          width: 200,
          displayField: 'label',
          valueField: 'id',
          multiple: false
        };
      }
    },
    // 子tree配置参数
    child: {
      type: Object,
      default() {
        return {
          lazy: false,
          'collapse-tags': false,
          isReloadTree: false,
          width: 200,
          displayField: 'label',
          valueField: 'id',
          multiple: false
        };
      }
    },
    // 子tree搜索用的参数
    searchField: {
      type: String,
      default: 'id'
    },
    ctCls: {
      type: String
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
      treeValue1: '',
      treeValue2: ''
    };
  },
  methods: {
    /**
     * @desc 获取树节点
     * @param {String|Number} nodeKey - 树节点的唯一值
     */
    getTreeNode(nodeKey) {
      return this.getChildRef()
        .getTree()
        .getTree()
        .getNode(nodeKey);
    },
    /**
     * @desc 获取父tree的选择值
     */
    getParentTreeValue() {
      return this.treeValue1;
    },
    /**
     * @desc 获取父级tree
     */
    getParentRef() {
      return this.$refs['select-tree-parent-ref'];
    },
    /**
     * @desc 获取子级tree
     */
    getChildRef() {
      return this.$refs['select-tree-child-ref'];
    }
  },
  render(h) {
    // v-if
    if (!this.isRender) {
      return h();
    }
    const style = {};
    // v-show
    if (!this.isDisplay) {
      _set(style, 'display', 'none');
    }
    return h(
      'div',
      { class: `base-cascader-tree ${this.ctCls}`, style, props: {} },
      [
        h('div', {}, [
          h('base-select-tree', {
            ref: 'select-tree-parent-ref',
            attrs: _pick(this.parent, [
              'api',
              'lazy',
              'collapse-tags',
              'isReloadTree',
              'placeholder',
              'isRenderRoot'
            ]),
            props: _assign(
              { value: this.treeValue1 },
              _omit(this.parent, [
                'api',
                'lazy',
                'collapse-tags',
                'isReloadTree',
                'placeholder',
                'isRenderRoot'
              ])
            ),
            on: {
              selectTreeChange: value => {
                if (this.treeValue1 === value) {
                  return;
                }
                this.treeValue1 = value;
                if (value !== '') {
                  if (this.treeValue2 !== '') {
                    this.getChildRef().clear();
                    this.treeValue2 = '';
                    this.$emit('cascaderTreeChange', this.treeValue2);
                  }
                  this.$nextTick(() => {
                    // 刷新子tree
                    const searchParams = _set(
                      {},
                      this.searchField,
                      this.treeValue1
                    );
                    const childTree = this.getChildRef().getTree();
                    childTree.setQueryParams(searchParams);
                    childTree.refreshAll();
                  });
                }
              },
              clear: _ => {
                this.treeValue2 = '';
                this.$nextTick(() => {
                  this.getChildRef()
                    .getTree()
                    .clearData();
                  this.getParentRef().handCloseTree();
                  this.getChildRef().handCloseTree();
                });
                this.$emit('cascaderTreeChange', this.treeValue2);
              }
            }
          })
        ]),
        h('div', {}, [
          h('base-select-tree', {
            ref: 'select-tree-child-ref',
            attrs: _assign(
              _pick(this.child, [
                'api',
                'lazy',
                'collapse-tags',
                'isReloadTree',
                'placeholder'
              ]),
              { isReloadTree: false }
            ),
            props: _assign(
              { value: this.treeValue2 },
              _omit(this.child, [
                'api',
                'lazy',
                'collapse-tags',
                'isReloadTree',
                'placeholder'
              ])
            ),
            on: {
              selectTreeChange: value => {
                this.treeValue2 = value;
                this.$emit('cascaderTreeChange', this.treeValue2);
              }
            }
          })
        ])
      ]
    );
  }
};
export default cascaderTree;
