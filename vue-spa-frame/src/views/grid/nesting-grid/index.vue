<template>
  <div :class="$style.container">
    <base-grid
      ref="expand-grid"
      :columns="columns"
      api="test/getRollGrid"
      :selectMode="true"
      :isShowIndex="true"
      :nestGridHeight="400"
      @onLoadSuccess="onLoadSuccess"
      :isSelectedFirstRow="false"
      :tableAttributes="{
        'expand-row-keys': expends,
        'row-key': row => row.id
      }"
    >
      <template v-slot:nestGridScope="row" v-if="true">
        <!--嵌套grid-->
          <base-grid
            ref="nesting-grid"
            :columns="expandColumns"
            api="bank/demand-manage/bankProductsList"
            :selectMode="true"
            :isShowIndex="false"
            :isShowPagination="false"
            :isSelectedFirstRow="false"
            :queryParams="{ name: row.name }"
          >
          </base-grid>
      </template>
    </base-grid>
  </div>
</template>

<script>
export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.columns = [
      { prop: 'id', label: '编号' },
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' }
    ];
    this.expandColumns = [
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
        label: '申请日期'
      }
    ];
    return {
      expends: [] // 默认展开的行，配合列的 type="expand" 时使用
    };
  },
  methods: {
    // 加载成功
    onLoadSuccess(data) {
      if (!_isEmpty(data)) {
        this.expends = [data[0].id]; // 展开第一行（也可以展开指定的行）
      }
    }
  }
};
</script>

<style lang="less" module>
.container {
  height: 100%;
}
</style>
