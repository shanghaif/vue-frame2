<template>
  <div>
    <div class="test-mobile-cls">
      项目管理
    </div>
    <van-button type="primary" text="组件调用" @click="showNotify" />
  </div>
</template>

<script>
export default {
  methods: {
    showNotify() {
      // this.$notify({ type: 'warning', message: '通知内容' });
      Vue.prototype.$notify({ type: 'danger', message: '通知内容' });
    }
  }
};
</script>

<style>
.test-mobile-cls {
  width: 750px;
  box-sizing: border-box;
  border-bottom: 7.5px solid palegreen;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>
