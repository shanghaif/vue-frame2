/**
 * @desc 公共api
 */
export default [
  {
    name: 'getAreaInfo',
    method: 'GET',
    desc: '获取区域列表',
    path: '/index/getAreaInfo',
    mockPath: '/mock/index/getAreaInfo',
    params: {},
    isWhite: true // 白名单
  },
  {
    name: 'loadOrganizationAccount',
    method: 'GET',
    desc: '获取用户信息',
    path: '/organization/loadOrganizationAccount',
    mockPath: '/mock/organization/loadOrganizationAccount',
    params: { },
    headers: { }
  },
  {
    name: 'findRolePermissionByUserId',
    method: 'GET',
    desc: '获取机构端菜单',
    path: '/role/findRolePermissionByUserId',
    mockPath: '',
    params: { },
    headers: { }
  },
  {
    name: 'bbb',
    method: 'GET',
    desc: '导出-下载文件',
    path: 'report/insAccountReport',
    responseType: 'blob',
    baseURL: '/api1/api',
    params: { type: 2, userName: '', status: '' },
    headers: {
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJMT0dJTl9VU0VSX0tFWSI6ImRlMmM4MDc1LTA0MDUtNGJkMC05MDY4LTVmZWRkYTQwZDYwNSJ9.VtBwGPyRSoMmozpC5kbUa7Rwoqe-8qRaEVr_j6C1d0k'
    }
  },
  {
    name: 'getMenus',
    method: 'GET',
    desc: '获取菜单列表',
    path: '',
    mockPath: '/mock/index/menu'
  },
  {
    name: 'getTree',
    method: 'GET',
    desc: '获取 tree 树',
    path: '',
    mockPath: '/mock/tree/index'
  }
];
