<template>
  <div :class="$style.container">
    <base-grid
      ref="expand-grid"
      :columns="columns"
      api="test/getRollGrid"
      :selectMode="true"
      :isShowIndex="true"
      @onLoadSuccess="onLoadSuccess"
      :tableAttributes="{
        'expand-row-keys': expends,
        'row-key': row => row.id
      }"
    >
    </base-grid>
  </div>
</template>

<script>
export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.columns = [
      {
        type: 'expand',
        slotNode: [
          {
            render: (h, row, cloumn) => {
              return h('div', { style: { height: '100px' } }, [
                `展开行-${row.name}`
              ]);
            }
          }
        ]
      },
      { prop: 'id', label: '编号' },
      { prop: 'date', label: '日期' },
      { prop: 'name', label: '姓名' },
      { prop: 'address', label: '地址' }
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
