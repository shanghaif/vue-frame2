/**
 * @desc 用户管理
 */

const index = [
  {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理', approve: true },
    component: () =>
      import(/* webpackChunkName:"views/user" */ '@views/user/index.vue')
  },
  {
    path: '/scrollbar',
    name: 'scrollbar',
    meta: { title: '滚动组件' },
    component: () =>
      import(/* webpackChunkName:"views/user" */ '@views/user/scrollbar.vue')
  },
  {
    path: '/route-transition-view',
    name: 'route-transition-view',
    meta: { title: '路由转场动画' },
    component: () =>
      import(
        /* webpackChunkName:"views/user" */ '@views/user/route-transition-view.vue'
      )
  }
];

export default index;
