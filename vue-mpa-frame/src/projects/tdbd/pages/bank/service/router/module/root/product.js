/**
 * @desc 产品发布
 */
const index = [
  {
    path: '/product',
    name: 'product',
    meta: { title: '产品发布' },
    component: () =>
      import(
        /* webpackChunkName:"bank/views/product" */ '@bank_views/product/index.vue'
      )
  }
];

export default index;
