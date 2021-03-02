<template>
  <div :class="[$style.fullY, $style.box]">
    <h3>stylelint 在vscode中的配置</h3>
    <div>
      <ul>
        <li>
          1. 在vscode编辑器的插件安装中安装styleline和stylelint-plus插件
          <img src="/static/images/stylelint-plugin.png" alt="" />
          (版本视最新版本为准)
        </li>
        <li class="mt-10">
          2. 打开vscode编辑器左上角的 文件/首选项/设置 点击 用户/扩展
          找到stylelint 点击右侧的 `在 settings.json 中编辑`
        </li>
      </ul>
    </div>
    <div>
      <h4>
        settings.json 中配置 stylelint（不配置 settings.json 对应 vscode
        编辑器无法直接进行问题报错
        <img src="/static/images/stylelint-vscode-errors.png" />）
      </h4>
      <pre>
          "editor.codeActionsOnSave": {
            "source.fixAll.stylelint": true
          },
          "stylelint.config": {
    "defaultSeverity": "error",
    // 'stylelint-order' 强制你按照某个顺序编写 css，顺序对应由 stylelint-config-recess-order 插件提供
    "plugins": ["stylelint-order"], // https://github.com/hudochenkov/stylelint-order
    "extends": [
      "stylelint-config-standard", // 配置 Stylelint 规则
      "stylelint-config-prettier",
      "stylelint-config-recess-order" // stylelint-order 插件的第三方配置，css属性顺序的规则（例如先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性）
    ],
    // 这里的配置和项目内的 .stylelintignore 中的 rules 同步
    "rules": {
      "block-no-empty": null,
      "color-no-invalid-hex": true,
      "max-empty-lines": 2,
      "declaration-colon-space-after": "always",
      /* 'comment-empty-line-before': ['always', {
        ignore: ['between-comments', 'stylelint-commands']
      }],
      'rule-nested-empty-line-before': ['always', {
        except: ['first-nested'],
        ignore: ['after-comment']
      }], */
      // 允许的单位
      "unit-allowed-list": [
        "em",
        "rem",
        "%",
        "s",
        "ms",
        "px",
        "vh",
        "deg",
        "pr",
        "rpx"
      ],
      "unit-no-unknown": [
        true,
        { "ignoreUnits": ["pr", "rpx"], "ignoreFunctions": [] }
      ],
      // 使用以下命令指定必须使用的引号
      "font-family-name-quotes": "always-unless-keyword",
      "function-url-quotes": "always",
      "selector-attribute-quotes": "always",
      "string-quotes": "single",
      // 如果使用 autoprefixer，则要使用以下命令禁止供应商前缀
      "at-rule-no-vendor-prefix": true,
      "media-feature-name-no-vendor-prefix": true,
      "property-no-vendor-prefix": true,
      "selector-no-vendor-prefix": true,
      "value-no-vendor-prefix": true,
      // 使用以下方法控制特异性
      "max-nesting-depth": 4,
      "selector-max-compound-selectors": 4,
      // 格式为 "id,class,type" 0个id总数 5个class总数 0个type类选择器总数
      // .app .bbb .ccc {} 这样会报错因为class的个数大于2
      // #app {} 这样也会报错因为id的数量是0
      // p {} 这样写不会报错
      // .foo div {} 这样写不会报错
      // .foo div { & div a {} }  这样写不会报错
      "selector-max-specificity": "0,5,0", // https://blog.csdn.net/tangxiaolang101/article/details/51760358
      // 指定可接受的选择器类型，单位，属性，函数和注释中的单词
      "color-named": "always-where-possible",
      "color-no-hex": true,
      "selector-max-id": 3,
      "selector-max-type": 3,
      // 使用以下一种或多种有效表示形式时，请指定一种表示法
      "font-weight-notation": "numeric",
      // 指定允许的URL类型
      "function-url-no-scheme-relative": true,
      // 指定最大行长
      "max-line-length": [80, { "ignore": ["non-comments"] }]
    }
  },
  "stylelint.autoFixOnSave": true,
  // 启用stylelint插件
  "stylelint.enable": true,
  "stylelint.configOverrides": {}
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
