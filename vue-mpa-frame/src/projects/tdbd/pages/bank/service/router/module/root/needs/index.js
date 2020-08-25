/**
 * @desc 需求管理
 */
const index = [
  {
    path: 'fund-collect',
    name: 'fund-collect',
    meta: { title: '基金管理' },
    component: () => import(/* webpackChunkName:"bank/views/needs/fund-collect" */ '@bank_views/needs/fund-collect.vue')
  }
];
export default index;
