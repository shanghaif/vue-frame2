/**
 * @desc 缓存设置
 */
import persistedState from 'vuex-persistedstate';

const sStorageKey = 'bankVuex'; // 建议设置为项目名称，比如： jjmVuex
const paths = ['menus', 'userData', 'initedApp', 'platform'];
const isClearCache = true; // 是否需要清除名为 `sStorageKey` 的缓存，清除后浏览器缓存中不会存在这个 `sStorageKey`
const createPersistedState = persistedState({
  key: sStorageKey,
  paths
});
export { sStorageKey, isClearCache };
export default createPersistedState;
