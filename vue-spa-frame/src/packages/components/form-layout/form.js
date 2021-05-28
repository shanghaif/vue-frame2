/**
 * @desc form 表单组件，默认 table 布局
 */
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _join from 'lodash/join';
import formLayout from './form.vue';

const BaseForm = {
  name: 'BaseForm',
  inheritAttrs: false,
  provide() {
    return {
      getBaseForm: this
    };
  },
  props: {
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否显示label后面的：符号
    colon: {
      type: Boolean,
      default: false
    },
    // 一行分几列
    columns: {
      type: Number,
      default: 2
    },
    // 表单详情配置
    detail: {
      type: Array,
      default() {
        return [];
      }
    },
    // 可选添加的CSS样式类，添加到布局
    ctCls: {
      type: String
    },
    // 错误提示信息是否和输入组件平级展示，不能和 inline-message: true 一起使用两者是冲突的
    rowErrorMessage: {
      type: Boolean,
      default: false
    },
    // 列的背景色
    colBackgroundColor: {
      type: String
    },
    // label的背景色
    labelBackgroundColor: {
      type: String
    },
    /**
     * @desc 列的高度 px
     */
    colHeight: {
      type: Number
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
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * @desc 任一表单项被校验后触发
     * @event FastForm#_validateEvent
     * @param {String} validatePropName='' - 被校验的表单项 prop 值
     * @param {Boolean} result=false - 校验是否通过
     * @param {String} message=null - 错误消息（如果存在）
     */
    _validateEvent(validatePropName = '', result = false, message = null) {
      this.$emit('validate', validatePropName, result, message);
    },
    /**
     * @desc 对整个表单进行校验的方法
     * @method
     * @param {function} callback=function(){} - 验证成功回调函数
     * @param {function} failCallback=function(){} - 失败回调函数
     */
    validate(callback = function() {}, failCallback = function() {}) {
      this.$refs[`${this._uid}-el-form-ref`].validate(valid => {
        if (valid) {
          // true 验证成功
          callback();
        } else {
          // false 失败
          failCallback();
          return false;
        }
      });
    },
    /**
     * @desc 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     * @method
     */
    resetFields() {
      this.$refs[`${this._uid}-el-form-ref`].resetFields();
    },
    /**
     * @desc 移除表单项的校验结果
     * @method
     * @param {array} validateProps=[] - 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     */
    clearValidate(validateProps = []) {
      this.$refs[`${this._uid}-el-form-ref`].clearValidate(validateProps);
    },
    /**
     * @desc 对部分表单字段进行校验的方法
     * @method
     * @param {array} validateProps=[] - 传入待验证的表单项的 prop 属性或者 prop 组成的数组
     * @param {function} callback=function(){} - 回调函数
     */
    validateField(validateProps = [], callback = function() {}) {
      if (_isEmpty(validateProps)) {
        return;
      }
      this.$refs[`${this._uid}-el-form-ref`].validateField(
        validateProps,
        callback
      );
    },
    /**
     * @desc 获取表单对象
     * @method
     * @return {Object} - el-form 控件表单对象
     */
    getForm() {
      return this.$refs[`${this._uid}-el-form-ref`];
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = {};
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    const mClass = ['base-el-form'];
    if (!_isNil(this.ctCls)) {
      mClass.push(this.ctCls);
    }
    if (this.rowErrorMessage) {
      mClass.push('base-row_error_message');
    }
    return h(
      'el-form',
      {
        ref: `${this._uid}-el-form-ref`,
        style,
        attrs: {
          id: this.$attrs.id
        },
        class: _join(mClass, ' '),
        props: this.$attrs,
        on: {
          validate: this._validateEvent
        }
      },
      [
        h(formLayout, {
          props: {
            colon: this.colon,
            columns: this.columns,
            border: this.border,
            detail: this.detail,
            model: this.$attrs.model,
            rowErrorMessage: this.rowErrorMessage,
            colBackgroundColor: this.colBackgroundColor,
            labelBackgroundColor: this.labelBackgroundColor,
            colHeight: this.colHeight
          }
        })
      ]
    );
  }
};
export default BaseForm;
