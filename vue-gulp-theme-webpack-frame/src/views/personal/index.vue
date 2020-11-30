<template>
  <div :class="{'person-container': true}">
    <p :class="{aaa: true}">个人中心</p>
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <el-button size="small" @click="onOpenUserPage">路由跳转</el-button>
    <el-button size="small" @click="onOpenDetail">打开详情</el-button>
    <div>{{ NAME_OF_CONSTANT[0].name }}&nbsp;{{ OTHER }}</div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <el-button v-action:add type="primary">添加-指令</el-button>
      <el-button v-action:delete type="primary">删除-指令</el-button>
      <base-permission-box
        code="add"
        element="el-button"
        class="ys-button-cls"
        type="primary"
        size="small"
        @click="onAdd"
      >
        添加<i class="el-icon-upload el-icon--right"></i>
      </base-permission-box>
      <base-permission-box
        code="delete"
        element="el-button"
        class="ys-button-cls"
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
import { mapGetters } from 'vuex';

export default {
  // 常量对象
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  computed: {
    ...mapGetters(['getMenus'])
  },
  data() {
    return {
      input: Math.ceil(Math.random() * 10)
      /* buttons: [
        { name: '添加', code: 'add', status: 0 }, // 1 添加 10 启用 128 归档
        { name: '删除', code: 'delete', status: 1 },
        { name: '编辑', code: 'edit', status: 1 },
        { name: '启用', code: 'using', status: 0 },
        { name: '归档', code: 'file', status: 1 }
      ] */
    };
  },
  /* watch: {
    // 监听,当路由发生变化的时候执行
    $route: {
      handler: function (val, oldVal) {
        console.log('监听,当路由发生变化的时候执行 ', val);
      },
      immediate: true
    }
  }, */
  created() {
    // console.info('33333333311 ', this.$store.getters.getMenus);
    // console.info('角色菜单按钮数组', this.$route.meta);
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
          component: () => import('../needs/loan.vue')
        }
      ]);
      this.$router.push('ioio');
    },
    onOpenDetail() {
      console.info(this.$router.options);
      this.$router.push({ name: 'detail' });
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
