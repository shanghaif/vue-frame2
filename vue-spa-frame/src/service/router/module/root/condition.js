/**
 * @desc 对话框
 */

const index = [
  {
    path: '/condition',
    name: 'condition',
    meta: { title: '多重筛选框' },
    component: () => import(/* webpackChunkName:"views/dialog" */ '@views/condition/index.vue')
  }
];

export default index;
