/**
 * @desc 下拉菜单
 */
const index = [
  {
    path: 'dropdown',
    name: 'dropdown',
    meta: { title: '下拉菜单', approve: true },
    component: () =>
      import(
        /* webpackChunkName:"views/dropdown" */ '@views/dropdown/index.vue'
      )
  }
];

export default index;
