<template>
  <div>
    <span v-show="false">子组件用于测试-propsData和props的使用区别</span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    sex: {
      type: Number
    },
    address: {
      type: String
    },
    remark: {
      type: Object
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(
        'this.$options.propsData ',
        this.$options.propsData,
        this.$options.props.name
      );
    });
  }
};
</script>

<style lang="less" module>
.box {
  height: 150px;
}
</style>
