/**
 * @desc 这个网站的 store
 */
import router from '../../../router/index.js';
import _has from 'lodash/has';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _set from 'lodash/set';

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
  getMenus: state => {
    return state.roleMenus;
  }
};
const actions = {
  // 设置 state 参数
  setState({ commit, state }, params = {}) {
    commit('GENERATE_STATE', params);
  },
  // 设置通用请求头参数
  setApiHeaderParams({ commit, state }, { token }) {
    Vue.prototype.$loaderApiLibrary.setHeaderOptions({ token });
  },
  // 登出
  handle_exit({ commit, state }) {
    // 发送 token 销毁api
    return new Promise((resolve, reject) => {
      this.dispatch('platform/handlerDestroy');
      resolve();
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
      (!_isNil(oMenu) && !_has(oMenu, 'meta')) && (oMenu.meta = {});
      if (_isNil(oMenu) && !_has(router, 'meta.approve')) {
        _set(router.meta, 'isOpen', false); // 路由权限，false 不能打开对应的页面
      }
      if (!_isNil(oMenu) && _has(oMenu, 'buttons')) {
        _set(router.meta, 'buttons', oMenu.buttons);
      }
    };
    for (const value of Object.values(routes)) {
      if (_has(value, 'children') && !_isEmpty(value.children)) {
        checkChildren(value.children, state.roleMenus.models);
      }
    }
    // console.info('routes', routes, state.roleMenus);
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入本包中的字典
    const p1 = Vue.prototype.$dict.import(import('../../data-dict/index.js'));
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
    return Promise.all([p1, p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  }
};
const GENERATE_STATE = 'GENERATE_STATE';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const SET_TOKEN = 'SET_TOKEN';
const HANDLE_EXIT = 'HANDLE_EXIT';
const mutations = {
  [GENERATE_STATE](state, params) {
    for (const [key, value] of Object.entries(params)) {
      if (_has(state, key)) {
        state[key] = value;
      }
    }
  },
  [GENERATE_ROLE_MENUS](state, aRoleMenuList) {
    state.roleMenus = aRoleMenuList;
    state.initedApp = true;
  },
  [SET_TOKEN](state, value) {
    state.token = value;
  },
  [HANDLE_EXIT](state) {
    state.data = null;
    state.roleMenus = null;
    state.token = null;
    state.isLogin = false;
    state.initedApp = false;
    setTimeout(() => {
      localStorage.clear();
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
