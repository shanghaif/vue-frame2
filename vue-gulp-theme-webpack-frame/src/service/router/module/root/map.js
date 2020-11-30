/**
 * @desc 地图
 */

const index = [
  {
    path: '/map',
    name: 'map',
    meta: { title: '地图' },
    component: () => import(/* webpackChunkName:"views/map" */ '@views/map/index.vue')
  }
];

export default index;
