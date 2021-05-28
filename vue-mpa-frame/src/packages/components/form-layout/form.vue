<template>
  <div>
    <el-row
      v-for="(row, index) in rowsData"
      :key="index"
      :gutter="gutter"
      type="flex"
      :class="getRowCls(index)"
      :style="{ 'background-color': colBackgroundColor }"
    >
      <el-col
        v-for="(col, colIndex) in row"
        :key="col.name"
        :span="(baseSpanNum / columns) * col.span"
        :style="{
          'border-right': border
            ? row.length > 1 && row.length - 1 !== colIndex
              ? '1px solid #E0E0E0'
              : false
            : false
        }"
      >
        <el-form-item
          :prop="col.name"
          :label-width="col.labelWidth"
          :required="col.required"
          :rules="col.rules"
          :error="col.error"
          :show-message="col.showMessage"
          :inline-message="col.inlineMessage"
          :size="col.size"
          :class="getCtCls(col.itemCtCls)"
        >
          <template v-slot:label>
            <label
              v-html="col.labelHtml + colonText"
              v-if="col.hasOwnProperty('labelHtml')"
            />
            <label v-html="col.label + colonText" v-else />
          </template>
          <template v-slot:error="{ error }" v-if="_isRenderErrorSlot(col)">
            {{ _renderErrorHtml(col.slotNode.error, error) }}
            <slot />
          </template>
          <component
            :ref="'ref-' + col.name + _uid"
            v-model="model[col.name]"
            :is="getComponent(col.el)"
            v-bind="getComponentProps(col)"
            @hook:mounted="registerEvent(col)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';

export default {
  inject: ['getBaseForm'],
  props: {
    // 是否显示label后面的：符号
    colon: {
      type: Boolean,
      default: false
    },
    // 一行分几列
    columns: {
      type: Number,
      default: 4
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 表单详情配置
    detail: {
      type: Array,
      default() {
        return [];
      }
    },
    // v-model对象数据集合，需要是响应式对象
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * @desc 列的高度
     */
    colHeight: {
      type: Number
    },
    // 错误提示信息是否和输入组件平级展示
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
    }
  },
  data() {
    this.desc = '表单布局，是一种专门用于管理表单中输入字段的布局';
    this.baseSpanNum = 24;
    this.gutter = 0; // 栅格间隔 设置为10会在class为 `el-col el-col-12` 的div上生成style的padding-left和padding-right
    return {};
  },
  computed: {
    colonText() {
      return this.colon ? '：' : '';
    },
    rowsData() {
      const rows = [];
      for (let n = 0, length = this.detail.length; n < length; n++) {
        const row = [this.detail[n]];
        let b = parseInt(this.detail[n].span);
        if (b >= this.columns) {
          // (b > this.columns) && (this.detail[m].span = b - this.columns);
          rows.push(row);
          continue;
        }
        for (let m = n + 1, length = this.detail.length; m < length; m++) {
          b = b + parseInt(this.detail[m].span);
          row.push(this.detail[m]);
          if (b >= this.columns) {
            // (b > this.columns) && (this.detail[m].span = b - this.columns);
            n = m;
            break;
          }
        }
        rows.push(row);
        if (
          row.length === length ||
          row[row.length - 1].name === this.detail[this.detail.length - 1].name
        ) {
          break;
        }
      }
      return rows;
    }
  },
  created() {
    this.$nextTick(() => {
      if (!_isNil(this.labelBackgroundColor)) {
        this.setLabelElementBackgroundColor();
      }
      /* if (!_isNil(this.colHeight)) {
        const rowElements = this.getBaseForm.$children[0].$children[0]
          .$children;
        for (let i = 0, len = rowElements.length; i < len; i++) {
          const rowElement = rowElements[i];
          const colElements = rowElement.$children;
          for (let n = 0, len = colElements.length; n < len; n++) {
            const label = colElements[n].$children[0].$children[0];
            const component = colElements[n].$children[0].$children[1];
            label.$el.style.height = this.colHeight + 'px';
            label.$el.style.lineHeight = this.colHeight + 'px';
            component.$el.children[0].style.height = this.colHeight + 'px';
          }
        }
      } */
    });
  },
  methods: {
    /**
     * @desc 列组件的事件
     */
    registerEvent(colOptions) {
      if (_has(colOptions, 'listeners') && !_isEmpty(colOptions.listeners)) {
        const component = this.$refs['ref-' + colOptions.name + this._uid][0];
        const listeners = colOptions.listeners;
        _forEach(listeners, (value, key) => {
          component.$off(key, value);
          component.$on(key, value);
        });
      }
    },
    /**
     * @desc 判断是否需要渲染-自定义表单校验信息的插槽slot
     * @param {Object} col={} - 表单字段的配置
     * @return {Boolean} - 是否渲染 true渲染，flase不渲染
     */
    _isRenderErrorSlot(col = {}) {
      return !_isNil(_get(col, 'slotNode.error'));
    },
    /**
     * @desc 自定义表单校验信息
     * @param {function} callback=function(){} - 外部传入的回调函数用于返回 render函数生成的节点
     * @param {String} error='' - rules中定义的当前控件的验证 message 信息
     */
    _renderErrorHtml(callback = function() {}, error = '') {
      this.$slots.default = callback(this.$createElement, error);
    },
    /**
     * @desc 获取指定的全局表单控件
     * @param {String} el - form表单控件类型
     * @method
     * @returns {string} - 控件名称
     * @example
     * getComponent('TextInput')
     */
    getComponent(el) {
      return el;
    },
    /**
     * @desc 获取控件的 props 参数
     * @param {Object} col - 表单详情列信息
     * @method
     * @returns {Object} - props参数对象
     * @example
     * { span: 2, name: 'part', value: this.val, label: '活动', type: 'TextInput', emptyText: '活动' }
     */
    getComponentProps(col) {
      return _omit(col, [
        'value',
        'span',
        'name',
        'label',
        'labelHtml',
        'rules',
        'labelWidth',
        'required',
        'error',
        'showMessage',
        'inlineMessage',
        'size',
        'show-message',
        'inline-message',
        'itemCtCls'
      ]);
    },
    /**
     * @desc class类名
     */
    getCtCls(cls) {
      const mCls = [cls];
      if (this.rowErrorMessage) {
        mCls.push('item_row-error-message');
      }
      return _join(mCls, ' ');
    },
    /**
     * @desc 获取row的class名称
     */
    getRowCls(index) {
      if (!this.border) {
        return '';
      }
      if (this.rowsData.length - 1 === index) {
        return 'base-form_row-border';
      } else {
        return 'base-form_row-border-no-bottom';
      }
    },
    /**
     * @desc 设置label元素的背景色
     */
    setLabelElementBackgroundColor() {
      const rowElements = this.getBaseForm.$children[0].$children[0].$children;
      for (let i = 0, len = rowElements.length; i < len; i++) {
        const rowElement = rowElements[i];
        const colElements = rowElement.$children;
        // console.log('aaaaaaaa', rowElement.$el);
        // rowElement.$el.style.height = '48px';
        for (let n = 0, len = colElements.length; n < len; n++) {
          const label = colElements[n].$children[0].$children[0];
          label.$el.style.backgroundColor = this.labelBackgroundColor;
          label.$el.style.lineHeight = rowElement.$el.clientHeight + 'px';
        }
      }
    }
  }
};
</script>
