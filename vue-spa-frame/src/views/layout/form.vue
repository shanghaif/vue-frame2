<template>
  <div :class="$style.formlayoutBox">
    <div class="mb-20">
      <button @click="doTestResponsiveMode">
        测试响应式
      </button>
      &nbsp;&nbsp;
      <button @click="getFormValues">
        获取表单值
      </button>
      &nbsp;&nbsp;
      <button @click="resetFields">
        重置表单
      </button>
      &nbsp;&nbsp;
      <button @click="clearValidate">
        移除验证项
      </button>
      &nbsp;&nbsp;
      <button @click="validateHandelr">
        表单验证
      </button>
    </div>
    <!-- inline-message 错误提示和控件在一行上显示，如果表单组件设置了 slotNode.error 则需要手动在样式中添加 el-form-item__error--inline -->
    <base-form
      :detail="createDetail()"
      :model="form"
      :columns="3"
      :colon="true"
      :rules="rules"
      :border="true"
      ref="ruleForm"
      label-width="150px"
      label-position="right"
      size="mini"
      :row-error-message="true"
      colBackgroundColor="rgba(243,243,243)"
      labelBackgroundColor="rgba(188,211,249)"
    />
  </div>
</template>

<script>
export default {
  data() {
    this.checkbox = {
      options: [
        { label: '苹果', value: '01' },
        { label: '香蕉', value: '02' },
        { label: '桃子', value: '03' },
        { label: '草莓', value: '04' },
        { label: '木瓜', value: '05' },
        { label: '椰子', value: '06' },
        { label: '柿子', value: '07' },
        { label: '枇杷', value: '08' },
        { label: '橄榄', value: '09' }
      ]
    };
    this.comboBox = {
      options: [
        { label: '面包', value: '01' },
        { label: '大饼', value: '02' },
        { label: '米饭', value: '03' },
        { label: '面条', value: '04' },
        { label: '饺子', value: '05' }
      ]
    };
    // comboBox 多选
    this.multiple = true;
    /**
     * 自定义验证规则
     * 自定义校验 callback 必须被调用
     */
    this.validateNum = (rule, value, callback) => {
      if (value > 10) {
        return callback(new Error('人数不能超过10个'));
      }
      callback();
    };
    return {
      form: {
        name: '',
        address: '金沙湖',
        time: '2021-05-12',
        distance: '1公里',
        fruit: ['02', '01'],
        num: 6,
        goods: ['01', '03', '05'],
        isGo: false,
        remark: `数据大屏dashboard本质上跟H5、Web等在线页面可视化编辑的逻辑是相同的，本质上还是拖拽、控件管理、画布、组件属性管理、预览等等，只是数据大屏强调的更多是数据的可视化，重点在图表通过数据的渲染，下面分享几个开源社区的可视化编辑解决方案，有需求的童鞋可以参考借鉴
作者：树酱
链接：https://juejin.cn/post/6931708519976534029
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`,
        selectTreeValue: [10, 6, 3, 2],
        selectGridValue: ['1-2', '1-3', '1-4', '2-2']
      },
      rules: {
        address: [{ required: true, message: '请输入地点', trigger: 'blur' }],
        num: [{ validator: this.validateNum, trigger: 'change' }]
      }
    };
  },
  mounted() {},
  methods: {
    createDetail() {
      // name 必须要唯一
      return [
        {
          span: 1,
          name: 'address',
          label: '地址',
          el: 'el-input',
          placeholder: '地址',
          clearable: true,
          disabled: false
        },
        {
          span: 1,
          name: 'name',
          label: '活动',
          labelHtml: '<em>活动</em>',
          el: 'el-input',
          placeholder: '活动',
          clearable: true,
          inlineMessage: true,
          rules: [{ required: true, message: '请输入活动', trigger: 'blur' }],
          slotNode: {
            /**
             * @desc 自定义表单校验信息的显示方式
             * @param {Object} h - el-form-item 控件的 render 渲染函数对象
             * @param {String} error - 错误提示 比如：`请输入活动`
             * @returns {Object} - render 函数创建的虚拟节点
             */
            // el-form-item__error--inline 和控件在一行上显示错误提示，这里自定义的错误只设置 inlineMessage: true 是不能满足错误提示一行上显示的还需要手动添加该样式
            error: function(h, error) {
              return h('div', {
                class: 'el-form-item__error el-form-item__error--inline',
                // class: 'el-form-item__error',
                domProps: {
                  innerHTML: `<span style="color: #5B8FF9;">${error}</span>`
                }
              });
            }
          }
        },
        {
          span: 1,
          name: 'time',
          label: '时间',
          el: 'el-date-picker',
          placeholder: '时间',
          itemCtCls: this.$style.timeFormItem
        },
        {
          span: 1,
          name: 'distance',
          label: '路程',
          el: 'el-input',
          placeholder: '路程'
        },
        {
          span: 1,
          name: 'num',
          el: 'el-input-number',
          label: '人数',
          min: 0
        },
        {
          span: 1,
          name: 'isGo',
          el: 'el-switch',
          label: '出发',
          itemCtCls: this.$style.isGoFormItem,
          listeners: {
            change: val => {
              console.log('switch', val);
            }
          }
        },
        {
          span: 2,
          name: 'remark',
          label: '描述',
          el: 'el-input',
          placeholder: '请输入描述信息',
          type: 'textarea',
          resize: 'none',
          itemCtCls: this.$style.isRemarkFormItem,
          autosize: { minRows: 2, maxRows: 8 }
        },
        {
          span: 1,
          name: 'goods',
          options: this.comboBox.options,
          multiple: this.multiple,
          collapseTags: true,
          displayField: 'label',
          valueField: 'value',
          el: 'base-select',
          label: '食物',
          width: '100%'
        },
        {
          span: 2,
          label: '下拉tree',
          name: 'selectTreeValue',
          el: 'base-select-tree',
          api: 'common/getTree',
          displayField: 'label',
          lazy: false,
          multiple: true,
          'collapse-tags': false,
          prefixLabel: '--',
          'default-expanded-keys': [10, 6],
          'default-checked-keys': this.form.selectTreeValue,
          disabledNodes: [4],
          isRenderSearchInput: true,
          width: '100%'
        },
        {
          span: 1,
          label: '下拉grid',
          name: 'selectGridValue',
          el: 'base-select-grid',
          api: 'bank/demand-manage/bankProductsList',
          queryParams: { key: '有数' },
          columns: [
            {
              prop: 'productName',
              label: '产品名称'
            },
            { prop: 'fundCodeUserName', label: '企业名称' }
          ],
          searchField: 'productName',
          isShowIndex: true,
          multiple: true,
          displayField: 'productName',
          valueField: 'id',
          'collapse-tags': false,
          width: '100%',
          defaultCheckedRows: [{ id: '2-2', productName: '融信达' }]
        },
        {
          span: 3,
          name: 'fruit',
          options: this.checkbox.options,
          el: 'base-checkbox-group',
          label: '水果',
          displayField: 'label',
          valueField: 'value',
          rules: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个水果',
              trigger: 'change'
            }
          ],
          itemCtCls: this.$style.isFruitFormItem
        },
        {
          span: 2,
          name: 'recording',
          el: 'base-personal',
          label: '简介'
        }
      ];
    },
    doTestResponsiveMode() {
      this.form.name = '公园野餐';
      this.form.time = '2020-03-07';
      this.form.num = 8;
      this.form.fruit = ['03', '02'];
    },
    getFormValues() {
      console.info(this.form);
    },
    resetFields() {
      this.$refs.ruleForm.resetFields();
    },
    clearValidate() {
      this.$refs.ruleForm.clearValidate(['address']);
    },
    validateHandelr() {
      this.$refs.ruleForm.validate(
        function() {
          console.info('验证通过');
        },
        function() {
          console.info('未通过');
        }
      );
    }
  }
};
</script>
<style lang="less" module>
.formlayout-box {
  .full-y;
  // :global .el-row {
  //   > div {
  //     // box-sizing: border-box;
  //     // padding: 5px; /* 设置列内部的边距 */
  //   }

  //   .el-form-item__label {
  //     padding: 10px 0;
  //   }
  // }

  // :global .el-input__inner {
  //   border: 0 solid rgba(220, 223, 230);
  //   border-radius: 0;
  // }
  .time-form-item {
    :global .el-date-editor {
      width: 212px;
    }
  }
  :global .el-input--mini .el-input__inner {
    height: 48px !important;
    // line-height: 48px !important;
  }

  // :global .el-date-editor.el-input,
  // :global .el-date-editor.el-input__inner {
  //   width: 100% !important;
  // }
  .is-go-form-item {
    :global .el-switch {
      margin-top: 15px;
      margin-left: 10px;
    }
  }
  .is-fruit-form-item {
    :global .el-checkbox-group {
      padding: 5px;
    }
  }
  // .is-remark-form-item {
  //   > label:first-child {
  //     line-height: 136px;
  //   }
  // }
}
</style>
