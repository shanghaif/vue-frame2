<template>
  <div>
    <p class="aaa">个人中心</p>
    <van-button size="small" @click="onOpenUserPage">路由跳转</van-button>
    <div>{{ NAME_OF_CONSTANT[0].name }}&nbsp;{{ OTHER }}</div>
  </div>
</template>

<script>
export default {
  // 常量对象
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  methods: {
    onOpenUserPage() {
      console.info(this.$route);
      this.$router.addRoutes([
        {
          path: '/ioio',
          name: 'ioio',
          component: () => import('../needs/index.vue')
        }
      ]);
      this.$router.push('ioio');
    }
  }
};
</script>

<style>
.aaa {
  font-size: 14px;
  color: red;
}
</style>
