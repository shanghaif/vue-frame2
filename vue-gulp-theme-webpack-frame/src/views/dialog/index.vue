<template>
  <div>
    <el-button type="text" @click="onOpenBaseDialog"
      >点击打开 Message Box</el-button
    >
    <el-button type="text" @click="onOpenBaseDialog1"
      >点击打开 Message Box（销毁 dialog
      实例并且内部组件在点击显示后会重新执行生命周期）</el-button
    >
    <el-button type="text" @click="onOpenBaseDialog2"
      >点击打开 Message Box（传递响应式对象）</el-button
    >
  </div>
</template>

<script>
import Detail from './detail.vue';
import Detail2 from './detail2.vue';

export default {
  components: {},
  data() {
    this.desc = '自定义弹出框控件';
    this.dialogInstance = null;
    this.dialogInstance1 = null;
    this.dialogInstance2 = null;
    return {
      appleList: [],
      loading: false
    };
  },
  created() {
    setTimeout(() => {
      this.appleList = ['1号苹果', '2号苹果', '3号苹果'];
    }, 5000);
  },
  mounted() {
    this.$nextTick(() => {
      // 定义弹框，注意要在 mounted 保证节点已经挂载到 Dom 中了。
      this.dialogInstance = this.$baseDialog({
        component: Detail,
        container: this.$el,
        // center: true,
        title: '添加',
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
                }, 3000);
              }
            },
            text: '确定'
          }
        ],
        slotNode: {
          title: h => {
            return h('div', {}, ['自定义标题']);
          }
          /* footer: h => {
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
          } */
        },
        listeners: {
          open: () => {},
          close: () => {
            console.info('my-close', this.desc);
          }
        }
      });
      // 如果是响应式对象则必须包含在一个函数的return语句内
      this.dialogInstance2 = this.$baseDialog({
        // component: () => this.$createElement(Detail2, { props: { appleList: this.appleList } }), // 写法1
        component: () => ({
          el: Detail2,
          props: { appleList: this.appleList } // props 属性
          // on: {
          //   click: () => {}
          // }
        }), // 写法2
        container: this.$el,
        center: true,
        title: '添加',
        slotNode: {
          title: h => {
            return h('div', {}, ['自定义标题2']);
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
    });
  },
  methods: {
    onOpenBaseDialog() {
      this.dialogInstance.open();
    },
    onOpenBaseDialog1() {
      this.dialogInstance1 = this.$baseDialog({
        component: Detail,
        container: this.$el,
        center: true,
        isDestroy: true, // 销毁组件实例，所以每次都要重新创建
        title: '添加',
        slotNode: {
          title: h => {
            return h('div', {}, ['自定义标题2']);
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
      this.dialogInstance1.open();
    },
    onOpenBaseDialog2() {
      this.dialogInstance2.open();
    }
  }
};
</script>

<style></style>
