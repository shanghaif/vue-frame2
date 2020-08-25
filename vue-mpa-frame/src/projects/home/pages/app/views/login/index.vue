<template>
  <div :class="$style.container">
    <div :class="$style.loginBox">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pswd">
          <el-input v-model="form.pswd" type="password" placeholder="admin or super"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ROOT_PAGE_NAME } from '../../config/index.js';
import { mapActions } from 'vuex';
import md5 from 'js-md5';

export default {
  data() {
    return {
      loading: false,
      form: {
        name: 'admin',
        pswd: 'admin'
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pswd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapActions([
      'platform/handleLogin'
    ]),
    onSubmit(event) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this['platform/handleLogin']({ userName: this.form.name, password: md5(this.form.pswd) }).then(resData => {
            this.$router.push({ name: ROOT_PAGE_NAME });
          }).catch(error => {
            console.info(error);
          }).finally(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
