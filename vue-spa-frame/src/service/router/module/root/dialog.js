/**
 * @desc 对话框
 */

const index = [
  {
    path: '/dialog',
    name: 'dialog',
    meta: { title: '对话框' },
    component: () => import(/* webpackChunkName:"views/dialog" */ '@views/dialog/index.vue')
  }
];

export default index;
