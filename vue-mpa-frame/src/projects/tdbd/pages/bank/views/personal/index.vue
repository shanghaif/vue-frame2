<template>
  <div>
    <p class="aaa">个人中心</p>
    <el-button size="small" @click="onOpenUserPage">路由跳转</el-button>
    <div>
      {{NAME_OF_CONSTANT[0].name}}&nbsp;{{OTHER}}
    </div>
  </div>
</template>

<script>
import validatorField from '@plugins/validator-field.js';

export default {
  // 常量对象
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  created() {
    const result = validatorField.validate('isEmail', '123456@qq.com');
    console.info('验证邮箱', result);
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
.aaa{
  color: red;
  font-size: 14px;
}
</style>
