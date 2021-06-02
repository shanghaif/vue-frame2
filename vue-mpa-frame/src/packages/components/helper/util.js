/**
 * @desc 工具类
 */
// 开发环境可以输出日志信息
const devConsole = function(message) {
  if (process.env.NODE_ENV === 'development') {
    console.info(message);
  }
};
// 来源对象覆盖目标源对象
const apply = (scope, config) => {
  for (var i in config) {
    scope[i] = config[i];
  }
  return scope;
};
// 来源对象覆盖目标源没有的属性
const applyIf = (scope, config) => {
  for (var i in config) {
    // if (!scope[i])
    if (!Object.prototype.hasOwnProperty.call(scope, i)) {
      scope[i] = config[i];
    }
  }
  return scope;
};
// 根据传入的日期格式进行转换
const dateformat = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (!isNotEmpty(fmt)) {
    fmt = 'yyyy-MM-dd hh:mm:ss';
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
// 判断参数是否为空
const isNotEmpty = str => {
  if (str !== '' && str != null && typeof str !== 'undefined') {
    return true;
  }
  // console.warn('argument format is wrong');
  return false;
};

export { devConsole, apply, applyIf, dateformat, isNotEmpty };
