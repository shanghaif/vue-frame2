const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const frameConfig = require('./frame.config.js');
const pr2rem = require('postcss-plugin-pr2rem');
const pr2remPlugin = [];
const _get = require('lodash/get');
const _findIndex = require('lodash/findIndex');
const isHavePr2rem = _findIndex(_get(frameConfig, 'mobile.pages', []), (page) => {
  return _get(page, 'plan') === 'pr2rem';
});
if (isHavePr2rem !== -1) {
  const isProd = process.env.NODE_ENV === 'production';
  // font-size: 14pr会不转义，因为 font-size 放在了 propBlackList 黑名单中
  // 7.5pr 转换后就是 1rem 然后 1rem 就会等于 font-size 的 1vw，1vw 等于 布局视口宽度（document.clientWidth）/100=1%
  //  <style>.frame {width: 7.5pr;height: 50pr;}.frame span {font-size: 14px; /* 14rem */}</style>
  // pr转rem，不直接使用px转rem防止我们可能有时候确实要使用 px 比如 font-size
  const pr2remConfig = {
    // 设计图为1242px，一份 root 对应着 rootWidth/100=12.42px
    // （这里是恒等于1242px 来做rem和pr之间的转换定义，也就是css代码中的计算都是按照12.42）1rem=12.42pr （比如：50pr就相当于4rem）， 1vw = 布局视口宽度（document.clientWidth）/100=1% （比如：布局视口宽度是351px那么1vw就是3.5px，那么在根节点html的fons-size是1vw的情况下1rem也就是3.5px）
    // rootValue: 12.42,
    // 设计图为750px，一份 root 对应着 rootWidth/100=7.5px
    rootValue: frameConfig.pr2RemRootValue
      ? frameConfig.pr2RemRootValue / 100
      : 7.5, // 1rem=7.5pr
    // 这里是基本单位，前面设置了1vw
    unitPrecision: 1,
    propWhiteList: [], // 白名单
    propBlackList: ['font-size', 'border', 'border-bottom'], // 黑名单 （font-size 我们可能需要直接设置 rem、vw或者px）
    selectorBlackList: [], // 要忽略的选择器，保留为px 比如：['body'] 将匹配 .body-class
    // ignoreIdentifier: '00',
    replace: !!isProd, // 开发环境 .t{width: 621pr; width: 82.8rem;} 显示替换前的值，前面的值无效只是显示
    mediaQuery: false, // 允许在媒体查询中转换px
    minPixelValue: 0 // 设置要替换的最小像素值
  };
  pr2remPlugin.push(pr2rem(pr2remConfig));
}
module.exports = {
  plugins: [
    // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
    autoprefixer,
    // 去除空格、注释、智能压缩代码（注意：postcssSprites 会把 css 代码中已经注释的背景图也进行雪碧图合成，所以要提前把 css 去除注释）
    cssnano
    // pr2rem(pr2remConfig)
  ].concat(pr2remPlugin)
};
