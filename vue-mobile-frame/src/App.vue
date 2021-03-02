<template>
  <div class="app">
    <base-route-view
      :keep-alive="false"
      :key="$route.fullPath"
    ></base-route-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
