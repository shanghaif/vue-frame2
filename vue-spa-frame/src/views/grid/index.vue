<template>
  <div class="full-y">
    <!-- <el-button size="small" type="primary" @click="onClick">获取数据</el-button> -->
    <base-grid
      ref="base-grid"
      :columns="columns"
      :tableAttributes="tableAttributes"
      :paginationAttributes="paginationAttributes"
      :api="api"
      :queryParams="queryParams"
      :selectMode="true"
      :isShowIndex="true"
      @onLoadSuccess="onLoadSuccess"
      @onLoadError="onLoadError"
      @onBeforeLoad="onBeforeLoad"
      @onChangeRowEvent="onChangeRowEvent"
      @row-click="onRowClick"
      @header-click="onHeaderClick"
    >
      <!-- 查询栏 -->
      <template v-slot:search v-if="false">
        <search></search>
      </template>
      <template v-slot:searchScope="row">
        <search :row="row"></search>
      </template>
      <!-- 工具栏 -->
      <template v-slot:tBar v-if="false">
        <t-bar></t-bar>
      </template>
      <template v-slot:tBarScope="row">
        <t-bar :row="row"></t-bar>
      </template>
    </base-grid>
  </div>
</template>

<script>
import moment from 'moment';
import Search from './search.vue';
import TBar from './t-bar.vue';

export default {
  components: {
    Search,
    TBar
  },
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.queryParams = { key: '有数' };
    this.columns = [
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0' // 字典数据转换
      },
      {
        prop: 'productName',
        label: '产品名称',
        render: (h, row, column, index) => {
          return h(
            'i',
            { class: { 'el-icon-time': 'el-icon-time' } },
            row[column.property]
          );
        },
        renderHeader: (h, column, $index) => {
          return h(
            'i',
            { class: { 'el-icon-platform-eleme': true } },
            column.label
          );
        }
      },
      {
        prop: 'createTime',
        label: '申请日期',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        }
      },
      { prop: 'applyQuota', label: '融资金额', sortable: true, unit: '万元' }, // unit 单位
      { prop: 'applyProId', label: '需求单号' },
      { prop: 'fundCodeUserName', label: '企业名称' },
      {
        prop: 'nodeStatus',
        label: '状态',
        filter: 'NODE_STATUS',
        render: (h, row, column, index, columnValue) => {
          // 如果设置了 render，取值请使用 columnValue
          return h(
            'i',
            { class: { 'el-icon-time': 'el-icon-time' } },
            columnValue
          );
        }
      }, // 字典数据转换
      {
        label: '操作',
        fixed: 'right',
        slotNode: [
          {
            render: (h, row, column, index) => {
              return h(
                'el-button',
                {
                  props: { type: 'text', size: 'size' },
                  on: {
                    click: event => {
                      console.info(event, row, column, index);
                    }
                  }
                },
                ['查看']
              );
            }
          }
        ]
      }
    ];
    this.tableAttributes = {
      /* Table Attributes 原生属性 */
      stripe: true,
      size: 'small',
      /* 自定义扩展后的属性 */
      slotNode: {
        append: h => {
          return h(
            'div',
            { style: 'height: 30px;' },
            '插入至表格最后一行之后的内容'
          );
        }
      }
    };
    this.paginationAttributes = {
      /* Pagination Attributes 原生属性 */
      // layout: 'prev, pager, next, jumper, sizes, ->, total',
      pagingItems: [
        {
          text: '提交',
          listeners: {
            click: () => {
              console.info('提交');
            }
          }
        },
        {
          text: '分析',
          icon: 'el-icon-pie-chart',
          listeners: {
            click: () => {
              console.info('分析');
            }
          }
        }
      ]
    };
    return {};
  },
  methods: {
    onLoadSuccess(data) {
      console.info('数据加载完成 ', data);
    },
    onLoadError() {
      console.error('数据加载异常');
    },
    onBeforeLoad() {
      // 返回 false 表示不会进行查询操作
      return true;
    },
    // 行选中改变
    onChangeRowEvent(row) {
      console.info('change-row', row);
    },
    // 行点击事件
    onRowClick(row, column, event) {
      console.info('row-click', row);
    },
    // 表头点击
    onHeaderClick(column, event) {
      console.info('header-click', column);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
}
</style>
