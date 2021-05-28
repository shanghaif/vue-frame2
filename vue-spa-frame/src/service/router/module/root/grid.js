/**
 * @desc Grid 列表
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/grid',
    name: 'grid',
    meta: { title: 'Grid 列表' },
    component: BlankLayout,
    children: [
      {
        name: 'base-grid',
        path: 'base-grid',
        meta: { title: '基础-grid' },
        component: () =>
          import(/* webpackChunkName:"views/grid" */ '@views/grid/index.vue')
      },
      {
        name: 'roll-grid',
        path: 'roll-grid',
        meta: { title: '滚动-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/roll-grid/index.vue'
          )
      },
      {
        name: 'expand-grid',
        path: 'expand-grid',
        meta: { title: '展开-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/expand-grid/index.vue'
          )
      },
      {
        name: 'options-grid',
        path: 'options-grid',
        meta: { title: '静态数据-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/options-grid/index.vue'
          )
      },
      {
        name: 'select-grid',
        path: 'select-grid',
        meta: { title: '下拉-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/select-grid/index.vue'
          )
      },
      {
        name: 'paging-grid',
        path: 'paging-grid',
        meta: { title: '自定义分页参数-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/paging-grid/index.vue'
          )
      },
      {
        name: 'transfer-table',
        path: 'transfer-table',
        meta: { title: '表格穿梭' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/transfer-table/index.vue'
          )
      },
      {
        name: 'relevance-grid',
        path: 'relevance-grid',
        meta: { title: '表格联动-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/relevance-grid/index.vue'
          )
      },
      {
        name: 'more-header-grid',
        path: 'more-header-grid',
        meta: { title: '多表格-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/more-header-grid/index.vue'
          )
      },
      {
        name: 'roll-load-grid',
        path: 'roll-load-grid',
        meta: { title: '滚动加载-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/roll-load-grid/index.vue'
          )
      },
      {
        name: 'property-grid',
        path: 'property-grid',
        meta: { title: '属性-grid' },
        component: () =>
          import(
            /* webpackChunkName:"views/grid" */ '@views/grid/property-grid/index.vue'
          )
      }
    ]
  }
];

export default index;
