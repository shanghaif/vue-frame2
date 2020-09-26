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
        ></base-tree>
      </div>
      <div>
        <p>懒加载（配置根节点）</p>
        <base-tree
          api="common/getTree"
          display-field="label"
          :handleMenu="menu"
          :lazy="true"
          :is-render-root="true"
          :show-checkbox="true"
        ></base-tree>
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
        listeners: {
          click: ({ node, data }) => {
            console.info('新增', node, data);
          }
        }
      },
      {
        text: '重命名',
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
