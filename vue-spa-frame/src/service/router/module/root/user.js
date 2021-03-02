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
  }
];

export default index;
