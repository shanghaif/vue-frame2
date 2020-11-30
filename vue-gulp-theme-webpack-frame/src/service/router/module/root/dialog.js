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
        component: () => import(/* webpackChunkName:"views/dialog" */ '@views/dialog/index.vue')
      },
      {
        path: 'drawer',
        name: 'drawer',
        meta: { title: 'drawer' },
        component: () => import(/* webpackChunkName:"views/dialog" */ '@views/dialog/drawer.vue')
      }
    ]
  }
];

export default index;
