import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import inject from './plugins/inject.js';
import vueLink from '@plugins/link.js';
import '@plugins/vant.js';
// 初始化项目全局组件
import itemComponents from './plugins/components.js';
// Vue 中非父子组件通讯插件
import unicom from '@plugins/unicom.js';
// ios延迟关闭
import fastClick from 'fastclick';
// .vue模板文件中的常量插件
import VueTemplateConst from '@plugins/vue-template-constant.js';
// 自定义过滤器工具插件
import './filters/index.js';
// mock
import './mock/index.js';
// 自定义指令
import VFocus from './directives/v-focus.js';
import VAuthority from './directives/v-authority.js';
import VEmoji from './directives/v-emoji.js';
import VDebounce from './directives/v-debounce.js';
import VLazyLoad from './directives/v-LazyLoad.js';
import VfRef from './directives/v-f-ref.js';
// iconfont
import '@/assets/font/iconfont/iconfont.css';
// 阿里巴巴aplus埋点插件
// import '@plugins/aplus/index.js';

// ios延迟关闭 300ms延迟
// fastClick.attach(document.body);
fastClick.prototype.focus = function(targetElement) {
  let length;
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf('date') !== 0 &&
    targetElement.type !== 'time' &&
    targetElement.type !== 'month' &&
    targetElement.type !== 'email'
  ) {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
// 全局通知 巴士事件
window.GvBus = {};
window.GvBus.vBus = new Vue({
  data: {
    // 自定义扩展实例属性，程序中可以监听 vBus 中的属性（状态存储是响应式的），触发自身的业务逻辑
  }
});

Vue.use(inject);
Vue.use(itemComponents);
Vue.use(vueLink);
Vue.use(unicom);
Vue.use(VueTemplateConst);
Vue.use(VFocus);
Vue.use(VAuthority);
Vue.use(VEmoji);
Vue.use(VDebounce);
Vue.use(VLazyLoad);
Vue.use(VfRef);
Vue.config.ignoredElements = []; // 忽略在 Vue 之外的自定义元素
Vue.config.keyCodes = {}; // 给 v-on 自定义键位别名
Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  created() {
    // 载入远程字典
    // this.$dict.import(this.$api['dict/getDictDataByTypeList']())
    // 模块常量
    console.info(this.$constant);
    console.info(process.env.VUE_APP_TEST, process.env.VUE_APP_ENV);
    console.info(process.env.USER_CONFIG_ENV);
  },
  render: h => h(App)
}).$mount('#app');
