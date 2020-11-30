<template>
  <div class="login">
    <p class="mmm">接近美东时间16日凌晨0时，美国现任总统特朗普发推称“我赢了大选”。</p>
    <div class="login-box">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pswd">
          <el-input
            v-model="form.pswd"
            type="password"
            placeholder="admin or super"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import md5 from 'js-md5';
import { ROOT_PAGE_NAME } from '@config/index.js';

export default {
  data() {
    return {
      src: '',
      loading: false,
      form: {
        name: 'admin',
        pswd: 'admin'
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pswd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.bb();
      const that = this;
      window.vm.$watch('theme', function (val, oldVal) {
        console.warn('aaa', val);
        this.bbb = val;
        that.bb();
      });
    });
  },
  /* watch: {
    'window.vm.$data.theme': {
      handler(val, oldVal) {
        console.error('aaa', val);
      }
    }
  }, */
  methods: {
    bb() {
      const bbb = document.getElementsByTagName('body')[0].className;
      console.warn('111111111111111111', bbb, window.vm.$data.theme);
      this.src = require('@theme/' + bbb + '/images/1234.png');
      // return require('@theme/' + bbb + '/images/1234.png');
    },
    ...mapActions(['platform/handleLogin']),
    onSubmit(event) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this['platform/handleLogin']({
            userName: this.form.name,
            password: md5(this.form.pswd)
          })
            .then(resData => {
              this.$router.push({ name: ROOT_PAGE_NAME });
            })
            .catch(error => {
              console.info(error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onClick(event, option = {}) {
      console.info(event, option);
    }
  }
};
</script>
