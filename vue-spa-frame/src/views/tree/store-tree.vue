<template>
  <div style="height: 100%;">
    <base-tree
      ref="store-tree-ref"
      api=""
      display-field="label"
      :lazy="false"
      rootLabel="菜单"
      :is-render-root="true"
      :show-checkbox="true"
      :default-expand-all="true"
      handleIcon="el-icon-plus"
      icon-class="el-icon-right"
      :isRender="true"
      :store="data"
    >
    </base-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              check: true // 默认选中当前节点
            },
            {
              label: '二级 1-2'
            }
          ]
        }
      ]
    };
  }
};
</script>
