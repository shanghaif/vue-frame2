/**
 * @desc 用户管理
 */

const index = [
  {
    path: '/user',
    name: 'user',
    meta: { title: '用户管理' },
    component: () => import(/* webpackChunkName:"bank/views/user" */ '@bank_views/user/index.vue')
  }
];

export default index;
