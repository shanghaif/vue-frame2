/**
 * @desc 公共引入
 */
// vant 组件
import Vant from 'vant';
import 'vant/lib/index.css';

// 导入 packages/components 自定义组件的自定义样式文件
import '@packages/components/theme-default/index.less';

Vue.use(Vant);
