<template>
  <div :class="$style.box" v-loading="loading">
    百度javascript开发规范-irame嵌入
    <base-iframe
      @load="load"
      src="https://gitee.com/SOHONET/Standard/blob/master/html.md"
    ></base-iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {
    load() {
      console.log('...加载完成...');
      this.loading = false;
    }
  }
};
</script>

<style lang="less" module>
.box {
  width: 100%;
  height: 100%;
}
</style>
