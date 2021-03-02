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
/**
 * @desc 获取某个路由配置
 * @param {Array} path - 路由路径
 * @example
 * const path = '/service-platform/setting/frame';
 * const pathSplitList = _split(path, '/');
 * this.$router._getRouterOption(pathSplitList);
 */
instance._getRouterOption = (path = []) => {
  let option;
  let routeList = routes;
  const getRoute = function(routeList, name) {
    return _find(routeList, o => o.name === name);
  };
  for (let i = 0, len = path.length; i < len; i++) {
    const name = path[i];
    if (_isEmpty(name)) {
      continue;
    }
    const name2Route = getRoute(routeList, name);
    routeList = _get(name2Route, 'children', []);
    i === len - 1 && (option = name2Route);
  }
  return option;
};
export default instance;
