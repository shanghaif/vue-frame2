<template>
  <base-fit-layout :class="$style.box">
    <div class="mb-10">双击列即可进行编辑</div>
    <div class="mb-20">
      <el-button type="primary" icon="el-icon-refresh-right" @click="onReset"
        >只读</el-button
      >
      <el-button type="primary" icon="el-icon-edit" @click="onOpen"
        >编辑</el-button
      >
      <el-button type="primary" icon="el-icon-folder-checked" @click="onSave"
        >保存</el-button
      >
    </div>
    <base-property-grid
      ref="grid-ref"
      :tableData="tableData"
      :width="540"
      ct-cls="my-property-grid"
      :tableAttributes="tableAttributes"
      :customEditors="customEditors"
      :rules="rules"
      :isOnlyColumnEdit="true"
      @propertyChange="onPropertyChange"
      @afterEdit="onAfterEdit"
      :inlineMessage="true"
      nameColumnWidth="160px"
    >
      <template v-slot:sex="slotProps">
        <i class="el-icon-male" style="color: blue;"></i
        >{{ slotProps.row.value | SEX_TYPE }}
      </template>
    </base-property-grid>
    <div class="mt-10">{{ curTableData }}</div>
  </base-fit-layout>
</template>

<script>
export default {
  computed: {
    curTableData() {
      return _map(this.tableData, v => v.value);
    }
  },
  data() {
    this.customEditors = {
      birthday: {
        format: 'yyyy 年 MM 月 dd 日',
        'value-format': 'yyyy-MM-dd',
        type: 'date',
        el: 'el-date-picker'
      },
      sex: {
        el: 'base-select',
        filter: 'SEX_TYPE', // 过滤器
        options: [
          { name: '女', id: 0 },
          { name: '男', id: 1 }
        ]
      },
      remark: {
        el: 'el-input',
        type: 'textarea',
        autosize: { minRows: 2, maxRows: 4 },
        maxlength: '500',
        'show-word-limit': true
      },
      nickname: {
        el: 'base-select-tree',
        width: '100%',
        api: 'common/getTree',
        displayField: 'label',
        lazy: false,
        multiple: true,
        'collapse-tags': false,
        'default-expanded-keys': [10, 6],
        'default-checked-keys': [10, 6, 3, 2],
        disabledNodes: [4],
        isRenderSearchInput: true,
        // 异步转换-只支持 Promise 可以转换值
        asyncLoad: props => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('一级 2，三级 2-1-1，二级 2-2，一级 3');
            }, 2000);
          });
        }
      },
      foods: {
        el: 'base-select',
        width: '100%',
        api: 'dict/getProductClassify',
        multiple: false,
        loadFilter: data => data[0],
        // 异步转换-只支持 Promise 可以转换值
        asyncLoad: props => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve('水果');
            }, 2000);
          });
        }
      }
    };
    this.rules = {
      username: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }
      ]
    };
    return {
      tableData: [],
      tableAttributes: { border: true }
    };
  },
  created() {
    this.$nextTick(this.load);
  },
  methods: {
    load() {
      this.tableData = [
        {
          name: 'birthday', // name 需要唯一
          label: '出生年月：',
          value: '2021-05-17'
        },
        {
          name: 'username',
          label: '姓名：',
          value: '小明'
        },
        {
          name: 'age',
          label: '年龄：',
          value: 20
        },
        {
          name: 'sex',
          label: '性别：',
          value: 1
        },
        {
          name: 'flag', // 支持过滤器
          label: '是否有效：',
          value: true
        },
        {
          name: 'email',
          label: '邮箱：',
          value: '123456456@qq.com'
        },
        {
          name: 'createtime',
          label: '创建时间：',
          value: '2020-05-13'
        },
        {
          name: 'remark',
          label: '描述：',
          value:
            ' 于是在网上Google了许久，网上也有类似的内容，叫做《扩展组件：GroupingView+ PropertyGrid （蒙牛版）》。楼主写的很好，但是不知道为什么没有将源码贴上。网上也没有其他的好的建议。无奈中，只能自己花点时间去写个吧。于是打开了ExtJs的源代码，找到了PropertyGrid的源文件，一看，还是比较简单的。'
        },
        {
          name: 'nickname',
          label: '下拉selectTree',
          value: [10, 6, 3]
        },
        {
          name: 'foods',
          label: '多选select',
          value: 3
        }
      ];
    },
    onReset() {
      this.$refs['grid-ref'].cancelEdit();
    },
    onOpen() {
      this.$refs['grid-ref'].openEdit();
    },
    onSave() {
      this.$refs['grid-ref'].validate(valid => {
        if (valid) {
          this.onReset();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 当属性改变之后触发
    onPropertyChange(value) {
      console.log('当属性改变之后触发：', value);
    },
    // 当一个单元格被编辑后触发
    onAfterEdit(row) {
      console.log('当一个单元格被编辑后触发', row);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
}
</style>
