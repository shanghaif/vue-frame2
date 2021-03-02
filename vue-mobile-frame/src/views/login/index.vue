<template>
  <van-form validate-first @failed="onFailed" @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="admin"
      :rules="[{ required: true, message: '请输入用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="admin or super"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ROOT_PAGE_NAME } from '@config/index.js';
import { mapActions } from 'vuex';
import md5 from 'js-md5';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['platform/handleLogin']),
    onSubmit() {
      this['platform/handleLogin']({
        userName: this.username,
        password: md5(this.password)
      })
        .then(resData => {
          this.$router.push({ name: ROOT_PAGE_NAME });
        })
        .catch(error => {
          console.info(error);
        });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    }
  }
};
</script>

<style module>
.login {
  margin-top: 50px;
  text-align: center;
}
</style>
