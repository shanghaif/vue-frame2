<template>
  <div :class="$style.box">
    <h3>
      使用 patch-package 修改源码，需要安装 `npm i patch-package
      --save-dev`，并且基础依赖需要使用`npm i`
    </h3>
    <div style="margin-bottom: 10px;">
      修改 element-ui 中的 el-select
      组件的源码（源码修改文件：node_modules/element-ui/lib/element-ui.common.js），增加一个
      `suffix` 的后置插槽
      <p>这个`suffix`后置的插槽 element-ui 中原来是没有的</p>
    </div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
      <i slot="prefix" class="el-icon-share" style="padding-top: 10px;"></i>
      <!--这个后置的插槽 element-ui 中原来是没有的-->
      <i slot="suffix" class="el-icon-loading" style="padding-top: 10px;"></i>
    </el-select>
    <p>
      countTo 组件原来没有 `color` 定义文字颜色的属性，通过 `patch-package`
      来修改源码添加一个 color 属性
    </p>
    <countTo
      :startVal="startVal"
      :endVal="endVal"
      :duration="3000"
      color="red"
    ></countTo>
  </div>
</template>

<script>
import countTo from 'vue-count-to';

export default {
  components: { countTo },
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      startVal: 0,
      endVal: 2017
    };
  }
};
</script>

<style lang="less" module>
.box {
  box-sizing: border-box;
  height: 100%;
  padding-top: 30px;
}
</style>
