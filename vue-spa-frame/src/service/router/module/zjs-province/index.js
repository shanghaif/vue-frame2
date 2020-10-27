/**
 * @desc 通过 menuId 来打开的菜单
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    name: 'hz-city',
    path: 'hz-city',
    meta: { title: '杭州市' },
    component: BlankLayout,
    children: [
      {
        name: 'jgq-area',
        path: 'jgq-area',
        meta: { title: '江干区' },
        component: () => import(/* webpackChunkName:"views/zjs-province" */ '@views/zjs-province/hz-city/jgq-area/index.vue')
      },
      {
        name: 'xh-area',
        path: 'xh-area',
        meta: { title: '西湖区' },
        component: () => import(/* webpackChunkName:"views/zjs-province" */ '@views/zjs-province/hz-city/xh-area/index.vue')
      }
    ]
  },
  {
    name: 'jx-city',
    path: 'jx-city',
    meta: { title: '嘉兴市' },
    component: () => import(/* webpackChunkName:"views/zjs-province" */ '@views/zjs-province/jx-city/index.vue')
  }
];

export default index;
