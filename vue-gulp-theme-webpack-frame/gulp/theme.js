/**
 * @desc 单独打包主题库
 */
var gulp = require('gulp');
var { series } = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css'); // 压缩 css
var autoprefixer = require('gulp-autoprefixer');
var chalk = require('chalk');
// var base64 = require('gulp-base64');
var rev = require('gulp-rev'); // 版本控制
const rename = require('gulp-rename');
var header = require('gulp-header');
var v = require('./version.js').default.v;
var moment = require('moment');
moment.locale('zh-cn');

var baseDir = {
  basePath: './',
  packages: './css-theme/',
  theme: './css-lib-theme/',
  recycler: './css-lib-recycler-station/' // 回收站-目录
};

// 用于测试的任务
function themeTask(done) {
  let themeName = 'default'; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace('--', '');
  }
  const handle = function (themeStr) {
    console.info('themeStr：', themeStr);
    gulp
      .src([baseDir.packages + themeStr + '/components/' + '**/*.less'])
      .pipe(concat('index.less')) // 合并所有的 less 文件到名为 index.less 的文件中
      .pipe(header('@import "../../common/index.less";@import "../../common/base-components/index.less";'))
      .pipe(
        less({
          globalVars: { yellow: '#FFCE45', 'border-bottom': '1px solid #ccc;' }
        })
      ) // 编译开发环境下的 less
      .pipe(autoprefixer())
      // .pipe(base64({ maxImageSize: 4 * 1024 })) // base64 处理小于等于4kb就处理成 base64
      .pipe(cleanCss({ compatibility: 'ie8' })) // 压缩 css，支持 ie8
      // .pipe(rev()) // 发布新版本
      .pipe(gulp.dest(baseDir.theme + themeStr + '/' + v)) // 输出 css 文件
      .pipe(rev()) // 发布新版本，添加基于文件的 hash 值
      .pipe(
        rename({
          // 重命名为 index.min.css
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(baseDir.theme + themeStr + '/' + v)); // 输出压缩版 index.css
    console.log(
      chalk.blue(
        themeStr + ' 主题样式库打包结束!，输出位置：' + baseDir.theme + themeStr
      )
    );
  };
  const aThemeList = themeName.split(',');
  for (let i = 0, len = aThemeList.length; i < len; i++) {
    const sName = aThemeList[i];
    sName.length > 0 && handle(sName);
  }
  // series(['task1']);
  done();
}

/* gulp.task('task1', function (done) {
  console.log('index.html发生改变会调用task1任务');
  done();
}); */

// 移动附件 `images` 到指定的样式主题库中
function copyTask(done) {
  // let themeName = 'default'; // 默认主题库
  // if (process.argv[3]) {
  //   themeName = process.argv[3].replace('--', '');
  // }
  // const aThemeList = themeName.split(',');
  // const aThemeNameList = [];
  // for (let i = 0, len = aThemeList.length; i < len; i++) {
  //   const sName = aThemeList[i];
  //   if (sName.length) {
  //     aThemeNameList.push(baseDir.packages + sName + '/**/*.*');
  //   }
  // }
  // console.info('3333333333 ', aThemeNameList);
  gulp
    .src([baseDir.packages + '*/images/*.*', baseDir.packages + '*/icons/*.*', baseDir.packages + '*/font/**/*.*'])
    .pipe(gulp.dest(baseDir.theme));
  done();
}
exports.themeTask = series(themeTask, copyTask);
