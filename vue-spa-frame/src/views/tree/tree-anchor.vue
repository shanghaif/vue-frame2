<template>
  <div id="anchor" :class="$style.anchor">
    <base-tree-anchor
      :ctCls="$style.anchorLeft"
      :list="enterpriseTree"
      containerId="anchorContent"
      treeItemClass="section-item"
      title="锚点树"
      ref="anchorTree"
      @activeAnchor="getActiveAnchor"
    ></base-tree-anchor>
    <!-- 所有的子节点必须拥有相同的class -->
    <div id="anchorContent" :class="$style.anchorContent">
      <div
        class="section-item"
        :id="item.name"
        :class="$style.anchorContentItem"
        v-for="item of treeList"
        :key="item.name"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script>
import { enterpriseTree } from '@constant';
import { getTreeMap } from '@utils';

export default {
  data() {
    return {
      enterpriseTree: enterpriseTree,
      treeList: [],
      activeAnchor: ''
    };
  },
  created() {
    this.treeList = getTreeMap(enterpriseTree);
  },
  methods: {
    /**
     * @description 获取当前的锚点
     */
    getActiveAnchor(data) {
      console.log(data);
      this.activeAnchor = data;
    }
  }
};
</script>
<style lang="less" module>
.anchor {
  .full-y;

  overflow: auto;
  .anchor-left {
    position: fixed;
  }

  &-content {
    height: 800px;
    margin-left: 300px;
    overflow: auto;
    &-item {
      width: 800px;
      height: 400px;
      margin-bottom: 40px;
      background: rgb(199, 131, 131);
    }
  }

  &-content::-webkit-scrollbar {
    display: none !important;
  }
}
</style>
