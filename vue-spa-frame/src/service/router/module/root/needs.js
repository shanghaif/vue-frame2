/**
 * @desc 需求管理
 */
const index = [
  {
    name: 'needs',
    path: '/needs',
    meta: { meta: '需求管理' },
    component: () =>
      import(
        /* webpackChunkName:"views/needs/index" */ '@views/needs/index.vue'
      ),
    children: [
      {
        path: 'loan',
        name: 'loan',
        meta: { title: '贷款需求' },
        // component: () => import('../../../views/needs/loan.vue'),
        component: () =>
          import(
            /* webpackChunkName:"views/needs/load" */ '@views/needs/loan.vue'
          ),
        children: [
          // {
          //   name: 'record',
          //   path: 'record',
          //   meta: { title: '录入' },
          //   component: () => import(/* webpackChunkName:"views/needs/record" */ '@views/needs/record.vue')
          // },
          {
            name: 'assess',
            path: 'assess',
            meta: { title: '评审' },
            component: () =>
              import(
                /* webpackChunkName:"views/needs/assess" */ '@views/needs/assess.vue'
              )
          }
        ]
      }
      // {
      //   path: 'fund-collect',
      //   name: 'fund-collect',
      //   meta: { title: '基金管理' },
      //   component: () => import(/* webpackChunkName:"views/needs/fund-collect" */ '@views/needs/fund-collect.vue')
      // }
    ]
  }
];

export default index;
