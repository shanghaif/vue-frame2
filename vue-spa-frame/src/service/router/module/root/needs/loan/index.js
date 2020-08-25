/**
 * @desc 贷款需求
 */
const index = [
  {
    name: 'record',
    path: 'record',
    meta: { title: '录入' },
    component: () => import(/* webpackChunkName:"views/needs/record" */ '@views/needs/record.vue')
  }
];
export default index;
