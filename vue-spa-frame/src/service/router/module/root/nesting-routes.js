/**
 * @desc 嵌套路由
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: 'nesting-routes',
    name: 'nesting-routes',
    meta: { title: '嵌套路由' },
    component: BlankLayout,
    children: [
      {
        name: 'nesting-routes-test',
        path: 'nesting-routes-test',
        meta: { title: '示例1' },
        component: () =>
          import(
            /* webpackChunkName:"views/nesting-routes" */ '@views/nesting-routes/index.vue'
          )
      }
    ]
  }
];

export default index;
