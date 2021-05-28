<!--
 * @Author: your name
 * @Date: 2021-03-15 10:08:02
 * @LastEditTime: 2021-03-25 16:05:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-spa-frame\src\views\complex-grid\dynamic-grid\index.vue
-->
<template>
  <div :class="$style.appraisalResults">
    <p>
      动态表格：接口单独返回表头内容，表头设置为响应式，单独调用接口处理返回的表头，再处理grid组件response回来的数据渲染表格内容
    </p>
    <base-grid
      ref="base-grid"
      api="bank/demand-manage/resultsList"
      :columns="columns"
      :isShowIndex="false"
      :loadResponseFilter="loadFilter"
    >
    </base-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: []
    };
  },
  created() {
    this.getTabelData();
  },
  methods: {
    reloadGrid() {
      this.$nextTick(() => {
        this.$refs['base-grid'].reloadGrid();
      });
    },
    /**
     * @desc 获取渲染表格头部
     */
    getTabelData() {
      this.$api['bank/demand-manage/resultsList']().then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          if (this.columns.length) {
            this.columns = [];
          }
          this.$nextTick(() => {
            const result = [];
            res.data.tableHeaders.forEach((item, i) => {
              const column = { prop: `header${i}`, label: item };
              result.push(column);
            });
            this.columns = result;
            this.reloadGrid();
            setTimeout(() => {
              this.$refs['base-grid'].getElTable().doLayout();
            }, 0);
          });
        }
      });
    },
    /**
     * @desc 获取渲染表格内容
     */
    loadFilter(data) {
      const records = [];
      data.data.data.results.forEach(item => {
        const row = item.map((cell, c) => {
          const name = `header${c}`;
          return { [name]: cell };
        });
        const newObj = {};
        row.forEach(cell => {
          // 多个对象合并为一个对象
          Object.assign(newObj, cell);
        });
        records.push(newObj);
      });
      data.data.data.results = records;
      return data.data;
    }
  }
};
</script>
<style lang="less" module>
.appraisal-results {
  .full-y;

  padding: 0 20px;
}
</style>
