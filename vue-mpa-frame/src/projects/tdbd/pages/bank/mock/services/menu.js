/**
 * @desc 菜单 mock
 */
import Mock from 'mockjs2';
import { builder } from '../util';

const getMenu = (options) => {
  const aMenuList = [
    // models: [
    {
      id: 1,
      menuCode: 'needs',
      menuName: '路由嵌套',
      menuUrl: '',
      iconUrl: 'svg-center-info',
      children: [
        {
          id: 7,
          menuCode: 'loan',
          menuName: '贷款需求',
          menuUrl: '/loan',
          iconUrl: '',
          buttons: [{ name: '上传', code: 'upload', status: 1 }],
          children: [
            {
              id: 27,
              menuCode: 'record',
              menuName: '管理-录入',
              menuUrl: '/record',
              iconUrl: '',
              buttons: [
                { name: '添加', code: 'add', status: 0 },
                { name: '启用', code: 'using', status: 1 }
              ]
            },
            {
              id: 30,
              menuCode: 'assess',
              menuName: '管理-评审',
              menuUrl: '/assess',
              iconUrl: ''
            }
          ]
        },
        {
          id: 8,
          menuCode: 'fund-collect',
          menuName: '基金募集管理',
          menuUrl: '/fund-collect',
          iconUrl: 'el-icon-help'
        }
      ]
    },
    {
      id: 16,
      menuCode: 'echarts',
      menuName: '图表展示',
      menuUrl: '',
      iconUrl: 'el-icon-s-data',
      children: [
        {
          id: 17,
          menuCode: 'line',
          menuName: '折线',
          menuUrl: '/line',
          iconUrl: 'el-icon-picture-outline',
          children: [
            {
              id: 18,
              menuCode: 'one',
              menuName: '示例1',
              menuUrl: '/one',
              iconUrl: ''
            },
            {
              id: 19,
              menuCode: 'two',
              menuName: '示例2',
              menuUrl: '/two',
              iconUrl: ''
            }
          ]
        }
      ]
    },
    {
      id: 12,
      menuCode: 'user',
      menuName: '用户管理',
      menuUrl: '/user',
      iconUrl: 'el-icon-s-check'
    },
    {
      id: 15,
      menuCode: 'dialog',
      menuName: '对话框',
      menuUrl: '/dialog',
      iconUrl: 'el-icon-files'
    },
    {
      id: 2,
      menuCode: 'grid',
      menuName: 'Grid 列表',
      menuUrl: '/grid',
      iconUrl: 'el-icon-s-grid',
      children: [
        {
          id: 20,
          menuCode: 'base-grid',
          menuName: '基础-grid',
          menuUrl: '/base-grid',
          iconUrl: 'el-icon-s-grid',
          buttons: [
            { id: 10, name: '添加', code: 'add', status: 0 },
            { id: 11, name: '删除', code: 'delete', status: 1 }
          ]
        },
        {
          id: 21,
          menuCode: 'roll-grid',
          menuName: '滚动-grid',
          menuUrl: '/roll-grid',
          iconUrl: 'el-icon-c-scale-to-original'
        }
      ]
    },
    {
      id: 22,
      menuCode: 'tree',
      menuName: 'tree 树形控件',
      menuUrl: '/tree',
      iconUrl: 'el-icon-share',
      children: [
        {
          id: 23,
          menuCode: 'base-tree',
          menuName: '基础-tree',
          menuUrl: '/base-tree',
          iconUrl: 'el-icon-share'
        },
        {
          id: 32,
          menuCode: 'base-select-tree',
          menuName: 'select-tree',
          menuUrl: 'base-select-tree',
          iconUrl: 'el-icon-share'
        }
      ]
    },
    {
      id: 5,
      menuCode: 'personal',
      menuName: '个人中心',
      menuUrl: '/personal',
      iconUrl: 'el-icon-user',
      buttons: [
        { id: 12, name: '添加', code: 'add', status: 0 },
        { id: 13, name: '删除', code: 'delete', status: 1 }
      ]
    }
    // ]
  ]
  ;
  return builder(aMenuList);
};

Mock.mock(/\/mock\/index\/menu/, 'get', getMenu); // 菜单
