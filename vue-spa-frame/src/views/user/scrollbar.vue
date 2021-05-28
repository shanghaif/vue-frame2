<template>
  <div :class="$style.box">
    <base-scrollbar :ct-cls="$style.myScrollbar"
      ><div>滚动组件-鼠标移入页面之后会出现滚动条，移除滚动条会自动隐藏</div>
      <div :class="$style.item">滚动组件-scrollbar-2</div>
      <div :class="$style.item">滚动组件-scrollbar-3</div>
      <div :class="$style.item">滚动组件-scrollbar-4</div>
      <div :class="$style.item">滚动组件-scrollbar-5</div>
      <div :class="$style.item">滚动组件-scrollbar-6</div>
      <div :class="$style.item">滚动组件-scrollbar-7</div>
      <div :class="$style.item">滚动组件-scrollbar-8</div>
      <div :class="$style.item">滚动组件-scrollbar-9</div>
      <div :class="$style.item">滚动组件-scrollbar-10</div>
      <div :class="$style.item">滚动组件-scrollbar-11</div>
      <div :class="$style.item">滚动组件-scrollbar-12</div>
      <div :class="$style.item">滚动组件-scrollbar-13</div>
      <div :class="$style.item">滚动组件-scrollbar-14</div>
      <div :class="$style.item">滚动组件-scrollbar-15</div>
      <div :class="$style.item">滚动组件-scrollbar-16</div>
      <div :class="$style.item">滚动组件-scrollbar-17</div></base-scrollbar
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .my-scrollbar {
    .item {
      margin-top: 40px;
    }
  }
}
</style>
