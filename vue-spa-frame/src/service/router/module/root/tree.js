/**
 * @desc Grid 列表
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/tree',
    name: 'tree',
    meta: { title: 'tree 树形控件' },
    component: BlankLayout,
    children: [
      {
        name: 'base-tree',
        path: 'base-tree',
        meta: { title: '基础-tree' },
        component: () =>
          import(/* webpackChunkName:"views/tree" */ '@views/tree/index.vue')
      },
      {
        name: 'base-select-tree',
        path: 'base-select-tree',
        meta: { title: '下拉面板-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/select-tree.vue'
          )
      },
      {
        name: 'base-roll-tree',
        path: 'base-roll-tree',
        meta: { title: '滚动-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/roll-tree.vue'
          )
      },
      {
        name: 'store-tree',
        path: 'store-tree',
        meta: { title: '静态资源-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/store-tree.vue'
          )
      },
      {
        name: 'transfer-tree',
        path: 'transfer-tree',
        meta: { title: '穿梭-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/cascader-tree.vue'
          )
      },
      {
        name: 'anchor-tree',
        path: 'anchor-tree',
        meta: { title: '锚点双向绑定-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/tree-anchor.vue'
          )
      },
      {
        name: 'anchor-tree-two',
        path: 'anchor-tree-two',
        meta: { title: '锚点双向绑定-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/anchor-tree-two.vue'
          )
      },
      {
        name: 'cascader-tree',
        path: 'cascader-tree',
        meta: { title: '级联-tree' },
        component: () =>
          import(
            /* webpackChunkName:"views/tree" */ '@views/tree/cascader-tree/index.vue'
          )
      }
    ]
  }
];

export default index;
