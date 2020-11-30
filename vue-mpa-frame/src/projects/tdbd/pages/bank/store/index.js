/**
 * vuex 状态管理插件
 */
import _get from 'lodash/get';
import _has from 'lodash/has';
import Vuex from 'vuex';
// 动态载入 module 模块
import modules from '../service/store/index.js';
import { state, getters, actions, mutations } from './root.js';
import createPersistedState, {
  sStorageKey,
  isClearCache
} from './persisted-state.js';

Vue.use(Vuex);

export { sStorageKey, isClearCache };
export default new Vuex.Store({
  state,
  modules,
  getters,
  actions,
  mutations,
  plugins: [
    function (store) {
      // store 现在主要是为了去拿在 localStorage 中的 token
      // 从 localStorage 中去拿 app 项目中的 token，在存放到 bank项目的 store中
      if (_has(window, 'localStorage.appVuex')) {
        const oStorage = JSON.parse(_get(window.localStorage, 'appVuex', '{}'));
        const token = _get(oStorage, 'platform.token', '');
        const isLogin = _get(oStorage, 'platform.isLogin', false);
        const userData = _get(oStorage, 'userData', {});
        store.dispatch('setUserData', { data: userData });
        store.dispatch('platform/setState', { token, isLogin, data: userData });
      }
    },
    createPersistedState
  ],
  strict: process.env.NODE_ENV !== 'production'
});
