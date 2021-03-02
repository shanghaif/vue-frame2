/**
 * @desc 配置规范
 */
import { BlankLayout } from '@packages/views/index.js';

const index = [
  {
    path: '/config-specification',
    name: 'config-specification',
    meta: { title: '配置规范' },
    component: BlankLayout,
    children: [
      {
        path: '/vscode',
        name: 'vscode',
        meta: { title: 'vscode' },
        component: () =>
          import(
            /* webpackChunkName:"views/config-specification" */ '@views/config-specification/vscode.vue'
          )
      },
      {
        path: '/eslint',
        name: 'eslint',
        meta: { title: 'eslint' },
        component: () =>
          import(
            /* webpackChunkName:"views/config-specification" */ '@views/config-specification/eslint.vue'
          )
      },
      {
        path: '/stylelint',
        name: 'stylelint',
        meta: { title: 'stylelint' },
        component: () =>
          import(
            /* webpackChunkName:"views/config-specification" */ '@views/config-specification/stylelint.vue'
          )
      }
    ]
  }
];

export default index;
