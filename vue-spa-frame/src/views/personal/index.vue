<template>
  <div :class="$style.container">
    <p :class="$style.aaa">个人中心</p>
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <el-button size="small" @click="onOpenUserPage"
      >路由跳转-动态路由</el-button
    >
    <el-button size="small" @click="onOpenDetail"
      >打开详情-打开子路由</el-button
    >
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
    <div :class="$style.myFontStyle">
      <span>自定义字体（导入外部字体库 assets/font/style）</span>
    </div>
    <div :class="$style.carouselProgressBox">
      <div><h3>自定义百分比进度条滚动组件</h3></div>
      <div>
        <base-carousel-progress
          :list="list"
          :barColor="barColor"
          dotBorder="transparent"
          dotShadow="#FFFF00"
          borderCls="1px solid #1E44BA"
          style="height: 100%;"
          :ctCls="$style.progressCtCls"
        ></base-carousel-progress>
      </div>
    </div>
    <div style="margin-top: 100px;">
      <upload-form-view></upload-form-view>
    </div>
  </div>
</template>

<script>
import validatorField from '@plugins/validator-field.js';
import { mapGetters } from 'vuex';
import uploadFormView from './upload-form.vue';

export default {
  components: { uploadFormView },
  // 常量对象
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  computed: {
    ...mapGetters(['getMenus'])
  },
  data() {
    this.barColor = ['#F7F8CA', '#FFD01B'];
    this.list = [
      {
        name: '广州钟鼓科技有限公司', // 企业名称
        rank: 1, // 排名 不传的话按默认顺序排名
        total: 30, // 总额
        // value: 300, // 当前数据
        unit: '%', // 单位
        percent: 30 // 当没有value的时候可以传当前所占的比例、可以传小数
      },
      {
        name: '浙江宇视科技有限公司',
        rank: 2,
        total: 50,
        // value: 230,
        unit: '%',
        percent: 50
      },
      {
        name: '华三通信（H3C）',
        rank: 3,
        total: 78,
        // value: 130,
        unit: '%',
        percent: 78
      },
      {
        name: '天健会计师事务所',
        rank: 4,
        total: 82,
        // value: 567,
        unit: '%',
        percent: 82
      },
      {
        name: '百世物流科技（中国）有限公司',
        rank: 5,
        total: 46,
        // value: 431,
        unit: '%',
        percent: 46
      }
    ];
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

<style lang="less" module>
// @import url('../../assets/font/style/font.css'); // 载入自定义字体库，已移动到 static/plugins/font/style/font.css
.container {
  height: 100%;
  margin-left: 20px;
  overflow: auto;
  .my-font-style {
    span {
      font-family: 'pmzd';
      font-size: 28px;
    }
  }
}
.aaa {
  font-size: 14px;
  color: red;
}
.ys-button-cls {
  margin: 10px 0;
}
.carousel-progress-box {
  width: 500px;
  height: 250px;
  > div:nth-child(2) {
    box-sizing: border-box;
    height: 100%;
    padding: 0 10px;
    background: url('/static/images/layout5-bg.png') no-repeat;
    background-size: 100% 100%;
    border: 0.1rem solid rgb(48, 79, 176);
    box-shadow: inset 0 1px 60px 0 rgba(12, 254, 255, 0.3);
  }
}
.progress-ct-cls {
  :global .label-name {
    color: rgb(75, 139, 244) !important;
  }
}
</style>
