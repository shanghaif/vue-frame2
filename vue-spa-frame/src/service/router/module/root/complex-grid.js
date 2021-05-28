/**
 * @desc Grid 复杂示例
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/complex-grid',
    name: 'complex-grid',
    meta: { title: 'Grid 复杂示例' },
    component: BlankLayout,
    children: [
      {
        name: 'tree-expand-grid',
        path: 'tree-expand-grid',
        meta: { title: 'tree-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/complex-grid" */ '@views/complex-grid/tree-expand-grid/index.vue'
          )
      },
      {
        name: 'dynamic-grid',
        path: 'dynamic-grid',
        meta: { title: '动态grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/complex-grid" */ '@views/complex-grid/dynamic-grid/index.vue'
          )
      }
    ]
  }
];

export default index;
