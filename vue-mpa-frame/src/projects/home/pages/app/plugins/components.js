/**
 * @desc 注册全局组件
 */
import itemComponents from '../components/index.js';

export default {
  install: (Vue, options = {}) => {
    for (const key in itemComponents) {
      Vue.component(itemComponents[key].name, itemComponents[key]);
    }
  }
};
