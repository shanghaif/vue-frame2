<template>
  <div :class="$style.box">
    <base-border-layout v-bind="layout">
      <template v-slot:west>
        <base-tree
          ref="complicate-tree-ref"
          api="common/complicateTree"
          display-field="menuName"
          :lazy="false"
          :handleMenu="menu"
          rootLabel="菜单"
          :is-render-root="true"
          :show-checkbox="true"
          :default-expand-all="true"
          handleIcon="el-icon-plus"
          icon-class="el-icon-right"
          @editNodeHandle="editNodeHandle"
          @deleteNodeHandle="deleteNodeHandle"
          @addNodeHandle="addNodeHandle"
          :isRender="true"
          :filter-node-method="filterNode"
          :default-checked-keys="[12]"
          :disabledNodes="[8]"
        >
          <!-- 自定义树节点的内容 -->
          <span class="custom-tree-node" slot-scope="{ node }">
            <!-- 可以在 node 对象中存放一个 icon 的字段用于配置节点的小图标 :class="node.id===2 ? 'el-icon-light-rain' : 'el-icon-delete'-->
            <span>
              {{ node.data.menuName }}
            </span>
          </span>
          <template v-slot:handleMenuScope="{ node }">
            <!-- 这里不能再写 el-dropdown，因为内部已经用掉了这个元素 -->
            <template v-if="node.level !== 1">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">{{
                  node.label
                }}</el-dropdown-item>
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
      </template>
      <template v-slot:center>
        tree 组件滚动样式
        <p>基金募集管理 这个节点被设置为禁用了</p>
        <p>
          disabledNodes 属性是禁用节点的配置，数组传递 `valueField`
          所配置的字段值
        </p>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
export default {
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
          },
          onCancel: () => {
            console.info('onCancel');
          }
        }
      }
    ];
    this.layout = {
      northHeight: '0px',
      westWidth: '270px',
      eastWidth: '0px',
      southHeight: '0px',
      westCls: this.$style.westCls,
      centerCls: this.$style.centerCls
    };
    return {};
  },
  methods: {
    editNodeHandle(node, value, event) {
      console.info('编辑、重置回调事件 ', node, value, event);
    },
    deleteNodeHandle(node, data, command) {
      console.info('删除节点事件');
      this.node = node;
    },
    addNodeHandle(node, data, command) {
      console.info('新增节点');
      // 业务逻辑（如：打开窗口）
    },
    filterNode(value, data) {
      console.info(value, data);
    },
    onPlus() {
      console.info('一级节点点击');
    },
    /**
     * @desc 点击确认按钮时触发
     */
    onNodeDelete() {
      console.info('确认删除', this.node);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .west-cls {
    box-sizing: border-box;
    padding: 0 10px;
  }
  .center-cls {
    box-sizing: border-box;
    border: 1px solid rgba(74, 138, 244);
  }
}
</style>
