<template>
  <div :class="$style.box">
    <h3>嵌套子路由</h3>
    <div>
      场景：有的时候我们需要在当前打开路由对应的组件内去切换子路由，子路由和当前路由是在同一层级的，我们只想着去切换组件对应的内容就可以了，其外部的左侧导航顶部的工具栏都不会进行重新渲染。
    </div>
    <div>
      左侧的菜单还是选中当前的
      `嵌套路由`，菜单并不会去改变所以这正是我们想要的结果。
    </div>
    <div>
      <el-button type="primary" @click="onOpenChildRouter"
        >点击打开子路由</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onOpenChildRouter() {
      this.$router.push({ name: 'nesting-routes-add' });
    }
  }
};
</script>
<style lang="less" module>
.box {
  .full-y;
  > div {
    margin-bottom: 20px;
    font-size: 16px;
  }
  > div:nth-child(4) {
    margin-top: 30px;
  }
}
</style>
