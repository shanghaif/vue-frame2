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
          iconUrl: 'svg-study-template',
          buttons: [{ name: '上传', code: 'upload', status: 1 }],
          children: [
            {
              id: 27,
              menuCode: 'record',
              menuName: '管理-录入',
              menuUrl: '/record',
              iconUrl: 'svg-sys-government',
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
              iconUrl: 'el-icon-view'
            }
          ]
        },
        {
          id: 8,
          menuCode: 'fund-collect',
          menuName: '基金募集管理',
          menuUrl: '/fund-collect',
          iconUrl: 'svg-enter-state'
        },
        {
          id: 37,
          menuCode: 'open-out-view',
          menuName: '打开新窗口',
          menuUrl: '/open-out-view',
          iconUrl: 'el-icon-document-copy',
          hrefType: 'out' // out 外部打开（会以新窗口的形式打开），in 内部打开（普通路由形式）
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
          iconUrl: 'svg-chart-line',
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
      iconUrl: 'el-icon-files',
      children: [
        {
          id: 24,
          menuCode: 'index',
          menuName: '对话框',
          menuUrl: '/index',
          iconUrl: 'el-icon-s-grid'
        },
        {
          id: 25,
          menuCode: 'drawer',
          menuName: '抽屉',
          menuUrl: '/drawer',
          iconUrl: 'iconfont iconchouti'
        }
      ]
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
        },
        {
          id: 21,
          menuCode: 'expand-grid',
          menuName: '展开-grid',
          menuUrl: '/expand-grid',
          iconUrl: 'el-icon-d-caret'
        },
        {
          id: 39,
          menuCode: 'options-grid',
          menuName: '静态数据-grid',
          menuUrl: '/options-grid',
          iconUrl: 'el-icon-s-grid'
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
          iconUrl: 'iconfont iconxialashu'
        }
      ]
    },
    {
      id: 26,
      menuCode: 'dropdown',
      menuName: '下拉菜单',
      menuUrl: '/dropdown',
      iconUrl: 'el-icon-c-scale-to-original'
    },
    {
      id: 28,
      menuCode: 'form',
      menuName: '表单',
      menuUrl: '/form',
      iconUrl: 'svg-report-review'
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
    },
    {
      id: 29,
      menuCode: 'zjs-province',
      menuName: '浙江省',
      menuUrl: '/zjs-province',
      iconUrl: 'el-icon-user',
      // 是否在组内展示，true 展示 false 隐藏，注意：如果是父级菜单设置为 false 那么如果单独展示该菜单的子级菜单需要使用 menuId 来获取，但是如果菜单的子级菜单中有 false 的子菜单那么还是不会展示
      isGroupShow: false,
      children: [
        {
          id: 31,
          menuCode: 'hz-city',
          menuName: '杭州市',
          menuUrl: 'hz-city',
          iconUrl: 'el-icon-eleme',
          children: [
            {
              id: 34,
              menuCode: 'jgq-area',
              menuName: '江干区',
              menuUrl: 'jgq-area',
              iconUrl: 'el-icon-circle-check'
            },
            {
              id: 35,
              menuCode: 'xh-area',
              menuName: '西湖区',
              menuUrl: 'xh-area',
              iconUrl: 'el-icon-video-camera'
            }
          ]
        },
        {
          id: 33,
          menuCode: 'jx-city',
          menuName: '嘉兴市',
          menuUrl: 'jx-city',
          iconUrl: 'el-icon-star-off'
        }
      ]
    },
    {
      id: 36,
      menuCode: 'view-collapse',
      menuName: '视图-折叠面板',
      menuUrl: '/view-collapse',
      iconUrl: 'el-icon-document-copy'
    },
    {
      id: 38,
      menuCode: 'wang-editor',
      menuName: '富文本编辑器',
      menuUrl: '/wang-editor',
      iconUrl: 'el-icon-reading'
    }
    // ]
  ]
  ;
  return builder(aMenuList);
};

Mock.mock(/\/mock\/index\/menu/, 'get', getMenu); // 菜单
