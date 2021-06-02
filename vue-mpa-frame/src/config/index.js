/**
 * @desc 公共配置
 */
// 登陆路由名称
const LOGIN_PAGE_NAME = 'login';
// 根路由名称
const ROOT_PAGE_NAME = 'root';
// CONST 默认参数配置 sep：命名空间分隔符
const CONST_DEFAULT_CONFIG = {
  sep: '/'
};
// 入口项目路由配置
const HOME_ROUTER_NAME = '/app';
// 路由的打开类型
const ROUTER_OPEN_TYPE = {
  menu: 'menu', // 通过菜单打开
  push: 'push' // 通过 push 程序的形式打开
};

export {
  LOGIN_PAGE_NAME,
  ROOT_PAGE_NAME,
  CONST_DEFAULT_CONFIG,
  HOME_ROUTER_NAME,
  ROUTER_OPEN_TYPE
};
