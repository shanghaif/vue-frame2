<template>
  <div :class="[{'needs-box': true}, {'full-y': true}]">
    基金募集管理
    <div :class="{test: true}">
      <span>文字颜色</span>
    </div>
    <el-button
      :class="{'my-button': true}"
      size="small"
      type="primary"
      @click="onClick"
      >修改文字颜色</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClick(event) {
    }
  }
};
</script>
