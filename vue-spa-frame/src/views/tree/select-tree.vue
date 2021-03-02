<template>
  <div :class="$style.selectTreeBox">
    <div>
      <p>1：多选-选中</p>
      <p>
        如果需要修改获取的 value 值，请同时设置 valueField 和
        nodeKey，如：valueField="code" nodeKey="code"
      </p>
      <p>disabledNodes 用于禁用节点的配置</p>
      <div style="margin: 10px 0;">
        <el-button type="primary" @click="onClear">清空</el-button>
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
        :default-checked-keys="[10, 6]"
        :disabledNodes="[4]"
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
      treeValue1: [10, 6], // 默认选中
      treeValue2: 10, // 单选（单选其实在树上面没有选中效果）
      treeValue3: [10, 6],
      treeValue4: '',
      treeValue5: '',
      treeValue6: [26, 28, 18],
      treeValue7: [],
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
      this.$refs['select-tree-1-ref'].getTree().clearData();
    },
    onSearch1(nodes) {
      console.log('nodes', nodes);
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
