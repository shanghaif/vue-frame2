<template>
  <div>
    <div
      style="width: 600px;"
      v-if="true"
    >
      <base-roll-grid
        api="test/getRollGrid"
        :height="400"
        :ctCls="{ 'goods-base-roll-grid': true }"
        :autoplay="autoplay"
        :group-data-num="4"
        :columns="columns"
        :stripe="true"
        :border="true"
      ></base-roll-grid>
    </div>
    <br/>
    <el-button type="primary" @click="autoplay=true">启动</el-button>&nbsp;
    <el-button type="info" @click="autoplay=false">停止</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoplay: false,
      height: 300,
      columns: [
        { prop: 'id', label: '编号' },
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址' }
      ]
    };
  },
  created() {
    /* setTimeout(() => {
      this.autoplay = false;
    }, 25000); */
  },
  methods: {}
};
</script>
