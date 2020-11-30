## 浙江省小微园区管理 SAAS 子平台

安装：

```
npm install
```

或者

```
cnpm install
```

开发环境运行：

开发环境打包构建需要在`npm run dev`指令后面跟上要使用的主题样式库，（直接运行`npm run dev`默认是 default 主题）

- default 主题：npm run dev --theme=default
- black 主题：npm run dev --theme=black
- light 主题：npm run dev --theme=light

```
npm run dev --theme=default
```

生产环境运行（只有一个指令）：

生产环境打包会调用 gulp 打包样式文件+webpack 打包 `src` 目录，生产环境会打包所有主题库`default`、`black`和`light`（位于 `css-theme`目录内），
同时会在`public/theme-css.html`文件内写入要使用的 样式文件，在`webpack`的打包过程中会将`theme-css.html`合并到`index.html`的`header`标签内。

```
npm run build
```

需要在`package.json`的`build:theme-start`和`build:theme`指令中写入要打包的样式主题`--default,light,black`（`--`为特定字符）。

运行：

| 指令                      | 说明                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm run dev-port          | 开发环境服务 可以修改 ip 和端口号（执行 eslint 语法检查）                                                                                                              |
| npm run dev               | 开发环境服务 （执行 eslint 语法检查）                                                                                                                                  |
| npm run serve             | 开发环境服务                                                                                                                                                           |
| npm run serve:dev-preview | 预览模式服务                                                                                                                                                           |
| npm run build             | 生产环境构建                                                                                                                                                           |
| npm run lint              | eslint 代码校验                                                                                                                                                        |
| npm run lint:no-fix       | eslint 代码校验 （同 npm run lint 但在没有 eslint 错误时会输出提示 `No lint errors found!`）                                                                           |
| npm run lint-fix          | eslint 代码修复                                                                                                                                                        |
| npm run clear             | 删除 node_modules 依赖并重新安装                                                                                                                                       |
| npm run changelog         | 生成 changelog 日志文件（新发布版本时生成日志文件推荐将版本号`version`进行修改）                                                                                       |
| npm run icon              | 生成 iconfont 相关的样式图标文件 `iconfont-classname.js`                                                                                                               |
| npm run dev:test          | 开发环境服务（如果需要区分测试环境可以配置 .env.test）                                                                                                                 |
| npm run build:test        | 生产环境服务（如果需要区分生产环境可以配置 .env.testProd）                                                                                                             |
| npm run createProxySelf   | 生成 dev 请求代理文件 proxy-self.js 用于代理请求的发送，proxy-self.js 是被 .gitignore 收录的过滤文件不需要传递上远端                                                   |
| build:theme-start         | 打包主题库 （需要打包的主题库包名需要写在 `--` 后面，例如：`--default,light,black` 打包了三种主题库，包名位于`css-theme`目录内的第一层文件夹名称，`common`文件夹除外） |
| build:theme               | 单独打包主题库样式`lesscls`文件（和`build:theme-start`联合使用）                                                                                                          |
| build:theme-inject        | gulp 打包出的`css`文件注入到`html`文件内                                                                                                                               |
| build:theme-light         | 使用 gulp 单独打包一个`light`主题                                                                                                                                      |

获取`iconfont.css`文件下的 class 名称方法：
（图标文件放在`css-theme/common/font/iconfont/`）
```
步骤一、将`iconfont`包更新下
步骤二、在build目录下执行命令 `npm run icon`
步骤三、`css-theme/common/font/iconfont` 目录下会生成`iconfont-classname.js`
```

浏览器地址：

```
http://localhost:8010
```

### 注意点：
（样式为`less`文件，不支持 `scss`）

（业务文件 .vue 中不能写任何不同主题的样式代码，不同的主题对应的样式代码都必须要写到`css-theme`内的主题包下，比如：`default`默认主题、`black`暗黑主题和`light`明亮主题）

1. html 标签上样式的定义
   （class 类名不能使用 `scoped`和`module`，需要使用大的标签名来当作命名空间隔绝同名样式冲突）

```
<template>
  <div class="login">
    <p class="mmm">cesi111防止因gulp插件的错误而导致管道中断，plumber可以阻止 gulp 插件发生错误导致进程退出并输出错误日志。</p>
    <div class="login-box">
      <div>
        背景测试图：<img :src="src" alt="" style="width: 300px;height: 200px;" />
      </div>
      <div class="ccc">
      </div>
      <div class="icon-dd iconfont"></div>
    </div>
  </div>
</template>
```

2. 背景图的使用：

```
.default {
  .login {
    .mmm {
      background-image: url(../images/1.png); // /static/img/images/1.png
    }
    .ccc {
      width: 600px;
      height: 500px;
      background-repeat: no-repeat;
      background-image: url(../../common/images/common-1.png);
    }
  }
}
```

3. img.src 标签的使用

main.js

```
window.vm = new Vue({
  data: {
    theme: 'default' // 默认主题
  },
  mounted() {
    if (process.env.NODE_ENV === 'production') {
      // 生产模式-模拟远端请求修改主题
      setTimeout(() => {
        console.warn('...修改主题...');
        document.getElementsByTagName('body')[0].className = 'black'; // 远端接口请求返回
        window.vm.theme = 'black'; // 组件内部监听 `theme` 主题变量可以去修改 img 图的 src 达到动态主题图的效果
      }, 3000);
    }
  },
  render: h => h(App)
}).$mount('#app');
```

login.vue

```
<template>
  <div class="login">
    <div>
      背景测试图：<img :src="src" alt="" style="width: 300px;height: 200px;" />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
        return {
          src: '',
        }
    },
    created() {
      this.$nextTick(() => {
        this.bb();
        const that = this;
        // 监听主题的修改
        window.vm.$watch('theme', function (val, oldVal) {
          console.warn('aaa', val);
          this.bbb = val;
          that.bb();
        });
      });
    },
    methods: {
        bb() {
          const bbb = document.getElementsByTagName('body')[0].className;
          console.warn('111111111111111111', bbb, window.vm.$data.theme);
          this.src = require('@theme/' + bbb + '/images/1234.png');
          // return require('@theme/' + bbb + '/images/1234.png');
        }
    }
  }
</script>
```

4. iconfont 图标的使用（iconFont 统一使用一份文件，位于`css-theme/common/font`目录内）

login.vue

```
<template>
  <div class="login">
    <div class="icon-dd iconfont"></div>
  </div>
</template>
<script>
export default {}
</script>
```

css-theme/default/components/login.css

```
/* 登录样式 */
.default {
  .login {
    .icon-dd {
      width: 20px;
      height: 20px;
    }
    .icon-dd:before{
      content: "\e6bb";
    }
  }
}
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
 |-proxy-self.js
 |-proxy-table.js webpackDevServer 代理配置文件
css-lib-recycler-station gulp打包样式文件回收站目录（收录上一次生产环境打包的样式主题文件）
css-lib-theme gulp打包最新一次样式文件目录
css-theme 样式主题目录
 |-black 暗黑主题
 |-common 公共文件目录 （不是主题，不会参与打包）
 |-default 默认主题
   |-base 该主题的基础样式`less`文件
   |-components 组件`less`文件
     |-home.less
     |-login.less
   |-icons
   |-images
 |-light 明亮主题
gulp gulp 打包文件
 |-theme-clear.js
 |-theme-inject-html.js
 |-theme.js
 |-version.js 样式版本控制
public
 |-favicon.ico
 |-index.html
 |-link.html
 |-meta.html
 |-theme-css.html 主题样式打包输出
src
 |-config 全局配置目录
    |-interceptor 拦截器
    |-index.js
 |-directives 全局指令
 |-filters 全局过滤器
 |-packages 全局组件
    |-common-view 公共视图组件（比如：个人中心 ）
    |-components
    |-views 布局视图（比如：网站整体的布局）
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
    |-login 登录
       |-index.vue
    |-home 主页
       |-index.vue
    |-personal 个人中心
       |-index.vue
 |-utils 工具类
static 静态资源
 |-images 图片目录（推荐 背景图 background: url() 放到这里）
 |-plugins // 外部插件
   |-babel-modules 使用 babel 处理的 js 插件
.browserslistrc 浏览器兼容性配置
.editorconfig 统一不同编辑器的代码风格
.eslintignore eslint校验忽略配置
.eslintrc.js eslint 配置
.gitattributes Git属性 一些设置项
.gitignore git忽略配置
.huskyrc git提交钩子校验定义
.prettierignore 不使用prettier格式化的文件填写在项目的.prettierignore文件中
.prettierrc.js prettierrc排版配置
.vcmrc 用于检验 git 提交信息是否符合格式
babel.config.js babel配置
frame.config.js 框架自定义构建配置
gulpfile.js gulp 打包主文件
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

测试环境

```
'/api': {
    target: 'http://10.1.1.122:7444',
    changeOrigin: true, // 跨域和突破网站对爬虫的禁止，一般建议配置
    pathRewrite: { '^/api': '' } // 路径重写
  }
```

测试环境-飞哥
```
'/api': {
    target: 'http://10.1.2.93:7444',
    changeOrigin: true, // 跨域和突破网站对爬虫的禁止，一般建议配置
    pathRewrite: { '^/api': '' } // 路径重写
}
```

测试环境-何俊
```
'/api': {
    target: 'http://10.1.2.75:7444',
    changeOrigin: true, // 跨域和突破网站对爬虫的禁止，一般建议配置
    pathRewrite: { '^/api': '' } // 路径重写
}
```
