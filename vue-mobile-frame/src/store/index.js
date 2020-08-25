/**
 * vuex 状态管理插件
 */
import Vuex from 'vuex';
// 动态载入 module 模块
import modules from '../service/store/index.js';
import persistedState from 'vuex-persistedstate';
Vue.use(Vuex);
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
  handlerDestroy({ commit }){
    return new Promise((resolve, reject) => {
      this.dispatch('platform/handle_exit').then(()=>{
        commit('HANDLER_DESTROY');
        resolve();
      })
    })
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
const sStorageKey = 'mobileVuex'; // 建议设置为项目名称，比如： jjmVuex
const createPersistedState = persistedState({
  key: sStorageKey, // 用于存储持久状态的密钥，默认为 vuex。
  // storage: window.sessionStorage, // 可以修改缓存的存储形式，默认 window.localStorage
  paths: ['platform', 'userData'] // 选择存储对象，如果使用模块请包括模块名称
});
export {sStorageKey};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
  plugins: [
    function(store) {
      // 自定义 vuex 插件，Vue 还未初始化完成
    },
    createPersistedState
  ], // 浏览器缓存插件
  strict: process.env.NODE_ENV !== 'production'
});
