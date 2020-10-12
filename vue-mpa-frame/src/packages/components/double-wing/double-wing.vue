<template>
  <div :class="{ 'base-double-wing-container': true, [ctCls]: ctCls }">
    <div class="view">
      <div class="le">
        <slot name="left">
          <!--子列-->
        </slot>
      </div>
      <div class="mi">
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
    },
    // 自定义样式
    ctCls: {
      type: String
    }
  },
  data() {
    this.desc = '双飞翼布局，左右两列需要设置宽度值，高度自适应父容器';
    return {};
  }
};
</script>
