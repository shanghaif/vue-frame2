<template>
  <div>
    <el-button type="text" @click="onOpenDrawer">点击打开 抽屉 </el-button>
  </div>
</template>

<script>
export default {
  data() {
    this.drawerInstance = null;
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.drawerInstance = this.$baseDrawer({
        component: this.$createElement('div', {}, ['hello']),
        container: this.$el,
        title: '标题',
        size: '619px',
        ctCls: 'role-drawer',
        listeners: {
          open: () => {},
          close: () => {}
        }
      });
    });
  },
  methods: {
    onOpenDrawer() {
      this.drawerInstance.open();
    }
  }
};
</script>
