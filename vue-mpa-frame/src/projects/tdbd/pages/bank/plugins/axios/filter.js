/**
 * @desc api请求插件自定义扩展
 */
import _has from 'lodash/has';

const Expand = class Filter {
  // 白名单扩展
  isWhite(options = {}) {
    console.info('bank 端的 api 过滤器');
    if (_has(options, 'token')) {
      delete options.token;
    }
    return options;
  }
};
export default new Expand();
