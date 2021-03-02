/**
 * @desc 外部子路由
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/out-router-page',
    name: 'out-router-page',
    meta: { title: '大屏展示' },
    component: BlankLayout,
    children: [
      {
        name: 'out-router-page-one',
        path: 'out-router-page-one',
        meta: { title: '示例1' },
        component: () =>
          import(
            /* webpackChunkName:"views/out-router-page" */ '@views/out-router-page/index.vue'
          )
      },
      {
        name: 'out-router-page-two',
        path: 'out-router-page-two',
        meta: { title: '示例2' },
        component: () =>
          import(
            /* webpackChunkName:"views/out-router-page" */ '@views/out-router-page/index1.vue'
          )
      }
    ]
  }
];

export default index;
