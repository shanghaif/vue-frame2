<template>
  <div class="select-grid-box">
    <base-select-grid
      :api="api"
      :queryParams="queryParams"
      :columns="columns"
      :selectMode="true"
      :isShowIndex="true"
      :multiple="true"
    ></base-select-grid>
  </div>
</template>

<script>
export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.queryParams = { key: '有数' };
    this.columns = [
      {
        prop: 'productName',
        label: '产品名称'
      },
      { prop: 'fundCodeUserName', label: '企业名称' }
    ];
    return {};
  }
};
</script>

<style>
.select-grid-box {
  height: 100%;
}
</style>
