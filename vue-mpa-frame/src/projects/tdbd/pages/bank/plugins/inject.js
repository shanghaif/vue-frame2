/**
 * @desc 需要挂载(注入)到根实例的都放在这里
 */
import axios from '@plugins/axios/axios.js';
import DataDictFilter from '@plugins/data-dict-filter/index.js';
import vBus from '@plugins/v-bus.js';
import log from '@plugins/log.js';
import ApiConfig from '../service/api/index.js';
import { USER_API_CONFIG, USER_AXIOS_CONFIG } from '../config/index.js';
import {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler,
  requestErrorCallback
} from '../config/interceptors/api.js';
import moduleConst from './constant.js';
// 彩色 log
import LoaderApiLibrary from './axios/api.js';

export default {
  install: (Vue, options = {}) => {
    USER_API_CONFIG.request_error_callback = requestErrorCallback;
    const Loader = new LoaderApiLibrary(
      ApiConfig,
      USER_API_CONFIG,
      USER_AXIOS_CONFIG
    );
    window.apiRequestStartHandler = apiRequestStartHandler;
    window.apiRequestEndHandler = apiRequestEndHandler;
    window.apiRequestInterceptErrorHandler = apiRequestInterceptErrorHandler;

    const dictInstance = new DataDictFilter({ label: 'name', code: 'id' });

    Object.defineProperty(Vue.prototype, '$loaderApiLibrary', {
      value: Loader
    });
    Object.defineProperty(Vue.prototype, '$api', { value: Loader.api });
    Object.defineProperty(Vue.prototype, '$axios', { value: axios });
    Object.defineProperty(Vue.prototype, '$dict', { value: dictInstance });
    Object.defineProperty(Vue.prototype, '$vBus', { value: vBus });
    Object.defineProperty(Vue.prototype, '$constant', { value: moduleConst });
    Object.defineProperty(window, '$log', { value: log });
  }
};
