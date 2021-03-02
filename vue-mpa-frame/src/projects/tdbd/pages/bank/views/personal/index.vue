<template>
  <div>
    <p class="aaa">个人中心</p>
    <el-button size="small" @click="onOpenUserPage">路由跳转</el-button>
    <div>{{ NAME_OF_CONSTANT[0].name }}&nbsp;{{ OTHER }}</div>
    <div>
      <el-button v-action:add type="primary">添加-指令</el-button>
      <el-button v-action:delete type="primary">删除-指令</el-button>
      <base-permission-box
        code="add"
        element="el-button"
        :class="$style.ysButtonCls"
        type="primary"
        size="small"
        @click="onAdd"
      >
        添加<i class="el-icon-upload el-icon--right"></i>
      </base-permission-box>
      <base-permission-box
        code="delete"
        element="el-button"
        :class="$style.ysButtonCls"
        type="danger"
        size="small"
        @click="onDelete"
      >
        删除<i class="el-icon-upload el-icon--right"></i>
      </base-permission-box>
      <el-button type="success" @click="onChangeDisabled">成功按钮</el-button>
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
    },
    onAdd() {
      this.$message('添加');
    },
    onDelete() {
      this.$message('删除');
    },
    onChangeDisabled(event) {}
  }
};
</script>

<style>
.aaa {
  font-size: 14px;
  color: red;
}
</style>
<style module>
.container {
  margin-left: 20px;
}
.ys-button-cls {
  margin: 10px 0;
}
</style>
