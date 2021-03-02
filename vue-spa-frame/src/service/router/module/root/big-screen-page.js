/**
 * @desc 大屏展示
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/big-screen-page',
    name: 'big-screen-page',
    meta: { title: '大屏展示' },
    component: BlankLayout,
    children: [
      {
        name: 'big-screen-page-one',
        path: 'big-screen-page-one',
        meta: { title: '示例1' },
        component: () =>
          import(
            /* webpackChunkName:"views/big-screen-page" */ '@views/big-screen-page/example-one/index.vue'
          )
      },
      {
        name: 'big-screen-page-two',
        path: 'big-screen-page-two',
        meta: { title: '示例2' },
        component: () =>
          import(
            /* webpackChunkName:"views/big-screen-page" */ '@views/big-screen-page/example-two/index.vue'
          )
      }
    ]
  }
];

export default index;
