/**
 * vuex 状态管理插件
 */
import _get from 'lodash/get';
import _find from 'lodash/find';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import Vuex from 'vuex';
// 动态载入 module 模块
import modules from '../service/store/index.js';
import persistedState from 'vuex-persistedstate';
Vue.use(Vuex);
/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state, rootState }, address){
 *      //rootState.title
 *  }
 * }
 */
const state = {
  menus: null, // 菜单
  userData: {}, // 用户信息
  initedApp: false // 应用是否已经初始化完成
};
const getters = {
  getMenus: state => {
    const roleMenus = _get(state, 'menus.models', []);
    return roleMenus;
  },
  // 获取一级菜单
  getLevel1Menus: state => {
    const roleMenus = _get(state, 'menus.models', []);
    const firstMenus = [];
    for (let i = 0, len = roleMenus.length; i < len; i++) {
      firstMenus.push(_omit(roleMenus[i], ['children']));
    }
    return firstMenus;
  },
  getUserData: state => {
    return state.userData;
  },
  getInitedApp: state => {
    return state.initedApp;
  }
};
const actions = {
  setInitedApp({ commit, state }) {
    commit('UPDATE_INITED_APP');
  },
  setUserData({ commit, state }, { data }) {
    commit('UPDATE_DATA', data);
  },
  setStoreMenus({ commit, state }, { menus }) {
    commit('GENERATE_ROLE_MENUS', menus);
  },
  // 获取子级菜单
  getChildrenMenus({ commit, state }, { id, menuCode, menuName }) {
    return new Promise((resolve, reject) => {
      const menu = _find(_get(state, 'menus.models', []), function(value, index) {
        return value.id === id;
      });
      if(_has(menu, 'children') && menu.children.length >0){
        resolve(menu.children);
        return;
      }
      resolve([menu]);
    });
  },
  // 销毁缓存和重置变量
  handlerDestroy({ commit }) {
    return new Promise((resolve, reject) => {
      this.dispatch('platform/handleExit').then(() => {
        commit('HANDLER_DESTROY');
        resolve();
      });
    });
    // this.dispatch('platform/handlerDestroy').then();
    // commit('HANDLER_DESTROY');
  }
};
const UPDATE_INITED_APP = 'UPDATE_INITED_APP';
const UPDATE_DATA = 'UPDATE_DATA';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const HANDLER_DESTROY = 'HANDLER_DESTROY';
const mutations = {
  [UPDATE_INITED_APP](state) {
    state.initedApp = true;
  },
  [UPDATE_DATA](state, data) {
    state.userData = data;
  },
  [GENERATE_ROLE_MENUS](state, menus) {
    state.menus = menus;
  },
  [HANDLER_DESTROY](state) {
    state.menus = null;
    state.userData = {};
    state.initedApp = false;
  }
};
const sStorageKey = 'spaVuex'; // 建议设置为项目名称，比如： jjmVuex
const createPersistedState = persistedState({
  key: sStorageKey, // 用于存储持久状态的密钥，默认为 vuex。
  // storage: window.sessionStorage, // 可以修改缓存的存储形式，默认 window.localStorage
  paths: [
    'platform.initedApp',
    'platform.isLogin',
    'platform.token',
    'platform.roleMenus',
    // 'platform.data',
    // 'platform.roleMenus',
    'menus',
    'userData'
  ] // 选择存储对象，如果使用模块请包括模块名称
});
export {sStorageKey};
export default new Vuex.Store({
  state,
  modules,
  getters,
  actions,
  mutations,
  plugins: [
    function(store) {
      // 自定义 vuex 插件，Vue 还未初始化完成
    },
    createPersistedState
  ],
  strict: process.env.NODE_ENV !== 'production'
});
