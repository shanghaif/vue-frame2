/**
 * @file gulp 打包配置文件
 */
// 打包样式主题
const { themeTask } = require('./gulp/theme.js');
const { themeClearTask } = require('./gulp/theme-clear.js');
const { themeInjectHtmlTask } = require('./gulp/theme-inject-html.js');

exports.default = function () {}; // 默认任务（必须）
exports.theme = themeTask; // 打包主题样式库
exports.themeClear = themeClearTask; // 移动到回收站和清理打包主题样式库
exports.themeInjectHtml = themeInjectHtmlTask; // 将打包的 index.css 主题样式库注入到 html页面中
