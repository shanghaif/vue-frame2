/**
 * @desc vue Router 路由管理
 */
import Router from 'vue-router';
import { ROUTER_DEFAULT_CONFIG } from '../config/index.js';
import {
  routerBeforeEachFunc,
  routerAfterEachFunc,
  routerOnReady
} from '../config/interceptor/router.js';
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
export default instance;
