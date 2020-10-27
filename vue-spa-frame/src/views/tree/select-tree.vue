<template>
  <div>
    <base-select-tree
      :width="200"
      api="common/getTree"
      v-model="treeValue1"
      displayField="label"
      :lazy="false"
      :multiple="true"
      :collapse-tags="false"
      prefixLabel="--"
    ></base-select-tree>
    {{ treeValue1 }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeValue1: [10, 6] // 默认选中
    };
  },
  created() {
    console.info(this.$dict.get('DICT_0'));
  },
  mounted() {
    // this.$nextTick(() => {
    // setTimeout(() => {
    console.info(this.$dict);
    // }, 2000);
    // });
  }
};
</script>

<style></style>
