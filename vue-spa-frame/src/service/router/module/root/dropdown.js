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
  },
  {
    path: 'tabs',
    name: 'tabs',
    meta: { title: '标签页' },
    component: () =>
      import(
        /* webpackChunkName:"views/dropdown" */ '@views/pbank/tabs/index.vue'
      )
  }
];

export default index;
