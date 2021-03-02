import { BlankLayout } from '@packages/views/index.js';
export default [
  {
    name: 'visualization',
    path: '/visualization',
    meta: { title: '可视化' },
    component: BlankLayout,
    children: [
      {
        path: 'history-time-scroll',
        name: 'history-time-scroll',
        meta: { title: '时间历程轮播组件' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/visualization/history-time-scroll/index.vue'
          )
      },
      {
        path: 'word-cloud',
        name: 'word-cloud',
        meta: { title: '标签词云' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/visualization/word-cloud/index.vue'
          )
      },
      {
        path: 'force-tp',
        name: 'force-tp',
        meta: { title: '企业关系图谱' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/visualization/force-tp/index.vue'
          )
      },
      {
        path: 'map-bar',
        name: 'map-bar',
        meta: { title: '地图柱状图统计' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/visualization/map-bar/index.vue'
          )
      }
    ]
  }
];
