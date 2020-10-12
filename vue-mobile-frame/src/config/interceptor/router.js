/**
 * @desc 路由拦截器
 */
import NProgress from 'nprogress';
import {
  WINDOW_TITLE_UPDATE,
  ROUTER_WHITE_LIST,
  LOGIN_PAGE_NAME,
  ROOT_PAGE_NAME
} from '../index.js';
import store from '@/store';
import _isEmpty from 'lodash/isEmpty';
/**
 * @desc 全局前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const routerBeforeEachFunc = function (to, from, next) {
  NProgress.start();
  if ('title' in to.meta && WINDOW_TITLE_UPDATE) {
    document.title = to.meta.title;
  }
  // 白名单直接跳转
  if (ROUTER_WHITE_LIST.includes(to.name)) {
    NProgress.done();
    return next();
  }
  const loginStatus = store.getters['platform/getLoginStatus'];
  // 未登录状态且要跳转的页面不是登录页
  if (!loginStatus && to.name !== LOGIN_PAGE_NAME) {
    NProgress.done();
    return next({ name: `${LOGIN_PAGE_NAME}` });
  }
  if (_isEmpty(from.matched)) {
    // 已登录并且应用已经初始化完成，刷新页面-载入字典数据
    Promise.all([store.dispatch('platform/getDict')])
      .then(() => {
        // 页面刷新重新设置 request.headers
        store.dispatch('platform/setApiHeaderParams', {
          token: store.getters['platform/getToken']
        });
      })
      .finally(() => {
        next();
        NProgress.done();
      });
    return;
  }
  // 已登录且要跳转的页面是 to 登录页 from 主页面
  if (loginStatus && to.name === ROOT_PAGE_NAME) {
    store
      .dispatch('platform/getDict')
      .then(() => {
        next();
      })
      .finally(() => {
        NProgress.done();
      });
    return;
  }
  next();
};

/**
 * @desc 全局后置路由钩子
 * @param {*} to
 * @param {*} from
 * @example window滚动条返回顶部、路由加载完成控制全局进度条
 */
const routerAfterEachFunc = function (to, from) {
  NProgress.done();
  // 进入新路由后，重置滚动条到顶部
  // 如果路由基本配置中已配置 'scrollBehavior' 则可以隐藏下面的代码
  /* if (document.body.scrollHeight > window.innerHeight) {
    window.scrollTo(0, 0)
  } */
};

/**
 * @desc 浏览器刷新
 * @example 在刷新时会执行到 router.onReady 可以处理把数据放入 localStorage 或 cookie 中的操作
 */
const routerOnReady = function (to) {
  // 判断 token 是否有效，无效直接打开登录页
  // 载入字典数据
  /* if (store.getters['platform/getLoginStatus']) {
    store.dispatch('platform/getDict');
  } */
  // if(){}
  // 页面刷新重新设置 request.headers
  // store.dispatch('platform/setApiHeaderParams', { token: store.getters['platform/getToken'] });
};

export { routerBeforeEachFunc, routerAfterEachFunc, routerOnReady };
