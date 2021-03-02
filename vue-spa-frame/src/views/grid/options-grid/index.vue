<template>
  <div class="full-y">
    <base-grid
      ref="base-grid"
      :columns="columns"
      :api="api"
      :options="options"
      :selectMode="false"
      :isShowIndex="true"
      :isShowPagination="true"
      :isSelectedFirstRow="false"
      :paginationAttributes="paginationAttributes"
      :isContinuityIndex="true"
      :loadFilter="loadFilter"
      :isOptionsPage="true"
      @onLoadSuccess="onLoadSuccess"
    >
      <template v-slot:search>
        <div :class="$style.search">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width: 300px;margin-right: 10px;"
          ></el-input>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="info" @click="onReset">重置</el-button>
        </div>
      </template>
      <template v-slot:tBar>
        <p>
          静态数据默认支持分页操作，静态数据如果需要进行搜索操作那么需要定义`loadFilter`过滤函数自己实现
        </p>
        <div>如果静态数据不需要进行分页，请设置 isOptionsPage:false</div>
      </template>
    </base-grid>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    this.api = '';
    this.columns = [
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0' // 字典数据转换
      },
      {
        prop: 'productName',
        label: '产品名称'
      },
      {
        prop: 'createTime',
        label: '申请日期',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        }
      }
    ];
    this.paginationAttributes = {
      // layout: 'prev, pager, next, total'
      'current-page': 3, // 设置分页栏为第三页，如果需要在初始化时跳转到不是第1页那么需要和 options.data.pageNum 一起设置
      pageSizes: [5, 10, 20, 30, 50] // 如果 options.data.pageSize 的值不在默认的 [10, 20, 30, 40, 50, 100] 里面，分页会失效需要手动给定一个数组
    };
    return {
      input: '',
      options: {
        code: '0000',
        message: '',
        data: {
          pageNum: 3, // 加载第三页的数据
          pageSize: 10, // 一页显示5条数据，5在默认的 pageSizes 中不存在，所以需要定义 paginationAttributes.pageSizes
          results: [],
          totalPage: 0,
          totalRecord: 0
        },
        timestamp: Date.parse(new Date())
      }
    };
  },
  created() {
    setTimeout(this.setOptions, 500);
  },
  methods: {
    setOptions() {
      const results = [];
      for (let i = 1; i < 57; i++) {
        results.push({
          id: i,
          productType: 1,
          productName: `融信达-${i}`,
          createTime: `2019-03-12 11:44:${i}`
        });
      }
      this.options.data.totalPage = Math.ceil(
        results.length / this.options.data.pageSize
      ); // 总页数
      this.options.data.totalRecord = results.length;
      this.options.data.results = results;
    },
    /**
     * @desc 数据加载完成
     */
    onLoadSuccess(data) {
      // console.info('数据加载完成 ', data);
    },
    /**
     * @desc 数据过滤器
     */
    loadFilter(options) {
      const copyOptions = _cloneDeep(options); // 复制一份数据源，否则会触发 options 的watcher导致循环监听
      if (this.input) {
        copyOptions.data.results = _filter(copyOptions.data.results, o => {
          return _includes(o.productName, this.input);
        });
        copyOptions.data.totalRecord = copyOptions.data.results.length;
      }
      return copyOptions;
    },
    onSearch() {
      // this.$refs['base-grid'].setQueryParams({ productName: this.input }); // 搜索放到 loadFilter 过滤器函数中
      this.$refs['base-grid'].reloadGrid();
    },
    onReset() {
      this.input = '';
      this.onSearch();
    }
  }
};
</script>

<style lang="less" module>
.box {
  .search {
    height: 30px;
  }
}
</style>
