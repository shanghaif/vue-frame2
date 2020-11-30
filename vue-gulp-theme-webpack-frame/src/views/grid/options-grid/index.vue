<template>
  <div class="full-y">
    <!-- 静态数据Grid暂时不支持分页操作 -->
    <base-grid
      ref="base-grid"
      :columns="columns"
      :api="api"
      :options="options"
      :selectMode="true"
      :isShowIndex="true"
      :isShowPagination="false"
      @onLoadSuccess="onLoadSuccess"
    >
      <template v-slot:search v-if="true">
        静态数据Grid暂时不支持分页操作
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
    return {
      options: {}
    };
  },
  created() {
    this.$nextTick(this.setOptions);
  },
  methods: {
    setOptions() {
      this.options = {
        code: '0000',
        message: '',
        data: {
          pageNum: 1,
          pageSize: 30,
          results: [
            {
              productType: 1,
              productName: '融信达',
              createTime: '2019-03-12 11:44:02'
            },
            {
              productType: 4,
              productName: '药商e贷',
              createTime: '1981-07-11 19:17:26'
            }
          ],
          totalPage: 1,
          totalRecord: 2
        },
        timestamp: Date.parse(new Date())
      };
    },
    /**
     * @desc 数据加载完成
     */
    onLoadSuccess(data) {
      console.info('数据加载完成 ', data);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
}
</style>
