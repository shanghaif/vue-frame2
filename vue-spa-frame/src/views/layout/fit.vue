<template>
  <base-fit-layout ctCls="my-fit-layout_cls" :isPadding="false"
    ><div :class="$style.innerBox">
      <div>
        fit
        布局，一个子元素将填充满整个容器（只接受一个子元素），组件本身已经使用滚动条`el-scrollbar`组件
      </div>
      <div>fit布局1</div>
      <div>fit布局2</div>
      <div>fit布局3</div>
      <div>fit布局4</div>
      <div>fit布局5</div>
      <div>fit布局6</div>
      <div>fit布局7</div>
      <div>fit布局8</div>
      <div>fit布局9</div>
      <div>fit布局10</div>
      <div>fit布局11</div>
      <div>fit布局12</div>
      <div>fit布局13</div>
      <div>fit布局14</div>
      <div>fit布局15</div>
      <div>fit布局16</div>
      <div>fit布局17</div>
      <div>fit布局18</div>
      <div>fit布局19</div>
    </div></base-fit-layout
  >
</template>

<script>
export default {};
</script>
<style lang="less" module>
.inner-box {
  .full-y;

  color: rgba(255, 255, 255);
  background-color: rgba(74, 138, 244, 0.6);
  > div {
    padding: 20px 0;
  }
  > div:first-child {
    color: black;
  }
}
</style>
