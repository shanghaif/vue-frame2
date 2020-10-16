/**
 * @desc  tree 树状组件
 */
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';

const BaseTree = {
  name: 'BaseTree',
  inheritAttrs: false,
  model: {
    prop: 'treeValue',
    event: 'treeChange'
  },
  props: {
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          isLeaf: 'leaf'
        };
      }
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 值字段
    valueField: {
      type: String,
      default: 'id'
    },
    // 默认树组件懒加载
    lazy: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 根节点label
    rootLabel: {
      type: String,
      default: '根目录'
    },
    // 根节点信息
    root: {
      type: Object,
      default() {
        return { id: 0, [this.displayField]: this.rootLabel, [this.props.children]: [] };
      }
    },
    // 是否渲染根节点
    isRenderRoot: {
      type: Boolean,
      default: true
    },
    // 推荐 id 作为唯一键
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
    loadFilter: {
      type: Function
    },
    // 自定义内联 style
    ctStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 自定义样式 class
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    // v-if
    isRender: {
      type: Boolean,
      default: true
    },
    // v-show
    isDisplay: {
      type: Boolean,
      default: true
    },
    // 事件
    listeners: {
      type: Object,
      default: () => {}
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 Array 并不确定
    treeValue: {
      default() {
        return null;
      }
    },
    // 是否自动展开第一层树的节点 相当于设置 :default-expanded-keys="[0]"
    // 如果设置了 default-expanded-keys 同时 isExpandFirstPath 为 true 的话会在 default-expanded-keys 中自动添加 0
    isExpandFirstPath: {
      type: Boolean,
      default: true
    },
    // 控件右侧操作菜单栏
    handleMenu: {
      type: Array
    }
  },
  data() {
    this.events = {
      afterLoadStore: 'afterLoadStore' // 数据加载完成之后
    };
    this.curQueryParams = {};
    return {
      curData: [] // 数据集
    };
  },
  mounted() {
    if (!this.lazy) {
      // 非懒加载
      this.loadStore().then(data => {
        if (!_isEmpty(data)) {
          if (this.isRenderRoot) {
            this.root[this.props.children] = data;
            this.curData = [this.root];
          } else {
            this.curData = data;
          }
        }
        // 数据读取完成触发事件
        this.$emit(this.events.afterLoadStore, data);
      });
    }
  },
  methods: {
    /**
     * @typedef {Object} options - 选项配置对象
     * @property {Number} id - 指定在延迟开始前调用
     * @property {String} text - 节点文本
     * @property {String} label - 节点名称
     * @property {Boolean} isLeaf - 是否子节点
     * @property {Object} data - 后端提供的节点源数据对象
     */
    /**
     * @desc 加载子树数据的方法，仅当 lazy 属性为true 时生效
     * @param {options} node - 节点信息
     * @param {Promise} resolve - promise.resolve
     * @method
     */
    loadNode(node, resolve) {
      if (node.level === 0 && this.isRenderRoot) {
        return resolve([this.root]);
      }
      this.loadStore(node)
        .then(data => {
          resolve(data);
          // 数据读取完成触发事件
          this.$emit(this.events.afterLoadStore, data);
        })
        .catch(() => resolve([]));
    },
    /**
     * @desc 加载树
     * @param {Object} node - 树的节点
     * @method
     */
    loadStore(node = {}) {
      return new Promise((resolve, reject) => {
        if (!this.api) {
          return;
        }
        const params = _assign(
          {},
          this.queryParams,
          // { [this.nodeKey]: _isEmpty(node) ? '' : _get(node.data, this.nodeKey) },
          this.curQueryParams
        );
        if (!_isEmpty(_get(node.data, this.nodeKey))) {
          params[this.nodeKey] = _get(node.data, this.nodeKey);
        }
        this.$api[this.api]({ params: params })
          .then(resList => {
            if (this.loadFilter) {
              resList = this.loadFilter(resList);
            }
            const resData = [];
            const checkedNodes = [];
            for (let i = 0; i < resList.data.length; i++) {
              const element = resList.data[i];
              element[this.props.label] = element[this.displayField];
              element[this.props.value] = element[this.valueField];
              // 设置需要默认选中的节点
              if (_has(element, 'check') && element.check) {
                const node = _set({}, this.nodeKey, element[this.nodeKey]);
                checkedNodes.push(node);
              }
              resData.push(element);
            }
            if (checkedNodes.length > 0) {
              setTimeout(() => {
                // 默认勾选的节点 Array
                this.getTree().setCheckedNodes(checkedNodes);
              }, 0);
            }
            resolve(resData);
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params
     * @method
     */
    setQueryParams(params = {}) {
      this.curQueryParams = {};
      return Object.assign(this.curQueryParams, params);
    },
    /**
     * @desc 获取 el-tree 对象
     * @method
     */
    getTree() {
      return this.$refs[`${this._uid}-el-tree-ref`];
    },
    /**
     * @desc 刷新整棵树，不管节点
     */
    refreshAll() {
      this.loadStore().then(data => {
        if (!_isEmpty(data)) {
          if (this.isRenderRoot) {
            this.root.children = data;
            this.curData = [this.root];
          } else {
            this.curData = data;
          }
        }
        // 数据读取完成触发事件
        this.$emit(this.events.afterLoadStore, data);
      });
    },
    /**
     * @desc 刷新某个节点
     * @param {*} nodeData
     * @method
     * @private
     */
    refreshNode(nodeData) {},
    /**
     * @desc 刷新整棵树
     * @method
     *
     */
    refresh() {
      const node = this.getTree().getNode(0);
      node.loading = true;
      this.loadStore(node)
        .then(resData => {
          this.getTree().updateKeyChildren(node.data.id, resData);
        })
        .catch(error => {
          throw new Error(error);
        })
        .finally(() => {
          node.loading = false;
        });
    },
    /**
     * @desc 通过 keys 设置目前勾选的节点
     * @method
     * @example
     * this.$refs['base-tree'].setCheckedKeys([2, 5])
     */
    setCheckedKeys(keys = []) {
      /* const defaultCheckNodes = this.getCheckedNodes();
      if (!_isEmpty(defaultCheckNodes)) {
        for (let i = 0; i < defaultCheckNodes.length; i++) {
          keys.push(_get(defaultCheckNodes[i], this.nodeKey));
        }
      } */
      this.getTree().setCheckedKeys(keys);
    },
    /**
     * @desc 若节点可被选择,则返回目前被选中的节点所组成的数组
     * @method
     * @return Array
     */
    getCheckedNodes() {
      return this.getTree().getCheckedNodes();
    },
    /**
     * @desc 清空选中的节点
     * @method
     */
    clearChecked() {
      this.getTree().setCheckedKeys([]);
    },
    /**
     * @desc 节点被点击时的回调
     * @param {Object} record
     * @param {*} node
     * @param {*} tree
     * @event
     */
    nodeClick(record, node, tree) {
      if (_has(this.listeners, 'nodeClick')) {
        this.listeners.nodeClick(record, node, tree);
        return;
      }
      const eventName = _has(this.$listeners, 'nodeClick')
        ? 'nodeClick'
        : 'node-click';
      this.$emit(eventName, record, node, tree);
    },
    /**
     * @desc 节点选中状态发生变化时的回调
     * @param {Object} record - 节点记录
     * @param {Boolean} checked - 节点本身是否被选中
     * @param {Array} childCheckNodes - 节点的子树中是否有被选中的节点
     * @event
     */
    checkChange(record, checked, childCheckNodes) {
      if (_has(this.listeners, 'checkChange')) {
        this.listeners.checkChange(record, checked, childCheckNodes);
        return;
      }
      const eventName = _has(this.$listeners, 'checkChange')
        ? 'checkChange'
        : 'check-change';
      this.$emit(eventName, record, checked, childCheckNodes);
    },
    /**
     * @desc 当复选框被点击的时候触发
     * @param {Object} node - 节点对象
     * @param {Object} treeCheckedNode - 树目前的选中状态对象
     * @event
     */
    nodeBoxCheck(node, treeCheckedNode) {
      if (_has(this.listeners, 'check')) {
        this.listeners.check(node, treeCheckedNode);
        return;
      }
      this.$emit('check', node, treeCheckedNode);
      // 触发v-model input事件
      const treeEventName = _has(this.$listeners, 'treeChange')
        ? 'treeChange'
        : 'tree-change';
      this.$emit(
        treeEventName,
        _map(this.getTree().getCheckedNodes(), o => _get(o, this.valueField))
      );
    },
    /**
     * @desc 当前选中节点变化时触发的事件 点击节点，并不是复选框
     * @param {Object} record - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     * @event
     */
    currentChange(record, node) {
      if (_has(this.listeners, 'currentChange')) {
        this.listeners.currentChange(node, record, node);
        return;
      }
      const eventName = _has(this.$listeners, 'currentChange')
        ? 'currentChange'
        : 'current-change';
      this.$emit(eventName, record, node);
      // 触发v-model input事件
      const treeEventName = _has(this.$listeners, 'treeChange')
        ? 'treeChange'
        : 'tree-change';
      this.$emit(treeEventName, _get(record, this.valueField));
    },
    /**
     * @desc 当某一节点被鼠标右键点击时会触发该事件
     * @param {*} event
     * @param {*} nodeData
     * @param {*} node
     */
    nodeContextmenu(event, record, node, nodeElement) {
      const eventName = _has(this.$listeners, 'nodeContextmenu')
        ? 'nodeContextmenu'
        : 'node-contextmenu';
      this.$emit(eventName, event, record, node, nodeElement);
      event.preventDefault();
    },
    /**
     * @desc 创建 el-dropdown-item
     * @method
     * @private
     * @param {Object} data - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     */
    createElDropdownItem({ node, data }) {
      const vNodes = [];
      if (!_isNil(this.handleMenu)) {
        for (let i = 0, len = this.handleMenu.length; i < len; i++) {
          const option = this.handleMenu[i];
          let renderNode = option.text;
          if (!_has(option, 'divided')) {
            option.divided = true;
          }
          if (!_has(option, 'isClose')) {
            option.isClose = true; // 点击关闭下拉面板
          }
          if (_has(option, 'render')) {
            renderNode = option.render(this.$createElement); // 自定义节点
          }
          if (_has(option, 'isPopconfirm') && option.isPopconfirm) {
            renderNode = this.$createElement(
              'el-popconfirm',
              {
                props: {
                  title: _get(option, 'title', ''),
                  placement: 'left',
                  iconColor: 'red'
                },
                on: {
                  onConfirm: () => {
                    _has(option, 'listeners.onConfirm') &&
                      option.listeners.onConfirm({ node, data });
                  },
                  onCancel: _get(option, 'listeners.onCancel', () => {})
                }
              },
              [
                this.$createElement(
                  'span',
                  { slot: 'reference', style: 'display: block' },
                  [_get(option, 'text', '')]
                )
              ]
            ); // 二次确认框
          }
          vNodes.push(
            this.$createElement(
              'el-dropdown-item',
              {
                props: _omit(option, ['text', 'listeners', 'render']),
                nativeOn: {
                  click: event => {
                    if (option.isClose) {
                      this.$refs[
                        `${node[this.nodeKey]}-tree-el-dropdown`
                      ].hide();
                      document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                    }
                    _has(option, 'listeners.click') &&
                      option.listeners.click({ node, data });
                  }
                }
              },
              [renderNode]
            )
          );
        }
      }
      return vNodes;
    },
    /**
     * @desc 创建点击树形控件右侧更多按钮展示的下拉菜单
     * @method
     * @private
     * @param {Object} data - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     */
    createHandleMenu({ node, data }) {
      const h = this.$createElement;
      const vNode = h(
        'span',
        {
          class: 'handle-menu-tree-node',
          on: {
            click: event => {
              if (event.target.tagName === 'I') {
                document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                event.stopPropagation();
                event.preventDefault();
                return false; // i 图标标签
              }
            }
          }
        },
        [
          h('span', { class: 'el-tree-node__label' }, [node.label]),
          h('span', {}, [
            h(
              'el-dropdown',
              {
                ref: `${node[this.nodeKey]}-tree-el-dropdown`,
                props: {
                  'hide-on-click': false,
                  trigger: 'click',
                  size: 'mini'
                }
              },
              [
                h('span', { class: 'el-dropdown-link' }, [
                  h('i', { class: 'el-icon-more' }, [])
                ]),
                h(
                  'el-dropdown-menu',
                  { slot: 'dropdown' },
                  this.createElDropdownItem({ node, data })
                )
              ]
            )
          ])
        ]
      );
      return vNode;
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign({}, _get(this.$props, 'ctStyle', { width: '100%' }));
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    // 自动展开第一层节点
    let defaultExpandedKeys = [];
    if (this.isExpandFirstPath || _has(this.$attrs, 'default-expanded-keys')) {
      if (_has(this.$attrs, 'default-expanded-keys')) {
        defaultExpandedKeys = _assign([], this.$attrs['default-expanded-keys']);
        if (!_includes(defaultExpandedKeys, 0)) {
          defaultExpandedKeys.push(0);
        }
      } else {
        defaultExpandedKeys = [0];
      }
    }
    let scopedSlotVNode = _isEmpty(this.$scopedSlots)
      ? undefined
      : this.$scopedSlots;
    if (_isEmpty(scopedSlotVNode) && !_isEmpty(this.handleMenu)) {
      scopedSlotVNode = {
        default: ({ node, data }) => this.createHandleMenu({ node, data })
      };
    }
    const oLoadAction = this.lazy
      ? { load: this.loadNode }
      : { data: this.curData }; // 数据加载的方式
    _assign(this.props, { label: this.displayField });
    return h(
      'el-tree',
      {
        ref: `${this._uid}-el-tree-ref`,
        class: _assign({ 'base-tree': true }, _get(this.$props, 'ctCls', {})),
        style,
        scopedSlots: scopedSlotVNode, // 自定义树节点的内容，参数为 { node, data }
        props: _assign(
          {},
          {
            // load: this.loadNode,
            // data: this.curData,
            props: _omit(this.props, ['value']),
            lazy: this.lazy,
            'expand-on-click-node': false,
            'node-key': this.nodeKey
          },
          oLoadAction,
          this.$attrs,
          { defaultExpandedKeys }
        ),
        on: _assign({}, this.$listeners, {
          'node-click': (record, node, tree) => {
            document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
            this.nodeClick(record, node, tree);
          }, // 节点被点击时的回调
          'check-change': this.checkChange, // 节点选中状态发生变化时的回调
          check: (node, treeCheckedNode) => {
            document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
            this.nodeBoxCheck(node, treeCheckedNode);
          }, // 当复选框被点击的时候触发
          'current-change': this.currentChange, // 当前选中节点变化时触发的事件 点击节点，并不是复选框
          'node-contextmenu': this.nodeContextmenu // 当某一节点被鼠标右键点击时会触发该事件
        })
      },
      []
    );
  }
};
export default BaseTree;
