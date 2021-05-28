<template>
  <div :class="$style.box">
    <div :class="$style.menu">
      <el-button size="mini" type="primary" @click="onGetSelections"
        >获取多选行（多选）</el-button
      >
      <el-button size="mini" type="primary" @click="onSelectRows"
        >选中多行（多选）</el-button
      >
      <el-button size="mini" type="primary" @click="onClear"
        >清空选中（多选）</el-button
      >
      <el-button size="mini" type="primary" @click="onSelectRow"
        >选中某一行（单选）</el-button
      >
      <el-button size="mini" type="primary" @click="onClearSelectRow"
        >取消选中（单选）</el-button
      >
    </div>
    <div :class="$style.menu">
      <base-permission-box code="add" element="el-button" type="success">
        添加
      </base-permission-box>
      <base-permission-box code="delete" element="el-button" type="danger">
        删除
      </base-permission-box>
      <base-permission-box code="use" element="el-button" type="primary">
        启用
      </base-permission-box>
    </div>
  </div>
</template>

<script>
import _has from 'lodash/has';

export default {
  inject: ['getBaseGrid'],
  props: {
    // 点击选中的行-注意 row 不会立马传递进来因为初始化 props 时数据还没有加载，如果你要使用 row 需要用 watch 或 computed。
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      buttons: []
    };
  },
  created() {
    if (
      _has(this.$route, 'meta.buttons') &&
      this.$route.meta.buttons.length > 0
    ) {
      this.buttons = this.$route.meta.buttons;
    }
  },
  methods: {
    onGetSelections() {
      const rows = this.getBaseGrid.getSelections();
      console.info('多选行 ', rows);
    },
    onSelectRow() {
      if (this.getBaseGrid.selectMode) {
        this.$message({
          message: '请设置 模式 为单选',
          type: 'warning'
        });
        return;
      }
      const b = { field: 'id', value: 104 };
      this.getBaseGrid.selectRow(b);
    },
    onSelectRows() {
      if (!this.getBaseGrid.selectMode) {
        this.$message({
          message: '请设置 模式 为多选',
          type: 'warning'
        });
        return;
      }
      const b = [
        { field: 'id', value: '1-3' },
        { field: 'id', value: '1-9' }
      ];
      this.getBaseGrid.selectRows(b);
    },
    onClear() {
      if (!this.getBaseGrid.selectMode) {
        this.$message({
          message: '请设置 模式 为多选',
          type: 'warning'
        });
        return;
      }
      this.getBaseGrid.clearSelection();
    },
    onClearSelectRow() {
      if (this.getBaseGrid.selectMode) {
        this.$message({
          message: '请设置 模式 为单选',
          type: 'warning'
        });
        return;
      }
      this.getBaseGrid.selectRow();
    }
  }
};
</script>

<style lang="less" module>
.box {
  padding: 5px 0;
}
.menu {
  padding: 5px 0;
}
</style>
