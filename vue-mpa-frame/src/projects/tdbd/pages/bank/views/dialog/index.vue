<template>
  <div>
    <el-button type="text" @click="onOpenBaseDialog"
      >点击打开 Message Box</el-button
    >
  </div>
</template>

<script>
import Detail from './detail.vue';

export default {
  components: {
  },
  data() {
    this.desc = '自定义弹出框控件';
    this.dialogInstance = null;
    return {};
  },
  mounted() {
    // 定义弹框，注意要在 mounted 保证节点已经挂载到 Dom 中了。
    this.dialogInstance = this.$baseDialog({
      component: Detail,
      container: this.$el,
      center: true,
      title: '添加',
      slotNode: {
        title: h => {
          return h('div', {}, ['自定义标题']);
        },
        footer: h => {
          return h('div', {}, [
            h(
              'el-button',
              {
                on: {
                  click: () => {
                    this.dialogInstance.close();
                  }
                }
              },
              ['取消']
            ),
            h('el-button', { props: { type: 'primary' } }, ['确定'])
          ]);
        }
      },
      listeners: {
        open: () => {},
        close: () => {
          console.info('my-close', this.desc);
        }
      }
    });
  },
  methods: {
    onOpenBaseDialog() {
      this.dialogInstance.open();
    }
  }
};
</script>

<style></style>
