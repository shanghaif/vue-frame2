/**
 * @desc Grid 列表
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/tree',
    name: 'tree',
    meta: { title: 'tree 树形控件' },
    component: BlankLayout,
    children: [
      {
        name: 'base-tree',
        path: 'base-tree',
        meta: { title: '基础-tree' },
        component: () => import(/* webpackChunkName:"views/tree" */ '@views/tree/index.vue')
      },
      {
        name: 'base-select-tree',
        path: 'base-select-tree',
        meta: { title: '下拉面板-tree' },
        component: () => import(/* webpackChunkName:"views/tree" */ '@views/tree/select-tree.vue')
      },
      {
        name: 'base-roll-tree',
        path: 'base-roll-tree',
        meta: { title: '滚动-tree' },
        component: () => import(/* webpackChunkName:"views/tree" */ '@views/tree/roll-tree.vue')
      }
    ]
  }
];

export default index;
