<template>
  <div :class="$style.box">
    <base-absolute-layout :extraCls="$style.extraCls">
      <span
        x="170"
        y="50"
        style="color: rgba(75,139,244);"
        :class="$style.logoText"
        >欢迎登录管理平台!</span
      >
      <absolute-detail x="50" y="220" :name="name"></absolute-detail>
    </base-absolute-layout>
  </div>
</template>

<script>
import AbsoluteDetail from './detail/absolute-detail.vue';
export default {
  components: { AbsoluteDetail },
  data() {
    return {
      name: '绝对定位布局'
    };
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .extra-cls {
    box-sizing: border-box;
    width: 488px;
    height: 650px;
    margin: 0 auto;
    border: 1px solid rgba(40, 40, 41);
    .logo-text {
      font-size: 18px;
    }
  }
}
</style>
