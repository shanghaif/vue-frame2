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
    redirect: { name: 'nesting-routes-test' },
    children: [
      {
        name: 'nesting-routes-test',
        path: 'nesting-routes-test',
        component: () =>
          import(
            /* webpackChunkName:"views/nesting-routes" */ '@views/nesting-routes/index.vue'
          )
      },
      {
        name: 'nesting-routes-add',
        path: 'nesting-routes-add',
        component: () =>
          import(
            /* webpackChunkName:"views/nesting-routes" */ '@views/nesting-routes/add.vue'
          )
      }
    ]
  }
];

export default index;
