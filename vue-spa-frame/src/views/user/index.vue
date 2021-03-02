<template>
  <div class="user-manage-box">
    <p class="user-index-p">银行端-{{ id | SEX_TYPE }}</p>
    <div>
      <base-select :options="tableData" v-model="value"></base-select>
    </div>
    <br />
    <div>
      <el-button size="small" @click="onAdd">添加事件</el-button>
      <el-button size="small" @click="onEmit">触发事件</el-button>
      <el-button size="small" @click="onRemove">移除事件</el-button>
      <el-button size="small" type="primary" @click="onLogin">登录</el-button>
      <el-button size="small" type="primary" @click="onClick"
        >获取数据</el-button
      >
      <el-button size="small" @click="onDown">下载1</el-button>
      <el-button size="small" @click="onOpenUserPage">路由跳转</el-button>
      <el-button size="small" @click="onOpenMenuPage"
        >打开指定菜单 menuId</el-button
      >
    </div>
    <br />
    <div>
      <router-view></router-view>
    </div>
    <div class="vw-rem">
      <img src="../../assets/images/1234.png" alt="" />
      <img src="../../assets/images/wx.jpg" alt="" />
      <img src="/static/images/123.jpg" alt="" />
      <!--需要和 config/index,js 中的 processConfig.dev.assetsPublicPath 保持一致-->
    </div>
    <div>
      <div><h3>时间轴组件：</h3></div>
      <p style="color: red">注意：</p>
      <p>
        由于原始的 饿了么 时间轴组件 `el-steps` 不支持将 description
        描述信息放到 时间轴的上面，
      </p>
      <p style="margin-bottom: 20px;">
        所以修改了 el-steps 组件，增加了 position 参数 up 放到上面 down 放到下面
      </p>
      <base-steps :active="3" position="up" align-center>
        <base-step title="">
          <template v-slot:description>
            <div>
              202006
            </div>
          </template>
          <template v-slot:icon>
            <span></span>
          </template>
        </base-step>
        <base-step title="">
          <template v-slot:description>
            <div>
              202007
            </div>
          </template>
          <template v-slot:icon>
            <span></span>
          </template>
        </base-step>
        <base-step title="">
          <template v-slot:description>
            <div>
              202008
            </div>
          </template>
          <template v-slot:icon>
            <span></span>
          </template>
        </base-step>
        <base-step title="">
          <template v-slot:description>
            <div>
              202009
            </div>
          </template>
          <template v-slot:icon>
            <span></span>
          </template>
        </base-step>
      </base-steps>
    </div>
    <div>
      <div><h4>下拉月份组件</h4></div>
      <el-date-picker
        class="datePicker"
        v-model="date"
        type="month"
        :picker-options="pickerOptions"
        placeholder="选择月"
        popper-class="monthSelect"
        :clearable="false"
        format="yyyy-MM"
        @change="setCurrentDate"
      >
      </el-date-picker>
      <span style="padding-left: 20px;">{{ currentDate }}</span>
    </div>
    <div>
      <div>
        <h3>图片懒加载指令：</h3>
        滚动滚动条，图片可见时才会发送请求
      </div>
      <img class="lazy-img" data-src="/static/images/lazy-test.jpg" v-lazy />
    </div>
  </div>
</template>

<script>
import { down } from '@utils/index.js';

export default {
  data() {
    return {
      bb: '',
      id: 1,
      value: 1,
      tableData: [],
      columns: [
        { label: '姓名', field: 'username' },
        { label: '性别', field: 'sex', filter: 'SEX_TYPE' }
      ],
      date: '',
      currentDate: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  created() {
    console.info('3333333333333', this.$router);
    console.info('utils', down);
  },
  mounted() {},
  methods: {
    onClick() {
      this.loadData();
      console.info(this.$dict.get('FLAG_TYPE'));
      // Vue.prototype.$message({ showClose: true, message: '错误：111111', type: 'error' })
    },
    onLogin() {
      this.$api['login/doLogin']({
        params: {
          userName: 'jh001-2',
          password: '4dbc7787aa40ce19a8647b4e50e159c1'
        }
      }).then(response => {
        // 请求成功
        if (response.code === '0000' && 'token' in response.data) {
          // 设置通用请求头参数
          this.$loaderApiLibrary.setHeaderOptions({
            token: response.data.token
          });
        }
      });
    },
    loadData() {
      this.$api['dict/getProductClassify']().then(response => {
        // 请求成功
        this.tableData = response.data[0].data;
        console.info(this.tableData);
      });
      this.$api['common/getAreaInfo']().then(response => {
        console.info('区域 ', response);
      });
      this.$api['common/loadOrganizationAccount']().then(response => {
        console.info('用户信息 ', response);
      });
      setTimeout(() => {
        // 测试 token 过期提示, 延缓请求
        this.$api['bank/demand-manage/bankProductsList']().then(response => {
          console.info('获取贷款需求管理列表 ', response);
        });
      }, 0);
    },
    onAdd() {
      const obj = { name: '张三' };
      console.info(_get(obj, name));

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
    onOpenMenuPage() {
      const routeData = this.$router.resolve({
        name: 'jgq-area',
        params: {
          menuId: 29
        }
      });
      window.open(routeData.href, '_blank');
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
    /**
     * @description 获取当前时间
     */
    setCurrentDate(data) {
      const date = new Date(data);
      this.currentDate = `${date.getFullYear()}-${date.getMonth() + 1}`;
      console.log('currentDate ', this.currentDate);
    }
  }
};
</script>

<style lang="less">
@import './css/index.css';
.user-manage-box {
  .full-y;

  overflow: auto;
}
.vw-rem {
  /* width: 100px; */
  height: 100px;
  margin-bottom: 30px;
  border: 1px solid red;
  img {
    width: 100px;
    height: 100px;
  }
}
.a {
  background-color: aliceblue;
}
.b {
  font-size: 14px;
}
.lazy-img {
  width: 300px;
  height: 200px;
  margin-top: 400px;
}
</style>
