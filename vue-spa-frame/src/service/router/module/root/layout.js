/**
 * @desc 布局
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/layout',
    name: 'layout',
    meta: { title: '布局' },
    component: BlankLayout,
    children: [
      {
        path: 'border-layout',
        name: 'border-layout',
        meta: { title: 'border布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/border.vue'
          )
      },
      {
        path: 'anchor-layout',
        name: 'anchor-layout',
        meta: { title: '锚点布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/anchor.vue'
          )
      },
      {
        path: 'v-box-layout',
        name: 'v-box-layout',
        meta: { title: '垂直布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/v-box.vue'
          )
      },
      {
        path: 'h-box-layout',
        name: 'h-box-layout',
        meta: { title: '水平布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/h-box.vue'
          )
      },
      {
        path: 'absolute-layout',
        name: 'absolute-layout',
        meta: { title: '绝对定位布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/absolute.vue'
          )
      },
      {
        path: 'column-layout',
        name: 'column-layout',
        meta: { title: '列布局' },
        component: () =>
          import(
            /* webpackChunkName:"views/layout" */ '@views/layout/column.vue'
          )
      }
    ]
  }
];

export default index;
