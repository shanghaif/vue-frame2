## vue-mobile-frame 移动端打包框架

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
npm run dev-port | 开发环境服务 可以修改ip和端口号（执行 eslint 语法检查）
npm run dev | 开发环境服务 （执行 eslint 语法检查）
npm run serve | 开发环境服务
npm run serve:dev-preview | 预览模式服务
npm run build | 生产环境构建
npm run lint | eslint 代码校验
npm run lint:no-fix | eslint 代码校验 （同 npm run lint 但在没有 eslint 错误时会输出提示 `No lint errors found!`）
npm run lint-fix | eslint 代码修复
npm run clear| 删除 node_modules 依赖并重新安装
npm run changelog | 生成 changelog 日志文件
npm run createProxySelf | 生成 dev 请求代理文件 proxy-self.js 用于代理请求的发送，proxy-self.js 是被 .gitignore 收录的过滤文件不需要传递上远端
npm run dev:test | 开发环境服务（如果需要区分测试环境可以配置 .env.test）
npm run build:test | 生产环境服务（如果需要区分生产环境可以配置 .env.testProd）

浏览器地址：

```
http://localhost:8010/mobile
```


目录结构：

```
build webpack配置文件目录
 |-create-proxy-self.js
 |-css-loader.conf.js
 |-utils.js
 |-vue.base.conf.js
 |-vue.dev.conf.js 开发配置
 |-vue.prod.conf.js 生产配置
config webpack配置参数
 |-dev.env.js 开发环境变量
 |-index.js 开发和生产配置参数
 |-prod.env.js 生产环境变量
public
 |-favicon.ico
 |-index.html
 |-link.html
 |-meta.html
src
 |-assets 静态资源
 |-config 全局配置目录
    |-interceptor 拦截器
    |-index.js
 |-directives 全局指令
 |-filters 全局过滤器
 |-packages 全局组件
    |-components
    |-views
 |-plugins 全局插件
    |-axios ajax请求封装
    |-data-dict-filter 字典数据转全局过滤器
    |-components.js 加载全局组件
    |-link.js 跨层级获取组件实例
    |-unicom.js 组件通信插件
    |-vbus.js 巴士事件
 |-router router实例构建
 |-service
    |-api api请求目录
    |-data-dict 数据字典
    |-router 路由目录
    |-store vuex目录
 |-store store实例构建
 |-views 视图层
    |-login
       |-index.vue
    |-platform
       |-index.vue
 |-utils 工具类
static 静态资源
 |-images
 |-plugins // 外部插件
   |-babel-modules 使用 babel 处理的 js 插件
.browserslistrc 浏览器兼容性配置
.editorconfig 统一不同编辑器的代码风格
.eslintignore eslint校验忽略配置
.eslintrc.js eslint 配置
.gitignore git忽略配置
.huskyrc git提交钩子校验定义
.prettierrc.js prettierrc排版配置
.vcmrc 用于检验 git 提交信息是否符合格式
babel.config.js babel配置
frame.config.js 框架自定义构建配置
package.json 依赖包
postcss.config.js css后置处理器配置
README.md 说明文档
vue.config.js vue项目构建配置
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
