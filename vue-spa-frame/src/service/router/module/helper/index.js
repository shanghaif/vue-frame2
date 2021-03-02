/**
 * @desc 帮助
 */

const index = [
  {
    path: '/helper-info',
    name: 'helper-info',
    meta: { title: '帮助中心' },
    component: () =>
      import(/* webpackChunkName:"views/helper" */ '@views/helper/index.vue')
  }
];

export default index;
