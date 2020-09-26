module.exports = {
  proxyTable: {
    '/devApi': {
      target: 'http://10.1.1.121:8821',
      changeOrigin: true, // 跨域和突破网站对爬虫的禁止，一般建议配置
      pathRewrite: { '^/devApi': '' } // 路径重写
    },
    '/api': {
      // target: 'http://10.1.2.235:8680', // 日鑫
      // target: 'http://10.1.2.209:8680',
      // target: 'http://10.1.2.54:8680', // 张洪
      // target: 'http://10.1.2.227:8680/', // 海东
      target: 'http://10.1.1.123:8110',
      secure: false, // 如果我们需要转发的网站是支持 https 的，那么需要增加secure=false，来防止转发失败
      changeOrigin: true // 跨域和突破网站对爬虫的禁止，一般建议配置
      // pathRewrite: { '^/devApi': '' }
    },
    '/api1': {
      target: 'http://10.1.1.128:8120/', // 测试环境
      changeOrigin: true,
      pathRewrite: {
        '^/api1': ''
      }
    }
  }
};
