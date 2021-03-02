<template>
  <div class="responsive-page_box">
    <p>
      注意：响应式的页面路径，比如：`src/views/responsive-page/index.vue`
      需要写到 frame.config.js 的 px2RemModule 配置中
    </p>
    <div>
      <span>用于测试响应式布局-自适应</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.responsive-page_box {
  > div {
    width: 200px;
    height: 100px;
    margin: 100px 100px;
    font-size: 14px;
    border: 1px solid blue;
  }
}
</style>
