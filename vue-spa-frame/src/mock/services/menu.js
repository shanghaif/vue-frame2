/**
 * @desc 菜单 mock
 */
import Mock from 'mockjs2';
import { builder } from '../util';

const getMenu = options => {
  const aMenuList = [
    // models: [
    {
      id: 70,
      menuCode: 'update-log',
      menuName: '更新日志',
      menuUrl: 'update-log',
      iconUrl: 'svg-update-log'
    },
    {
      id: 69,
      menuCode: 'development-specification',
      menuName: '开发规范',
      menuUrl: 'development-specification',
      iconUrl: 'el-icon-document'
    },
    {
      id: 88,
      menuCode: 'config-specification',
      menuName: '配置规范',
      menuUrl: 'config-specification',
      iconUrl: 'el-icon-setting',
      children: [
        {
          id: 91,
          menuCode: 'vscode',
          menuName: 'vscode',
          menuUrl: 'vscode',
          iconUrl: '/static/images/vscode.png'
        },
        {
          id: 89,
          menuCode: 'eslint',
          menuName: 'eslint',
          menuUrl: 'eslint',
          iconUrl: '/static/images/eslint.png'
        },
        {
          id: 90,
          menuCode: 'stylelint',
          menuName: 'stylelint',
          menuUrl: 'stylelint',
          iconUrl: '/static/images/stylelint_light.png'
        }
      ]
    },
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
            },
            {
              id: 73,
              menuCode: 'update-source-code',
              menuName: '修改-源码',
              menuUrl: '/update-source-code',
              iconUrl: 'el-icon-edit'
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
      iconUrl: '/static/images/avatar.gif'
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
          iconUrl: 'svg-dialog'
        },
        {
          id: 56,
          menuCode: 'drag-dialog',
          menuName: '拖拽-对话框',
          menuUrl: '/drag-dialog',
          iconUrl: 'svg-move'
        }
      ]
    },
    {
      id: 25,
      menuCode: 'drawer',
      menuName: '抽屉',
      menuUrl: '/drawer',
      iconUrl: 'symbol-icondangan'
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
          id: 43,
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
        },
        {
          id: 41,
          menuCode: 'select-grid',
          menuName: '下拉-grid',
          menuUrl: 'select-grid',
          iconUrl: 'el-icon-arrow-down'
        },
        {
          id: 48,
          menuCode: 'paging-grid',
          menuName: '自定义分页参数-grid',
          menuUrl: 'paging-grid',
          iconUrl: 'el-icon-s-grid'
        },
        {
          id: 61,
          menuCode: 'transfer-table',
          menuName: '表格穿梭',
          menuUrl: 'transfer-table',
          iconUrl: 'svg-table-transfer'
        },
        {
          id: 74,
          menuCode: 'relevance-grid',
          menuName: '表格联动',
          menuUrl: 'relevance-grid',
          iconUrl: 'svg-relevanceGrid'
        },
        {
          id: 75,
          menuCode: 'more-header-grid',
          menuName: '多表头',
          menuUrl: 'more-header-grid',
          iconUrl: 'el-icon-document-remove'
        }
      ]
    },
    {
      id: 44,
      menuCode: 'nesting-grid',
      menuName: '嵌套-grid',
      menuUrl: 'nesting-grid',
      iconUrl: 'svg-nesting-grid'
    },
    {
      id: 52,
      menuCode: 'row-edit-grid',
      menuName: '行编辑-grid',
      menuUrl: 'row-edit-grid',
      iconUrl: 'el-icon-edit'
    },
    {
      id: 53,
      menuCode: 'drag-grid',
      menuName: '行拖拽-grid',
      menuUrl: 'drag-grid',
      iconUrl: 'el-icon-sort'
    },
    {
      id: 77,
      menuCode: 'tree-grid',
      menuName: '树形-grid',
      menuUrl: 'tree-grid',
      iconUrl: 'el-icon-share'
    },
    {
      id: 55,
      menuCode: 'property-grid',
      menuName: '属性-grid',
      menuUrl: 'property-grid',
      iconUrl: 'el-icon-document'
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
          iconUrl: 'svg-base-tree'
        },
        {
          id: 32,
          menuCode: 'base-select-tree',
          menuName: '下拉select-tree',
          menuUrl: 'base-select-tree',
          iconUrl: '/static/images/tree.png'
        },
        {
          id: 42,
          menuCode: 'base-roll-tree',
          menuName: '滚动样式-tree',
          menuUrl: 'base-roll-tree',
          iconUrl: 'el-icon-c-scale-to-original'
        },
        {
          id: 45,
          menuCode: 'store-tree',
          menuName: '静态资源-tree',
          menuUrl: 'store-tree',
          iconUrl: 'el-icon-takeaway-box'
        },
        {
          id: 54,
          menuCode: 'cascader-tree',
          menuName: '级联-tree',
          menuUrl: 'cascader-tree',
          iconUrl: 'el-icon-paperclip'
        },
        {
          id: 72,
          menuCode: 'transfer-tree',
          menuName: '穿梭-tree',
          menuUrl: 'transfer-tree',
          iconUrl: 'el-icon-connection'
        },
        {
          id: 76,
          menuCode: 'anchor-tree',
          menuName: '锚点-tree',
          menuUrl: 'anchor-tree',
          iconUrl: 'el-icon-paperclip'
        }
      ]
    },
    {
      id: 26,
      menuCode: 'dropdown',
      menuName: '下拉菜单',
      menuUrl: '/dropdown',
      iconUrl: 'svg-down-select'
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
      iconUrl: 'symbol-iconzhengwuzhanghao',
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
      iconUrl: 'symbol-iconSAASyingyongguanli',
      // 是否在组内展示，true 展示 false 隐藏，注意：如果是父级菜单设置为 false 那么如果单独展示该菜单的子级菜单需要使用 menuId 来获取，但是如果菜单的子级菜单中有 false 的子菜单那么还是不会展示
      isGroupShow: true,
      children: [
        {
          id: 31,
          menuCode: 'hz-city',
          menuName: '杭州市',
          menuUrl: 'hz-city',
          iconUrl: '/static/images/hangzhou.png',
          children: [
            {
              id: 34,
              menuCode: 'jgq-area',
              menuName: '江干区',
              menuUrl: 'jgq-area',
              iconUrl: 'symbol-icongd-qiyehuaxiang'
            },
            {
              id: 35,
              menuCode: 'xh-area',
              menuName: '西湖区',
              menuUrl: 'xh-area',
              iconUrl: '/static/images/xihu.png'
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
    },
    {
      id: 40,
      menuCode: 'condition',
      menuName: '多重筛选',
      menuUrl: '',
      iconUrl: 'el-icon-circle-plus-outline',
      children: [
        {
          id: 49,
          menuCode: 'condition',
          menuName: '示例',
          menuUrl: '/condition',
          iconUrl: 'svg-more-condition',
          children: []
        }
      ]
    },
    {
      id: 46,
      menuCode: 'layout',
      menuName: '布局',
      menuUrl: '',
      iconUrl: 'el-icon-bank-card',
      children: [
        {
          id: 47,
          menuCode: 'border-layout',
          menuName: 'border布局',
          menuUrl: '/border-layout',
          iconUrl: ''
        },
        {
          id: 57,
          menuCode: 'grid-layout',
          menuName: 'grid布局',
          menuUrl: '/grid-layout',
          iconUrl: ''
        },
        {
          id: 58,
          menuCode: 'form-layout',
          menuName: 'form布局',
          menuUrl: '/form-layout',
          iconUrl: ''
        },
        {
          id: 78,
          menuCode: 'anchor-layout',
          menuName: '锚点布局',
          menuUrl: '/anchor-layout',
          iconUrl: ''
        },
        {
          id: 79,
          menuCode: 'v-box-layout',
          menuName: '垂直布局',
          menuUrl: '/v-box-layout',
          iconUrl: ''
        },
        {
          id: 80,
          menuCode: 'h-box-layout',
          menuName: '水平布局',
          menuUrl: '/h-box-layout',
          iconUrl: ''
        },
        {
          id: 81,
          menuCode: 'column-layout',
          menuName: '列布局',
          menuUrl: '/column-layout',
          iconUrl: ''
        },
        {
          id: 82,
          menuCode: 'absolute-layout',
          menuName: '绝对定位布局',
          menuUrl: 'absolute-layout',
          iconUrl: ''
        }
      ]
    },
    {
      id: 50,
      menuCode: 'ts-test',
      menuName: 'typescript',
      menuUrl: 'ts-test',
      iconUrl: 'svg-typescript'
    },
    {
      id: 59,
      menuCode: 'cut-window',
      menuName: '分割窗口',
      menuUrl: 'cut-window',
      iconUrl: 'el-icon-refrigerator'
    },
    {
      id: 62,
      menuCode: 'responsive-page',
      menuName: '响应式-界面',
      menuUrl: '/responsive-page',
      iconUrl: 'el-icon-c-scale-to-original'
    },
    {
      id: 63,
      menuCode: 'big-screen-page',
      menuName: '大屏-图表',
      menuUrl: '/big-screen-page',
      iconUrl: 'el-icon-wind-power',
      children: [
        {
          id: 64,
          menuCode: 'big-screen-page-one',
          menuName: '示例1',
          menuUrl: '/big-screen-page-one',
          iconUrl: 'el-icon-light-rain'
        },
        {
          id: 65,
          menuCode: 'big-screen-page-two',
          menuName: '示例2',
          menuUrl: '/big-screen-page-two',
          iconUrl: 'el-icon-lightning'
        }
      ]
    },
    {
      id: 66,
      menuCode: 'out-router-page',
      menuName: '外部子路由-新窗口',
      menuUrl: '/out-router-page',
      iconUrl: 'el-icon-monitor',
      children: [
        {
          id: 67,
          menuCode: 'out-router-page-one',
          menuName: '示例1',
          menuUrl: '/out-router-page-one'
        },
        {
          id: 68,
          menuCode: 'out-router-page-two',
          menuName: '示例2',
          menuUrl: '/out-router-page-two'
        }
      ]
    },
    {
      id: 71,
      menuCode: 'html2pdf',
      menuName: 'html转pdf下载',
      menuUrl: 'html2pdf',
      iconUrl: 'svg-html2pdf',
      hrefType: 'out' // out 外部打开（会以新窗口的形式打开），in 内部打开（普通路由形式）
    },
    {
      id: 83,
      menuName: '可视化',
      iconUrl: 'el-icon-s-data',
      menuCode: 'visualization',
      menuUrl: 'visualization',
      children: [
        {
          id: 84,
          menuCode: 'history-time-scroll',
          menuName: '时间历程轮播组件',
          menuUrl: 'history-time-scroll',
          iconUrl: ''
        },
        {
          id: 85,
          menuCode: 'word-cloud',
          menuName: '词云',
          menuUrl: 'word-cloud',
          iconUrl: ''
        },
        {
          id: 86,
          menuCode: 'force-tp',
          menuName: '企业关系图谱',
          menuUrl: 'force-tp',
          iconUrl: ''
        },
        {
          id: 86,
          menuCode: 'map-bar',
          menuName: '地图柱状图',
          menuUrl: 'map-bar',
          iconUrl: ''
        }
      ]
    },
    {
      id: 86,
      menuName: '嵌套路由',
      iconUrl: '/static/images/123.jpg',
      menuCode: 'nesting-routes',
      menuUrl: 'nesting-routes',
      children: [
        {
          id: 87,
          menuCode: 'nesting-routes-test',
          menuName: '示例',
          menuUrl: 'nesting-routes-test',
          iconUrl: ''
        }
      ]
    }
    // ]
  ];
  return builder(aMenuList);
};

Mock.mock(/\/mock\/index\/menu/, 'get', getMenu); // 菜单
