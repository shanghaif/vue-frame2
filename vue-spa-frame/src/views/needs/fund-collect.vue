<template>
  <div :class="[$style.box, $style.fullY]">
    <p>多色图标-展示</p>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#iconjiaosezhanghao"></use>
    </svg>
    <base-svg-icon iconname="iconjiaosezhanghao" size="36px"></base-svg-icon>
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

<style>
.el-dropdown-link {
  color: rgba(64, 158, 255);
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style lang="less" module>
.box {
  .my-button {
    position: relative;
    top: 100px;
  }
}
.test {
  position: relative;
  top: 10px;
  color: aqua;
}
.test1 {
  position: relative;
  top: 10px;
  color: red;
}
</style>
