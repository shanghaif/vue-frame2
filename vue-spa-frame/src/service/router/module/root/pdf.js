/**
 * @desc 需求管理
 */
const index = [
  {
    name: 'pdf',
    path: '/pdf',
    meta: { meta: 'pdf下载' },
    component: () =>
      import(/* webpackChunkName:"views/needs/index" */ '@views/pdf/index.vue'),
    children: []
  }
];

export default index;
