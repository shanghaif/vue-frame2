<template>
  <div :class="[$style.box, $style.fullY]">
    基金募集管理
    <div :class="$style.test">
      <span>文字颜色</span>
    </div>
    <el-button
      :class="$style.myButton"
      size="small"
      type="primary"
      @click="onClick"
      >修改文字颜色</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClick(event) {
      console.info(this.$style);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .my-button {
    position: relative;
    top: 100px;
  }
}
.test {
  color: aqua;
  position: relative;
  top: 10px;
}
.test1{
  color: red;
  position: relative;
  top: 10px;
}
</style>
