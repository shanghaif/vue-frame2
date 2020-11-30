/**
 * @desc 缓存设置
 */
import persistedState from 'vuex-persistedstate';

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
export default createPersistedState;
