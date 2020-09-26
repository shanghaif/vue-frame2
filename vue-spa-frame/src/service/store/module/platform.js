/**
 * @desc 这个网站的 store
 */
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNil from 'lodash/isNil';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import router from '../../../router/index.js';
import { sStorageKey } from '../../../store/index.js';

const state = {
  data: {}, // 用户信息
  // 是否已登陆
  isLogin: false,
  /**
   * 应用是否已经初始化完成 主要用于检测 'roleMenus'、'roleRoutes'是否已生成
   */
  initedApp: false,
  // 角色对应的菜单
  roleMenus: {},
  // 系统用户访问令牌
  token: ''
};
const getters = {
  getData: state => {
    return state.data;
  },
  getLoginStatus: state => {
    return state.isLogin;
  },
  getAppStatus: state => {
    return state.initedApp;
  },
  getToken: state => {
    return state.token;
  },
  // 获取全部菜单
  getMenus: state => {
    return state.roleMenus;
  }
};
const actions = {
  // 登录
  handleLogin({ dispatch, commit, state }, { userName, password }) {
    console.info(userName, password);
    return new Promise((resolve, reject) => {
      // 根据具体请求结果返回 解决（或拒绝）
      // Vue.prototype.$api['login/doLogin']({code: code,password: password},{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      Vue.prototype.$api['login/doLogin']({
        data: { userName, password },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
        .then(resData => {
          if (
            resData.code === Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
          ) {
            this.dispatch('setUserData', { data: resData.data }); // 调用外部的根 store 赋值 data
            commit('UPDATE_DATA', resData.data);
            // 设置通用请求头参数
            this.dispatch('platform/setApiHeaderParams', {
              token: _get(resData, 'data.token')
            });
            resolve(resData);
          } else {
            reject(_get(resData, 'msg', '登录失败'));
          }
        })
        .catch(error => {
          reject(error);
          console.info(error);
        });
    });
  },
  // 设置通用请求头参数
  setApiHeaderParams({ commit, state }, { token }) {
    Vue.prototype.$loaderApiLibrary.setHeaderOptions({ token });
  },
  // 登出
  handleExit({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送登出请求
      Vue.prototype.$api['login/logout']({
        headers: { token: state.token }
      }).then((resData) => {
        if (resData.code === Vue.prototype.$constant.apiServeCode.SUCCESS_CODE) {
          this.dispatch('platform/handlerDestroy');
        }
        resolve();
      }).catch(error => {
        reject(error);
        console.info(error);
      });
    });
  },
  // 销毁缓存和变量
  handlerDestroy({ commit, state }) {
    this.dispatch('platform/setApiHeaderParams', { token: null });
    commit('HANDLE_EXIT');
  },
  // 请求菜单
  fetchMenus({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$api['common/getMenus']().then(resData => {
        resData = resData.data;
        this.dispatch('setInitedApp');
        this.dispatch('setStoreMenus', { menus: resData }); // 调用外部的根 store 赋值 menus
        commit('GENERATE_ROLE_MENUS', resData);
        // this.dispatch('platform/setRouter');
        resolve();
      });
    });
  },
  // 菜单和路由进行参数组装
  setRouter({ commit, state }) {
    if (!state.roleMenus) {
      return;
    }
    const routes = router.options.routes;
    // const rootRouterRedirect = [];
    const checkChildren = function (oRouter, aMenusList) {
      for (const value of Object.values(oRouter)) {
        const oMenu = _find(aMenusList, menu => menu.menuCode === value.name);
        if (_has(value, 'children') && !_isEmpty(value.children)) {
          setRouterMeta(value, oMenu);
          !_isNil(oMenu) && checkChildren(value.children, oMenu.children);
        } else {
          setRouterMeta(value, oMenu);
        }
      }
    };
    const setRouterMeta = function (router, oMenu) {
      !_isNil(oMenu) && !_has(oMenu, 'meta') && (oMenu.meta = {});
      if (_isNil(oMenu) && !_has(router, 'meta.approve')) {
        _set(router.meta, 'isOpen', false); // 路由权限，false 不能打开对应的页面
      }
      if (!_isNil(oMenu) && _has(oMenu, 'buttons')) {
        _set(router.meta, 'buttons', oMenu.buttons);
      }
    };
    for (const value of Object.values(routes)) {
      if (_has(value, 'children') && !_isEmpty(value.children)) {
        const menu2Children = _get(_find(state.roleMenus.models, model => model.menuCode === value.name), 'children', []);
        checkChildren(value.children, menu2Children);
      }
    }
    // console.info('routes', routes, state.roleMenus.models);
    // console.info('rootRouterRedirect', rootRouterRedirect);
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入本包中的字典
    // const p1 = Vue.prototype.$dict.import(import('../../data-dict/index.js'));
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
    return Promise.all([p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  }
};
const GENERATE_ROUTES = 'GENERATE_ROUTES';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const UPDATE_DATA = 'UPDATE_DATA';
const HANDLE_EXIT = 'HANDLE_EXIT';
const mutations = {
  [GENERATE_ROUTES](state, roleRouter) {
    state.roleRoutes.push(roleRouter);
  },
  [GENERATE_ROLE_MENUS](state, aRoleMenuList) {
    state.roleMenus = aRoleMenuList;
    state.initedApp = true;
  },
  [UPDATE_DATA](state, data) {
    state.data = data;
    if ('token' in data) {
      state.token = data.token;
    }
    state.isLogin = true;
  },
  [HANDLE_EXIT](state) {
    state.data = null;
    state.roleMenus = null;
    state.token = null;
    state.isLogin = false;
    state.initedApp = false;
    setTimeout(() => {
      // 移除全部缓存
      localStorage.removeItem(sStorageKey);
      // 移除部分缓存请操作对应的 store 中的 Actions，注意 store 中所有的操作必须通过 Actions 来完成
    }, 0);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
