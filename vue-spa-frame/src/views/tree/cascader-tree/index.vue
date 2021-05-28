<template>
  <div :class="$style.box">
    <div class="mb-20">级联tree（父子tree，只支持两个单选tree）</div>
    <div class="mb-10 mt-10">选择的子tree的值：{{ value }}</div>
    <div class="mb-10 mt-10">
      如果需要获取父tree的选择值请调用 `getParentTreeValue` 方法
    </div>
    <base-cascader-tree v-model="value" v-bind="params" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      params: {
        parent: {
          width: 300,
          api: 'common/getTree',
          lazy: false,
          'collapse-tags': false,
          displayField: 'label',
          multiple: false,
          placeholder: '请选择下拉选项',
          isRenderRoot: false
        },
        child: {
          width: 200,
          api: 'common/complicateTree',
          lazy: false,
          'collapse-tags': false,
          displayField: 'menuName',
          multiple: false,
          isRenderRoot: false,
          isRenderSearchInput: true
        },
        searchField: 'id'
      }
    };
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
}
</style>
