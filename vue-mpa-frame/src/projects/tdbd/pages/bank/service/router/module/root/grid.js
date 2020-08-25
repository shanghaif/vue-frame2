/**
 * @desc Grid 列表
 */

const index = [
  {
    path: '/grid',
    name: 'grid',
    meta: { title: 'Grid 列表' },
    component: () => import(/* webpackChunkName:"bank/views/grid" */ '@bank_views/grid/index.vue')
  }
];

export default index;
