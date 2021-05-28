/**
 * @desc 高德地图
 */
import Vue from 'vue';
// lodash 帮助函数
import _isNil from 'lodash/isNil';
// 地图加载类
import AMapAPILoader from './services/lazy-amap-api-loader.js';
// 组建导入
import AMap from './components/amap.vue';
import AMapMarker from './components/amap-marker.vue';
import AMapDistrict from './components/amap-district.vue';
import AMapDistrictExplorer from './components/amap-district-explorer.vue';
import AMapInfoWindow from './components/amap-info-window.vue';
import AMapCircleMarker from './components/amap-circle-marker.vue';
import AMapMassMarks from './components/amap-mass-marks.vue';
import AMapMarkClusterer from './components/amap-marker-clusterer.vue';
import AMapText from './components/amap-text.vue';
// 地图管理类
import AMapManager from './managers/amap-manager.js';

// 地图初始化
let lazyAMapApiLoaderInstance = null;
const initAMapApiLoader = config => {
  if (Vue.prototype.$isServer) return;
  if (_isNil(lazyAMapApiLoaderInstance)) {
    lazyAMapApiLoaderInstance = new AMapAPILoader(config);
    lazyAMapApiLoaderInstance.load();
  }
};

const VueAMap = {
  initAMapApiLoader,
  AMapManager
};

// 自定义插件-注册组件
const components = [
  AMap,
  AMapMarker,
  AMapDistrict,
  AMapDistrictExplorer,
  AMapInfoWindow,
  AMapCircleMarker,
  AMapMassMarks,
  AMapMarkClusterer,
  AMapText
];
VueAMap.install = Vue => {
  if (VueAMap.installed) return;
  components.map(_component => {
    Vue.component(_component.name, _component);
  });
};

export default VueAMap;
export { AMapManager, initAMapApiLoader };
export { lazyAMapApiLoaderInstance };
