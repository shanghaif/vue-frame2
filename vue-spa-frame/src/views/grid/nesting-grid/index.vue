<template>
  <div :class="$style.container">
    <base-nesting-grid
      ref="expand-grid"
      v-model="value1"
      :columns="columns"
      api="test/getNestingGrid"
      :selectMode="true"
      :isShowIndex="false"
      :nestGridHeight="350"
      @onLoadSuccess="onLoadSuccess"
      :isSelectedFirstRow="false"
      :isOpenNestingGridFirst="true"
      :isShowPagination="false"
      :tableAttributes="{
        'row-key': row => row.id,
        'show-header': true,
        border: false
      }"
      row-key-filed="id"
      :show-header="false"
      :paginationAttributes="{ pageSize: 4 }"
      :checkStrictly="true"
    >
      <template v-slot:tBar>
        <div>
          <span style="color: red;">注意：</span>row-key-filed 默认取数据行的 id
          字段，如果没有 id 字段需要提供一个唯一值字段，并且是数据行和嵌套 grid
          的数据都是唯一
        </div>
        <div class="nesting-value_box">
          <p>
            值：<span>{{ value1 }}</span>
          </p>
        </div>
      </template>
      <template v-slot:nestGridScope="row">
        <!--嵌套grid-->
        <base-grid
          :ctCls="{ 'nesting-grid_box': true }"
          :columns="expandColumns"
          api="bank/demand-manage/bankProductsList"
          :selectMode="true"
          :isShowIndex="true"
          :isShowPagination="false"
          :isSelectedFirstRow="false"
          :queryParams="{ name: row.name }"
          @checkedFilter="checkedFilter"
          :tableAttributes="{
            'show-header': false,
            border: false
          }"
          :paginationAttributes="paginationAttributes"
        >
        </base-grid>
      </template>
    </base-nesting-grid>
  </div>
</template>

<script>
export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    // showValue 不显示列的值，但列存在 区别于 hide 属性
    this.columns = [
      {
        prop: 'state',
        label: '状态',
        filter: 'STATE_NESTING_GRID',
        width: 100
      },
      { prop: 'id', label: '编号', hide: true, width: 140 },
      { prop: 'date', label: '日期', showValue: false, width: 160 },
      { prop: 'name', label: '姓名', showValue: false, width: 160 },
      { prop: 'address', label: '地址', showValue: false }
    ];
    this.expandColumns = [
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0', // 字典数据转换
        width: 100,
        showValue: false
      },
      {
        prop: 'createTime',
        label: '日期',
        width: 160
      },
      {
        prop: 'name',
        label: '姓名',
        width: 160
      },
      {
        prop: 'address',
        label: '地址'
      }
    ];
    this.paginationAttributes = {
      pageSize: 8
    };
    return {
      // expends: [], // 默认展开的行，配合列的 type="expand" 时使用
      value1: [
        { id: 1, children: [{ id: '1-1' }, { id: '1-3' }] },
        { id: 2, children: [{ id: '1-3' }] }
        // { id: 2 }
        // { id: 1, children: [] }
      ] // id 对应着 `row-key-filed`
    };
  },
  methods: {
    // 加载成功
    onLoadSuccess(data) {
      /* if (!_isEmpty(data)) {
        this.expends = [data[0].id]; // 展开第一行（也可以展开指定的行）
      } */
    },
    // 选中过滤函数
    checkedFilter(row) {
      return row;
    }
  }
};
</script>

<style lang="less">
.nesting-grid_box {
  /* el-table表格最下面的边框线-去除 */

  /* .el-table__row > td {
    border: none;
  } */
  .el-table::before {
    height: 0;
  }
}
.nesting-value_box {
  box-sizing: border-box;
  height: 200px;
  overflow: auto;
  border: 1px solid pink;
}
</style>

<style lang="less" module>
.container {
  height: 100%;
  overflow: auto;
}
</style>
