/**
 * @desc 这个网站的 store
 */
import router from '@bank/router/index.js';
import _has from 'lodash/has';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _set from 'lodash/set';
import { sStorageKey, isClearCache } from '@bank/store/index.js';

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
  token: '',
  // 刷新 token
  refreshToken: ''
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
  },
  getRefreshToken: state => {
    return state.refreshToken;
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
  // 更新用户信息
  updateData({ commit, state }, resData) {
    commit('UPDATE_DATA', resData.data);
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
        if (
          resData.code !== Vue.prototype.$constant.apiServeCode.SUCCESS_CODE
        ) {
          resolve();
          return;
        }
        // resData = resData.data;
        const handlerMate = function(item) {
          item.menuCode = _get(item, 'href', item.menuCode);
          item.menuName = _get(item, 'name', item.menuName);
          item.menuUrl = _get(item, 'href', item.menuUrl);
          // item.iconUrl = `iconfont ${_get(item, 'icon', item.iconUrl)}`;
          item.iconUrl = `${_get(item, 'icon', item.iconUrl)}`;
          item.childMenus = _get(item, 'children', []).length;
          item.target = _get(item, 'hrefType', 'in');
        };
        const handlerWhile = function(data) {
          for (let i = 0, len = data.length; i < len; i++) {
            handlerMate(data[i]);
            if (_has(data[i], 'children') && !_isEmpty(data[i].children)) {
              handlerWhile(data[i].children);
            }
          }
        };
        handlerWhile(resData.data);
        resData.models = resData.data;
        this.dispatch('setInitedApp');
        this.dispatch('setStoreMenus', {
          menus: resData
        }); // 调用外部的根 store 赋值 menus
        commit('GENERATE_ROLE_MENUS', resData);
        // this.dispatch('platform/setRouter');
        resolve();
        /* resData = resData.data;
        this.dispatch('setInitedApp');
        this.dispatch('setStoreMenus', { menus: resData }); // 调用外部的根 store 赋值 menus
        commit('GENERATE_ROLE_MENUS', resData);
        // this.dispatch('platform/setRouter');
        resolve(); */
      });
    });
  },
  // 菜单和路由进行参数组装
  setRouter({ commit, state }) {
    if (!state.roleMenus) {
      return;
    }
    const routes = router.options.routes;
    const checkChildren = function(oRouter, aMenusList) {
      for (const value of Object.values(oRouter)) {
        const oMenu = _find(aMenusList, menu => menu.menuCode === value.name);
        if (_has(value, 'children') && !_isEmpty(value.children)) {
          setRouterMeta(value, oMenu);
          if (_isNil(oMenu)) {
          } else {
            checkChildren(value.children, oMenu.children);
          }
        } else {
          setRouterMeta(value, oMenu);
        }
      }
    };
    const setRouterMeta = function(router, oMenu) {
      !_isNil(oMenu) && !_has(oMenu, 'meta') && (oMenu.meta = {});
      if (_isNil(oMenu) && !_has(router, 'meta.approve')) {
        _set(router.meta, 'isOpen', false); // 路由权限，false 不能打开对应的页面
        // 如果父节点是 false，那么对应的所有子节点都应该是 false
        const doWhileFn = function(item) {
          for (let i = 0, len = item.length; i < len; i++) {
            _set(item[i], 'meta.isOpen', false);
            if (_has(item[i], 'children') && item[i].children.length > 0) {
              doWhileFn(item[i].children);
            }
          }
        };
        if (_has(router, 'children') && !_isEmpty(router.children)) {
          doWhileFn(_get(router, 'children', []));
        }
      }
      if (!_isNil(oMenu) && _has(oMenu, 'buttons')) {
        _set(router.meta, 'buttons', oMenu.buttons);
      }
    };
    for (const value of Object.values(routes)) {
      if (_has(value, 'children') && !_isEmpty(value.children)) {
        const menu2Children = [];
        /* const menu2Children = _get(
          _find(state.roleMenus.models, model => model.menuCode === value.name),
          'children',
          []
        ); */
        let menuModels = state.roleMenus.models;
        const router2Menus = _find(
          state.roleMenus.models,
          model => model.menuCode === value.name
        );
        if (!_isNil(router2Menus)) {
          menuModels = _get(router2Menus, 'children', []);
        }
        for (const elem of value.children.values()) {
          const itemMenu = _find(
            menuModels,
            model => model.menuCode === elem.name
          );
          itemMenu && menu2Children.push(itemMenu);
        }
        checkChildren(value.children, menu2Children);
      }
    }
    // console.info('routes', routes, state.roleMenus.models);
    // console.info('rootRouterRedirect', rootRouterRedirect);
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入本包中的字典
    const p1 = Vue.prototype.$dict.import(import('../../data-dict/index.js'));
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(
      Vue.prototype.$api['dict/getDictDataByTypeList']()
    );
    return Promise.all([p1, p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  }
};
const GENERATE_STATE = 'GENERATE_STATE';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const SET_TOKEN = 'SET_TOKEN';
const HANDLE_EXIT = 'HANDLE_EXIT';
const UPDATE_DATA = 'UPDATE_DATA';
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
  [UPDATE_DATA](state, data) {
    state.data = data;
    if ('access_token' in data) {
      state.token = data.access_token;
    }
    if ('refresh_token' in data) {
      state.refreshToken = data.refresh_token;
    }
    state.isLogin = true;
  },
  [HANDLE_EXIT](state) {
    state.data = null;
    state.roleMenus = null;
    state.token = null;
    state.isLogin = false;
    state.initedApp = false;
    state.refreshToken = null;
    setTimeout(() => {
      // 移除全部缓存
      if (!_isNil(localStorage.getItem(sStorageKey)) && isClearCache) {
        localStorage.removeItem(sStorageKey);
      }
      if (!_isNil(sessionStorage.getItem(sStorageKey)) && isClearCache) {
        sessionStorage.removeItem(sStorageKey);
      }
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
