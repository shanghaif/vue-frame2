/**
 * @desc
 * 自定义图标加载表
 * 所有图标均从这里加载，方便管理
 * @example
 * <template>
 *   <bx-analyse style="width: 100px;height:100px;"></bx-analyse>
 * </template>
 * <script>
 * import { bxAnalyse } from '@/plugins/icons.js';
 * export default {
 *   components: { bxAnalyse } // 已经是一个组件
 * }
 * </script>
 */
/**
 * @desc
 * 自定义图标加载表
 * 所有图标均从这里加载，方便管理
 * @example
 * <template>
 *   <bx-analyse style="width: 100px;height:100px;"></bx-analyse>
 * </template>
 * <script>
 * import { bxAnalyse } from '@/plugins/icons.js';
 * export default {
 *   components: { bxAnalyse } // 已经是一个组件
 * }
 * </script>
 */
import bxAnalyse from '@css-theme/common/icons/bx-analyse.svg?inline'; // path to your '*.svg?inline' file.

export default function (theme = 'default') {
  if (theme === 'default') {
    return [
      { name: 'bx-analyse', component: bxAnalyse }
    ];
  }
};
