/**
 * @desc 穿梭树
 */
import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import _assign from 'lodash/assign';
import _set from 'lodash/set';
import _filter from 'lodash/filter';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _debounce from 'lodash/debounce';
import _omit from 'lodash/omit';

const BaseTransferTree = {
  name: 'BaseTransferTree',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'transferChange'
  },
  props: {
    value: {
      type: Array
    },
    // 左侧 tree 的配置属性
    treeAttribute: {
      type: Object,
      default() {
        return {};
      }
    },
    ctStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: 'auto'
    },
    title: {
      type: String
    },
    // 当前选中哪一个折叠面板
    activeName: {
      type: String
    },
    // 搜索过滤函数
    filter: {
      type: Function
    },
    // 右侧列表显示值的key键
    itemDisplayField: {
      type: String,
      default: 'name'
    }
  },
  watch: {
    /* filterText(val, oldVal) {
      // this.$refs[`${this._uid}-transfer-tree-ref`].getTree().filter(val);
      if (!_isNil(this.filter)) {
        this.debouncedLoadListData(val, this.activeName);
      }
    }, */
    filterText: {
      handler(val, oldVal) {
        if (val !== oldVal && (val !== '' || val !== null)) {
          if (
            !_isNil(this.filter) &&
            !_isNil(this.debouncedLoadListData) &&
            _has(this.$slots, 'expand')
          ) {
            this.debouncedLoadListData(val, this.activeName);
          }
          if (
            !_has(this.$slots, 'expand') &&
            !_isNil(this.$refs[`${this._uid}-transfer-tree-ref`])
          ) {
            // 不是插槽
            this.$refs[`${this._uid}-transfer-tree-ref`].getTree().filter(val);
          }
        }
      },
      immediate: true
    },
    activeName(val, oldVal) {
      if (val !== oldVal) {
        this.curActiveName = val; // 左侧
        this.tabActiveName = val; // 右侧
        if (
          !_isNil(this.filter) &&
          !_isNil(this.debouncedLoadListData)
          // this.filterText !== ''
        ) {
          this.debouncedLoadListData(this.filterText, this.activeName);
        }
      }
    },
    value: {
      handler(val, oldVal) {
        // 初始赋值
        if (
          !_isNil(this.value) &&
          !_isEmpty(this.value) &&
          _has(this.$slots, 'expand')
        ) {
          for (let i = 0, len = this.value.length; i < len; i++) {
            const key = _keys(this.value[i])[0];
            _set(this.rightSlotExpandData, key, _get(this.value[i], key));
          } // 插槽
          console.log('初始赋值', this.rightSlotExpandData);
        }
        console.log(val, oldVal);
        if (
          !_isNil(this.value) &&
          !_isEmpty(this.value) &&
          !_has(this.$slots, 'expand')
        ) {
          this.leftTreeCheckedStore = this.value;
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    this.displayField = 'name';
    this.valueField = 'id';
    this.childrenField = 'children';
    this.events = {
      removeItem: 'removeItem', // 右侧tab中数据项的移除事件
      treeLoadSuccess: 'treeLoadSuccess' // 非插槽情况下用于监听树加载完成事件
    };
    return {
      filterText: '',
      leftTreeCheckedStore: [
        /* { menuName: '小王', id: 1 },
        { menuName: '大王', id: 2 } */
      ], // 左侧树选中的节点
      curActiveName: null, // 默认选中的左侧第一个折叠面板，如果传递了 expand 插槽
      rightSlotExpandData: {
        // role: null,
        // department: null,
        // user: null
      },
      tabActiveName: null // 插槽情况下右侧 tab 页
    };
  },
  created() {
    this.displayField = _get(this.treeAttribute, 'displayField', 'name');
    this.valueField = _get(this.treeAttribute, 'valueField', 'id');
    this.childrenField = _get(this.treeAttribute, 'props.children', 'children');
    if (
      _has(this.$slots, 'expand') &&
      _has(this.$slots, 'expand[0].data.attrs.name')
    ) {
      this.curActiveName = _get(this.$slots, 'expand[0].data.attrs.name');
      this.tabActiveName = this.curActiveName;
      for (let i = 0, len = this.$slots.expand.length; i < len; i++) {
        const name = _get(this.$slots.expand[i], 'data.attrs.name');
        this.$set(this.rightSlotExpandData, name, null);
      }
    }
    this.debouncedLoadListData = _debounce(
      _isNil(this.filter) ? this.filterNode : this.filter,
      500
    ); // 节流防止抖动
  },
  methods: {
    /**
     * @desc 获取树对象-非插槽
     */
    getTree() {
      return this.$refs[`${this._uid}-transfer-tree-ref`].getTree();
    },
    /**
     * @desc 创建左侧的树-容器
     */
    createLeftBox() {
      const h = this.$createElement;
      const aExpandVNode = [];
      if (_has(this.$slots, 'expand')) {
        aExpandVNode.push(
          h(
            'base-view-collapse',
            {
              props: { activeName: this.curActiveName },
              on: {
                changeActiveName: name => {
                  this.curActiveName = name;
                }
              }
            },
            _map(this.$slots.expand, e => {
              // console.log('eee ', e);
              return h(
                'div',
                {
                  attrs: _omit(e.data.attrs, ['title']),
                  style: { height: '100%' }
                },
                [e.children[0]]
              );
            })
          )
        );
      } else {
        aExpandVNode.push(this.createLeftTree());
      }
      // console.log('aExpandVNode ', aExpandVNode);
      const vNode = h('div', { class: { 'left-tree': true } }, [
        h(
          'base-border-layout',
          {
            props: {
              northHeight: '60px',
              westWidth: '0px',
              eastWidth: '0px',
              southHeight: '0px',
              isPadding: false,
              ctCls: 'base-transfer-tree-left-cls'
            }
          },
          [
            h(
              'div',
              { class: { 'search-north-bar': true }, slot: 'north', props: {} },
              [
                h('div', {}, [this.title]),
                h('div', {}, [
                  h('el-input', {
                    attrs: {
                      placeholder: '请输入关键字进行过滤',
                      maxlength: '40'
                    },
                    props: {
                      value: this.filterText,
                      showWordLimit: true,
                      clearable: true
                    },
                    on: {
                      input: val => {
                        this.filterText = val; // v-model
                      }
                    }
                  })
                ])
              ]
            ),
            h(
              'div',
              {
                class: { 'show-tree-center': true },
                slot: 'center',
                props: {}
              },
              aExpandVNode
            )
          ]
        )
      ]);
      return vNode;
    },
    /**
     * @desc 创建右侧的树-容器
     */
    createRightBox() {
      const h = this.$createElement;
      const vNode = h('div', { class: { 'right-tree': true } }, [
        h(
          'base-border-layout',
          {
            props: {
              northHeight: _has(this.$slots, 'expand') ? '0' : '15px',
              westWidth: '0px',
              eastWidth: '0px',
              southHeight: '0px',
              isPadding: false,
              ctCls: 'base-transfer-tree-left-cls'
            }
          },
          [
            h(
              'div',
              { class: { 'search-north-bar': true }, slot: 'north', props: {} },
              [
                /* h(
                  'span',
                  {
                    on: {
                      click: event => {
                        this.leftTreeCheckedStore = [];
                        this.$refs[
                          `${this._uid}-transfer-tree-ref`
                        ].clearChecked();
                        this.$emit('transferChange', []);
                      }
                    }
                  },
                  ['清空', h('i', { class: 'el-icon-delete' })]
                ) */
                _has(this.$slots, 'expand')
                  ? h()
                  : h(
                      'el-popconfirm',
                      {
                        props: { title: '确认清空？' },
                        on: {
                          confirm: () => {
                            const oRef = this.$refs[
                              `${this._uid}-transfer-tree-ref`
                            ];
                            if (!_isNil(oRef)) {
                              this.leftTreeCheckedStore = [];
                              oRef.clearChecked();
                              this.$emit('transferChange', []);
                            }
                          }
                        }
                      },
                      [
                        h('span', { slot: 'reference' }, [
                          '清空',
                          h('i', { class: 'el-icon-delete' })
                        ])
                      ]
                    )
              ]
            ),
            h(
              'div',
              {
                class: { 'right-show-tree-center': true },
                slot: 'center'
              },
              [
                _has(this.$slots, 'expand')
                  ? this.createRightSlotExpandBox()
                  : this.createRightTree()
              ]
            )
          ]
        )
      ]);
      return vNode;
    },
    /**
     * @desc 创建操作区域
     */
    createOperationBox() {
      const h = this.$createElement;
      const vNode = h('div', { class: { 'operation-box': true } }, [
        h('el-button', { props: { type: 'primary', icon: 'el-icon-back' } }),
        h('el-button', { props: { type: 'primary', icon: 'el-icon-right' } })
      ]);
      return vNode;
    },
    /**
     * @desc 创建左侧树
     */
    createLeftTree() {
      const h = this.$createElement;
      const vNode = h(
        'base-tree',
        {
          ref: `${this._uid}-transfer-tree-ref`,
          props: this.treeAttribute,
          attrs: _assign(
            { 'filter-node-method': this.filterNode },
            _pick(this.treeAttribute, [
              'default-expanded-keys',
              'defaultExpandedKeys',
              'default-checked-keys',
              'defaultCheckedKeys',
              'show-checkbox',
              'showCheckbox',
              'check-strictly',
              'checkStrictly'
            ])
          ),
          on: {
            treeChange: (checkedValues, node, treeCheckedNode) => {
              if (_isNil(node) || _isNil(treeCheckedNode)) {
                return;
              }
              this.leftTreeCheckedStore = _filter(
                // checkStrictly 父子不相关联 checkStrictly: true
                _map(treeCheckedNode.checkedNodes, v => {
                  if (
                    !_has(v, this.childrenField) ||
                    ((_has(this.treeAttribute, 'check-strictly') ||
                      _has(this.treeAttribute, 'checkStrictly')) &&
                      this.treeAttribute.checkStrictly)
                  ) {
                    const oFieldNode = {
                      [this.displayField]: v[this.displayField],
                      [this.valueField]: v[this.valueField]
                    };
                    return oFieldNode;
                  }
                }),
                v => !_isNil(v)
              );
              this.$emit('transferChange', this.leftTreeCheckedStore);
            },
            afterLoadStore: data => {
              this.$emit('treeLoadSuccess', data);
            }
          }
        },
        []
      );
      return vNode;
    },
    /**
     * @desc 创建右侧插槽对应分块容器
     */
    createRightSlotExpandBox() {
      const oVNodeArray = [];
      const h = this.$createElement;
      for (let i = 0, len = this.$slots.expand.length; i < len; i++) {
        const { title, name } = _get(this.$slots.expand[i], 'data.attrs');
        const vNode = h('el-tab-pane', { props: { label: title, name } }, [
          h('div', { class: { 'right-slot-expand-tab-inner': true } }, [
            this.createRightSlotExpandList(
              _get(this.rightSlotExpandData, name, []),
              name
            )
          ])
        ]);
        oVNodeArray.push(vNode);
      }
      return [
        h(
          'el-tabs',
          {
            props: { value: this.tabActiveName },
            on: {
              input: value => {
                this.tabActiveName = value;
              },
              tabClick: (tab, event) => {
                console.log(tab, event);
              }
            }
          },
          [oVNodeArray]
        )
      ];
    },
    /**
     * @desc 创建右侧树
     */
    createRightTree() {
      const h = this.$createElement;
      let aLiNodes = h();
      if (_isEmpty(this.leftTreeCheckedStore)) {
        return [h('div', { class: 'no-slot-empty' }, ['请先选择数据'])];
      } else {
        aLiNodes = _map(this.leftTreeCheckedStore, v => {
          return h('li', {}, [
            h('span', {}, [_get(v, this.itemDisplayField)]),
            h('i', {
              class: 'el-icon-remove-outline',
              on: {
                click: event => {
                  const index = _findIndex(
                    this.leftTreeCheckedStore,
                    o => o[this.valueField] === v[this.valueField]
                  );
                  if (index !== -1) {
                    this.leftTreeCheckedStore.splice(index, 1);
                    this.$nextTick(() => {
                      this.$refs[
                        `${this._uid}-transfer-tree-ref`
                      ].setCheckedKeys(
                        _map(this.leftTreeCheckedStore, o => o[this.valueField])
                      );
                    });
                    this.$emit('transferChange', this.leftTreeCheckedStore);
                  }
                }
              }
            })
          ]);
        });
      }
      const vNode = h('ul', {}, aLiNodes);
      return vNode;
    },
    /**
     * @desc 创建左侧插槽对应的右侧数据栏块
     */
    createRightSlotExpandList(data, name) {
      // console.log('创建左侧插槽对应的右侧数据栏块 ', data, name);
      const h = this.$createElement;
      let aLiNodes = h();
      if (_isEmpty(data)) {
        return [h('div', { class: 'empty' }, ['请先选择数据'])];
      } else {
        aLiNodes = _map(data, v => {
          return h('li', {}, [
            h('span', {}, [_get(v, this.itemDisplayField)]), // 这里的 key `menuName` 需要外部传入
            h('i', {
              class: 'el-icon-remove-outline',
              on: {
                click: event => {
                  this.$emit(
                    this.events.removeItem,
                    _get(this.rightSlotExpandData, name),
                    v,
                    name,
                    event
                  );
                }
              }
            })
          ]);
        });
      }
      const vNode = h('ul', {}, aLiNodes);
      return vNode;
    },
    /**
     * @desc tree 的搜索
     */
    filterNode(value, data) {
      if (!value) return true;
      return (
        _get(data, this.treeAttribute.displayField, 'name').indexOf(value) !==
        -1
      );
    },
    /**
     * @desc 设置激活状态tab页的数据
     */
    setActivateTabData(data) {
      if (!_has(this.rightSlotExpandData, this.activeName)) {
        _set(this.rightSlotExpandData, this.activeName, []);
      }
      this.rightSlotExpandData[this.activeName] = data;
      // console.log('vvv', this.rightSlotExpandData, this.activeName, data);
      const aValueList = [];
      for (
        let i = 0, len = _keys(this.rightSlotExpandData).length;
        i < len;
        i++
      ) {
        // console.log('key', _keys(this.rightSlotExpandData)[i]);
        const key = _keys(this.rightSlotExpandData)[i];
        const obj = _set(
          {},
          key,
          _get(this.rightSlotExpandData, key, []) === null
            ? []
            : _get(this.rightSlotExpandData, key, [])
        );
        // console.log('obj', obj);
        aValueList.push(obj);
      }
      // console.log('fffffffff ', aValueList);
      this.$emit('transferChange', aValueList);
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign(
      { width: this.width },
      _get(this.$props, 'ctStyle', {})
    ); // { ..._get(this.$props, 'ctStyle', {}) }
    if (this.width !== 'auto') {
      style.width = this.width;
    }
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    return h(
      'div',
      {
        ref: `${this._uid}-el-transfer-tree-ref`,
        class: _assign(
          { 'base-transfer-tree': true },
          _get(this.$props, 'ctCls', {})
        ),
        style
      },
      [this.createLeftBox(), this.createRightBox()]
    );
  }
};
export default BaseTransferTree;
