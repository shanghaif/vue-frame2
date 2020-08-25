/**
 * @desc 帮助
 */

const index = [
  {
    path: '/info',
    name: 'info',
    meta: { title: '帮助中心' },
    component: () => import(/* webpackChunkName:"views/helper" */ '@bank_views/helper/index.vue')
  }
];

export default index;
