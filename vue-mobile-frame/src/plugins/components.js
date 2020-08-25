/**
 * @desc 初始化全局组件
 */
import AllComponents from '../packages/components/index.js';
import AllViewComponents from '../packages/views/index.js';

export default {
  install: (Vue, options = {}) => {
    for (const key in AllComponents) {
      Vue.component(AllComponents[key].name, AllComponents[key]);
    }
    for (const key in AllViewComponents) {
      Vue.component(AllViewComponents[key].name, AllViewComponents[key]);
    }
  }
};
