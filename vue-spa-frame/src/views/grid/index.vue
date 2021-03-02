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
      :isFixedIndex="false"
      :isFixedSelection="false"
      :isContinuityIndex="false"
      @onLoadSuccess="onLoadSuccess"
      @onLoadError="onLoadError"
      @onBeforeLoad="onBeforeLoad"
      @onChangeRowEvent="onChangeRowEvent"
      @row-click="onRowClick"
      @header-click="onHeaderClick"
      :columnTool="{
        label: '插槽-操作列',
        width: '180px'
      }"
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
        <p>
          hide: true 属性 隐藏列，showValue: false 属性 不显示列的值，但列存在
          区别于 hide 属性，插槽操作列默认在最后一列
        </p>
      </template>
      <template v-slot:columnTool="row">
        <div>
          {{ row.productType }}
          <el-button type="primary" size="mini" @click="onScopeClick"
            >编辑</el-button
          >
          <el-button type="danger" size="mini">保存</el-button>
        </div>
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
        filter: 'DICT_0', // 字典数据转换
        width: '100px'
      },
      {
        prop: 'productName',
        label: '产品名称',
        width: '160px',
        showValue: false, // showValue 不显示列的值，但列存在 区别于 hide 属性
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
        width: '120px',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        }
      },
      {
        prop: 'applyQuota',
        label: '融资金额',
        width: '100px',
        sortable: true,
        unit: '万元'
      }, // unit 单位
      { prop: 'applyProId', label: '需求单号', hide: true }, // 隐藏列
      { prop: 'fundCodeUserName', label: '企业名称' },
      {
        prop: 'nodeStatus',
        label: '状态',
        filter: 'NODE_STATUS',
        width: '100px',
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
        width: '100px',
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
      },
      {
        label: 'Admin-操作',
        width: '200px',
        buttons: [
          {
            el: 'label',
            props: { text: '增加分期' },
            on: {
              click: this.onAddinstalment
            }
          },
          {
            el: 'label',
            props: { text: '编辑' },
            on: {
              click: this.onEdit
            }
          },
          {
            el: 'label',
            props: { text: '重置密码', size: 'mini', type: 'success' },
            on: {
              click: this.onResetting
            }
          },
          {
            render: (h, row, column, index) => {
              return h(
                'el-popconfirm',
                {
                  props: {
                    title: '确定删除吗？',
                    placement: 'left',
                    iconColor: 'red'
                  },
                  on: {
                    confirm: () => {
                      this.onConfirm(row, column, index);
                    },
                    cancel: () => {}
                  }
                },
                [
                  h('span', { slot: 'reference', style: { color: 'red' } }, [
                    '删除'
                  ])
                ]
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
      // spanMethod: this.arraySpanMethod
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
      ],
      currentPage: 1, // 自定义分页参数，用于覆盖 $base-global-options 中的 grid 中的 paginationAttributes 分页配置
      pageSize: 30
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
    },
    /**
     * @desc 增加分期
     */
    onAddinstalment(row, column, index) {
      console.info('增加分期', this.api, row, column, index);
    },
    /**
     * @desc 编辑
     */
    onEdit(row, column, index) {
      console.info('编辑', this.api, row, column, index);
    },
    /**
     * @desc 重置密码
     */
    onResetting(row, column, index) {
      console.info('重置密码', this.api, row, column, index);
    },
    /**
     * @desc 确定删除
     */
    onConfirm(row, column, index) {
      console.info('确定删除', this.api, row, column, index);
    },
    /**
     * @desc 表格合并
     * @param {*} param0
     * row 表格每一行的数据
     * column 表格每一列的数据
     * rowIndex 表格的行索引,不包括表头,从0开始
     * columnIndex 表格的列索引,从0开始
     */
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      // 打印出的数据就是表格当前行的数据,当前列的数据,索引
      // 1代表 第二行，合并第二行
      if (rowIndex === 1) {
        if (columnIndex === 1) {
          // 从第二列开始
          return [1, 3];
          // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
          // 这里rowspan为1是行有一行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
          // return {
          //    rowspan: 1,
          //    colspan: 3
          //  }
        } else if (columnIndex === 2 || columnIndex === 3) {
          // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
          // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
          return [0, 0];
        }
      }
    },
    /**
     * @desc 插槽列事件
     */
    onScopeClick(event) {
      console.log('插槽列事件');
    }
  }
};
</script>
