/**
 * @desc 行编辑 grid
 */
import BaseGrid from '../grid/index.js';
import BaseGridTable from './table.js';
import BaseGridPagination from '../grid/pagination/index.js';
import BaseGridSearch from '../grid/search/index.js';
import BaseTBar from '../grid/t-bar/index.js';
import _keys from 'lodash/keys';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _isEqual from 'lodash/isEqual';
import _includes from 'lodash/includes';
import _isNil from 'lodash/isNil';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';
import _join from 'lodash/join';
import _isEmpty from 'lodash/isEmpty';

const BaseEditGrid = {
  name: 'BaseEditGrid',
  extends: BaseGrid,
  model: {
    prop: 'nestingValue',
    event: 'nestingChange'
  },
  props: {
    /**
     * @desc grid 初始就是编辑模式
     */
    editing: {
      type: Boolean,
      default: false
    },
    /**
     * @desc 操作按钮 `编辑`、`保存`
     */
    buttons: {
      type: Array
    },
    // 是否以行内形式展示校验信息，false 会已提示框形式
    inlineMessage: {
      type: Boolean,
      default: true
    },
    // 是否展示验证信息，false 不展示错误信息（不展示行内形式和弹框形式）
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * @desc 校验编辑行
     * @param {Object} row - 当前行对象
     * @param {Function} callback - 回调函数
     */
    validate(row, callback) {
      // console.log('校验编辑行', row, row.rowRefs, this.columns);
      if (_has(row, 'rowRefs')) {
        const that = this;
        const errorFields = [];
        const validateFns = [];
        for (let i = 0, len = row.rowRefs.length; i < len; i++) {
          const rowRef = row.rowRefs[i];
          if (_isNil(this.getTable().$refs[rowRef])) {
            continue;
          }
          // console.log('校验编辑行', this.getTable().$refs[rowRef]);
          const validateFn = new Promise((resolve, reject) => {
            this.getTable().$refs[rowRef].validate((valid, obj) => {
              if (valid) {
                setTimeout(resolve, 0);
              } else {
                // setTimeout(() => {
                if (this.showMessage && !this.inlineMessage) {
                  // 弹框显示错误
                  errorFields.push(obj);
                  reject(obj);
                } else {
                  reject(new Error(valid));
                }
                // }, 0);
                return valid;
              }
            });
          });
          validateFns.push(validateFn);
        }
        if (this.showMessage && !this.inlineMessage) {
          // 弹框提示
          Promise.any(validateFns)
            .then(function(posts) {
              that.validThenHandel(errorFields, that, callback);
            })
            .catch(function(reasonObj) {
              that.validCatchHandel(errorFields, that, callback);
            });
        }
        if (this.showMessage && this.inlineMessage) {
          // 行内提示
          Promise.all(validateFns)
            .then(function(posts) {
              that.validThenHandel(errorFields, that, callback);
            })
            .catch(function(reasonObj) {
              that.validCatchHandel(errorFields, that, callback);
            });
        }
      }
    },
    /**
     * @desc 重置当前修改的列
     */
    resetRow(row) {
      if (_has(row, 'original')) {
        const originalKeys = _keys(_get(row, 'original', {}));
        for (const key in _omit(row, ['original'])) {
          if (
            _includes(originalKeys, key) &&
            !_isEqual(_get(row, `original.${key}`), _get(row, key))
          ) {
            _set(row, key, _get(row, `original.${key}`));
          }
        }
      }
      return row;
    },
    // 行内提示
    validThenHandel(errorFields, scope, callback) {
      // console.log('...success...', errorFields);
      let b = true;
      if (scope.showMessage && !scope.inlineMessage) {
        b = !!_isEmpty(errorFields);
        if (!_isEmpty(errorFields)) {
          scope.validErrorHandle(errorFields, scope);
        }
        if (!b) {
          callback(b, errorFields);
          return;
        }
      }
      callback(b);
    },
    // 弹框提示
    validCatchHandel(errorFields, scope, callback) {
      // console.log('...fail...', errorFields);
      if (!_isEmpty(errorFields)) {
        if (scope.showMessage && !scope.inlineMessage) {
          // 弹框显示错误
          scope.validErrorHandle(errorFields, scope);
        }
      }
      const b = false;
      callback(b, errorFields);
    },
    // 错误验证提示-弹框
    validErrorHandle(errorFields, scope) {
      const errorMessage = [];
      for (let i = 0, len = errorFields.length; i < len; i++) {
        _forEach(errorFields[i], function(value, key) {
          const column = _find(scope.columns, o => o.prop === key);
          errorMessage.push(`${column.label}：${value[0].message}`);
        });
      }
      scope.$message({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: _join(errorMessage, ' <br/>')
      });
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
      'base-border-layout',
      {
        ref: `${this._uid}-base-grid`,
        style,
        class: _assign(
          { 'base-edit-grid': true },
          _get(this.$props, 'ctCls', {})
        ),
        props: {
          northHeight: 'auto',
          westWidth: '0px',
          eastWidth: '0px',
          southHeight: this.isShowPagination ? '36px' : '0px',
          isPadding: false
        }
      },
      [
        h(
          'base-border-layout',
          {
            slot: 'north',
            props: {
              northHeight: 'auto',
              southHeight: 'auto',
              isPadding: false
            }
          },
          [
            h(
              BaseGridSearch,
              {
                slot: 'north',
                scopedSlots: {
                  searchScope: () => {
                    if (_has(this.$scopedSlots, 'searchScope')) {
                      return this.$scopedSlots.searchScope(this.currentRow);
                    }
                    return h();
                  }
                }
              },
              [h('template', { slot: 'default' }, this.$slots.search)]
            ),
            h(
              BaseTBar,
              {
                slot: 'south',
                scopedSlots: {
                  tBarScope: () => {
                    if (_has(this.$scopedSlots, 'tBarScope')) {
                      return this.$scopedSlots.tBarScope(this.currentRow);
                    }
                    return h();
                  }
                }
              },
              [h('template', { slot: 'default' }, this.$slots.tBar)]
            )
          ]
        ),
        h(
          BaseGridTable,
          {
            slot: 'center',
            props: {
              api: this.api,
              queryParams: this.queryParams,
              columns: this.columns,
              isReloadGrid: this.isReloadGrid,
              isSelectedFirstRow: this.isSelectedFirstRow,
              isShowIndex: this.isShowIndex,
              indexLabel: this.indexLabel,
              selectMode: this.selectMode,
              loadFilter: this.loadFilter,
              slotNode: this.tableAttributes.slotNode,
              tableAttributes: this.tableAttributes,
              options: this.options,
              pagingParams: this.pagingParams,
              buttons: this.buttons,
              isFixedIndex: this.isFixedIndex,
              isFixedSelection: this.isFixedSelection,
              columnTool: this.columnTool,
              inlineMessage: this.inlineMessage,
              showMessage: this.showMessage
            }
          },
          []
        ),
        h(
          BaseGridPagination,
          {
            slot: 'south',
            props: {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
              pagingItems: this.paginationAttributes.pagingItems,
              paginationAttributes: _omit(this.paginationAttributes, [
                'currentPage',
                'pageSize',
                'isShowPagination',
                'pagingItems'
              ]),
              total: this.total,
              isShowPagination: this.isShowPagination
            }
          },
          []
        )
      ]
    );
  }
};
export default BaseEditGrid;
