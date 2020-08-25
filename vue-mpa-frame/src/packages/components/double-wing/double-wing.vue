<template>
  <div :class="$style.baseDoubleWingContainer">
    <div :class="$style.view">
      <div class="le">
        <slot name="left">
          <!--子列-->
        </slot>
      </div>
      <div :class="$style.mi">
        <slot name="middle">
          <!--主列-->
        </slot>
      </div>
      <div class="ri">
        <slot name="right">
          <!--附加列-->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDoubleWing',
  props: {
    border: {
      type: String,
      default: null
    }
  },
  data() {
    this.desc = '双飞翼布局，左右两列需要设置宽度值，高度自适应父容器';
    return {};
  }
};
</script>

<style lang="less" module>
.base-double-wing-container {
  height: 100%;
}
.view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.view > div {
  height: 100%;
}
.mi {
  flex: 1; /*占满剩下的全局空间*/
}
</style>
