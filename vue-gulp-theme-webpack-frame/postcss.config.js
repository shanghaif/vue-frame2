const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
    autoprefixer,
    // 去除空格、注释、智能压缩代码（注意：postcssSprites 会把 css 代码中已经注释的背景图也进行雪碧图合成，所以要提前把 css 去除注释）
    cssnano
  ]
};
