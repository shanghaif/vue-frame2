<template>
  <div>
    <el-button @click="onFilter">筛选</el-button>
    <data-middle
      ref="tagCondition"
      :fieldList="fieldList"
      :data="filterCondition"
      @currentCondition="getCondition"
    ></data-middle>
  </div>
</template>

<script>
import dataMiddle from '@packages/components/condition/data-middle';
export default {
  components: {
    dataMiddle
  },
  data() {
    return {
      fieldList: [
        {
          datasetId: 1,
          fieldCode: 'ent_name',
          id: 10795,
          mark: 'ent_name',
          name: '企业名称',
          showNo: 1,
          sortNo: 1,
          type: 'Text'
        },
        {
          datasetId: 1,
          fieldCode: 'uscc',
          id: 10796,
          mark: 'credit_code',
          name: '统一社会信用代码',
          showNo: 1,
          sortNo: 2,
          type: 'Text'
        },
        {
          datasetId: 1,
          fieldCode: 'muavg_tax',
          id: 10798,
          mark: null,
          name: '亩均税收数值',
          showNo: 0,
          sortNo: 4,
          type: 'Num'
        },
        {
          datasetId: 1,
          fieldCode: 'net_assets',
          id: 10804,
          mark: null,
          name: '净资产收益率',
          showNo: 0,
          sortNo: 10,
          type: 'Num'
        }
      ],
      filterCondition: {}
    };
  },
  methods: {
    /**
     * @deprecated 筛选事件
     */
    onFilter() {
      // 获取筛选的数据
      this.$refs.tagCondition.getFilterCondition();
    },
    /**
     * @description 获取子组件数据
     * @param { object }
     */
    getCondition(data) {
      this.filterCondition = data;
    }
  }
};
</script>

<style lang="">
</style>
