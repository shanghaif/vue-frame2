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
        /* webpackChunkName:"bank/views/needs/record" */ '@bank_views/needs/record.vue'
      )
  }
];
export default index;
