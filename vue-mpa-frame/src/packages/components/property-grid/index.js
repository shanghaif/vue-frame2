/**
 * @desc 属性 grid
 */
import { apply } from '../helper/util.js';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import _isBoolean from 'lodash/isBoolean';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _assign from 'lodash/assign';
import _set from 'lodash/set';
import _isNil from 'lodash/isNil';
const propertyGrid = {
  name: 'BasePropertyGrid',
  inheritAttrs: false,
  props: {
    labelAlign: { type: String, default: 'left' },
    width: { type: [String, Number], default: '100%' },
    labelField: { type: String, default: 'label' },
    valueField: { type: String, default: 'value' },
    // 数据集对象
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 一个可选添加的CSS样式类，加入到组件的容器上
    ctCls: {
      type: String
    },
    // table 原生属性
    tableAttributes: {
      type: Object,
      default() {
        return {};
      }
    },
    // 列对应的组件配置
    customEditors: {
      type: Object
    },
    // 校验规则
    rules: {
      type: Object
    },
    // 一次是否只编辑一个列
    isOnlyColumnEdit: {
      type: Boolean,
      default: false
    },
    // 校验信息是否单行展示
    inlineMessage: {
      type: Boolean,
      default: false
    },
    // 设定列的宽度
    nameColumnWidth: {
      type: String
    }
  },
  watch: {
    tableData: {
      handler: function(val, oldVal) {
        if (!_isEmpty(val)) {
          for (let i = 0, len = this.tableData.length; i < len; i++) {
            const item = this.tableData[i];
            if (!_has(item, 'edit')) {
              this.$set(item, 'edit', false); // 普通行元素-非编辑模式
            }
            if (!_isNil(this.rules)) {
              this.$set(this.model, item.name, item.value); // form.model
            }
            this.$set(this.bbb, item.name, item.value); // 响应式值
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      model: {},
      bbb: {}
    };
  },
  created() {},
  methods: {
    /**
     * @desc 打开编辑模式
     */
    openEdit() {
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        this.tableData[i].edit = true;
      }
    },
    /**
     * @desc 取消编辑模式
     */
    cancelEdit() {
      for (let i = 0, len = this.tableData.length; i < len; i++) {
        this.tableData[i].edit = false;
      }
    },
    /**
     * @desc 获取表单
     */
    getForm() {
      return this.$refs[`${this._uid}-ruleForm`];
    },
    /**
     * @desc 校验
     * @param {Function} callback - 校验的回调函数
     */
    validate(callback) {
      if (!_isNil(this.rules)) {
        return this.getForm().validate(callback);
      }
    },
    /**
     * @desc 转换字典数据
     */
    filter2DictValue(props) {
      const dict = _find(
        this.$dict.get(_get(this.customEditors, props.row.name + '.filter')),
        item => {
          return (
            item.paramValue === props.row[this.valueField] ||
            item.paramValue === `${props.row[this.valueField]}`
          );
        }
      );
      if (!_isNil(dict)) {
        return dict.paramDesc;
      }
    },
    /**
     * @desc el-input
     */
    createInput(data) {
      const h = this.$createElement;
      return h(
        'el-input',
        {
          attrs: { placeholder: '请输入内容' },
          props: {
            value: !_isNil(this.rules)
              ? _get(this.model, data.row.name)
              : data.row[this.valueField],
            clearable: true
          },
          on: {
            input: value => {
              data.row[this.valueField] = value;
              if (!_isNil(this.rules)) {
                _set(this.model, data.row.name, value);
              }
              if (_has(this.bbb, data.row.name)) {
                _set(this.bbb, data.row.name, value);
              }
              this.$emit('propertyChange', value);
            }
          }
        },
        []
      );
    },
    /**
     * @desc 插件boolean类型的select下拉只有 true和false两个
     */
    createBooleanSelect(data) {
      const h = this.$createElement;
      const options = [
        { value: true, label: 'true' },
        { value: false, label: 'false' }
      ];
      const vNodes = [];
      for (let i = 0, len = options.length; i < len; i++) {
        const item = options[i];
        vNodes.push(
          h(
            'el-option',
            {
              props: { key: item.value, label: item.label, value: item.value }
            },
            []
          )
        );
      }
      return h(
        'el-select',
        {
          attrs: { placeholder: '请选择' },
          props: {
            value: !_isNil(this.rules)
              ? _get(this.model, data.row.name)
              : data.row[this.valueField]
          },
          on: {
            input: val => {
              data.row[this.valueField] = val;
              if (!_isNil(this.rules)) {
                _set(this.model, data.row.name, val);
              }
              if (_has(this.bbb, data.row.name)) {
                _set(this.bbb, data.row.name, val);
              }
              this.$emit('propertyChange', val);
            }
          }
        },
        vNodes
      );
    },
    /**
     * @desc 创建动态组件
     */
    createComponent(columnComponent, data) {
      const h = this.$createElement;
      return h(
        columnComponent.el,
        {
          attrs: _omit(columnComponent, ['el']),
          props: _assign(
            {
              value: !_isNil(this.rules)
                ? _get(this.model, data.row.name)
                : data.row[this.valueField],
              selectTreeValue: !_isNil(this.rules)
                ? _get(this.model, data.row.name)
                : data.row[this.valueField]
            },
            _omit(columnComponent, ['el'])
          ),
          on: {
            input: value => {
              data.row[this.valueField] = value;
              if (!_isNil(this.rules)) {
                _set(this.model, data.row.name, value);
              }
              if (_has(this.bbb, data.row.name)) {
                _set(this.bbb, data.row.name, value);
              }
              this.$emit('propertyChange', value); // 当属性改变之后触发的事件
            },
            selectChange: value => {
              data.row[this.valueField] = value;
              if (!_isNil(this.rules)) {
                _set(this.model, data.row.name, value);
              }
              if (_has(this.bbb, data.row.name)) {
                _set(this.bbb, data.row.name, value);
              }
              this.$emit('propertyChange', value);
            },
            selectTreeChange: value => {
              data.row[this.valueField] = value;
              if (!_isNil(this.rules)) {
                _set(this.model, data.row.name, value);
              }
              if (_has(this.bbb, data.row.name)) {
                _set(this.bbb, data.row.name, value);
              }
              this.$emit('propertyChange', value);
            }
          }
        },
        []
      );
    },
    /**
     * @desc 创建 el-table
     */
    createTable() {
      const h = this.$createElement;
      const nameProps = {
        prop: this.labelField,
        label: '名称',
        align: this.labelAlign
      };
      if (!_isNil(this.nameColumnWidth)) {
        nameProps.width = this.nameColumnWidth;
      }
      return h(
        'el-table',
        {
          class: {
            'base-property-grid': true,
            [this.ctCls]: !_isNil(this.ctCls)
          },
          style: {
            width: _isString(this.width) ? this.width : `${this.width}px`
          },
          props: apply({ data: this.tableData }, this.tableAttributes),
          on: {
            'cell-click': (row, column, cell, event) => {
              for (let i = 0, len = this.tableData.length; i < len; i++) {
                if (
                  this.tableData[i].edit &&
                  this.tableData[i].name !== row.name
                ) {
                  this.tableData[i].edit = false;
                }
              }
            },
            'cell-dblclick': (row, column, cell, event) => {
              // 设置为编辑模式
              if (this.isOnlyColumnEdit) {
                for (let i = 0, len = this.tableData.length; i < len; i++) {
                  this.tableData[i].edit && (this.tableData[i].edit = false);
                }
                this.$nextTick(() => {
                  row.edit = true;
                  this.$nextTick(() => {
                    this.$emit('afterEdit', JSON.parse(JSON.stringify(row))); // 当一个单元格被编辑后触发
                  });
                });
              } else {
                row.edit = true;
                this.$nextTick(() => {
                  this.$emit('afterEdit', JSON.parse(JSON.stringify(row)));
                });
              }
            }
          }
        },
        [
          h(
            'el-table-column',
            {
              props: nameProps
            },
            []
          ),
          h(
            'el-table-column',
            {
              props: { prop: this.valueField, label: '值' },
              scopedSlots: {
                default: props => {
                  const value = props.row[this.valueField];
                  if (!props.row.edit) {
                    if (
                      !_isNil(this.customEditors) &&
                      _has(this.customEditors, props.row.name)
                    ) {
                      if (
                        _has(this.customEditors, props.row.name + '.asyncLoad')
                      ) {
                        // 异步转换-只支持 Promise 可以转换值
                        this.customEditors[props.row.name]
                          .asyncLoad(props)
                          .then(v => {
                            this.$set(this.bbb, props.row.name, v);
                          });
                        return this.bbb[props.row.name];
                      }
                      if (
                        _has(this.customEditors, props.row.name + '.filter')
                      ) {
                        if (_has(this.$scopedSlots, props.row.name)) {
                          return this.$scopedSlots[props.row.name](props);
                        }
                        return this.filter2DictValue(props);
                      }
                    }
                    if (_has(this.$scopedSlots, props.row.name)) {
                      return this.$scopedSlots[props.row.name](props);
                    }
                    return value;
                  } else {
                    let node = this.createInput(props);
                    if (
                      _has(props, 'row.name') &&
                      !_isNil(this.customEditors)
                    ) {
                      const name = props.row.name;
                      const columnComponent = _get(this.customEditors, name);
                      if (!_isNil(columnComponent)) {
                        node = this.createComponent(columnComponent, props);
                      }
                    }
                    if (_isBoolean(value)) {
                      node = this.createBooleanSelect(props);
                    }
                    if (_isNil(this.rules)) {
                      return node;
                    }
                    return h(
                      'el-form-item',
                      { props: { prop: props.row.name } },
                      [node]
                    );
                  }
                }
              }
            },
            []
          )
        ]
      );
    }
  },
  render(h) {
    if (_isNil(this.rules)) {
      return this.createTable();
    }
    return h(
      'el-form',
      {
        class: {
          'base-property-grid': true,
          [this.ctCls]: !_isNil(this.ctCls),
          'base-property-grid_form': !!this.inlineMessage
        },
        ref: `${this._uid}-ruleForm`,
        props: { model: this.model, rules: this.rules }
      },
      [this.createTable()]
    );
  }
};
export default propertyGrid;
