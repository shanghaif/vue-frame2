/**
 * @desc 表单
 */
const index = [
  {
    path: 'form',
    name: 'form',
    meta: { title: '表单', approve: true },
    component: () =>
      import(/* webpackChunkName:"views/form" */ '@views/form/index.vue')
  }
];

export default index;
