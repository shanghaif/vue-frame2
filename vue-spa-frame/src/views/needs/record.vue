<template>
  <div>
    贷款需求管理-录入
    <br /><br />
    <p>面包屑点击事件</p>
    <p>菜单节点激活事件（第二次点击菜单时触发）</p>
  </div>
</template>

<script>
export default {
  routerActivated() {
    console.info('菜单节点激活事件（第二次点击菜单时触发） ');
  },
  methods: {
    breadClickEvent(option) {
      console.info('面包屑点击事件', option);
    }
  }
};
</script>
