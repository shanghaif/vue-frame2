/**
 * @desc 这个网站的 store
 */
import _get from 'lodash/get';
// import { sStorageKey } from '../../../store/index.js';

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
  handleLogin({ dispatch, commit, state }, { userName, password }) {
    return new Promise((resolve, reject) => {
      // 根据具体请求结果返回 解决（或拒绝）
      // Vue.prototype.$api['login/doLogin']({code: code,password: password},{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
      Vue.prototype.$api['login/doLogin']({
        data: { userName, password },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
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
  handle_exit({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.dispatch('handlerDestroy');
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
      const menus = {
        models: [
          {
            id: 1,
            menuCode: 'tdbd',
            menuName: '投贷保担',
            menuUrl: 'bank',
            iconUrl: 'el-icon-eleme'
          },
          {
            id: 1,
            menuCode: 'tzwst',
            menuName: '投资五色图',
            menuUrl: 'tzwst',
            iconUrl: 'el-icon-eleme'
          }
        ]
      };
      this.dispatch('setInitedApp'); // 调用外部的根 store 赋值 menus
      this.dispatch('setStoreMenus', { menus });
      commit('GENERATE_ROLE_MENUS', menus);
      resolve();
    });
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入远程字典
    const p1 = Vue.prototype.$dict.import(
      Vue.prototype.$api['dict/getDictDataByTypeList']()
    );
    return Promise.all([p1]);
  }
};
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
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
  [GENERATE_ROLE_MENUS](state, aRoleMenuList) {
    state.roleMenus = aRoleMenuList;
    state.initedApp = true;
  },
  [HANDLE_EXIT](state) {
    state.data = null;
    state.roleMenus = null;
    state.token = null;
    state.isLogin = false;
    state.initedApp = false;
    setTimeout(() => {
      // 移除全部缓存
      localStorage.clear();
      // localStorage.removeItem(sStorageKey); // 移除这个项目内的缓存
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
