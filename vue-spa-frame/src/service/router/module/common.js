/**
 * @desc 公共路由
 */
import { LOGIN_PAGE_NAME, ROOT_PAGE_NAME } from '@config/index.js';
import { BasicLayout, Basic4Layout } from '@packages/views/index.js';

const commonRoutes = [
  {
    path: '/',
    name: ROOT_PAGE_NAME,
    component: BasicLayout,
    children: [
      {
        path: 'view-collapse',
        name: 'view-collapse',
        meta: { title: '视图-折叠面板' },
        component: () => import(/* webpackChunkName:"views/view-collapse" */ '@views/view-collapse/index.vue')
      },
      {
        path: 'wang-editor',
        name: 'wang-editor',
        meta: { title: '富文本编辑器' },
        component: () => import(/* webpackChunkName:"views/wang-editor" */ '@views/wang-editor/index.vue')
      }
    ]
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
    path: '/zjs-province/:menuId',
    name: 'zjs-province',
    props: true,
    meta: { title: '浙江省' },
    component: BasicLayout
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
    component: Basic4Layout,
    meta: { title: '帮助中心' },
    children: [
      {
        path: '',
        name: 'info',
        meta: { title: '信息', approve: true },
        component: () => import(/* webpackChunkName:"views/helper" */ '@views/helper/index.vue')
      }
    ]
  },
  {
    path: '/open-out-view',
    name: 'open-out-view',
    component: () => import(/* webpackChunkName:"views/open-out-view" */ '@views/open-out-view/index.vue'),
    meta: { title: '外部菜单', target: '_blank', approve: true }
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
