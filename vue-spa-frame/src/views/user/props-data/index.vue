<template>
  <div :class="$style.box">
    <child-view v-bind="info" />
  </div>
</template>

<script>
import childView from './child.vue';
export default {
  components: { childView },
  data() {
    return {
      info: {
        name: '小红',
        remark: {
          bz: '这是一段备注信息'
        }
      }
    };
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
}
</style>
