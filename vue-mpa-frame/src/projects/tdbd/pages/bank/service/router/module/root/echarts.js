/**
 * @desc 图表展示 echarts
 */
const index = [
  {
    name: 'echarts',
    path: '/echarts',
    meta: { meta: '图表展示' },
    component: () =>
      import(
        /* webpackChunkName:"bank/views/echarts" */ '@packages/views/layouts/blank-layout.vue'
      ),
    children: [
      {
        path: 'line',
        name: 'line',
        meta: { title: '折线' },
        component: () =>
          import(
            /* webpackChunkName:"bank/views/echarts" */ '@packages/views/layouts/blank-layout.vue'
          ),
        children: [
          {
            name: 'one',
            path: 'one',
            meta: { title: '示例1' },
            component: () =>
              import(
                /* webpackChunkName:"bank/views/echarts" */ '@bank_views/echarts/line/one.vue'
              )
          },
          {
            name: 'two',
            path: 'two',
            meta: { title: '示例2' },
            component: () =>
              import(
                /* webpackChunkName:"bank/views/echarts" */ '@bank_views/echarts/line/one.vue'
              )
          }
        ]
      }
    ]
  }
];

export default index;
