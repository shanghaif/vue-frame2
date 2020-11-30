<template>
  <div>
    <div>
      <p>多选-选中</p>
      <base-select-tree
        :width="200"
        api="common/getTree"
        v-model="treeValue1"
        displayField="label"
        :lazy="false"
        :multiple="true"
        :collapse-tags="false"
        prefixLabel="--"
        :default-expanded-keys="[10, 6]"
        v-if="true"
      ></base-select-tree>
      {{ treeValue1 }}
    </div>
    <div>
      <p>单选-选中（单选其实在树上面没有选中效果）</p>
      <base-select-tree
        ref="bbb"
        :width="200"
        api="common/getTree"
        v-model="treeValue2"
        displayField="label"
        :lazy="false"
        :multiple="false"
        :default-expanded-keys="[10]"
        prefixLabel="--"
        v-if="true"
      ></base-select-tree>
      {{ treeValue2 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeValue1: [10, 6], // 默认选中
      treeValue2: 10 // 单选（单选其实在树上面没有选中效果）
    };
  },
  created() {
    console.info(this.$dict.get('DICT_0'));
    this.$nextTick(() => {
      // console.info('this.$refs.bbb.treeUserRef ', this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef]);
      // this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef].getTree().setCurrentKey(10);
      /* setTimeout(() => {
        console.info(this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef].getTree().getNode(10));
      }, 2000); */
    });
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
