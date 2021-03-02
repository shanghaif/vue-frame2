/**
 * @desc 拖拽grid
 */
import BaseGrid from '../grid/index.js';
import BaseDragGridTable from './table.js';
import BaseGridPagination from '../grid/pagination/index.js';
import BaseGridSearch from '../grid/search/index.js';
import BaseTBar from '../grid/t-bar/index.js';
import Sortable from 'sortablejs'; // 表格排序组件
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';

const BaseDragGrid = {
  name: 'BaseDragGrid',
  extends: BaseGrid,
  model: {
    prop: 'dragValue',
    event: 'dragChange'
  },
  props: {
    // 排序字段-需要值是唯一的
    sortField: {
      type: String,
      default: 'id'
    },
    // 拖动的动画效果时间-毫秒
    animation: {
      type: Number,
      default: 150
    },
    // 是否可拖放排序相当于一个开关
    disabled: {
      type: Boolean,
      default: false
    },
    // 拖动到某一行时对应那行的样式类
    ghostClass: {
      type: String,
      default: 'sortable-ghost'
    },
    // 不需要拖动的列，默认所有列都可以拖动
    ignoreColumns: {
      type: Array,
      default: []
    },
    // 按住行多长时间后才能启用拖动-毫秒
    delay: {
      type: Number,
      default: 0
    }
  },
  watch: {
    disabled(val, oldVal) {
      if (!_isNil(this.sortable)) {
        this.sortable.destroy(); // 销毁
        this.sortable = null;
        setTimeout(() => {
          this.setSort();
        }, 0);
      }
    }
  },
  data() {
    this.oldList = []; // 默认排序
    this.dragEvents = {
      onDragStart: 'onDragStart', // 拖拽开始事件
      onDragEnd: 'onDragEnd' // 拖拽结束事件
    };
    this.list = [];
    this.sortable = null;
    return {
      newList: [] // 最新的排序
    };
  },
  created() {},
  beforeDestroy() {
    if (!_isNil(this.sortable)) {
      this.sortable.destroy(); // 销毁
      this.sortable = null;
    }
  },
  methods: {
    /**
     * @desc 获取默认排序
     */
    getOldSort() {
      return this.oldList;
    },
    /**
     * @desc 在数据加载成功的时候触发
     * @param {Array} table
     * @method
     */
    onLoadSuccess(table) {
      if (_isEmpty(this.oldList)) {
        const data = table;
        this.list = data;
        this.oldList = _map(data, v => _get(v, this.sortField));
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
          this.setSort();
        });
      }
      setTimeout(() => {
        this.$emit(this.events.onLoadSuccess, table);
      }, 0);
    },
    /**
     * @desc 设置排序
     */
    setSort() {
      const el = this.getElTable().$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      if (_isNil(el)) {
        return;
      }
      // http://www.sortablejs.com/options.html
      this.sortable = Sortable.create(el, {
        sort: true, // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
        delay: this.delay, // 按住行多长时间后才能启用拖动-毫秒
        animation: this.animation, // ms, number 单位：ms，定义排序动画的时间
        disabled: this.disabled, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
        ghostClass: this.ghostClass, // Class name for the drop placeholder,
        filter: '.ignore-elements',
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '');
        },
        // 开始拖拽
        onStart: evt => {
          this.$emit(this.dragEvents.onDragStart);
        },
        // 结束拖拽
        onEnd: evt => {
          const replaceRow = this.list[evt.newIndex]; // 拖动后替换的行
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]; // 拖动的行
          this.list.splice(evt.newIndex, 0, targetRow); // 将拖动行插入到替换行的前面

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
          this.$emit(
            this.dragEvents.onDragEnd,
            targetRow,
            replaceRow,
            this.newList
          );
        }
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
          { 'base-drag-grid': true },
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
          BaseDragGridTable,
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
              sortField: this.sortField,
              ignoreColumns: this.ignoreColumns
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

export default BaseDragGrid;
