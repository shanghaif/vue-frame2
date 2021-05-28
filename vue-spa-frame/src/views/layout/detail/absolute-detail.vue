<template>
  <div :class="$style.box">{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" module>
.box {
  height: auto;
}
</style>
