/**
 * @desc 贷款需求管理
 */
export default [
  {
    name: 'bankProductsList',
    method: 'GET',
    desc: '获取贷款需求管理列表',
    path: '/bank/demandManage/bankProductsList',
    mockPath: '/mock/bank/demandManage/bankProductsList',
    params: {
      pageSize: '10',
      pageNum: '1',
      applyTimeStart: '',
      getApplyTimeEnd: '',
      nodeStatus: '',
      key: '',
      productType: ''
    },
    headers: {
      // 测试 token 过期
      // token: 'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6IjhmYThjZTM1LWRjNzItNDFiYy05N2JkLTk5MDRmYzljMTRkZCJ9.wunHvfjW1mQ-TqvaZut50nImdCF-gM1a-VpgQmkCif4'
    }
  }
];
