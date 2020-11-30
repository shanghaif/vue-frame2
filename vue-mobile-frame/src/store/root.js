/**
 * 根节点状态，所有模块共享(应用层级的状态)，不推荐去修改根节点状态
 * const actions = {
 *  write_address({ commit, state,rootState }, address){
 *      //rootState.title
 *  }
 * }
 */
const state = {
  userData: {} // 用户信息
};
const getters = {
  getUserData: state => {
    return state.userData;
  }
};
const actions = {
  setUserData({ commit, state }, { data }) {
    commit('UPDATE_DATA', data);
  },
  // 销毁缓存和重置变量
  handlerDestroy({ commit }) {
    return new Promise((resolve, reject) => {
      this.dispatch('platform/handleExit').then(() => {
        commit('HANDLER_DESTROY');
        resolve();
      });
    });
  }
};
const UPDATE_DATA = 'UPDATE_DATA';
const HANDLER_DESTROY = 'HANDLER_DESTROY';
const mutations = {
  [UPDATE_DATA](state, data) {
    state.userData = data;
  },
  [HANDLER_DESTROY](state) {
    state.userData = {};
  }
};
export { state, getters, actions, mutations };
