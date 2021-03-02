<template>
  <div :class="$style.box">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <div>
          border布局：border布局也称边界布局，他将页面分隔为west,east,south,north,center这五个部分，我们需要在其slot中指定使用方位参数为其子元素指定具体位置。
        </div>
        <p>
          注意：north和south部分只能设置高度（height），west和east部分只能设置宽度（width）。north
          south west east区域变大，center区域就变小了。
        </p>
      </template>
      <template v-slot:center>
        center
      </template>
      <template v-slot:west>
        west
      </template>
      <template v-slot:east>
        east
      </template>
      <template v-slot:south>
        south
      </template>
    </base-border-layout>
  </div>
</template>

<script>
export default {
  data() {
    this.layout = {
      northHeight: '64px',
      westWidth: '120px',
      eastWidth: '120px',
      southHeight: '100px',
      northCls: this.$style.northCls,
      westCls: this.$style.westCls,
      eastCls: this.$style.eastCls,
      southCls: this.$style.southCls,
      centerCls: this.$style.centerCls,
      isPadding: false
    };
    return {};
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .north-cls {
    background-color: rgba(221, 81, 69, 0.5);
  }
  .west-cls {
    background-color: rgba(26, 161, 95, 0.5);
  }
  .east-cls {
    background-color: rgba(74, 138, 244, 0.5);
  }
  .south-cls {
    background-color: rgba(255, 205, 66, 0.5);
  }
  .center-cls {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
