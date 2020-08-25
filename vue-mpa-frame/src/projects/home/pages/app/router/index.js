/**
 * @desc vue Router 路由管理
 */
import Router from 'vue-router';
import { ROUTER_DEFAULT_CONFIG } from '../config/index.js';
import {
  routerBeforeEachFunc,
  routerAfterEachFunc,
  routerOnReady
} from '../config/interceptors/router.js';
import routes from '../service/router/index.js';

Vue.use(Router);
// 初始化 router 实例
const instance = new Router({
  ...ROUTER_DEFAULT_CONFIG,
  routes
});
// 设置拦截器
instance.onReady(routerOnReady);
instance.beforeEach(routerBeforeEachFunc);
instance.afterEach(routerAfterEachFunc);
// 主应用 view ，如果需要在外部挂载 children 可以直接使用 $mainRouter
/* instance.$rootRouter = (instance.options.routes).filter((router) => {
  return router.path === '/'
})[0] */
// 解决 ElementUI 导航栏中的 vue-router 在 3.0 版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default instance;
