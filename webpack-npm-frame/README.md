## webpack-npm-frame 自定义 npm 插件框架

安装：

```
npm install
```
或者

```
cnpm install
```


运行：


指令 | 说明
---|---
npm run build | 生产环境构建
npm run lint | eslint 代码校验
npm run lint-fix | eslint 代码修复

开发说明：

1. 下载框架将目录名称修改为自己 js 插件名称
2. 修改 package.json 中的 name 属性为插件名称（插件名称必须唯一，否则无法发布到 npm）
3. 修改 webpack.config.js 中的 entry 对象的 key 值名称
4. 修改 webpack.config.js 中的 output.library 指定库的对外全局变量
5. 修改 src/index.js 中导出文件的名称为 dist 目录中构建的文件名称

```
if (process.env.NODE_ENV === 'production') {
  // 生产环境 
  module.exports = require('./dist/ys-test-tool.min.js')
} else {
  // 开发环境
  module.exports = require('./dist/ys-test-tool.js')
}
```

目录结构：

```
dist 生产打包目录
src 源码
 |-index.js
test 测试
.babelrc babel配置
.editorconfig 统一不同编辑器的代码风格
.eslintignore eslint校验忽略配置
.eslintrc.js eslint 配置
.gitignore git忽略配置
.huskyrc git提交钩子校验定义
.vcmrc 用于检验 git 提交信息是否符合格式
index.js 入口运行文件
jsconfig.json jsdoc语法检验
package.json 依赖包
README.md 说明
webpack.config.js webpakc配置
```


.vcmrc

```
  # Node >= 10 and Git >= 2.13.0
  # [Husky](https://github.com/typicode/husky#readme)
  # [validate-commit-msg](https://github.com/conventional-changelog-archived-repos/validate-commit-msg)
  # [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
  # [Change log 示例1](https://github.com/karma-runner/karma/blob/master/CHANGELOG.md)
  # [Change log 示例2](https://github.com/btford/grunt-conventional-changelog/blob/master/CHANGELOG.md)

  # feat 新增功能（feature）
  # fix 修补bug
  # docs 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
  # style 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  # refactor 重构（即不是新增功能，也不是修改bug的代码变动）
  # perf 优化相关，比如提升性能、体验
  # test 增加测试，包括单元测试、集成测试等
  # build
  # ci 自动化流程配置修改
  # chore 构建过程或辅助工具的变动
  # revert 回滚到上一个版本

  # scope.required 用于定义是否所有提交消息都需要一个作用域
  # scope.allowed 允许任何作用域名称

  # warnOnFail 如果设置为true，则错误将记录到控制台，但是提交仍将通过
  # maxSubjectLength 这将控制主题的最大长度 100 个字符。
```

