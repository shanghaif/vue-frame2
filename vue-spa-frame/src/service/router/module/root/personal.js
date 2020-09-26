/**
 * @desc 个人中心
 */
const index = [
  {
    path: '/personal',
    name: 'personal',
    meta: { title: '个人中心', approve: true },
    component: () => import(/* webpackChunkName:"views/personal" */ '@views/personal/index.vue'),
    children: [
      {
        path: 'detail',
        name: 'detail',
        meta: { title: '详情' }, // approve 用于设置详情页等不在菜单中的路由
        component: () => import(/* webpackChunkName:"views/personal/detail" */ '@views/personal/detail/index.vue')
      }
    ]
  }
];

export default index;
