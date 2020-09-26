/**
 * 路由配置
 * 对应 module 目录下的文件
 * 入口文件
 */
import { CONST_DEFAULT_CONFIG } from '@config/index.js';
import _camelCase from 'lodash/camelCase';
import _has from 'lodash/has';
import _split from 'lodash/split';
import _dropRight from 'lodash/dropRight';
import _find from 'lodash/find';
import _get from 'lodash/get';

const requireModule = require.context('./module', true, /\.js$/);
const modules = {};
requireModule.keys().forEach(filePath => {
  if (filePath === './index.js') return;
  let moduleName = filePath.replace(/(\.\/|\.js)/g, '');
  if (filePath.split('/').length === 2) {
    moduleName = _camelCase(filePath.replace(/(\.\/|\.js)/g, ''));
    modules[moduleName] = { ...requireModule(filePath) }.default;
  }
});
requireModule.keys().forEach(filePath => {
  if (filePath === './index.js') return;
  let moduleName = '';
  if (filePath.split('/').length > 2) {
    moduleName = filePath.replace(/(\.\/|\.js)/g, '');
    const aModuleNameList = _split(moduleName, CONST_DEFAULT_CONFIG.sep);
    const aDropRightArray = _dropRight(aModuleNameList);
    let commonRoutes = _get(modules, 'common', []);
    const setRouterChildren = function (moduleRouter) {
      if (!_has(moduleRouter, 'children')) {
        moduleRouter.children = [];
      }
      const requireModuleList = requireModule(filePath).default;
      for (let i = 0, len = requireModuleList.length; i < len; i++) {
        moduleRouter.children.push(requireModule(filePath).default[i]);
      }
    };
    for (let i = 0, len = aDropRightArray.length; i < len; i++) {
      const value = aDropRightArray[i];
      const moduleRouter = _find(commonRoutes, item => {
        return item.name === value;
      });
      if (i === (len - 1)) {
        moduleRouter && setRouterChildren(moduleRouter);
      } else {
        commonRoutes = moduleRouter.children;
      }
    }
  }
});
export default modules.common;
