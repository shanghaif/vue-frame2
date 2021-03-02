<template>
  <div :class="$style.container">
    <div :class="$style.loginBox">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pswd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      form: {
        name: 'jh001-2',
        pswd: '4dbc7787aa40ce19a8647b4e50e159c1'
      }
    };
  },
  methods: {
    ...mapActions(['platform/handleLogin']),
    onSubmit(event) {
      this['platform/handleLogin']({
        userName: this.form.name,
        password: this.form.pswd
      })
        .then(resData => {
          this.$router.push({ path: '/' });
        })
        .catch(error => {
          console.info(error);
          this.$notify({ type: 'danger', message: error || '登录失败' });
        });
    }
  }
};
</script>

<style module>
.container {
  height: 100%;
}
.login-box {
  position: relative;
  top: 100px;
  width: 500px;
  margin: 0 auto;
}
</style>
