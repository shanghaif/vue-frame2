<template>
  <div :class="$style.box">
    <h3>媒体属性示例</h3>
    <div>说明</div>
    <ul>
      <li>插件：postcss-media-minmax@3.0.0 postcss-custom-media@7.0.5</li>
      <li>
        使用：在 postcss.config.js
        中引入上面的两个插件，并定义了两个媒体属性区间
        `--small-viewport`和`--big-viewport`
      </li>
    </ul>
    <div>1440 和 500 的尺寸下面文字的颜色会变成 红色</div>
    <div>1440 和 1920 的尺寸下面文字的颜色会变成 黄色</div>
    <div :class="$style.mediaTestCls">未来工厂</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" module>
.box {
  .full-y;

  @media (--small-viewport) {
    @blue1: red;

    .media-test-cls {
      margin-top: 60px;
      font-size: 18px;
      color: @blue1;
    }
  }
  @media (--big-viewport) {
    @blue1: yellow;

    .media-test-cls {
      margin-top: 60px;
      font-size: 22px;
      color: @blue1;
    }
  }
}
</style>
