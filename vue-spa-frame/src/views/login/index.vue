<template>
  <div :class="$style.container">
    <div :class="$style.loginBox">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pswd">
          <el-input
            v-model="form.pswd"
            type="password"
            placeholder="admin or super"
            v-on:keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
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
import { mapActions, mapGetters } from 'vuex';
import md5 from 'js-md5';
import { ROOT_PAGE_NAME } from '@config/index.js';

export default {
  computed: {
    ...mapGetters(['platform/getLoginCacheUserInfo'])
  },
  data() {
    return {
      loading: false,
      form: {
        name: 'admin',
        pswd: 'admin',
        remember: false
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pswd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.form.name = this['platform/getLoginCacheUserInfo'].username;
      this.form.pswd = this['platform/getLoginCacheUserInfo'].password;
      this.form.remember = this['platform/getLoginCacheUserInfo'].remember;
    });
  },
  methods: {
    ...mapActions(['platform/handleLogin']),
    onSubmit(event) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this['platform/handleLogin']({
            userName: this.form.name,
            password:
            // 判断传入的密码是否进行过md5加密，若加密过则不加密
            this['platform/getLoginCacheUserInfo'].password === this.form.pswd
              ? this.form.pswd
              : md5(this.form.pswd),
            remember: this.form.remember
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

<style lang="less" module>
.container {
  height: 100%;
  background: #f0f2f5 url(~@assets/images/background.svg) no-repeat 50%;
}
.login-box {
  width: 500px;
  margin: 0 auto;
  position: relative;
  top: 100px;
}
</style>
