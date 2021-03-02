/**
 * @desc 对话框
 */

const index = [
  {
    path: '/dialog',
    name: 'dialog',
    meta: { title: '对话框' },
    component: () =>
      import(
        /* webpackChunkName:"bank/views/dialog" */ '@bank_views/dialog/index.vue'
      )
  }
];

export default index;
