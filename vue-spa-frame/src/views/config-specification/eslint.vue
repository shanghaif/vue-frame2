<template>
  <div>
    <h3>eslint 在vscode中的配置</h3>
    <div>
      <ul>
        <li>
          1. 在vscode编辑器的插件安装中安装ESLint插件
          <img src="/static/images/eslint-plugin.png" alt="" />
          (版本视最新版本为准)
        </li>
        <li class="mt-10">
          2. 打开vscode编辑器左上角的 文件/首选项/设置 点击 用户/扩展 找到ESLint
          点击右侧的 `在 settings.json 中编辑`
        </li>
      </ul>
    </div>
    <div>
      <h4>settings.json 中配置 eslint</h4>
      <pre>
        "eslint.codeAction.disableRuleComment": {},
        "eslint.enable": true,
        // 保存文件时自动修复一些eslint的语法例如：多写了一个空格
        "eslint.autoFixOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "eslint.validate": [
          "javascript",
          "javascriptreact",
          {
            "language": "html",
            "autoFix": true
          },
          {
            "language": "vue",
            "autoFix": true
          }
        ],
      </pre>
    </div>
  </div>
</template>

<script>
export default {};
</script>
