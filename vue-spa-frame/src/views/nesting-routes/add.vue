<template>
  <div :class="$style.box">
    <p>用于展示切换子路由效果的页面</p>
    <div>
      <el-button type="primary" @click="onOpenChildRouter"
        >返回上一个子路由</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onOpenChildRouter() {
      this.$router.push({ name: 'nesting-routes-test' });
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;

  font-size: 16px;
}
</style>
