import { BlankLayout } from '@packages/views/index.js';
export default [
  {
    name: 'visualization',
    path: '/visualization',
    meta: { title: '可视化' },
    component: BlankLayout,
    children: [
      {
        path: 'echarts',
        name: 'echarts',
        meta: { title: 'echarts 基础示例' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/echarts/line/one.vue'
          )
      },
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
      },
      {
        path: 'administration-map',
        name: 'administration-map',
        meta: { title: '行政图' },
        component: () =>
          import(
            /* webpackChunkName:"views/visualization" */ '@views/echarts/regional-map/index.vue'
          )
      },
      {
        path: 'gd-map',
        name: 'gd-map',
        meta: { title: '高德地图' },
        component: BlankLayout,
        children: [
          {
            path: 'gd-map-normal',
            name: 'gd-map-normal',
            meta: { title: '普通地图' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/index.vue'
              )
          },
          {
            path: 'gd-map-marker',
            name: 'gd-map-marker',
            meta: { title: '高德地图-地图点标记' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/marker.vue'
              )
          },
          {
            path: 'gd-map-district',
            name: 'gd-map-district',
            meta: { title: '高德地图-简易行政区' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/district.vue'
              )
          },
          {
            path: 'gd-map-district-explorer',
            name: 'gd-map-district-explorer',
            meta: { title: '高德地图-行政区' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/district-explorer.vue'
              )
          },
          {
            path: 'gd-map-info-window',
            name: 'gd-map-info-window',
            meta: { title: '高德地图-信息窗口' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/info-window.vue'
              )
          },
          {
            path: 'gd-circle-map-marker',
            name: 'gd-circle-map-marker',
            meta: { title: '高德地图-地图点圆形标记' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/circle-marker.vue'
              )
          },
          {
            path: 'gd-map-mass-marks',
            name: 'gd-map-mass-marks',
            meta: { title: '高德地图-海量点' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/mass-marks.vue'
              )
          },
          {
            path: 'gd-map-text',
            name: 'gd-map-text',
            meta: { title: '高德地图-纯文本标记' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/text.vue'
              )
          },
          {
            path: 'gd-marker-clusterer',
            name: 'gd-marker-clusterer',
            meta: { title: '高德地图-点聚合' },
            component: () =>
              import(
                /* webpackChunkName:"views/visualization" */ '@views/visualization/gd-map/marker-clusterer.vue'
              )
          }
        ]
      }
    ]
  }
];
