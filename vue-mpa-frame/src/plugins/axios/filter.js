/**
 * @desc api请求插件自定义扩展
 */
import _has from 'lodash/has';

const Expand = class Filter {
  // 白名单扩展
  isWhite(options = {}) {
    if (_has(options, 'token')) {
      delete options.token;
    }
    return options;
  }

  // 外部过滤器处理
  threeOuterFilter(headerOptions, baseURL, pickHeaders) {}
};
export default new Expand();
