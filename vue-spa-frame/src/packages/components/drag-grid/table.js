/**
 * @desc Table 表格组件
 */
import BaseGridTable from '../grid/table/index.js';
import _includes from 'lodash/includes';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';

const BaseDragGridTable = {
  name: 'BaseDragGridTable',
  extends: BaseGridTable,
  props: {
    // 排序字段-需要值是唯一的
    sortField: {
      type: String,
      default: 'id'
    },
    // 不需要拖动的列，默认所有列都可以拖动
    ignoreColumns: {
      type: Array,
      default: []
    }
  },
  render(h) {
    return h(
      'el-table',
      {
        ref: `${this._uid}-base-table`,
        class: _get(this.$props, 'ctCls', {}),
        props: _assign(
          {
            border: true,
            'row-key': this.sortField, // 行拖拽组件必须配置 row-key 属性
            'cell-class-name': ({ row, column, rowIndex, columnIndex }) => {
              const fieldName = column.property;
              if (
                !_isNil(fieldName) &&
                !_isEmpty(this.ignoreColumns) &&
                _includes(this.ignoreColumns, fieldName)
              ) {
                return 'ignore-elements';
              }
              if (
                _isNil(fieldName) &&
                !_isEmpty(this.ignoreColumns) &&
                _includes(this.ignoreColumns, column.type)
              ) {
                // 下标列和复选框列
                return 'ignore-elements';
              }
            }
          },
          this.tableAttributes,
          {
            height: _get(this.tableAttributes, 'height', '100%'), // 实现固定表头的表格，数据可滚动
            highlightCurrentRow: this._highlightCurrentRow,
            data: this.tableData
          }
        ),
        on: _assign(
          {},
          _omit(this.getBaseGrid.$listeners, [
            'selection-change',
            'row-dblclick',
            'row-click'
          ]),
          {
            'selection-change': this._selectionChangeEvent,
            'row-dblclick': this._rowDblclickEvent,
            'row-click': this._rowClickEvent
          }
        ),
        directives: [
          {
            name: 'loading',
            value: this.loading
            // 'v-loading': true
          }
        ]
      },
      [
        this.indexColumn(),
        this.multipleSelectNode(),
        this.tableColumnNodes(),
        h('template', { slot: 'append' }, this.appendNode())
      ]
    );
  }
};
export default BaseDragGridTable;
