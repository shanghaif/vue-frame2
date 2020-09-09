/**
 * @desc 公共路由
 */
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from '@config/index.js';
import { Basic3Layout } from '@packages/views/index.js';

const commonRoutes = [
  {
    path: '/',
    name: ROOT_PAGE_NAME,
    component: Basic3Layout
    // redirect: 'needs/loan'
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
    component: () => import(/* webpackChunkName:"views/login" */ '@views/login/index.vue'),
    meta: { title: '登录' },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/helper',
    name: 'helper',
    component: () => import(/* webpackChunkName:"views/helper" */ '@views/helper/index.vue'),
    meta: { title: '帮助中心' }
    /* children: [
      {
        path: '/info',
        name: 'info',
        meta: { title: '信息' },
        component: () => import('../../../views/personal/index.vue')
      }
    ] */
  },
  /* {
    path: '/user',
    name: 'user',
    component: () => import('../../../views/user/index.vue')
  }, */
  /* {
    path: '/personal',
    name: 'personal',
    meta: { title: '个人中心' },
    component: () => import('../../../views/personal/index.vue')
  } */
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName:"views/404" */ '@views/error-page/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];
export default commonRoutes;
