<template>
  <div :class="[$style.fullY, $style.box]">
    <h3>vscode的配置</h3>
    <div>
      <p>1. 插件</p>
      <div>
        <img src="/static/images/vscode-plugin-1.png" alt="" />
      </div>
      <div>
        <img src="/static/images/vscode-plugin-2.png" alt="" />
      </div>
      <div>
        <img src="/static/images/vscode-plugin-3.png" alt="" />
      </div>
      <div>
        <img src="/static/images/vscode-plugin-4.png" alt="" />
      </div>
    </div>
    <div>
      <h4>settings.json 的配置</h4>
      <pre>
"editor.formatOnSave": true,
  "editor.formatOnType": true,
  // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "git.confirmSync": false,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 防止编辑器内置linter与插件冲突设置
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
      </pre>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" module>
.box {
  overflow: auto;
}
</style>
