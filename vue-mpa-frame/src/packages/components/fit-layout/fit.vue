<template>
  <el-container :class="{ 'fit-layout-container': true, [ctCls]: ctCls }">
    <el-main :class="noPaddingCls">
      <el-scrollbar style="height: 100%"> <slot name="default"/></el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'BaseFitLayout',
  props: {
    // 一个可选添加的CSS样式类，加入到组件的容器上（默认为''）。
    ctCls: {
      type: String
    },
    // 是否需要 padding
    isPadding: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    noPaddingCls() {
      return this.isPadding ? '' : 'no-padding-cls';
    }
  },
  data() {
    this.desc = 'fit 布局，一个子元素将填充满整个容器（只接受一个子元素）';
    return {};
  }
};
</script>
