/**
 * @desc Grid 列表
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/grid',
    name: 'grid',
    meta: { title: 'Grid 列表' },
    // component: () => import(/* webpackChunkName:"bank/views/grid" */ '@bank_views/grid/index.vue')
    component: BlankLayout,
    children: [
      {
        name: 'base-grid',
        path: 'base-grid',
        meta: { title: '基础-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@bank_views/grid/index.vue'
          )
      },
      {
        name: 'roll-grid',
        path: 'roll-grid',
        meta: { title: '滚动-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@bank_views/grid/roll-grid/index.vue'
          )
      }
    ]
  }
];

export default index;
