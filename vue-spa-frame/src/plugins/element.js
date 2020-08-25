/**
 * @desc 公共引入
 */
// ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入 packages/components 自定义组件的自定义样式文件
import '@packages/components/theme-default/index.less';

Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(ElementUI);
Vue.prototype.$message = ElementUI.Message;
