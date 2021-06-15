/* @desc devServer 代理配置 */
module.exports = {
  proxyTable: {
    '/api': {
      target: 'http://10.1.1.123:8110',
      secure: false,
      changeOrigin: true
    }
  }
};
