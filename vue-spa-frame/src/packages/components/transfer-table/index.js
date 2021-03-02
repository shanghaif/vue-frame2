/**
 * @desc table 穿梭框组件
 */
import _isEqual from 'lodash/isEqual';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

const BaseTransferGrid = {
  name: 'BaseTransferGrid',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'transferGridChange'
  },
  props: {
    value: {
      type: Array
    },
    // 搜索字段的名称
    searchField: {
      type: String,
      default: 'name'
    },
    // 左侧 tree 的配置属性
    gridAttribute: {
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
    // 显示值字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 隐藏值字段
    valueField: {
      type: String,
      default: 'id'
    }
  },
  watch: {
    filterText: {
      handler(val, oldVal) {
        if (val !== oldVal && !_isNil(this.getGrid())) {
          const gridRef = this.getGrid();
          gridRef.reloadGrid();
        }
      }
    }
  },
  data() {
    this.gridResult = [];
    return {
      filterText: '',
      leftGridCheckedStore: [
        /* { menuName: '小王', id: 1 },
        { menuName: '大王', id: 2 } */
      ] // 左侧grid选中的节点
    };
  },
  created() {
    if (!_isEmpty(this.value)) {
      this.leftGridCheckedStore = this.value;
    }
  },
  methods: {
    /**
     * @desc 刷新数据
     */
    reload() {
      this.getGrid().reloadGrid();
    },
    /**
     * @desc 获取grid对象-非插槽
     */
    getGrid() {
      return this.$refs[`${this._uid}-transfer-grid-ref`];
    },
    /**
     * @desc 创建左侧的grid-容器
     */
    createLeftBox() {
      const h = this.$createElement;
      const vNode = h('div', { class: { 'left-grid': true } }, [
        h(
          'base-border-layout',
          {
            props: {
              northHeight: '60px',
              westWidth: '0px',
              eastWidth: '0px',
              southHeight: '0px',
              isPadding: false,
              ctCls: 'base-transfer-grid-left-cls'
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
                class: { 'show-grid-center': true },
                slot: 'center',
                props: {}
              },
              [this.createLeftGrid()]
            )
          ]
        )
      ]);
      return vNode;
    },
    /**
     * @desc 创建右侧的列表-容器
     */
    createRightBox() {
      const h = this.$createElement;
      const vNode = h('div', { class: { 'right-grid': true } }, [
        h(
          'base-border-layout',
          {
            props: {
              northHeight: _has(this.$slots, 'expand') ? '0' : '15px',
              westWidth: '0px',
              eastWidth: '0px',
              southHeight: '0px',
              isPadding: false,
              ctCls: 'base-transfer-grid-left-cls'
            }
          },
          [
            h(
              'div',
              { class: { 'search-north-bar': true }, slot: 'north', props: {} },
              [
                h(
                  'el-popconfirm',
                  {
                    props: { title: '确认清空？' },
                    on: {
                      confirm: () => {
                        this.leftGridCheckedStore = [];
                        this.getGrid().clearSelection();
                        this.$emit('transferGridChange', []);
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
                class: { 'right-show-grid-center': true },
                slot: 'center'
              },
              [this.createRightList()]
            )
          ]
        )
      ]);
      return vNode;
    },
    /**
     * @desc 创建左侧Grid
     */
    createLeftGrid() {
      const h = this.$createElement;
      const vNode = h('base-grid', {
        ref: `${this._uid}-transfer-grid-ref`,
        props: _assign(this.gridAttribute, {
          loadFilter: data => {
            if (this.filterText.length === 0) {
              this.$nextTick(() => {
                const checkedRows = [];
                for (
                  let i = 0, len = this.leftGridCheckedStore.length;
                  i < len;
                  i++
                ) {
                  checkedRows.push({
                    field: this.valueField,
                    value: _get(this.leftGridCheckedStore[i], this.valueField)
                  });
                }
                if (!_isEmpty(checkedRows)) {
                  setTimeout(() => {
                    this.getGrid().selectRows(checkedRows);
                  }, 0);
                }
              });
              return data;
            }
            const resultsField = _get(
              this['$base-global-options'],
              'grid.data',
              'data.results'
            );
            const curData = _omit(data, [resultsField]);
            const filterData = _filter(_get(data, resultsField), v => {
              return _includes(_get(v, this.searchField), this.filterText);
            });
            return _set(curData, resultsField, filterData);
          }
        }),
        on: {
          'selection-change': selection => {
            if (_isEmpty(selection)) {
              return;
            }
            this.leftGridCheckedStore = _map(selection, v => {
              const oFieldNode = {
                [this.displayField]: _get(v, this.displayField),
                [this.valueField]: _get(v, this.valueField)
              };
              return oFieldNode;
            });
            this.$emit('transferGridChange', this.leftGridCheckedStore);
          }
        }
      });
      return vNode;
    },
    /**
     * @desc 创建右侧列表区域
     */
    createRightList() {
      const h = this.$createElement;
      let aLiNodes = h();
      if (_isEmpty(this.leftGridCheckedStore)) {
        return [h('div', { class: 'no-slot-empty' }, ['请先选择数据'])];
      } else {
        aLiNodes = _map(this.leftGridCheckedStore, v => {
          return h('li', {}, [
            h('span', {}, [_get(v, this.displayField)]),
            h('i', {
              class: 'el-icon-remove-outline',
              on: {
                click: event => {
                  const index = _findIndex(
                    this.leftGridCheckedStore,
                    o => o[this.valueField] === v[this.valueField]
                  );
                  if (index !== -1) {
                    const value = _get(
                      this.leftGridCheckedStore[index],
                      this.valueField
                    );
                    this.leftGridCheckedStore.splice(index, 1);
                    this.$nextTick(() => {
                      this.getGrid().selectRows([
                        { field: this.valueField, value }
                      ]);
                    });
                    this.$emit('transferGridChange', this.leftGridCheckedStore);
                  }
                }
              }
            })
          ]);
        });
      }
      const vNode = h('ul', {}, aLiNodes);
      return vNode;
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
        ref: `${this._uid}-el-transfer-grid-ref`,
        class: _assign(
          { 'base-transfer-grid': true },
          _get(this.$props, 'ctCls', {})
        ),
        style
      },
      [this.createLeftBox(), this.createRightBox()]
    );
  }
};
export default BaseTransferGrid;
