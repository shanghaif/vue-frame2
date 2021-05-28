/* eslint-disable */
/**
 * @desc 高德地图加载类
 */
import _assign from 'lodash/assign';
const DEFAULT_AMP_CONFIG = {
  key: null,
  v: '1.4.4',
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: [],
  callback: 'amapInitComponent'
};
export default class AMapAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor(config) {
    this._config = _assign({}, DEFAULT_AMP_CONFIG, config);
    this._document = document;
    this._window = window;
    this._scriptLoaded = false;
  }
  load() {
    if (this._window.AMap && this._window.AMap.Map) {
      return this.loadUIAMap();
    }
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }
    const script = this._document.createElement('script');
    script.type = 'text/javascript';
    script.async = true; // 异步的加载并在允许的情况下执行
    script.defer = true; // 异步下载该文件，文档渲染完毕后，DOMContentLoaded事件调用前执行
    script.src = this._getScriptSrc();
    const UIPromise = this._config.uiVersion ? this.loadUIAMap() : null;

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._window['amapInitComponent'] = () => {
        if (UIPromise) {
          UIPromise.then(() => {
            window.initAMapUI(); // 这里调用initAMapUI初始化UI组件库
            setTimeout(resolve, 0);
          });
        } else {
          return resolve();
        }
      };
      script.onerror = error => reject(error);
    });
    this._document.head.appendChild(script);
    return this._scriptLoadingPromise;
  }
  /**
   * @desc [引入UI组件库异步版本main-async.js，同步版本为 main.js](https://developer.amap.com/api/amap-ui/intro/)
   */
  loadUIAMap() {
    if (!this._config.uiVersion || window.AMapUI) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const UIScript = document.createElement('script');
      const [
        versionMain,
        versionSub,
        versionDetail
      ] = this._config.uiVersion.split('.');
      if (versionMain === undefined || versionSub === undefined) {
        console.error(
          'amap ui version is not correct, please check! version: ',
          this._config.uiVersion
        );
        return;
      }
      let src = `${this._config.protocol}://webapi.amap.com/ui/${versionMain}.${versionSub}/main-async.js`;
      if (versionDetail) {
        src += `?v=${versionMain}.${versionSub}.${versionDetail}`;
      }
      UIScript.src = src;
      UIScript.type = 'text/javascript';
      UIScript.async = true; // 异步加载但不按顺序执行
      this._document.head.appendChild(UIScript);
      UIScript.onload = () => {
        setTimeout(resolve, 0);
      };
      UIScript.onerror = () => reject();
    });
  }
  /**
   * @desc 异步加载 高德地图JSAPI ，注意 callback 参数
   * @returns 地图JSAPI链接地址
   */
  _getScriptSrc() {
    //https://webapi.amap.com/maps?key=f7ac15a8687e70001f0d8f9e65007f09&v=1.4.15&plugin=Map3D,AMap.DistrictSearch,Loca,AMap.DistrictLayer,SimpleMarker,DistrictExplorer
    // [地图插件默认前缀 ](https://developer.amap.com/api/javascript-api/guide/abc/plugins)
    const amap_prefix_reg = /^AMap./;

    const config = this._config;
    const paramKeys = ['v', 'key', 'plugin', 'callback'];
    // [组装插件](https://developer.amap.com/api/javascript-api/guide/abc/plugins)
    if (config.plugin && config.plugin.length > 0) {
      // 设置默认插件
      config.plugin.push(
        'Autocomplete',
        'PlaceSearch',
        'PolyEditor',
        'CircleEditor'
      );
      const plugins = [];

      // 把插件和`地图插件默认前缀`结合
      config.plugin.forEach(item => {
        const prefixName = amap_prefix_reg.test(item) ? item : 'AMap.' + item;
        const pureName = prefixName.replace(amap_prefix_reg, '');

        plugins.push(prefixName, pureName);
      });

      config.plugin = plugins;
    }
    const params = Object.keys(config)
      .filter(k => ~paramKeys.indexOf(k))
      .filter(k => config[k] != null)
      .filter(k => {
        return (
          !Array.isArray(config[k]) ||
          (Array.isArray(config[k]) && config[k].length > 0)
        );
      })
      .map(k => {
        let v = config[k];
        if (Array.isArray(v)) return { key: k, value: v.join(',') };
        return { key: k, value: v };
      })
      .map(entry => `${entry.key}=${entry.value}`)
      .join('&');
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`;
  }
}
