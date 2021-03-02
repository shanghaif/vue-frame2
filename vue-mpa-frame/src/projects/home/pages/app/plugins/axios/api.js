/**
 * @desc 继承公用 api.js 扩展自身的逻辑
 */
import ApiPlugin from '@plugins/axios/api.js';
import ApiFilterExpand from './filter.js';

const Loader = class Api extends ApiPlugin {
  /**
   * @desc 白名单过滤器
   * @param { Object } pickHeaders={} - header 请求头参数
   */
  whiteFilter(pickHeaders = {}) {
    ApiFilterExpand.isWhite(pickHeaders);
  }
};
export default Loader;
