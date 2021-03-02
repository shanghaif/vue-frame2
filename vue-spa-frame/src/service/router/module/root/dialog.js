/**
 * @desc 对话框
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/dialog',
    name: 'dialog',
    meta: { title: '对话框' },
    component: BlankLayout,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { title: 'dialog' },
        component: () =>
          import(
            /* webpackChunkName:"views/dialog" */ '@views/dialog/index.vue'
          )
      },
      {
        path: 'drag-dialog',
        name: 'drag-dialog',
        meta: { title: '拖拽-dialog' },
        component: () =>
          import(
            /* webpackChunkName:"views/dialog" */ '@views/dialog/drag/index.vue'
          )
      }
    ]
  }
];

export default index;
