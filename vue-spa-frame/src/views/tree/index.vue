<template>
  <div>
    <div style="width: 300px;">
      <div>
        <p>懒加载（不配置根节点）</p>
        <div style="margin: 10px 0;">
          <el-button type="primary" @click="onClear">清空</el-button>
          <el-button type="primary" :disabled="true" @click="onGetData"
            >获取数据</el-button
          >
          <p>（懒加载模式下，清空在获取数据未支持）</p>
        </div>
        <base-tree
          ref="tree-ref"
          api="common/getTree"
          display-field="label"
          :handleMenu="menu"
          :lazy="true"
          :is-render-root="false"
          :show-checkbox="true"
          :isRender="true"
          @editNodeHandle="editSimpleNodeHandle"
        ></base-tree>
      </div>
      <div>
        <p>不是懒加载（配置根节点，复杂 tree 的使用）</p>
        <p>
          新增事件 `addNodeHandle`
          会取消默认的增加节点逻辑，如果需要使用默认新增加逻辑就不要传递`addNodeHandle`
        </p>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <base-tree
          ref="complicate-tree-ref"
          api="common/getTree"
          display-field="label"
          :lazy="false"
          :handleMenu="menu"
          :is-render-root="true"
          :show-checkbox="true"
          handleIcon="el-icon-plus"
          icon-class="el-icon-right"
          @editNodeHandle="editNodeHandle"
          @deleteNodeHandle="deleteNodeHandle"
          @addNodeHandle="addNodeHandle"
          :isRender="true"
          :filter-node-method="filterNode"
        >
          <!-- 自定义树节点的内容 -->
          <span class="custom-tree-node" slot-scope="{ node }">
            <!-- 可以在 node 对象中存放一个 icon 的字段用于配置节点的小图标 :class="node.id===2 ? 'el-icon-light-rain' : 'el-icon-delete'-->
            <span>
              <i v-if="node.data.id === 1" :class="'el-icon-sunrise'"
                >{{ node.label
                }}<!--- {{ node.data.id }}--></i
              >
              <i v-else-if="node.data.id === 2" :class="'el-icon-light-rain'"
                >{{ node.label
                }}<!-- -{{ node.data.id }}--></i
              >
              <i v-else :class="'el-icon-delete'"
                >{{ node.data.label
                }}<!-- -{{ node.data.id }}--></i
              >
            </span>
          </span>
          <template v-slot:handleMenuScope="{ node }">
            <!-- 这里不能再写 el-dropdown，因为内部已经用掉了这个元素 -->
            <template v-if="node.level !== 1">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a"
                  ><span @click="onOtherClick">{{
                    node.label
                  }}</span></el-dropdown-item
                >
                <el-dropdown-item command="edit" divided>编辑</el-dropdown-item>
                <el-dropdown-item command="add">新增</el-dropdown-item>
                <el-dropdown-item command="delete" divided :isClose="false">
                  <el-popconfirm
                    title="确定删除操作吗？"
                    @confirm="onNodeDelete"
                  >
                    <span slot="reference" style="display: block;">删除</span>
                  </el-popconfirm>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </template>
          <!-- 自定义右侧更多图标，`handleIcon`属性会无效 -->
          <template v-slot:handleIconScope="{ node }">
            <i v-if="node.level === 1" class="el-icon-plus" @click="onPlus"></i>
            <i v-else class="el-icon-more"></i>
          </template>
        </base-tree>
      </div>
    </div>
  </div>
</template>

<script>
import _isNil from 'lodash/isNil';
// 默认的 command 只有三个 add、delete、edit
export default {
  watch: {
    filterText(val) {
      this.$refs['complicate-tree-ref'].getTree().filter(val);
    }
  },
  data() {
    // command 指令只能出现一个
    this.menu = [
      {
        text: '新增',
        command: 'add',
        listeners: {
          click: ({ node, data }) => {
            console.info('新增', node, data);
          }
        }
      },
      {
        text: '编辑',
        command: 'edit',
        listeners: {
          click: () => {
            console.info('编辑');
          }
        }
      },
      {
        text: '授权',
        listeners: {
          click: () => {
            console.info('授权');
          }
        }
      },
      {
        listeners: {
          click: ({ node, data }) => {
            console.info('取消', node, data);
          }
        },
        render: h => {
          return h('span', { style: { color: 'red' } }, ['取消']);
        }
      },
      {
        isClose: false, // 点击后不关闭下拉面板
        text: '删除',
        isPopconfirm: true, // 默认 气泡确认框
        title: '确认删除吗？',
        command: 'delete',
        listeners: {
          onConfirm: ({ node, data }) => {
            console.info('确认事件');
            this.deleteSimpleNodeHandle(node, data, 'delete');
          },
          onCancel: () => {
            console.info('onCancel');
          }
        }
      }
    ];
    this.dialog = null;
    return {
      filterText: '',
      visible: false,
      node: null,
      addNode: null,
      newInput: ''
    };
  },
  created() {
    this.$nextTick(this.createDialog);
  },
  methods: {
    createDialog() {
      this.dialog = this.$baseDialog({
        component: () => {
          return this.$createElement('div', {}, [
            this.$createElement(
              'el-input',
              {
                attrs: { placeholder: '请输入内容', maxlength: '20' },
                props: {
                  value: this.newInput,
                  'show-word-limit': true
                },
                on: {
                  input: val => {
                    this.newInput = val;
                  }
                }
              },
              []
            )
          ]);
        },
        container: this.$el,
        width: '300px',
        // center: true,
        isDestroy: true,
        title: '新增',
        buttons: [
          {
            props: () => ({
              type: 'primary'
            }),
            on: {
              click: this.onSubmitReset
            },
            text: '确定'
          }
        ]
      });
    },
    /**
     * @desc 编辑、重置回调事件
     * @params {Object} node - 当前的节点
     * @params {String} value - 编辑的值
     * @params {Object} event - 点击的事件对象
     */
    editNodeHandle(node, value, event) {
      console.info('编辑、重置回调事件 ', node, value, event);
      // 业务逻辑（如：发送请求）
      this.$refs['complicate-tree-ref'].updateNode(node, { label: value }); // 设置当前节点
    },
    /**
     * @desc 编辑、重置回调事件-简单树
     */
    editSimpleNodeHandle(node, value, event) {
      console.info('编辑、重置回调事件 ', node, value, event);
      // 业务逻辑（如：发送请求）
      this.$refs['tree-ref'].updateNode(node, { label: value }); // 设置当前节点
    },
    /**
     * @desc 新增节点
     * @param {node} node - 当前节点
     * @param {data} data - 当前节点对应的数据 {id: '',value: '',label: '', children: []}
     * @param {node} command - 对象下拉菜单的`command`
     */
    addNodeHandle(node, data, command) {
      console.info('新增节点');
      // 业务逻辑（如：打开窗口）
      this.addNode = node;
      this.createDialog();
      this.dialog.open();
    },
    /**
     * @desc 新增加确定按钮
     */
    onSubmitReset() {
      console.info('新增加确定按钮', this.newInput);
      // 业务逻辑（如：发送请求）
      if (this.newInput.length > 0) {
        const data = { id: 2020, label: this.newInput, children: [] }; // 节点 id 应该是后台返回，或者这里可以刷新整棵树
        this.$refs['complicate-tree-ref'].insertNode(this.addNode, data);
      }
      this.dialog.close();
    },
    /**
     * @desc 删除节点
     *
     */
    deleteNodeHandle(node, data, command) {
      console.info('删除节点事件');
      this.node = node;
      // 业务逻辑（如：二次确认、发送请求）
      // this.$refs['complicate-tree-ref'].deleteNode(node); // 删除节点，如果有 `el-popconfirm` 二次确认框就不要调用这步，写到 `confirm` 事件里面区
    },
    /**
     * @desc 点击确认按钮时触发
     */
    onNodeDelete() {
      console.info('确认删除', this.node);
      // 业务逻辑（如：二次确认、发送请求）
      if (!_isNil(this.node)) {
        this.$refs['complicate-tree-ref'].deleteNode(this.node); // 删除节点
      }
    },
    /**
     * @desc 删除节点 - 简单树
     */
    deleteSimpleNodeHandle(node, data, command) {
      console.info('删除节点 - 简单树', node, data, command);
      // 业务逻辑（如：二次确认、发送请求）
      this.$refs['tree-ref'].deleteNode(node); // 删除节点
    },
    onPlus() {
      console.info('一级节点点击');
    },
    /**
     * @desc tree 的搜索
     */
    filterNode(value, data) {
      console.info(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * @desc 清空tree数据
     */
    onClear() {
      this.$refs['tree-ref'].clearData();
    },
    /**
     * @desc 获取 tree 的数据
     */
    onGetData() {
      this.$refs['tree-ref'].refreshAll();
    },
    onOtherClick() {
      alert('bbbbbb');
    }
  }
};
</script>

<style>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;
}
</style>
