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
      <span>&nbsp;&nbsp;&nbsp;&nbsp;垂直排列项目的一种布局</span>
    </div>
    <div :class="$style.container">
      <base-v-box-layout
        align="left"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 1"
      >
        <el-button type="primary">主要按钮</el-button>
        <div :class="$style.b1" :flex="1"></div>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="left"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 2"
      >
        <el-button type="primary">主要按钮</el-button>
        <div :class="$style.b1" :flex="1"></div>
        <el-button type="success">成功按钮</el-button>
        <div :class="$style.b1" :flex="1"></div>
        <el-button type="info">信息按钮</el-button>
        <div :class="$style.b1" :flex="1"></div>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="left"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 3"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 4"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="stretch"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 5"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 6"
      >
        <el-button type="primary" :flex="1">主要按钮</el-button>
        <el-button type="success" :flex="1">成功按钮</el-button>
        <el-button type="info" :flex="1">信息按钮</el-button>
        <el-button type="warning" :flex="1">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 7"
      >
        <el-button type="primary" :flex="1">主要按钮</el-button>
        <el-button type="success" :flex="1">成功按钮</el-button>
        <el-button type="info" :flex="1">信息按钮</el-button>
        <el-button type="warning" :flex="3">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="stretch"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 8"
      >
        <el-button type="primary" :flex="1">主要按钮</el-button>
        <el-button type="success" :flex="1">成功按钮</el-button>
        <el-button type="info" :flex="1">信息按钮</el-button>
        <el-button type="warning" :flex="3">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 9"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="center"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 10"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="center"
        pack="end"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 11"
      >
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
      </base-v-box-layout>
      <base-v-box-layout
        align="left"
        pack="start"
        space="10px"
        padding="0"
        :extraCls="$style.box"
        v-if="isChecked === 12"
      >
        <div :class="$style.b1" :flex="1" align="stretch">1</div>
        <div :class="$style.b1" :height="150" align="stretch">2</div>
        <div :class="$style.b1" :flex="2" align="stretch">3</div>
      </base-v-box-layout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.options = [
      { value: 12, label: 'Block / Align: left' },
      { value: 1, label: 'Spaced / Align: left' },
      { value: 2, label: 'Multi-Spaced / Align: left' },
      { value: 3, label: 'Align: left' },
      { value: 4, label: 'Align: center' },
      { value: 5, label: 'Align: stretch' },
      { value: 6, label: 'Flex: Even / Align: center' },
      { value: 7, label: 'Flex: Ratio / Align: center' },
      { value: 8, label: 'Flex + Stretch' },
      { value: 9, label: 'Pack: start / Align: center' },
      { value: 10, label: 'Pack: center / Align: center' },
      { value: 11, label: 'Pack: end / Align: center' }
    ];
    return {
      isChecked: 12
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
  // border: 1px solid rgba(29, 161, 96, 0.5);
  // box-sizing: border-box;
  .topnav {
    box-sizing: border-box;
    height: 5%;
    > div:nth-child(2) {
      margin-left: 10px;
    }
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
