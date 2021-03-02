<template>
  <div>
    <el-button type="text" @click="onOpenDrawer">点击打开 抽屉 </el-button>
  </div>
</template>

<script>
import drawerDetailView from './drawer/index.vue';

export default {
  data() {
    this.drawerInstance = null;
    return {
      row: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.drawerInstance = this.$baseDrawer({
        component: () =>
          this.$createElement(drawerDetailView, {
            props: { row: this.row } // 响应式对象需要在 beforeClose 回调中重置，如果设置 isDestroy: true 就不用在 beforeDestroy 回调重置 响应式参数了
          }),
        isDestroy: false, // 是否在销毁抽屉对象后一并将 html 节点移除，true 移除、false 不移除（注意：抽屉对象本身会被销毁和`destroyOnClose`参数有区别，destroyOnClose 参数只是把抽屉内部的子组件销毁）
        beforeClose: this.handleClose,
        container: this.$el,
        title: '标题',
        size: '519px',
        ctCls: this.$style.roleDrawer,
        listeners: {
          open: () => {},
          close: () => {}
        }
      });
    });
    setTimeout(() => {
      console.info('修改 row 对象');
      this.row = { name: '小王', age: 18 };
      setTimeout(() => {
        console.info('再次修改 row 对象');
        this.row = { name: '大王', age: 18 };
      }, 2000);
    }, 3000);
    setTimeout(() => {
      // 修改标题
      this.drawerInstance.setTitle('修改过的标题');
    }, 4000);
  },
  methods: {
    handleClose(done) {
      this.row = {};
      done();
    },
    onOpenDrawer() {
      this.drawerInstance.open();
    }
  }
};
</script>

<style lang="less" module>
.roleDrawer {
}
</style>
