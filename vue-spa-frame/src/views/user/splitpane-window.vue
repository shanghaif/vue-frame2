<template>
  <div class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container"><span>分割窗口示例</span></div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane';

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  methods: {
    resize() {
      console.log('resize');
    }
  }
};
</script>

<style scoped>
.components-container {
  position: relative;
  height: 100%;
}

.left-container {
  height: 100%;
  background-color: rgba(243, 129, 129);
}

.right-container {
  height: 200px;
  background-color: rgba(252, 227, 138);
}

.top-container {
  width: 100%;
  height: 100%;
  background-color: rgba(252, 227, 138);
}

.bottom-container {
  width: 100%;
  height: 100%;
  background-color: rgba(149, 225, 211);
}
</style>
