/**
 * @desc Table 表格组件
 */
import _isNil from 'lodash/isNil';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _has from 'lodash/has';
import _omit from 'lodash/omit';
import _assign from 'lodash/assign';
import _set from 'lodash/set';
import _isObject from 'lodash/isObject';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import _toNumber from 'lodash/toNumber';
import _get from 'lodash/get';
import BaseGridTable from '../grid/table/index.js';

const BaseEditGridTable = {
  name: 'BaseEditGridTable',
  extends: BaseGridTable,
  props: {
    /**
     * @desc 操作按钮 `编辑`、`保存`
     */
    buttons: {
      type: Array
    },
    // 是否以行内形式展示校验信息
    inlineMessage: {
      type: Boolean,
      default: true
    },
    // 是否展示验证信息
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.rowRefs = [];
    return {};
  },
  created() {
    if (!_isNil(this.buttons)) {
      this.columns.push({ label: '操作', buttons: this.buttons });
    }
  },
  methods: {
    // 构建列 el-table-column
    tableColumnNodes() {
      // const h = this.$createElement;
      return _map(this.columns, elem => {
        if (_has(elem, 'hide') && elem.hide) {
          return this.$createElement(); // 列的隐藏
        }
        let filterMethod = null;
        let columnKey = null;
        if (_has(elem, 'filters') && _has(elem, 'filter-method')) {
          filterMethod = function(value, row, column) {
            return elem['filter-method'](value, row, column);
          };
        }
        if (_has(elem, 'filters') && !_has(elem, 'filter-method')) {
          filterMethod = function(value, row, column) {
            const property = column.property;
            return row[property] === value;
          };
        }
        if (filterMethod != null) {
          columnKey = elem.name;
        }
        return this.$createElement('el-table-column', {
          props: _assign({}, _omit(elem, ['render', 'renderHeader', 'unit']), {
            'filter-method': filterMethod,
            columnKey: columnKey
          }),
          scopedSlots: {
            default: ({ row, column, $index }) => {
              // 自定义列的内容
              if (_has(elem, 'render')) {
                let columnValue = row[column.property];
                if (_has(elem, 'filter')) {
                  const dict = _find(this.$dict.get(elem.filter), item => {
                    return (
                      item.paramValue === row[column.property] ||
                      item.paramValue === `${row[column.property]}`
                    );
                  });
                  if (dict) {
                    columnValue = `${dict.paramDesc}${_get(elem, 'unit', '')}`;
                  }
                }
                if (_isNil(elem.showValue) || elem.showValue) {
                  if (
                    row.edit &&
                    ((_has(elem, 'edit') && elem.edit === true) ||
                      !_has(elem, 'edit'))
                  ) {
                    return this.createEditNode(elem, row, column, $index); // 响应式更新
                  }
                  return elem.render(
                    this.$createElement,
                    row,
                    column,
                    $index,
                    columnValue
                  );
                } else if (!_isNil(elem.showValue) && !elem.showValue) {
                  // 不显示列的值，但列存在 区别于 hide 属性
                  return undefined;
                }
              } else if (_has(elem, 'slotNode')) {
                if (_isNil(elem.showValue) || elem.showValue) {
                  if (row.edit) {
                    // edit 编辑列
                    // return [elem.slotNode[1].render(this.$createElement, row, column, $index)];
                    const buttons = _map(elem.slotNode, o => {
                      if (
                        (_has(o, 'command') && o.command === 'submit') ||
                        !_has(o, 'command')
                      ) {
                        return o.render(
                          this.$createElement,
                          row,
                          column,
                          $index
                        );
                      }
                    });
                    return _filter(buttons, o => !_isNil(o));
                  } else {
                    // submit 保存列
                    const buttons = _map(elem.slotNode, o => {
                      if (
                        (_has(o, 'command') && o.command === 'edit') ||
                        !_has(o, 'command')
                      ) {
                        return o.render(
                          this.$createElement,
                          row,
                          column,
                          $index
                        );
                      }
                    });
                    return _filter(buttons, o => !_isNil(o));
                    // return elem.slotNode[0].render(this.$createElement, row, column, $index);
                  }
                } else if (!_isNil(elem.showValue) && !elem.showValue) {
                  return undefined;
                }
              } else if (_has(elem, 'buttons')) {
                // 配置项
                if (_isNil(elem.showValue) || elem.showValue) {
                  const buttonNodes = [];
                  let curButtons = elem.buttons;
                  if (row.edit) {
                    curButtons = _filter(elem.buttons, o => {
                      if (
                        (_has(o, 'command') && o.command === 'submit') ||
                        !_has(o, 'command')
                      ) {
                        return o;
                      }
                    });
                  } else {
                    curButtons = _filter(elem.buttons, o => {
                      if (
                        (_has(o, 'command') && o.command === 'edit') ||
                        !_has(o, 'command')
                      ) {
                        return o;
                      }
                    });
                  }
                  for (let i = 0, len = curButtons.length; i < len; i++) {
                    const button = curButtons[i];
                    if (_has(button, 'hide') && button.hide) {
                      continue;
                    }
                    if (_has(button, 'render')) {
                      buttonNodes.push(
                        button.render(this.$createElement, row, column, $index)
                      );
                    } else {
                      let name = _get(button, 'el', 'base-label');
                      if (!_includes(name, 'base')) {
                        name = `base-${name}`;
                      }
                      const node = this.$createElement(name, {
                        attrs: button.props,
                        class: button.class,
                        style: button.style,
                        props: button.props,
                        on: {
                          click: () => {
                            button.on.click(row, column, $index, elem, button);
                          }
                        }
                      });
                      buttonNodes.push(node);
                    }
                  }
                  return buttonNodes;
                } else if (!_isNil(elem.showValue) && !elem.showValue) {
                  return undefined;
                }
              } else {
                if (_has(elem, 'filter')) {
                  const dict = _find(this.$dict.get(elem.filter), item => {
                    return (
                      item.paramValue === row[column.property] ||
                      item.paramValue === `${row[column.property]}`
                    );
                  });
                  if (dict) {
                    if (_isNil(elem.showValue) || elem.showValue) {
                      const text = `${dict.paramDesc}${_get(elem, 'unit', '')}`;
                      if (
                        row.edit &&
                        ((_has(elem, 'edit') && elem.edit === true) ||
                          !_has(elem, 'edit'))
                      ) {
                        return this.createEditNode(elem, row, column, $index); // 响应式更新
                      }
                      return text;
                    } else {
                      return undefined;
                    }
                  }
                }
                if (_isNil(row[column.property])) {
                  return '';
                }
                if (_isNil(elem.showValue) || elem.showValue) {
                  if (
                    row.edit &&
                    ((_has(elem, 'edit') && elem.edit === true) ||
                      !_has(elem, 'edit'))
                  ) {
                    return this.createEditNode(elem, row, column, $index); // 响应式更新
                  }
                  return `${row[column.property]}${_get(elem, 'unit', '')}`;
                } else if (!_isNil(elem.showValue) && !elem.showValue) {
                  // 不显示列的值，但列存在 区别于 hide 属性
                  return undefined;
                }
              }
            },
            header: ({ column, $index }) => {
              // 自定义表头的内容 不能和属性 `render-header`一起使用否则起效的是`render-header`
              if (_has(elem, 'renderHeader')) {
                return elem.renderHeader(this.$createElement, column, $index);
              } else {
                return column.label;
              }
            }
          }
        });
      });
    },
    /**
     * @desc 创建编辑的节点对象
     */
    createEditNode(elem, row, column, $index) {
      const h = this.$createElement;
      if (!_isObject(elem.component)) {
        // 不是对象形式
        if (_has(elem, 'rules')) {
          const refVal = `${column.property}-${row[column.property]}-${$index}`;
          !_has(row, 'rowRefs') && (row.rowRefs = []);
          !_includes(row.rowRefs, refVal) && row.rowRefs.push(refVal);
          return h(
            'el-form',
            {
              class: 'row-edit-column-form_box',
              props: {
                'status-icon': true,
                'inline-message': true,
                'hide-required-asterisk': true,
                'show-message': this.showMessage ? this.inlineMessage : false,
                model: {
                  [column.property]: row[column.property]
                }
              },
              ref: refVal
            },
            [
              h(
                'el-form-item',
                { props: { prop: column.property, rules: elem.rules } },
                [
                  this.$createElement(elem.component, {
                    props: { value: row[column.property] },
                    on: {
                      input: value => {
                        const oNumberRule = _find(elem.rules, o => {
                          if (_has(o, 'type') && o.type === 'number') {
                            return o; // 数字类型
                          }
                        });
                        if (!_isNil(oNumberRule)) {
                          value = /^\d{1,}$/.test(value)
                            ? _toNumber(value)
                            : value;
                        }
                        _set(row, column.property, value); // 修改的数据
                      }
                    }
                  })
                ]
              )
            ]
          );
        } else {
          return this.$createElement(elem.component, {
            props: { value: row[column.property] },
            on: {
              input: value => {
                // _set(row, `original.${column.property}`, row[column.property]); // 原来的数据
                // 这里要转换下是不是数字类型，是的话转成数字类型
                /* if (/^\d{1,}$/.test(value)) {
                  value = _toNumber(value);
                } */
                _set(row, column.property, value); // 修改的数据
              }
            }
          });
        }
      }
      const vNode = this.$createElement(
        elem.component.el,
        {
          props: _assign(
            {
              value: _has(elem, 'component.valueField')
                ? _get(row, elem.component.valueField)
                : _get(row, column.property),
              selectTreeValue: _has(elem, 'component.valueField')
                ? _get(row, elem.component.valueField)
                : _get(row, column.property),
              selectGridValue: _has(elem, 'component.valueField')
                ? [_get(row, elem.component.valueField)]
                : [_get(row, column.property)]
            },
            elem.component.options.props
          ),
          on: {
            // v-model 的实现
            selectChange: value => {
              // _set(row, `original.${column.property}`, row[column.property]); // 原来的数据
              _set(row, column.property, value); // base-select 修改的数据
            },
            input: value => {
              _set(row, column.property, value);
            },
            selectTreeChange: value => {
              _set(row, column.property, value); // base-select-tree
            },
            selectGridChange: value => {
              _set(row, column.property, value); // base-select-grid
            },
            ...elem.component.options.on
          },
          ..._omit(elem.component.options, ['props', 'on'])
        },
        []
      );
      return vNode;
    },
    /**
     * @desc 加载数据-远端
     * @method
     */
    loadData() {
      if (!this.api) {
        return;
      }
      // this.loadMask();
      !this.loading && (this.loading = true);
      let params = null;
      if (!_isNil(this.pagingParams)) {
        params = _assign(
          {},
          {
            [_get(this.pagingParams, 'pageNum', 'pageNum')]: this.getBaseGrid
              .currentPage,
            [_get(this.pagingParams, 'pageSize', 'pageSize')]: this.getBaseGrid
              .pageSize
          },
          _omit(this.queryParams, ['data', 'headers']),
          _omit(this.curQueryParams, ['data', 'headers'])
        );
      } else {
        params = _assign(
          {},
          {
            [_get(
              this['$base-global-options'],
              'grid.pageNum',
              'pageNum'
            )]: this.getBaseGrid.currentPage,
            [_get(
              this['$base-global-options'],
              'grid.pageSize',
              'pageSize'
            )]: this.getBaseGrid.pageSize
          },
          _omit(this.queryParams, ['data', 'headers']),
          _omit(this.curQueryParams, ['data', 'headers'])
        );
      }
      const data = _get(
        _assign(
          {},
          _pick(this.queryParams, ['data']),
          _pick(this.curQueryParams, ['data'])
        ),
        'data',
        {}
      );
      const headers = _get(
        _assign(
          {},
          _pick(this.queryParams, ['headers']),
          _pick(this.curQueryParams, ['headers'])
        ),
        'headers',
        {}
      );
      this.$api[this.api]({ params, data, headers })
        .then(response => {
          let data = null;
          if (!_isNil(this.pagingParams)) {
            this.getBaseGrid.setTotal(
              _get(response, _get(this.pagingParams, 'total', ''), 0)
            );
            data = _get(response, _get(this.pagingParams, 'data', ''), []);
          } else {
            this.getBaseGrid.setTotal(
              _get(
                response,
                _get(this['$base-global-options'], 'grid.total', ''),
                0
              )
            );
            data = _get(
              response,
              _get(this['$base-global-options'], 'grid.data', ''),
              []
            );
          }
          for (let i = 0, len = data.length; i < len; i++) {
            data.original = {};
            _set(data[i], 'original', _assign({}, data[i]));
            this.$set(data[i], 'edit', false);
          }
          this.tableData = _isNil(this.loadFilter)
            ? data
            : this.loadFilter(data);
        })
        .catch(error => {
          this.getBaseGrid.onLoadError();
          throw new Error(error);
        })
        .finally(() => {
          // this.loading.close();
          this.loading && (this.loading = false);
        });
    },
    /**
     * @desc 加载静态数据
     */
    loadOptions() {
      const response = _isNil(this.loadFilter)
        ? this.options
        : this.loadFilter(this.options);
      let data = null;
      if (!_isNil(this.pagingParams)) {
        this.getBaseGrid.setTotal(
          _get(response, _get(this.pagingParams, 'total', ''), 0)
        );
        data = _get(response, _get(this.pagingParams, 'data', ''), []);
      } else {
        this.getBaseGrid.setTotal(
          _get(
            response,
            _get(this['$base-global-options'], 'grid.total', ''),
            0
          )
        );
        data = _get(
          response,
          _get(this['$base-global-options'], 'grid.data', ''),
          []
        );
      }
      for (let i = 0, len = data.length; i < len; i++) {
        data.original = {};
        _set(data[i], 'original', _assign({}, data[i]));
        this.$set(data[i], 'edit', false);
      }
      this.tableData = data;
    }
  }
};
export default BaseEditGridTable;
