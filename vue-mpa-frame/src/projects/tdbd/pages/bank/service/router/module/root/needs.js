/**
 * @desc 需求管理
 */
const index = [
  {
    name: 'needs',
    path: '/needs',
    meta: { meta: '需求管理' },
    component: () => import(/* webpackChunkName:"bank/views/needs/index" */ '@bank_views/needs/index.vue'),
    children: [
      {
        path: 'loan',
        name: 'loan',
        meta: { title: '贷款需求' },
        // component: () => import('../../../views/needs/loan.vue'),
        component: () => import(/* webpackChunkName:"bank/views/needs/load" */ '@bank_views/needs/loan.vue'),
        children: [
          // {
          //   name: 'record',
          //   path: 'record',
          //   meta: { title: '录入' },
          //   component: () => import(/* webpackChunkName:"bank/views/needs/record" */ '@bank_views/needs/record.vue')
          // },
          {
            name: 'assess',
            path: 'assess',
            meta: { title: '评审' },
            component: () => import(/* webpackChunkName:"bank/views/needs/assess" */ '@bank_views/needs/assess.vue')
          }
        ]
      }
      // {
      //   path: 'fund-collect',
      //   name: 'fund-collect',
      //   meta: { title: '基金管理' },
      //   component: () => import(/* webpackChunkName:"bank/views/needs/fund-collect" */ '@bank_views/needs/fund-collect.vue')
      // }
    ]
  }
];

export default index;
