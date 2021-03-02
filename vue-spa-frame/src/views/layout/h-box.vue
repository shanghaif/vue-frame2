<template>
  <div :class="$style.box">
    <div :class="$style.topnav">
      <base-select
        v-model="isChecked"
        :options="options"
        displayField="label"
        valueField="value"
        placeholder="请选择-Align"
      ></base-select>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;一种水平排列项目的布局</span>
    </div>
    <div :class="$style.container">
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="top"
        v-if="isChecked === 1"
      >
        <el-button type="primary">主要按钮</el-button>
        <div :class="$style.b1" :flex="1"></div>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="top"
        v-if="isChecked === 2"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="middle"
        v-if="isChecked === 3"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="stretch"
        v-if="isChecked === 4"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="middle"
        v-if="isChecked === 5"
      >
        <el-button type="primary" :flex="1">主要按钮</el-button>
        <el-button type="success" :flex="1">成功按钮</el-button>
        <el-button type="info" :flex="1">信息按钮</el-button>
        <el-button type="warning" :flex="1">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="top"
        v-if="isChecked === 6"
      >
        <el-button type="primary" :flex="1">主要按钮</el-button>
        <el-button type="success" :flex="1">成功按钮</el-button>
        <el-button type="info" :flex="1">信息按钮</el-button>
        <el-button type="warning" :flex="3">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="middle"
        pack="start"
        v-if="isChecked === 7"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="middle"
        pack="center"
        v-if="isChecked === 8"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
      <base-h-box-layout
        :extraCls="$style.box"
        padding="0"
        space="15px"
        align="middle"
        pack="end"
        v-if="isChecked === 9"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-h-box-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.options = [
      { value: 1, label: 'Spaced' },
      { value: 2, label: 'Align: top' },
      { value: 3, label: 'Align: middle' },
      { value: 4, label: 'Align: stretch' },
      { value: 5, label: 'Flex: All even / Align: middle' },
      { value: 6, label: 'Flex: Ratio / Align: top' },
      { value: 7, label: 'Pack: start / Align: middle' },
      { value: 8, label: 'Pack: center / Align: middle' },
      { value: 9, label: 'Pack: end / Align: middle' }
    ];
    return {
      isChecked: 1
    };
  }
};
</script>

<style lang="less" module>
.box {
  height: 100%;
  :global .el-button + .el-button {
    margin-left: 0;
  }
  .topnav {
    box-sizing: border-box;
    height: 5%;
    margin-bottom: 10px;
  }
  .container {
    height: 95%;
  }
}
.b1 {
  box-sizing: border-box;
  border: 1px solid bisque;
}
</style>
