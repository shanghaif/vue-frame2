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
    // 控制布局组件的展示
    props: {
      /* renderNavMenu: false,
      renderDropColumnDown: false,
      renderDropDown: false */
      isPadding: false
    },
    children: [
      {
        path: 'development-specification',
        name: 'development-specification',
        meta: { title: '开发规范' },
        component: () =>
          import(
            /* webpackChunkName:"views/user/development-file" */ '@views/user/development-file.vue'
          )
      },
      {
        path: 'view-collapse',
        name: 'view-collapse',
        meta: { title: '视图-折叠面板' },
        component: () =>
          import(
            /* webpackChunkName:"views/view-collapse" */ '@views/view-collapse/index.vue'
          )
      },
      {
        path: 'wang-editor',
        name: 'wang-editor',
        meta: { title: '富文本编辑器' },
        component: () =>
          import(
            /* webpackChunkName:"views/wang-editor" */ '@views/wang-editor/index.vue'
          )
      },
      {
        path: 'ts-test',
        name: 'ts-test',
        meta: { title: 'typescript' },
        component: () =>
          import(
            /* webpackChunkName:"views/ts-test" */ '@views/ts-test/index.vue'
          )
      },
      {
        path: 'drawer',
        name: 'drawer',
        meta: { title: 'drawer' },
        component: () =>
          import(
            /* webpackChunkName:"views/dialog" */ '@views/dialog/drawer.vue'
          )
      },
      {
        name: 'nesting-grid',
        path: 'nesting-grid',
        meta: { title: '嵌套-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/nesting-grid/index.vue'
          )
      },
      {
        name: 'row-edit-grid',
        path: 'row-edit-grid',
        meta: { title: '行编辑-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/edit-grid/index.vue'
          )
      },
      {
        name: 'responsive-page',
        path: 'responsive-page',
        meta: { title: '响应式-界面' },
        component: () =>
          import(
            /* webpackChunkName:"views/responsive-page" */ '@views/responsive-page/index.vue'
          )
      },
      {
        name: 'drag-grid',
        path: 'drag-grid',
        meta: { title: '拖拽-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/drag-grid" */ '@views/grid/drag-grid/index.vue'
          )
      },
      {
        name: 'update-log',
        path: 'update-log',
        meta: { title: '更新日志' },
        component: () =>
          import(
            /* webpackChunkName:"views/user" */ '@views/user/update-log.vue'
          )
      },
      {
        name: 'tree-grid',
        path: 'tree-grid',
        meta: { title: '树形-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/tree-grid/index.vue'
          )
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
    component: () =>
      import(/* webpackChunkName:"views/login" */ '@views/login/index.vue'),
    meta: { title: '登录' },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/helper',
    name: '',
    component: Basic4Layout,
    meta: { title: '帮助中心' },
    children: [
      {
        path: '',
        name: '',
        meta: { title: '信息', approve: true },
        component: () =>
          import(
            /* webpackChunkName:"views/helper" */ '@views/helper/index.vue'
          )
      }
    ]
  },
  {
    path: '/open-out-view',
    name: 'open-out-view',
    component: () =>
      import(
        /* webpackChunkName:"views/open-out-view" */ '@views/open-out-view/index.vue'
      ),
    meta: { title: '外部菜单', target: '_blank', approve: true }
  },
  {
    name: 'html2pdf',
    path: '/html2pdf',
    meta: {
      title: 'html转pdf下载',
      target: '_blank',
      approve: true
    },
    component: () =>
      import(/* webpackChunkName:"views/user" */ '@views/user/html2pdf.vue')
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
    component: () =>
      import(/* webpackChunkName:"views/404" */ '@views/error-page/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];
export default commonRoutes;
