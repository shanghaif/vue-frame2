<template>
  <div>
    <div>
      wangEditor 网址：http://www.wangeditor.com/ 基于JavaScript和css开发的
      Web富文本编辑器， 轻量、简洁、界面美观、易用、开源免费。
    </div>
    <br /><br />
    <div id="div1">
      <p>初始化的内容</p>
      <p>初始化的内容</p>
    </div>
    <br /><br />
    <div>
      <el-button type="primary" @click="onGetHtml">获取 html</el-button>
      <el-button type="primary" @click="onGetText">获取 text</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.editor = null;
    return {};
  },
  created() {
    setTimeout(() => {
      const E = window.wangEditor;
      this.editor = new E('#div1');
      // 或者 const editor = new E( document.getElementById('div1') )
      this.editor.create();
    }, 0);
  },
  methods: {
    /**
     * @desc 获取 html
     */
    onGetHtml() {
      const html = this.editor.txt.html();
      console.info(html);
    },
    /**
     * @desc 获取 text
     */
    onGetText() {
      const text = this.editor.txt.text();
      console.info(text);
    }
  }
};
</script>

<style></style>
