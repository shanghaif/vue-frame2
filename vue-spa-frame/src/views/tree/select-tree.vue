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
    <div>
      <p>tree 禁用</p>
      <base-select-tree
        :width="200"
        api="common/getTree"
        v-model="treeValue3"
        displayField="label"
        :lazy="false"
        :multiple="true"
        :collapse-tags="false"
        disabled
        prefixLabel="--"
        :default-expanded-keys="[10, 6]"
        v-if="true"
      ></base-select-tree>
    </div>
    <div>
      <p>手动打开tree</p>
      <el-button type="primary" @click="onOpen">打开tree面板</el-button>
    </div>
    <div>
      <p>深层级</p>
      <base-select-tree
        :width="200"
        api="common/complicateTree"
        display-field="menuName"
        v-model="treeValue3"
        :lazy="false"
        :multiple="true"
        v-if="true"
      ></base-select-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeValue1: [10, 6], // 默认选中
      treeValue2: 10, // 单选（单选其实在树上面没有选中效果）
      treeValue3: [10, 6]
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
  },
  methods: {
    onOpen() {
      // 手动打开 下拉树面板
      this.$refs.bbb.handOpenTree();
    }
  }
};
</script>

<style></style>
