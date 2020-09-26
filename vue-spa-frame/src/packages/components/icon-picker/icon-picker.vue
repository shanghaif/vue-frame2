<template>
  <div :style="{width: this.width}">
    <el-input v-model="inputVal"  type="text" clearable >
      <el-popover
        v-model="visible"
        slot="prepend"
        placement="right"
        width="400"
        trigger="click">
        <div class="icon-tab-outer">
          <i class="iconfont" @click="choose(item)" v-for="(item,index) in iconList" :class="item" :key="index"></i>
        </div>
        <el-button slot="reference">
          <i class="iconfont" :class="inputVal">
            <span class="icon-placeolder" v-show="!inputVal">请选择</span>
          </i>
        </el-button>
      </el-popover>
        <!-- <el-button slot="prepend">
        </el-button> -->
    </el-input>
  </div>
</template>
<script>
import { iconClassName } from '@/assets/font/iconfont/iconfont-classname.js';
export default {
  name: 'BaseIconPicker',
  model: {
    prop: 'value',
    event: 'iconVal'
  },
  props: {
    width: {
      type: String
    },
    value: String
  },
  data() {
    return {
      inputVal: this.value,
      visible: false,
      iconList: []
    };
  },
  watch: {
    value(val) {
      // console.log(val);
      this.inputVal = val;
    }
  },
  created() {
    this.iconList = iconClassName;
  },
  methods: {
    inputChange() {
      // console.log(this);
      // this.$emit('input', this.$event.target.value);
    },
    choose(item) {
      this.$emit('iconVal', item);
      this.inputVal = item;
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.icon-tab-outer{
  // width: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  i{
    margin:10px;
    cursor: pointer;
    &.active,&:hover{
      color:#409eff;
    }
  }
}
.icon-placeolder{
  font-size: 12px;
}
</style>
