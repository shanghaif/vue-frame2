## vue-mpa-frame 多页面打包框架

安装（推荐，会生成 package-lock.json 用于锁定版本）：

```
npm install
```

或者
（不推荐，不会生成 package-lock.json，在版本安装上面可能会出现冲突 ）

```
cnpm install
```

运行：

| 指令                      | 说明                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| npm run dev-port          | 开发环境服务 可以修改 ip 和端口号（执行 eslint 语法检查）                                                                                              |
| npm run dev               | 开发环境服务 （执行 eslint 语法检查）                                                                                                                  |
| npm run serve             | 开发环境服务                                                                                                                                           |
| npm run serve:dev-preview | 预览模式服务                                                                                                                                           |
| npm run build             | 生产环境构建                                                                                                                                           |
| npm run lint              | eslint 代码校验                                                                                                                                        |
| npm run lint:no-fix       | eslint 代码校验 （同 npm run lint 但在没有 eslint 错误时会输出提示 `No lint errors found!`）                                                           |
| npm run lint-fix          | eslint 代码修复                                                                                                                                        |
| npm run clear             | 删除 node_modules 依赖并重新安装                                                                                                                       |
| npm run changelog         | 生成 changelog 日志文件                                                                                                                                |
| npm run icon              | 生成 iconfont 相关的样式图标文件 `iconfont-classname.js`                                                                                               |
| npm run createProxySelf   | 生成 dev 请求代理文件 proxy-self.js 用于代理请求的发送，proxy-self.js 是被 .gitignore 收录的过滤文件不需要传递上远端                                   |
| npm run dev:test          | 开发环境服务（如果需要区分测试环境可以配置 .env.test）                                                                                                 |
| npm run build:test        | 生产环境服务（如果需要区分生产环境可以配置 .env.testProd）                                                                                             |
| postinstall               | 用于第三方库的修改指令，`patch-package`插件自身会调用，自动为依赖包打上我们编写的补丁，注意：需要使用 npm install 安装                                 |
| stylelint-check           | 帮助你检查配置中是否包含与 Prettier 冲突的任何规则 `No conflicting rules detected in your stylelint configuration` 在 stylelint 配置中未检测到冲突规则 |
| npm run lint:style        | 检测 html 和 vue 文件中的 style 标签内部的样式代码错误，暂未配置 scss 类型的检测                                                                       |
| npm run lint:css          | 检测 css,less 文件中的样式代码错误，暂未配置 scss 类型的检测                                                                                           |
| npm run lint:css-fix      | --fix 选项可以指定 stylelint 自动修复不符合可修复规则的代码，暂未配置 scss 类型的检测                                                                  |
| lint:css-cache-fix        | --fix 选项可以指定 stylelint 自动修复不符合可修复规则的代码（使用缓存），暂未配置 scss 类型的检测                                                      |
| format                    | 按照 prettierrc 设置的规则格式化指定类型的所有文件                                                                                                     |

获取 iconfont.css 文件下的 class 名称方法：
（图标文件放在`css-theme/common/font/iconfont/`）

```
步骤一、将iconfont包更新下
步骤二、在build目录下执行命令 npm run icon
步骤三、assets/font/iconfont 目录下会生成iconfont-classname.js
```

浏览器地址：

```
http://localhost:8010/app
```

目录结构：

```
build webpack配置文件目录
 |-create-proxy-self.js
 |-css-loader.conf.js
 |-read-icon.js
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
     |-font
       |-iconfont iconfont图标
       |-packages 组件库图标
    |-images 普通图片资源文件目录
    |-images-webpack 生成环境打包会通过 images-webpack-loader 进行图片压缩（体积比较大的图推荐放在这里）
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
    |-vue-template-constant.js .vue模板常量设置插件
 |-projects 多页面项目
    |-tdbd 投贷保单
       |-pages 子项目
         |-bank 银行端
           |-assets 项目资源目录
           |-components 项目全局组件
           |-config 项目配置
             |-interceptor
             |-index.js
           |-directives 项目指令
           |-filters 项目过滤器
           |-plugins 项目插件
           |-router 项目路由
           |-service 项目服务类目录
             |-api api请求目录、
             |-constant 常量数据集
             |-data-dict 数据字典
             |-router 路由目录
             |-store vuex目录
           |-store 项目vuex
           |-views 视图层
             |-login
               |-index.vue
             |-platform
               |-index.vue
            |-App.vue
            |-index.html
            |-main.js
         |-futures 期货端
       |-index.js 项目公共包引入
    |-tzwst 投资五色图
 |-utils 工具类
static 静态资源
 |-images
 |-plugins // 外部插件
   |-babel-modules 使用 babel 处理的 js 插件
.browserslistrc 浏览器兼容性配置
.editorconfig 统一不同编辑器的代码风格
.env 公共 环境变量参数配置
.env.development 开发环境环境变量配置文件
.env.preview 预览环境环境变量配置文件
.env.test 测试开发环境环境变量配置文件
.env.testProd 测试生产环境环境变量配置文件
.eslintignore eslint校验忽略配置
.eslintrc.js eslint 配置
.gitattributes Git属性 一些设置项
.gitignore git忽略配置
.huskyrc git提交钩子校验定义
.lintstagedrc.json lint-staged 校验配置文件（lint-staged 可以让husky只检验git暂存区的文件，不会导致你一下出现成百上千个错误）
.prettierignore 不使用prettier格式化的文件填写在项目的.prettierignore文件中
.prettierrc.js prettierrc排版配置
.stylelintignore 过滤不受 stylelint 校验的目录或文件
.vcmrc 用于检验 git 提交信息是否符合格式
babel.config.js babel配置
frame.config.js 框架自定义构建配置
package.json 依赖包
postcss.config.js css后置处理器配置
README.md 说明文档
stylelint.config.js stylelint 配置文件
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

  # 比如：git commit -m "feat(deprecated): 移除不必要的输出console日志"

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

npm 镜像及配置方法

`持久使用（推荐使用）`

```
打开cmd使用命令：

npm config set registry https://registry.npm.taobao.org

// 配置后可通过下面命令来验证是否成功

　npm config ls

// 此时：metrics-registry = "http://registry.npm.taobao.org/"表示设置成功


npm config get registry

// 或
npm info express
```

如何修改 node_modules 里的文件

1. 使用 patch-package 来修改（需要使用 npm i，cnpm 不能生成 `package-lock.json`文件用于锁定安装依赖版本）

使用 patch-package 来修改 node_modules 里面的文件更方便

步骤也很简单：

1. 安装 patch-package：npm i patch-package --save-dev
2. 修改 package.json，新增命令 postinstall:

```
"scripts": {
  "postinstall": "patch-package"
}
```

3. 修改 node_modules 里面的代码
4. 执行命令：npx patch-package element-ui （这里以 `element-ui` 作为示例）

第一次使用 patch-package 会在项目根目录生成 patches 文件夹，里面有修改过的文件 diff 记录。

```
patches
 |-element-ui+2.14.1.patch
 |-vue-count-to+1.0.13.patch
```

当这个包版本更新后，执行命令：git apply --ignore-whitespace patches/element-ui+2.14.1.patch 即可。其中 element-ui+2.14.1.patch 是它生成的文件名。
