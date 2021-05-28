<template>
  <div :class="$style.box">
    <p>静态资源（根据数据中的 check 进行了一个默认选中效果）：</p>
    <div :class="$style.optionsTree">
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
    <p>节点禁用-复选（需要源数据中每个节点设置 disabled 属性）</p>
    <div :class="$style.treeMultipleNodeDisabled">
      <base-tree
        ref="select-tree-1-ref"
        :width="200"
        api="common/getTree"
        displayField="label"
        :lazy="false"
        :show-checkbox="true"
        :default-expand-all="true"
        :default-checked-keys="[6]"
        :disabledNodes="[7, 13, 9]"
      ></base-tree>
    </div>
    <p>节点禁用-单选（需要源数据中每个节点设置 disabled 属性）</p>
    <div :class="$style.treeNodeDisabled">
      <base-tree
        ref="select-tree-2-ref"
        :width="200"
        api="common/getTree"
        displayField="label"
        :lazy="false"
        :show-checkbox="false"
        :default-expand-all="true"
        :disabledNodes="[7, 13, 9]"
        handleIcon=""
      >
        <span
          :class="spaceDisabledStatus(node) ? 'settleSpaceDisabledNode' : ''"
          slot-scope="{ node }"
        >
          <span>{{ node.label }}</span>
        </span>
      </base-tree>
    </div>
    <p>select-tree 下拉tree 禁用节点-单选（点击被禁用的节点下拉框不会消失）</p>
    <div :class="$style.selectTreeNodeDisabled">
      <base-select-tree
        ref="select-tree-1-ref"
        :width="200"
        api="common/getTree"
        v-model="treeValue1"
        displayField="label"
        :lazy="false"
        :multiple="false"
        :collapse-tags="false"
        :default-expand-all="true"
        :disabledNodes="[7, 13, 9]"
      >
        <div
          :class="spaceDisabledStatus(node) ? 'settleSpaceDisabledNode' : ''"
          slot-scope="{ node }"
        >
          {{ node.label }}
        </div>
      </base-select-tree>
    </div>
  </div>
</template>

<script>
import _isUndefined from 'lodash/isUndefined';

export default {
  data() {
    return {
      data: [
        {
          label: '一级 1',
          id: 1,
          children: [
            {
              id: 2,
              label: '二级 1-1',
              check: true // 默认选中当前节点
            },
            {
              id: 3,
              label: '二级 1-2'
            }
          ]
        }
      ],
      treeValue1: [],
      disabledSpace: [7, 13, 9]
    };
  },
  methods: {
    /**
     * @description 设置树节点的禁用状态
     */
    spaceDisabledStatus(node) {
      if (node.disabled) return true;

      if (!this.disabledSpace.length) return false;

      const status = this.disabledSpace.find(item => {
        return item === node.data.id;
      });

      return !_isUndefined(status);
    }
  }
};
</script>
<style lang="less">
.settleSpaceDisabledNode {
  color: rgba(192, 196, 204);
  cursor: not-allowed;
}
</style>
<style lang="less" module>
.box {
  height: 100%;
  overflow: auto;
  .options-tree {
    max-width: 250px;
    height: 170px;
    border: 1px solid rgb(206, 210, 215);
  }
  .tree-multiple-node-disabled,
  .tree-node-disabled {
    max-width: 250px;
    height: 450px;
    border: 1px solid rgb(206, 210, 215);
  }
}
</style>
