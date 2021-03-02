<template>
  <div class="ts-test_box">
    <p>提供了对 ts 文件的编译</p>
    <el-button type="primary" @click="onClick">Say Hello</el-button>
  </div>
</template>

<script>
import Greeter from './index.ts';

export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    onClick(event) {
      const greeter = new Greeter('world');
      this.$message({
        message: greeter.greet(),
        type: 'success'
      });
    }
  }
};
</script>
