<template>
  <div class="components-container">
    <el-button type="primary" @click="onOpen">
      打开可拖拽对话框
    </el-button>
  </div>
</template>

<script>
import Detail from './detail.vue';

export default {
  data() {
    this.dialogInstance = null;
    return {
      dialogTableVisible: false,
      loading: false
    };
  },
  methods: {
    /**
     * @desc 打开事件
     */
    onOpen(event) {
      this.createDragDialog();
    },
    /**
     * @desc 创建可拖拽对话框
     */
    createDragDialog() {
      this.dialogInstance = this.$BaseDragDialog({
        component: () => {
          return this.$createElement(Detail);
        },
        container: this.$el,
        // center: true,
        isDestroy: true,
        title: '添加',
        closeOnClickModal: false, // dialog 原有属性，必须是 小驼峰 形式，连字符`-`形式无法接收
        buttons: [
          {
            on: {
              click: () => {
                this.dialogInstance.close();
              }
            },
            text: '取消'
          },
          {
            props: () => ({ type: 'primary', loading: this.loading }),
            on: {
              click: () => {
                this.loading = true;
                setTimeout(() => {
                  this.loading = false;
                  this.$nextTick(() => {
                    this.dialogInstance.close();
                  });
                }, 1.5 * 1000);
              }
            },
            text: '确定'
          }
        ]
      });
      this.dialogInstance.open();
    }
  }
};
</script>
