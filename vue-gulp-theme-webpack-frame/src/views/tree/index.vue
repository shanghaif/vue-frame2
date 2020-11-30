<template>
  <div>
    <div style="width: 300px;">
      <div>
        <p>不是懒加载（不配置根节点）</p>
        <base-tree
          api="common/getTree"
          display-field="label"
          :handleMenu="menu"
          :lazy="false"
          :is-render-root="false"
          :show-checkbox="true"
          :isRender="false"
        ></base-tree>
      </div>
      <div>
        <p>懒加载（配置根节点，复杂 tree 的使用）</p>
        <base-tree
          ref="complicate-tree-ref"
          api="common/getTree"
          display-field="label"
          :lazy="true"
          :handleMenu="menu"
          :is-render-root="true"
          :show-checkbox="true"
          handleIcon="el-icon-plus"
          icon-class="el-icon-right"
          @editNodeHandle="editNodeHandle"
        >
          <!-- 自定义树节点的内容 -->
          <span class="custom-tree-node" slot-scope="{ node }">
            <!-- 可以在 node 对象中存放一个 icon 的字段用于配置节点的小图标 :class="node.id===2 ? 'el-icon-light-rain' : 'el-icon-delete'-->
            <span>
              <i v-if="node.data.id === 1" :class="'el-icon-sunrise'"
                >{{ node.label }}-{{ node.data.id }}</i
              >
              <i v-else-if="node.data.id === 2" :class="'el-icon-light-rain'"
                >{{ node.label }}-{{ node.data.id }}</i
              >
              <i v-else :class="'el-icon-delete'"
                >{{ node.data.label }}-{{ node.data.id }}</i
              >
            </span>
          </span>
          <template v-slot:handleMenuScope="{ node }">
            <!-- 这里不能再写 el-dropdown，因为内部已经用掉了这个元素 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{ node.label }}</el-dropdown-item>
              <el-dropdown-item command="edit">编辑</el-dropdown-item>
              <el-dropdown-item command="add">新增</el-dropdown-item>
              <el-dropdown-item command="delete" divided :isClose="false">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </base-tree>
      </div>
      <!-- <template v-slot:default="{ node }">
        <span>123：{{ node.label }}</span>
      </template> -->
      <!-- <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
          <span>
            <el-dropdown trigger="click" :hide-on-click="true">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item divided>新增</el-dropdown-item>
                <el-dropdown-item divided>重命名</el-dropdown-item>
                <el-dropdown-item divided>授权</el-dropdown-item>
                <el-dropdown-item divided>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </span> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
        text: '重命名',
        command: 'rename',
        listeners: {
          click: () => {
            console.info('重命名');
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
            console.info('删除', node, data);
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
        listeners: {
          onConfirm: ({ node, data }) => {
            console.info('确认事件');
          },
          onCancel: () => {
            console.info('onCancel');
          }
        }
      }
    ];
    return {};
  },
  methods: {
    /**
     * @desc 点击菜单项触发的事件回调
     */
    onDropDownMenu(val) {
      console.info('点击菜单项触发的事件回调', val);
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
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
