<template>
  <div :class="$style.box" v-loading="loading">
    开发规范-irame嵌入
    <base-iframe
      @load="load"
      src="https://gitee.com/zhangh-design/js-documents/tree/master/%E5%BC%80%E5%8F%91%E9%A3%8E%E6%A0%BC"
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
