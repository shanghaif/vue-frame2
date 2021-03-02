<template>
  <div class="full-y">
    <!-- <el-button size="small" type="primary" @click="onClick">获取数据</el-button> -->
    <base-grid
      ref="paging-base-grid"
      :columns="columns"
      :api="api"
      :queryParams="queryParams"
      :selectMode="true"
      :isShowIndex="true"
      @onLoadSuccess="onLoadSuccess"
      @onLoadError="onLoadError"
      :pagingParams="pagingParams"
    >
      <!-- 查询栏 -->
      <template v-slot:search>
        <search></search>
      </template>
      <template slot="empty">
        <div>
          <img src="/static/images/avatar.gif" alt="" />
          <div>没有查询到数据！</div>
        </div>
      </template>
    </base-grid>
  </div>
</template>

<script>
import Search from '../search.vue';

export default {
  components: {
    Search
  },
  data() {
    this.api = 'bank/demand-manage/pagingGridList';
    this.queryParams = { key: '有数' };
    this.columns = [
      {
        prop: 'name',
        label: '产品类型'
      },
      {
        prop: 'telephone',
        label: '电话'
      },
      {
        prop: 'area',
        label: '区域'
      },
      { prop: 'state', label: '状态' },
      { prop: 'account', label: '账户' },
      { prop: 'person', label: '人数' }
    ];
    // 自定义分页参数
    this.pagingParams = {
      page: 'page',
      size: 'size',
      total: 'data.total',
      data: 'data.records',
      pageNum: 'current',
      pageSize: 'size'
    };
    return {};
  },
  methods: {
    onLoadSuccess(data) {
      console.info('数据加载完成 ', data);
    },
    onLoadError() {
      console.error('数据加载异常');
    }
  }
};
</script>

<style lang="less" scoped>
.box {
}
</style>
