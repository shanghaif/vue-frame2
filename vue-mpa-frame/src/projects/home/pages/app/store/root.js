import _get from 'lodash/get';
/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state,rootState }, address){
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
    return _get(state, 'menus.models', []);
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
  // 销毁缓存和重置变量
  handlerDestroy({ commit }) {
    this.dispatch('platform/handlerDestroy');
    commit('HANDLER_DESTROY');
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
export { state, getters, actions, mutations };
