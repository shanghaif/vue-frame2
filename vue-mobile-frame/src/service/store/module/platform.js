/**
 * @desc 这个网站的 store
 */
import _get from 'lodash/get';
import { sStorageKey } from '../../../store/index.js';

const state = {
  data: {}, // 用户信息
  // 是否已登陆
  isLogin: false,
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
  getToken: state => {
    return state.token;
  }
};
const actions = {
  // 登录
  handleLogin({ commit, state }, { userName, password }) {
    return new Promise((resolve, reject) => {
      // 根据具体请求结果返回 解决（或拒绝）
      Vue.prototype.$api['login/doLogin']({
        data: { userName, password },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(resData => {
          if (resData.code === Vue.prototype.$constant.apiServeCode.SUCCESS_CODE) {
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
  // 登出
  handleExit({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送登出请求 （销毁 token api请求）
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
  // 设置通用请求头参数
  setApiHeaderParams({ commit, state }, { token }) {
    Vue.prototype.$loaderApiLibrary.setHeaderOptions({ token });
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(
      Vue.prototype.$api['dict/getDictDataByTypeList']()
    );
    return Promise.all([p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  }
};
const UPDATE_DATA = 'UPDATE_DATA';
const HANDLE_EXIT = 'HANDLE_EXIT';
const mutations = {
  [UPDATE_DATA](state, data) {
    state.data = data;
    if ('token' in data) {
      state.token = data.token;
    }
    state.isLogin = true;
  },
  [HANDLE_EXIT](state) {
    state.data = {};
    state.token = '';
    state.isLogin = false;
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
