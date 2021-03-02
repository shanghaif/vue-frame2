/**
 * @desc 贷款需求
 */
const index = [
  {
    name: 'record',
    path: 'record',
    meta: { title: '录入' },
    component: () =>
      import(
        /* webpackChunkName:"views/needs/record" */ '@views/needs/record.vue'
      )
  },
  {
    name: 'update-source-code',
    path: 'update-source-code',
    meta: { title: '修改-源码' },
    component: () =>
      import(
        /* webpackChunkName:"views/personal" */ '@views/personal/update-source-code.vue'
      )
  }
];
export default index;
