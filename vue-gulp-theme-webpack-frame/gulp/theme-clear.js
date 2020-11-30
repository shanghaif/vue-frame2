/**
 * @desc 移入回收站和清空
 */
/**
 * @desc 单独打包主题库
 */
var gulp = require('gulp');
var { series } = require('gulp');
var del = require('del'); // 删除文件
var chalk = require('chalk');
var moment = require('moment');
moment.locale('zh-cn');

var baseDir = {
  basePath: './',
  packages: './css-theme/',
  theme: './css-lib-theme/',
  recycler: './css-lib-recycler-station/', // 回收站-目录
  common: './css-lib-theme/common' // 公共文件目录
};

// 把上一个版本放到回收站
function recyclerLibTask() {
  const lastVersion = moment(new Date()).format('YYYY-MM-DD HH-mm-ss');
  let themeName = 'default'; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace('--', '');
  }
  const aThemeList = themeName.split(',');
  const aThemeNameList = [];
  for (let i = 0, len = aThemeList.length; i < len; i++) {
    const sName = aThemeList[i];
    if (sName.length) {
      console.log(
        chalk.blue(
          '将上一个版本放入回收站 ' +
            baseDir.recycler +
            ' ，版本号：' +
            sName +
            '-(' +
            lastVersion +
            ')'
        )
      );
      aThemeNameList.push(baseDir.theme + sName + '/**/*.*');
    }
  }
  return gulp.src(aThemeNameList).pipe(
    gulp.dest(function (fileStream) {
      // cwd、base 和 path
      console.info('fileStream ', fileStream.base);
      const base = fileStream.base;
      let themeFilename = '';
      if (base.indexOf('\\') !== -1) {
        // window
        console.info('system：window');
        themeFilename = fileStream.base.split('\\')[
          fileStream.base.split('\\').length - 1
        ];
      }
      if (base.indexOf('/') !== -1) {
        // linux和unix
        console.info('system：linux 或者 unix');
        themeFilename = fileStream.base.split('/')[
          fileStream.base.split('/').length - 1
        ];
      }
      return baseDir.recycler + themeFilename + ' ' + lastVersion;
    })
  );
}

// 清理
// eslint-disable-next-line no-unused-vars
function cleanTask(done) {
  // process.argv 可以获取 npm 指令中传递的参数
  let themeName = 'default'; // 默认主题库
  if (process.argv[3]) {
    themeName = process.argv[3].replace('--', '');
  }
  const aThemeList = themeName.split(',');
  const aPath = [baseDir.common];
  for (let i = 0, len = aThemeList.length; i < len; i++) {
    const sName = aThemeList[i];
    aPath.push(baseDir.theme + sName);
  }
  if (aPath.length > 0) {
    del(aPath);
    console.log(
      chalk.blue(
        '删除 ' +
          baseDir.theme +
          ' 目录中 ' +
          aPath.join('   ') +
          ' 旧的主题样式包!'
      )
    );
  }
  done();
}

exports.themeClearTask = series(recyclerLibTask, cleanTask); // recyclerLibTask, cleanTask, themeTask, injectHtml
