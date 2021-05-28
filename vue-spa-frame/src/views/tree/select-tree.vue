<template>
  <div :class="$style.selectTreeBox">
    <div>
      <p>1：多选-选中</p>
      <p>
        如果需要修改获取的 value 值，请同时设置 valueField 和
        nodeKey，如：valueField="code" nodeKey="code"
      </p>
      <p>disabledNodes 用于禁用节点的配置</p>
      <p>isRenderSearchInput 是否生成下拉框中树的搜索框组件</p>
      <div style="margin: 10px 0;">
        <el-button type="primary" @click="onClear">清空选择项</el-button>
        <el-button type="primary" @click="onClearTree">清空树组件</el-button>
        <el-button type="primary" @click="onRemove">移除一个选中项</el-button>
      </div>
      <base-select-tree
        ref="select-tree-1-ref"
        :width="200"
        api="common/getTree"
        v-model="treeValue1"
        displayField="label"
        :lazy="false"
        :multiple="true"
        :collapse-tags="false"
        prefixLabel="--"
        :default-expanded-keys="[10, 6]"
        :default-checked-keys="[10, 6, 3, 2]"
        :disabledNodes="[4]"
        :isRenderSearchInput="true"
      ></base-select-tree>
      {{ treeValue1 }}
    </div>
    <div>
      <p>
        2：单选-选中（单选其实在树上面没有选中效果）（下拉树自定义插槽展示节点内容）
      </p>
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
      >
        <span slot-scope="{ node }">
          {{ node.id }}
        </span>
        <template v-slot:handleMenuScope="{ node }">
          <span style="display: none;">{{ node.id }}</span>
        </template>
      </base-select-tree>
      {{ treeValue2 }}
    </div>
    <div>
      <p>3：tree 禁用</p>
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
      <p>4：手动打开tree</p>
      <el-button type="primary" @click="onOpen">打开tree面板</el-button>
    </div>
    <div>
      <p>5：深层级</p>
      <base-select-tree
        :width="200"
        api="common/complicateTree"
        display-field="menuName"
        v-model="treeValue3"
        :lazy="false"
        :multiple="true"
      ></base-select-tree>
    </div>
    <div>
      <p>6：静态数据（store数据延迟2秒加载）</p>
      <base-select-tree
        ref="store-select-tree"
        :width="200"
        api=""
        display-field="label"
        v-model="treeValue4"
        :lazy="false"
        :multiple="false"
        :store="data"
      ></base-select-tree>
      {{ treeValue4 }}
    </div>
    <div>
      <p>
        7：手动执行查询 `isReloadTree`，只能选取最里面一层`isSelectedLastNode`
      </p>
      <div style="margin: 10px 0;">
        <el-button type="primary" @click="onSearch">生成数据</el-button>
      </div>
      <base-select-tree
        ref="select-tree-5-ref"
        :width="200"
        api="common/complicateTree"
        display-field="menuName"
        v-model="treeValue5"
        :isSelectedLastNode="true"
        :lazy="false"
        :multiple="true"
        :isReloadTree="false"
        :isRenderRoot="true"
        :isExpandFirstPath="false"
      ></base-select-tree>
      {{ treeValue5 }}
    </div>
    <div>
      <p>
        8：属性 showAllLevels 定义了是否显示完整的路径，将其赋值为 false
        则仅显示最后一级
      </p>
      <base-select-tree
        ref="select-tree-6-ref"
        :width="260"
        api="common/complicateTree"
        display-field="menuName"
        v-model="treeValue6"
        :lazy="false"
        :multiple="true"
        :showAllLevels="true"
        :collapse-tags="false"
        :isRenderRoot="false"
        :default-expanded-keys="[26, 28, 18]"
      ></base-select-tree>
      {{ treeValue6 }}
    </div>
    <div>
      <p>
        9：selectedLevel 选取的层级，<span style="color: red;"
          >不能和 isSelectedLastNode 同时设置</span
        >
      </p>
      <base-select-tree
        ref="select-tree-7-ref"
        :width="260"
        api="common/complicateTree"
        display-field="menuName"
        v-model="treeValue7"
        :lazy="false"
        :multiple="true"
        :showAllLevels="true"
        :collapse-tags="false"
        :isRenderRoot="false"
        :selectedLevel="2"
      ></base-select-tree>
      {{ treeValue7 }}
    </div>
    <div>
      <p>
        10. 多选，父子级联，显示完整的路径-多选时如果超出 150px
        的默认高度那么input框中的内容会出现滚动条
      </p>
      <base-select-tree
        ref="more-select-tree"
        :width="250"
        :treeWidth="250"
        :multiple="true"
        :check-strictly="false"
        :isRenderRoot="false"
        :props="defaultProps"
        :collapse-tags="false"
        api="common/getIndustryTree"
        v-model="industry"
        displayField="industryname"
        :class="$style.searchSelect"
        valueField="code"
        :lazy="false"
        :isSelectedLastNode="false"
        :showAllLevels="true"
        :listeners="{
          change: onSearch1
        }"
      ></base-select-tree>
      <div>{{ industry }}</div>
    </div>
    <div>
      <p>
        11：某一层级下最多只能选中几个节点，当前层级下的子节点仍旧可以选择，但处于这一层级的同级别点就不能进行选择。
      </p>
      <p>
        多选-树的父子级联设置为 false
        ，但是勾选一个子节点需要同时选中上层未选中的父节点，如果父节点取消那么里面的所有子节点都同时取消
      </p>
      <p>
        有时候我们选中了树的节点但是又不想把选中节点的v-model值显示在对应的文本框中
      </p>
      <div>
        所有一级节点的第二层节点最多只能选中两个
        <pre>:maxItemObj="{ level: 1, max: 2 }"</pre>
        <pre>:checkStrictlyFalseCancelChildChecked="true"</pre>
      </div>
      <p>使用时最好两个参数配合使用</p>
      <base-select-tree
        ref="select-tree-11-ref"
        :width="200"
        api="common/getTree"
        v-model="treeValue11"
        displayField="label"
        :lazy="false"
        :multiple="true"
        :isRenderRoot="false"
        :default-expand-all="true"
        :collapse-tags="false"
        :checkStrictlyFalseCancelChildChecked="true"
        :maxItemObj="{ level: 1, max: 2 }"
      ></base-select-tree>
      {{ treeValue11 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.defaultProps = {
      children: 'children',
      label: 'industryname',
      value: 'id'
    };
    return {
      treeValue1: [10, 6, 3], // 默认选中
      treeValue2: 10, // 单选（单选其实在树上面没有选中效果）
      treeValue3: [10, 6],
      treeValue4: '',
      treeValue5: '',
      treeValue6: [26, 28, 18],
      treeValue7: [],
      treeValue11: [],
      data: [
        /* {
          label: '一级 1',
          id: 100,
          children: [
            {
              id: 101,
              label: '二级 1-1'
            },
            {
              id: 102,
              label: '二级 1-2'
            }
          ]
        } */
      ],
      industry: []
    };
  },
  created() {
    console.info(this.$dict.get('DICT_0'));
    this.$nextTick(() => {
      // console.info('this.$refs.bbb.treeUserRef ', this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef]);
      // this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef].getTree().setCurrentKey(10);
      setTimeout(() => {
        // console.info(this.$refs.bbb.$refs[this.$refs.bbb.treeUserRef].getTree().getNode(10));
        // 延迟加载静态资源的树数据
        this.data = [
          {
            label: '一级 1',
            id: 100,
            children: [
              {
                id: 101,
                label: '二级 1-1'
              },
              {
                id: 102,
                label: '二级 1-2'
              }
            ]
          }
        ];
        this.$nextTick(() => {
          this.$refs['store-select-tree'] &&
            this.$refs['store-select-tree'].getTree().refreshAll();
        });
      }, 2000);
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
    onSearch(event) {
      this.$refs['select-tree-5-ref']
        .getTree()
        .setQueryParams({ name: '查询值' });
      this.$refs['select-tree-5-ref'].getTree().refreshAll();
    },
    onOpen() {
      // 手动打开 下拉树面板
      this.$refs.bbb.handOpenTree();
    },
    onClear() {
      // this.$refs['select-tree-1-ref'].getTree().clearData();
      this.treeValue1 = [];
    },
    onClearTree() {
      this.$refs['select-tree-1-ref'].getTree().clearData();
    },
    onSearch1(nodes) {
      console.log('nodes', nodes);
    },
    selectTreeChange(curSelectValueList) {
      console.log('树的选中取消事件', curSelectValueList);
    },
    onRemove() {
      this.treeValue1.splice(0, 1); // splice 移除也可以
      // this.treeValue1 = [6, 3];
    },
    // 外部搜索过滤函数
    filterNodeMethodHandle(value, data) {
      return ~_get(data, 'label').indexOf(value);
    },
    onFirstTreeCheck(node, treeCheckedNode) {
      console.log('tree check', node, treeCheckedNode);
    }
  }
};
</script>

<style lang="less" module>
.select-tree-box {
  .full-y;

  box-sizing: border-box;
  padding-bottom: 200px;
  overflow: auto;
}
.search-select {
}
</style>
