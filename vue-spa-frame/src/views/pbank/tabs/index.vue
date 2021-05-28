<template>
  <div :class="$style.box">
    <base-tabs v-model="activeName" @tab-click="handleClick">
      <base-tab-pane label="用户管理" name="first"
        >用户管理-<span class="f-18"
          >这是一个可以自动撑满内容面板的扩展el-tabs组件</span
        ></base-tab-pane
      >
      <base-tab-pane
        ><span slot="label"><i class="el-icon-date"></i> 配置管理</span
        >配置管理</base-tab-pane
      >
      <base-tab-pane label="角色管理" name="third">角色管理</base-tab-pane>
    </base-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    /**
     * @desc tab 被选中时触发
     */
    handleClick(tab, event) {
      console.log('tab 被选中时触发', tab, event);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  :global .el-tabs__content {
    background-color: rosybrown;
  }
}
</style>
