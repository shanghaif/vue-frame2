/**
 * @desc Grid 列表
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/grid',
    name: 'grid',
    meta: { title: 'Grid 列表' },
    component: BlankLayout,
    children: [
      {
        name: 'base-grid',
        path: 'base-grid',
        meta: { title: '基础-grid' },
        component: () => import(/* webpackChunkName:"views/grid" */ '@views/grid/index.vue')
      },
      {
        name: 'roll-grid',
        path: 'roll-grid',
        meta: { title: '滚动-grid' },
        component: () => import(/* webpackChunkName:"views/grid" */ '@views/grid/roll-grid/index.vue')
      }
    ]
  }
];

export default index;
