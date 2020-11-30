/* eslint-disable no-unused-vars */
/**
 * @desc Select 下拉 grid 选择器
 */
import _assign from 'lodash/assign';
import _includes from 'lodash/includes';

const BaseSelectGrid = {
  name: 'BaseSelectGrid',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'selectGridChange'
  },
  props: {
    // 输入框宽度
    width: {
      type: String,
      default: '160px'
    },
    // grid 面板宽度
    gridWidth: {
      type: String,
      default: '470px'
    },
    emptyText: {
      type: String,
      default: '请选择'
    },
    api: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [String, Array],
      default() {
        return [];
      }
    },
    // 数据过滤函数
    loadFilter: {
      type: Function
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 默认要勾选tree的节点keys 必须是唯一值id的value
    // 适用于数据源由外部传入，如果是远程获取必须在数据中增加'check'字段标明是否选中
    defaultCheckedKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    size: {
      type: String,
      default: 'medium'
    },
    // 多选时将选项合并为一段文字
    collapseTags: {
      type: Boolean,
      default: true
    },
    // Select 组件头部内容
    prefixLabel: String,
    // 显示字段 可通过props修改
    displayField: {
      type: String,
      default: 'name'
    },
    // 真实值
    valueField: {
      type: String,
      default: 'id'
    },
    // 外部事件扩展 只有 'change' 选中值发生改变事件
    listeners: {
      type: Object,
      default() {
        return {};
      }
    },
    ctStyle: {
      type: Object
    },
    ctCls: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    isRender: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.popoverOffsetTop = 0; // 下拉面板的 offsetTop 偏差值
    this.selectInputHeight = 0; // select 控件对应的 input 框的高度
    return {
      gridUserRef: `${this._uid}-selectGrid`,
      elSelectRef: `${this._uid}-base-select-grid-ref`,
      popoverVisible: false,
      // 本地数据
      curSelectNodeList: [],
      curSelectLabelList: [],
      curSelectValueList: [], // 复选
      curSelectNode: null,
      curSelectLabel: '', // 单选
      curSelectValue: '',
      curDefaultCheckedKeys: [...this.defaultCheckedKeys],
      treeValue: [],
      options: [] // [{ value: '', label: '' }]
    };
  },
  methods: {
    /**
     * @desc 手动打开tree下拉面板
     */
    handOpenTree() {
      setTimeout(() => {
        this.popoverVisible = true;
      }, 0);
    },
    /**
     * @desc 创建 el-popover
     */
    createPopover() {
      const vNode = [];
      const h = this.$createElement;
      vNode.push(
        h(
          'el-popover',
          {
            ref: `${this._uid}-base-select-tree-popover`,
            props: {
              popperClass: 'base-el-popover',
              placement: 'bottom',
              // title: '标题',
              width: this.gridWidth,
              trigger: 'click',
              value: this.popoverVisible
              // content: 'hello'
            },
            on: {
              input: val => {
                this.popoverVisible = val;
              }
            }
          },
          [
            this.createGrid(),
            h(
              'div',
              { slot: 'reference', style: { height: '0px' }, ref: 'bbb' },
              // 'click 激活'
              []
            )
          ]
        )
      );
      return vNode;
    },
    /**
     * @desc 创建 el-tree 节点
     */
    createSelect() {
      const h = this.$createElement;
      let prefixLabelVNode = h();
      // Select 组件头部内容
      if (this.prefixLabel) {
        prefixLabelVNode = h(
          'span',
          { style: { lineHeight: '32px' }, slot: 'prefix' },
          this.prefixLabel
        );
      }
      const vNode = h(
        'el-select',
        {
          ref: this.elSelectRef,
          style: {
            width: `${this.width}px` // 文本框控件宽度
          },
          attrs: {
            id: this.$attrs.id,
            autofocus: this.$attrs.autofocus,
            placeholder: this.$attrs.placeholder
          },
          props: _assign(
            {},
            {
              value: this.multiple
                ? this.curSelectValueList
                : this.curSelectValue,
              clearable: true, // 有清除按钮
              multiple: this.multiple, // 设置多选，value对应为数组
              'collapse-tags': true // 合并多选
            },
            this.$attrs
          ),
          on: {
            'hook:mounted': () => {
              this.selectInputHeight = this.$refs[this.elSelectRef].$el.offsetHeight; // input 框的高度
            },
            clear: () => {
              this.clear();
              this.$refs[this.gridUserRef].clearChecked();
              this.$emit('selectGridChange', this.multiple ? [] : '');
              this.change([]);
              this.$emit('clear', this.multiple ? [] : '');
            },
            'remove-tag': tag => {
              const index = _findIndex(
                this.curSelectValueList,
                value => value === tag
              );
              const optionIndex = _findIndex(
                this.options,
                item => item[this.valueField] === tag
              );
              if (index !== -1) {
                this.curSelectNodeList.splice(index, 1);
                this.curSelectLabelList.splice(index, 1);
                this.curSelectValueList.splice(index, 1);
              }
              if (optionIndex !== -1) {
                this.options.splice(optionIndex, 1);
              }
              this.$emit('selectGridChange', this.curSelectValueList);
              this.change(this.curSelectNodeList);
              this.$refs[this.gridUserRef].setCheckedKeys(
                this.curSelectValueList
              );
              this.$emit('remove-tag', this.multiple ? [] : '');
            }
          },
          nativeOn: {
            click: event => {
              if (
                !_has(this.$attrs, 'disabled') ||
                (_has(this.$attrs, 'disabled') &&
                  this.$attrs.disabled === false)
              ) {
                this.$refs[this.elSelectRef].blur();
                this.$refs.bbb.click(); // 如果是 el-button ，那么自动触发 click 事件 `this.$refs.bbb.$el.click();`
                event.stopPropagation();
                event.preventDefault();
                return false;
              }
            }
          }
        },
        [
          prefixLabelVNode,
          // this.createOptions(),
          h(
            'div',
            {
              class: 'base-select-tree-down-empty',
              slot: 'empty',
              style: { display: 'none' }
            },
            []
          )
        ]
      );
      return vNode;
    },
    /**
     * @desc 创建下拉 grid 控件
     */
    createGrid() {
      const h = this.$createElement;
      const that = this;
      return h('base-grid', {
        class: 'base-grid-panel-content-cls',
        ref: this.gridUserRef,
        attrs: {},
        props: {
          api: this.api,
          // 初始化查询参数
          queryParams: this.queryParams,
          columns: this.columns,
          selectMode: !!this.multiple,
          isReloadGrid: true,
          isSelectedFirstRow: false,
          loadFilter: this.loadFilter,
          tableAttributes: {
            size: 'mini',
            border: true
          },
          paginationAttributes: {
            layout: 'prev, pager, next, ->, total',
            pageSize: 8,
            pageSizes: [8, 10, 15, 20]
          }
        },
        on: {
          'row-click': (row, column, event) => {
            // 单选，没有复选框
            if (!this.multiple) {
              this.curSelectValue = row[this.displayField];
              this.$emit('comboGridChange', row[this.valueField]);
            }
            event.stopPropagation(); // js 阻止事件冒泡
          },
          select: (selection, row) => {

          },
          'select-all': selection => {

          },
          onLoadSuccess: this.afterDataLoadHandler
        }
      }, []);
    },
    /**
     * @desc 创建 el-option 节点
     */
    createOptions() {
      const h = this.$createElement;
      const vNode = this.options.map((option, index) => {
        return h('el-option', {
          style: {
            /* width: `${this.treeWidth}px`,
            height: 'auto',
            'max-height': `${this.treeHeight}px`,
            'background-color': this.backgroundColor,
            padding: '0px',
            overflow: 'auto', */
            display: 'absolute',
            top: '0px',
            left: '0px',
            height: '0px',
            'z-index': '-100'
            // display: 'none'
          },
          props: {
            key: option[this.valueField],
            label: option[this.displayField],
            value: option[this.valueField]
          },
          on: {
            'hook:mounted': () => {}
          }
        });
      });
      return vNode;
    },
    afterDataLoadHandler() {
      // 翻页时如果当前页有要选中的行那么设置选中效果
      setTimeout(() => {
        const selectRows = [];
        for (let i = 0, length = this.value.length; i < length; i++) {
          selectRows.push({ field: this.valueField, value: this.value[i] });
        }
        this.$refs[this.gridUserRef].selectRows(selectRows);
      }, 0);
    },
    /**
     * @desc 获取 grid 对象
     */
    getGrid() {
      return this.$refs[this.gridUserRef];
    },
    /**
     * @desc 清空
     */
    clear: function () {
      this.curSelectNodeList = [];
      this.curSelectLabelList = [];
      this.curSelectValueList = [];
      this.curSelectNode = null;
      this.curSelectLabel = '';
      this.curSelectValue = '';
      this.curDefaultCheckedKeys = [];
      this.treeValue = [];
      this.options = [];
    },
    /**
     * @desc 自定义change事件
     * @param {Array|String} val
     */
    change(val) {
      'change' in this.listeners && this.listeners.change(val);
    }
  },
  render(h) {
    return h(
      'div',
      {
        ref: `${this._uid}-base-grid-panel`,
        style: { width: `${this.width}px` },
        class: { 'base-select-grid': true, [this.ctCls]: this.ctCls }
      },
      [] // this.createSelect(), this.createPopover()
    );
  }
};
export default BaseSelectGrid;
