/**
 * @desc axios-api-query ajax请求拦截器
 */
import NProgress from 'nprogress';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import store from '../../store/index.js';
import { HOME_ROUTER_NAME } from '@config/index.js';

// 请求开始发送
const apiRequestStartHandler = function () {
  NProgress.start();
};

// 请求结束
const apiRequestEndHandler = function (response = {}) {
  const code = _get(response, 'data.code', '-100');
  // token 过期或无效
  if (code === Vue.prototype.$constant.apiServeCode.TOKEN_EXPIRE_CODE) {
    if (
      !_has(Vue, 'prototype.tokenExpireTipFn') &&
      _has(Vue, 'prototype.$message')
    ) {
      Vue.prototype.tokenExpireTipFn = (function () {
        Vue.prototype.$message({
          showClose: false,
          message: '错误：抱歉，您的登录状态已失效，请重新登录！',
          type: 'error',
          duration: 1000,
          onClose: function () {
            // 销毁缓存和临时变量
            store.dispatch('handlerDestroy');
            setTimeout(() => {
              window.location.href = HOME_ROUTER_NAME;
            }, 0);
          }
        });
      })();
    }
  }
  if (_includes(Vue.prototype.$constant.apiServeCode.WRONG_CODE, code)) {
    const msg = _get(response, 'data.msg', '-100');
    Vue.prototype.$message({
      showClose: true,
      message: '错误：' + msg,
      type: 'error'
    });
  }
  // 登录接口
  if (_get(response, 'config.headers.isLogin', false)) {
    if (_has(Vue, 'prototype.tokenExpireTipFn')) {
      delete Vue.prototype.tokenExpireTipFn;
    }
  }
  NProgress.done();
};

// 请求出现拦截器无法捕获的异常 例如：timeout 请求超时
const apiRequestInterceptErrorHandler = function (message) {
  if ('$message' in Vue.prototype) {
    Vue.prototype.$message({
      showClose: true,
      message: '错误：' + message,
      type: 'error'
    });
  }
  NProgress.done();
};

// 请求出现后置拦截器错误，例如：Request failed with status code 502
const requestErrorCallback = function (
  error = { status: 1001, statusText: '未知错误' },
  data = {}
) {
  let code = error.status;
  let msg = error.statusText;
  if (!_isEmpty(data) && _has(data, 'code') && (_has(data, 'message') || _has(data, 'msg'))) {
    code = data.code;
    msg = _has(data, 'msg') ? data.msg : data.message;
  }
  if ('$message' in Vue.prototype) {
    Vue.prototype.$message({
      showClose: true,
      message: `错误：${code} ${msg}`,
      type: 'error'
    });
  }
  NProgress.done();
};

export {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler,
  requestErrorCallback
};
