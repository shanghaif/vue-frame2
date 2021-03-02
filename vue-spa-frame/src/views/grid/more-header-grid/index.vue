<template>
  <div class="more-header-grid-box">
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
      <template v-slot:search>
        多表头配置 children 数组既可。
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
        label: '2021年',
        // 多表头配置
        children: [
          {
            prop: 'productType',
            label: '产品类型',
            filter: 'DICT_0' // 字典数据转换
          },
          {
            label: '产品说明',
            children: [
              {
                prop: 'productName',
                label: '产品名称'
              },
              {
                prop: 'endTime',
                label: '到期时间'
              }
            ]
          }
          /* {
            prop: 'productName',
            label: '产品名称'
          } */
        ]
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
          pageSize: 10,
          results: [
            {
              productType: 1,
              productName: '融信达',
              createTime: '2017-03-12 11:44:02',
              endTime: '2022-10-01'
            },
            {
              productType: 4,
              productName: '药商e贷',
              createTime: '2008-07-11 19:17:26',
              endTime: '2022-09-01'
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

<style lang="less">
.more-header-grid-box {
  .full-y;

  overflow: auto;
}
</style>
