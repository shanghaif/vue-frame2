/**
 * @desc 注入 html 文件
 */
var gulp = require('gulp');
var { series } = require('gulp');
var cheerio = require('gulp-cheerio'); // 以标签形式内联css、js到html页面
var footer = require('gulp-footer'); // 在文件底部插入内容
var replace = require('gulp-replace');
var glob = require('glob');
var processConfig = require('../config/index.js');
var chalk = require('chalk');

// 以标签形式内联 css、js 到 html 页面
function injectHtml(done) {
  const aLinkList = [];
  var entryFiles = glob.sync('./css-lib-theme/**/index*.min.css');
  for (let i = 0, len = entryFiles.length; i < len; i++) {
    const staticFile = entryFiles[i].replace('./', '/' + processConfig.build.assetsSubDirectory + '/');
    aLinkList.push(`<link rel="stylesheet" href="${staticFile}">`);
  }
  gulp
    .src('./public/theme-css.html')
    .pipe(replace(/.*/g, ''))
    .pipe(replace(/\n/g, ''))
    .pipe(footer('<div></div>'))
    .pipe(
      cheerio(function ($) {
        // $('script').remove();
        // $('link').remove();
        $('div').append(aLinkList.join('\n') + '\n');
      })
    )
    .pipe(replace(/<(\/?)div>/g, ''))
    .pipe(gulp.dest('./public/'));
  console.info(chalk.blue('样式注入完成\n' + aLinkList.join('\n')));
  done();
}

// 用于测试的任务
// eslint-disable-next-line no-unused-vars
function testTask(done) {}

exports.themeInjectHtmlTask = series(injectHtml);
