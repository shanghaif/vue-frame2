/**
 * @desc 路由配置
 */
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from '@config/index.js';

const routes = [
  {
    path: '/',
    name: ROOT_PAGE_NAME,
    component: () =>
      import(
        /* webpackChunkName:"views/platform" */ '../../views/platform/index.vue'
      )
    /* beforeEnter: (to, from, next) => {
      console.info('444444444444 ');
      next()
    }, */
    // children: []
    /* children: [
      {
        path: 'personal',
        name: 'personal',
        meta: { title: '个人中心' },
        component: () => import('../../../views/personal/index.vue')
      }
    ] */
  },
  {
    path: `/${LOGIN_PAGE_NAME}`,
    name: LOGIN_PAGE_NAME,
    component: () =>
      import(
        /* webpackChunkName:"views/login" */ '../../views/login/index.vue'
      ),
    meta: { title: '登录' }
  },
  {
    path: '/helper',
    name: 'helper',
    component: () =>
      import(
        /* webpackChunkName:"views/helper" */ '../../views/helper/index.vue'
      ),
    meta: { title: '帮助中心' }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../../views/user/index.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    meta: { title: '个人中心' },
    component: () => import('../../views/personal/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName:"views/404" */ '@packages/views/error-page/404.vue'
      ),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];
export default routes;
