<template>
  <div :class="$style.box">
    <div :class="$style.wrapper">
      <base-transfer-grid
        v-model="value"
        ref="base-transfer-grid"
        title="人员列表"
        width="700px"
        displayField="name"
        valueField="id"
        :gridAttribute="gridAttribute"
      ></base-transfer-grid>
      <p>值：</p>
      <div>
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.searchField = 'name'; // 搜索字段
    this.gridAttribute = {
      ref: 'user-grid-ref',
      columns: [
        {
          prop: 'id',
          label: '主键',
          hide: true
        },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'department',
          label: '部门'
        }
      ],
      api: '',
      options: {
        code: '0000',
        message: '',
        data: {
          pageNum: 1,
          pageSize: 0,
          results: [],
          totalPage: 1,
          totalRecord: 0
        },
        timestamp: Date.parse(new Date())
      },
      selectMode: true,
      isShowIndex: false,
      isShowPagination: false,
      isSelectedFirstRow: false,
      listeners: {
        onLoadSuccess: data => {
          console.log('ccccccccccc ', data);
        }
      }
    };
    return {
      value: [
        { name: '林冲', id: 3 },
        { name: '关胜', id: 2 }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      this.loadOptions();
    });
  },
  methods: {
    loadOptions() {
      this.gridAttribute.options.data.results = [
        { id: 1, name: '公孙胜', department: '部门A' },
        { id: 2, name: '关胜', department: '部门A' },
        { id: 3, name: '林冲', department: '部门B' },
        { id: 4, name: '秦明', department: '部门B' },
        { id: 5, name: '呼延灼', department: '部门C' },
        { id: 6, name: '花荣', department: '部门C' },
        { id: 7, name: '柴进', department: '部门D' },
        { id: 8, name: '李应', department: '部门D' },
        { id: 9, name: '朱仝', department: '部门E' },
        { id: 10, name: '鲁智深', department: '部门E' },
        { id: 11, name: '武松', department: '部门F' },
        { id: 12, name: '董平', department: '部门F' },
        { id: 13, name: '张清', department: '部门F' }
      ];
      const length = this.gridAttribute.options.data.results.length;
      this.gridAttribute.options.data.totalRecord = length;
      this.gridAttribute.options.data.pageSize = length;
      this.$refs['base-transfer-grid'].reload(); // this.gridAttribute 不是响应式数据所以手动触发 reload 方法加载数据
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .wrapper {
    height: 550px;
  }
}
</style>
