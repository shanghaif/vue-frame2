<template>
  <el-container class="base-border-layout">
    <el-header :class="[northCls,noPaddingCls]" :height="northHeight">
      <slot name="north" />
    </el-header>
    <el-container>
      <el-aside :class="[westCls,noPaddingCls]" :width="westWidth">
        <slot name="west" />
      </el-aside>
      <el-main :class="[centerCls,noPaddingCls]">
        <slot name="center" />
      </el-main>
      <el-aside :class="[eastCls,noPaddingCls]" :width="eastWidth">
        <slot name="east" />
      </el-aside>
    </el-container>
    <el-footer :class="[southCls,noPaddingCls]" :height="southHeight">
      <slot name="south" />
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'BaseBorderLayout',
  props: {
    northHeight: {
      type: String,
      default: '60px'
    },
    westWidth: {
      type: String,
      default: '300px'
    },
    eastWidth: {
      type: String,
      default: '300px'
    },
    southHeight: {
      type: String,
      default: '60px'
    },
    // 自定义样式
    northCls: {
      type: String
    },
    westCls: {
      type: String
    },
    eastCls: {
      type: String
    },
    southCls: {
      type: String
    },
    centerCls: {
      type: String
    },
    // 是否需要 padding
    isPadding: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.desc =
      'border布局，将容器分为五个区域：east、south、west、north、center';
    return {};
  },
  computed: {
    noPaddingCls() {
      return this.isPadding ? '' : 'no-padding-cls';
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  overflow: hidden;
}
.el-header,
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  // text-align: center;
}
.el-aside {
  // background-color: #d3dce6;
  color: #333;
  // text-align: center;
  // line-height: 100px;
}
.el-main {
  // background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
.no-padding-cls{
  padding: 0px;
}
</style>
