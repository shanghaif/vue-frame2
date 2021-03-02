/**
 * @desc 需求管理
 */
const index = [
  {
    path: 'fund-collect',
    name: 'fund-collect',
    meta: { title: '基金管理' },
    component: () =>
      import(
        /* webpackChunkName:"views/needs/fund-collect" */ '@views/needs/fund-collect.vue'
      )
  }
];
export default index;
