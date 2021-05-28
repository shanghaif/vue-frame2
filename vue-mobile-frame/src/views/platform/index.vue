<template>
  <div>
    <p :class="$style.textCls">银行端-{{ id | SEX_TYPE }}</p>
    <div>
      <base-van-picker></base-van-picker>
    </div>
    <br />
    <div>
      <van-button size="small" @click="onAdd">添加事件</van-button>
      <van-button size="small" @click="onEmit">触发事件</van-button>
      <van-button size="small" @click="onRemove">移除事件</van-button>
      <van-button size="small" type="primary" @click="onClick"
        >获取数据</van-button
      >
      <van-button size="small" @click="onDown">下载1</van-button>
      <van-button size="small" @click="onOpenUserPage">路由跳转</van-button>
      <van-button size="small" @click="onLoginOut">登出</van-button>
    </div>
    <br />
    <div>
      <router-view></router-view>
    </div>
    <div class="vw-rem">
      <img src="../../assets/images/1234.png" alt="" />
      <img src="../../assets/images/wx.jpg" alt="" />
      <img
        src="/static/images/123.jpg"
        alt=""
      /><!--需要和 config/index,js 中的 processConfig.dev.assetsPublicPath 保持一致-->
    </div>
    <div style="margin-top: 160px;">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script>
// import aplusMixin from '@plugins/aplus/mixin.js'; // 阿里巴巴 aplus.js 埋点
import { LOGIN_PAGE_NAME } from '@config/index.js';
import { mapActions } from 'vuex';
import validatorField from '@plugins/validator-field.js';
import { down } from '@utils/index.js';
import { Toast, Dialog } from 'vant';

export default {
  // mixins: [aplusMixin],
  data() {
    return {
      id: 1,
      value: 1,
      tableData: [],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  created() {
    const result = validatorField.validate('isEmail', '123456@qq.com');
    console.info('验证邮箱', result);
    console.info('3333333333333', this.$router);
    console.info('utils', down);
  },
  mounted() {},
  methods: {
    ...mapActions(['handlerDestroy']),
    onClick() {
      this.loadData();
      console.info(this.$dict.get('FLAG_TYPE'));
      // Vue.prototype.$message({ showClose: true, message: '错误：111111', type: 'error' })
    },
    loadData() {
      /* this.$api['login/doLogin']({
        params: {
          userName: 'jh001-2',
          password: '4dbc7787aa40ce19a8647b4e50e159c1'
        }
      }).then(response => {
        // 请求成功
        console.info(response);
      }); */
      this.$api['dict/getProductClassify']().then(response => {
        // 请求成功
        this.tableData = response.data[0].data;
        console.info(this.tableData);
      });
      /* this.$api['common/getAreaInfo']().then(response => {
        console.info('区域 ', response);
      }); */
      /* this.$api['common/loadOrganizationAccount']().then(response => {
        console.info('用户信息 ', response);
      }); */
      this.$api['bank/demand-manage/bankProductsList']().then(response => {
        console.info('获取贷款需求管理列表 ', response);
      });
    },
    onAdd() {
      this.$vBus.on('b', function(p) {
        console.info('添加事件', p);
      });
    },
    onEmit() {
      this.$vBus.emit('b', 'abc');
    },
    onRemove() {
      this.$vBus.off('b');
    },
    onOpenUserPage() {
      console.info('personal');
      this.$router.push('personal');
    },
    onLoginOut() {
      const beforeClose = (action, done) => {
        if (action === 'confirm') {
          this.handlerDestroy()
            .then(() => {
              done(); // 关闭提示弹框
              this.$router.push({ name: LOGIN_PAGE_NAME });
            })
            .finally(() => {});
        } else {
          done();
        }
      };
      Dialog.confirm({
        title: '提示',
        message: '确认登出？',
        beforeClose
      });
    },
    onDown() {
      const fileName = '机构账号导出3.xlsx';
      this.$api['common/bbb']().then(response => {
        if (response.data instanceof Blob) {
          down(response, fileName);
        }
      });
      // window.open('http://10.1.1.128:8120/api/report/insAccountReport?type=2&userName=&status=&token=eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjViNzVjYzUzLWFjZmEtNDhiNC04MjE0LWM0ZThjMDJhN2FlZSJ9.H5lvN3-hOlMlwWHQN2YDE5u1Ls1wzOXgPM2wW1V7xW4')
      /* axios.request({
        url: '/api1/api/report/insAccountReport',
        method: 'GET',
        headers: {
          token: 'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6ImRlMmM4MDc1LTA0MDUtNGJkMC05MDY4LTVmZWRkYTQwZDYwNSJ9.VtBwGPyRSoMmozpC5kbUa7Rwoqe-8qRaEVr_j6C1d0k'
        },
        params: { type: 2, userName: '', status: '' },
        responseType: 'blob'
      }).then(res => {
        console.info('123 ', res);
      }) */
    },
    onConfirm(value, index) {
      // eslint-disable-next-line no-undef
      Toast(`当前值：${value}, 当前索引：${index}`);
    }
  }
};
</script>

<style>
.vw-rem {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
.vw-rem img {
  width: 100px;
  height: 100px;
}
.a {
  background-color: aliceblue;
}
.b {
  font-size: 14px;
}
</style>

<style lang="less" module>
.text-cls {
  font-size: 14px;
  color: @base;
}
</style>
