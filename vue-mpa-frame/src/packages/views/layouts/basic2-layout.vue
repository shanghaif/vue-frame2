<template>
  <div :class="$style.container">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <base-double-wing>
          <template v-slot:left>
            <div
              :class="[
                $style.fullY,
                $style.logoBox,
                $style.flexCenter,
                $style.pointer
              ]"
              @click="titleClick"
            >
              <img :src="iconfontUrl()" alt="" />
              {{ title }}
            </div>
          </template>
          <template v-slot:middle>
            <base-block-group
              :class="$style.buttonGroupCls"
              :defaultActive.sync="buttonGroupOption.defaultActive"
              v-bind="buttonGroupOption"
              :buttonGroup="getLevel1Menus"
              @click="onBlockClick"
            ></base-block-group>
          </template>
          <template v-slot:right>
            <div :class="[$style.fullY, $style.rightBox, $style.flexCenter]">
              <div>
                <base-drop-column-down
                  size="mini"
                  title="当前应用名称"
                  :options="dropColumnDownOptions"
                  trigger="click"
                  @click="onDropColumnDownClick"
                ></base-drop-column-down>
              </div>
              <div
                @click="onClickFullScreen"
                title="全屏"
                :class="$style.pointer"
              >
                <i
                  :class="isFullscreen ? 'el-icon-plus' : 'el-icon-full-screen'"
                ></i>
              </div>
              <div>
                <base-drop-down
                  size="mini"
                  :title="getUserData.userName"
                  :options="options"
                ></base-drop-down>
              </div>
            </div>
          </template>
        </base-double-wing>
      </template>
      <template v-slot:west>
        <base-nav-menu
          ref="menu"
          :menus="menus"
          v-bind="menuProps"
          @select="handleSelect"
        >
        </base-nav-menu>
      </template>
      <template v-slot:center>
        <base-border-layout :class="$style.bgFff" v-bind="innerLayout">
          <template v-slot:north>
            <div class="mt-8">
              <base-bread-crumb
                separator-class="el-icon-arrow-right"
                :options="breadCrumbOptions"
              ></base-bread-crumb>
            </div>
          </template>
          <template v-slot:center>
            <div :class="[$style.fullY, $style.bgFff]">
              <router-view :key="$route.fullPath"></router-view>
            </div>
          </template>
        </base-border-layout>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import {
  ROOT_PAGE_NAME,
  LOGIN_PAGE_NAME
} from '@config/index.js';
import { mapActions, mapGetters } from 'vuex';
import screenfull from 'screenfull';
import _last from 'lodash/last';
import _split from 'lodash/split';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';
import _join from 'lodash/join';
import _drop from 'lodash/drop';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _isNil from 'lodash/isNil';
import _has from 'lodash/has';
import _find from 'lodash/find';

export default {
  name: 'Basic2Layout',
  // title 标题，iconfontUrl 图标，collapsed 侧栏收起状态
  props: {
    title: {
      type: String,
      default: '项目名称'
    },
    iconfontUrl: {
      type: Function,
      default() {
        return require('@assets/images/logo.png');
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    titleClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    this.ROOT_PAGE_NAME = ROOT_PAGE_NAME; // 根路由名称
    this.checkedFirstMenu = null; // 选中的一级菜单
    this.checkedFirstMenu2BlockIndex = '';
    this.checkMenuIndexPath = '';
    return {
      logoutLoading: false,
      isFullscreen: false,
      layout: {
        northHeight: '60px',
        westWidth: 'auto',
        eastWidth: '0px',
        southHeight: '0px'
      },
      innerLayout: {
        northHeight: '30px',
        westWidth: '0px',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: this.$style.borderBottom
      },
      menus: [],
      menuProps: {
        collapsed: this.collapsed, // 侧栏收起状态
        defaultActive: '',
        textColor: '#BFCBD9',
        activeTextColor: '#409EFF',
        backgroundColor: '#304156',
        collapseText: '收起导航'
      },
      breadCrumbOptions: [],
      options: [
        { text: '个人中心', icon: 'el-icon-user' },
        { text: '消息中心', icon: 'el-icon-bell' },
        {
          text: '登出',
          icon: 'el-icon-close',
          listeners: { click: this.onLoginout },
          divided: true
        }
      ],
      buttonGroupOption: {
        width: '100px',
        textColor: '#BFCBD9',
        activeTextColor: '#4989F4',
        backgroundColor: '#fff',
        defaultActive: 0,
        activeCls: this.$style.activeCls
      },
      buttonGroup: [],
      dropColumnDownOptions: [
        [
          {
            title: '企业关联图谱',
            list: [
              {
                id: '1',
                icon: 'el-icon-platform-eleme',
                label: '血缘关系图谱'
              },
              { id: '2', icon: 'el-icon-delete-solid', label: '事件关系图谱' },
              { id: '3', icon: 'el-icon-s-tools', label: '供应-销售链树' },
              { id: '4', icon: 'el-icon-phone', label: '产业链树' }
            ]
          },
          {
            title: '企业高质量评价',
            list: [
              { id: '5', icon: 'el-icon-star-on', label: '评价任务' },
              { id: '6', icon: 'el-icon-s-goods', label: '业务指导' },
              { id: '7', icon: 'el-icon-warning', label: '进度管控' },
              { id: '8', icon: 'el-icon-error', label: '企业评价' },
              { id: '9', icon: 'el-icon-question', label: '评价结果' },
              { id: '10', icon: 'el-icon-remove', label: '决策分析' }
            ]
          }
        ],
        [
          {
            title: '产业地图',
            list: [
              { id: '11', icon: 'el-icon-s-help', label: '企业GIS图层' },
              { id: '12', icon: 'el-icon-minus', label: '产业地图' },
              { id: '13', icon: 'el-icon-check', label: '专题图层' },
              { id: '14', icon: 'el-icon-upload', label: '战略产业集群分析' },
              { id: '15', icon: 'el-icon-upload2', label: '区域行业分析' }
            ]
          },
          {
            title: '数据管理',
            list: [
              { id: '16', icon: 'el-icon-camera-solid', label: '数据管控大屏' },
              { id: '17', icon: 'el-icon-s-platform', label: '数据管理中心' },
              { id: '18', icon: 'el-icon-s-fold', label: '企业标签' }
            ]
          },
          {
            title: '数据分析',
            list: [{ id: '19', icon: 'el-icon-s-home', label: '数据分析' }]
          }
        ],
        [
          {
            title: '制造业大数据指数',
            list: [
              { id: '20', icon: 'el-icon-s-shop', label: '指数信息' },
              { id: '21', icon: 'el-icon-s-marketing', label: '指数指标信息' },
              { id: '22', icon: 'el-icon-s-comment', label: '行业评估值信息' },
              {
                id: '23',
                icon: 'el-icon-s-opportunity',
                label: '行业评估值信息'
              }
            ]
          },
          {
            title: '基础服务管理',
            list: [
              { id: '24', icon: 'el-icon-share', label: '组织架构' },
              { id: '25', icon: 'el-icon-d-caret', label: '用户管理' },
              { id: '26', icon: 'el-icon-caret-right', label: '角色管理' },
              { id: '27', icon: 'el-icon-refresh-left', label: '权限管理' },
              { id: '28', icon: 'el-icon-date', label: '平台日志' }
            ]
          }
        ],
        [
          {
            title: '企业全景画像',
            list: [
              { id: '29', icon: 'el-icon-tickets', label: '企业画像' },
              {
                id: '30',
                icon: 'el-icon-document-delete',
                label: '企业经营信息'
              },
              { id: '31', icon: 'el-icon-printer', label: '信用风险信息' },
              { id: '32', icon: 'el-icon-search', label: '排行榜信息' }
            ]
          }
        ]
      ]
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'getMenus', 'getLevel1Menus'])
  },
  watch: {
    // 监听路由改变，路由动态改变（获取路由对应的一级菜单项）
    $route: {
      handler(to, from) {
        if (!_isEmpty(to.matched)) {
          const rootPageName = to.matched[0].name; // 匹配到的路由路径列表，第一个是匹配到的根路由
          if (rootPageName !== this.ROOT_PAGE_NAME) {
            this.ROOT_PAGE_NAME = rootPageName;
          }
        }
        const aPathKeyList = this.getPathKeyList();
        if (!_isEmpty(aPathKeyList)) {
          if (aPathKeyList[0] !== this.buttonGroupOption.defaultActive) {
            this.buttonGroupOption.defaultActive = aPathKeyList[0];
          }
        }
      },
      immediate: true
    }
  },
  created() {
    // setTimeout(() => {
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
    ...mapActions(['handlerDestroy', 'getChildrenMenus']),
    /**
     * @desc 顶部点击事件
     */
    onBlockClick(event, menu = {}, index) {
      /* if (this.$route.name === this.ROOT_PAGE_NAME && !DEFAULT_SETTINGS.isOpenMenuToRouter) {
        return;
      } */
      if (menu) {
        this.checkedFirstMenu = menu; // 一级菜单
        // 切换菜单栏
        this.getChildrenMenus(menu).then(resData => {
          this.$refs.menu.setGrade1Index(index);
          this.menus = resData; // 触发 watch
          setTimeout(() => {
            const aPathKeyList = this.getPathKeyList();
            let menuDefaultActive = '';
            let firstSubMenuIndex = '';
            if (_isEmpty(aPathKeyList)) {
              menuDefaultActive = this.$refs.menu.getFirstElMenuItem(); // 0-0-0
              firstSubMenuIndex = this.$refs.menu.getFirstSubMenuIndex(); // 0-0
            } else {
              menuDefaultActive = _join(aPathKeyList, '-'); // 0-0-1
              firstSubMenuIndex = _join(
                aPathKeyList.length === 3
                  ? _drop(aPathKeyList, 1)
                  : aPathKeyList,
                '-'
              ); // 0-0-1->0-1
            }
            if (this.checkedFirstMenu2BlockIndex === '') {
              // 初始模块并且没有点击过其它菜单项
              // this.menuProps.defaultActive = menuDefaultActive;
              this.handleRefreshPage(menuDefaultActive, [
                firstSubMenuIndex,
                menuDefaultActive
              ]);
            }
            if (this.checkedFirstMenu2BlockIndex === index) {
              // 点击过其它菜单项
              // this.menuProps.defaultActive = menuDefaultActive;
            }
            if (this.checkedFirstMenu2BlockIndex !== index) {
              // 当前点击不是初始模块并且没有点击菜单项
              if (!_isEmpty(this.$refs.menu.getSubMenuList())) {
                this.$refs.menu.open(this.$refs.menu.getFirstSubMenuIndex());
              }
              if (aPathKeyList[0] === this.buttonGroupOption.defaultActive) {
                this.menuProps.defaultActive = _split(aPathKeyList, '-') + '-0'; // 5->5-0
                const menuList = [];
                for (let i = 0, len = aPathKeyList.length; i < len; i++) {
                  if (i === 0) {
                    menu = this.menus[aPathKeyList[i]];
                  } else {
                    menu = menu.children[aPathKeyList[i]];
                  }
                  menu && menuList.push(menu);
                }
                if (_isNil(menu)) {
                  menu = this.menus[0];
                  menuList.push(menu);
                }
                this.breadCrumbOptions = _concat(
                  { text: _get(this.checkedFirstMenu, 'menuName', '') },
                  _map(menuList, menu => ({ text: menu.menuName }))
                ); // 设置面包屑
              }
            }
          }, 0);
        });
      }
    },
    getPathKeyList() {
      let navMenus = this.getMenus;
      const aPathKeyList = [];
      for (const value of Object.values(this.$route.matched)) {
        if (value.name !== this.ROOT_PAGE_NAME && !_isEmpty(navMenus)) {
          if (this.ROOT_PAGE_NAME !== ROOT_PAGE_NAME) {
            navMenus = _find(
              navMenus,
              menu => menu.menuCode === this.ROOT_PAGE_NAME
            );
            if (_has(navMenus, 'children')) {
              navMenus = _get(navMenus, 'children', []);
            }
          }
          const index = _findIndex(
            navMenus,
            menu => menu.menuCode === value.name
          );
          if (index !== -1) {
            navMenus = navMenus[index].children;
            aPathKeyList.push(index);
          }
        }
      }
      return aPathKeyList;
    },
    /**
     * @desc 刷新页面
     */
    handleRefreshPage(key, keyPath) {
      this.checkedFirstMenu2BlockIndex = this.buttonGroupOption.defaultActive;
      let aKeyPathList = _split(_last(keyPath), '-');
      if (aKeyPathList.length > 1) {
        aKeyPathList = _drop(_split(_last(keyPath), '-'), 1);
      }
      let menu = null;
      const menuList = [];
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.menus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
        menu && menuList.push(menu);
      }
      if (_isNil(menu)) {
        menu = this.menus[0];
        menuList.push(menu);
      }
      if (!_isEmpty(menu) && menu.menuCode !== '') {
        if (_split(key, '-').length === 1) {
          this.menuProps.defaultActive = this.$refs.menu.getFirstElMenuItem(); // 设置选中的菜单
        } else {
          this.menuProps.defaultActive = key; // 设置选中的菜单
        }
        this.breadCrumbOptions = _concat(
          { text: _get(this.checkedFirstMenu, 'menuName', '') },
          _map(menuList, menu => ({ text: menu.menuName }))
        ); // 设置面包屑
        if (this.$route.name === this.ROOT_PAGE_NAME) {
          this.$router.push({ name: menu.menuCode });
        }
      }
    },
    /**
     * @desc 菜单激活回调
     */
    handleSelect(key, keyPath) {
      this.checkedFirstMenu2BlockIndex = this.buttonGroupOption.defaultActive;
      const aKeyPathList = _drop(_split(_last(keyPath), '-'), 1);
      let menu = null;
      const menuList = [];
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.menus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
        menu && menuList.push(menu);
      }
      if (
        this.$route.name !== menu.menuCode &&
        !_isEmpty(menu) &&
        menu.menuCode !== ''
      ) {
        this.menuProps.defaultActive = key; // 设置选中的菜单
        this.breadCrumbOptions = _concat(
          { text: _get(this.checkedFirstMenu, 'menuName', '') },
          _map(menuList, menu => ({ text: menu.menuName }))
        ); // 设置面包屑
        this.$router.push({ name: menu.menuCode });
      }
    },
    /**
     * @desc 登出
     * @param {Objetc} event - 事件html对象
     */
    onLoginout(event) {
      this.dialogInstance = this.$baseDialog({
        component: this.$createElement('div', {}, ['确认要登出吗?']),
        container: this.$el,
        center: true,
        width: '350px',
        title: '提示',
        slotNode: {
          footer: h => {
            return h('div', {}, [
              h(
                'el-button',
                {
                  on: {
                    click: () => {
                      this.dialogInstance.close();
                    }
                  }
                },
                ['取消']
              ),
              h(
                'el-button',
                {
                  props: { type: 'primary', loading: this.logoutLoading },
                  on: {
                    click: () => {
                      this.logoutLoading = true;
                      this.handlerDestroy()
                        .then(() => {
                          this.logoutLoading = false;
                          this.dialogInstance.close();
                          this.$router.push({ name: LOGIN_PAGE_NAME });
                        })
                        .finally(() => {});
                    }
                  }
                },
                ['确定']
              )
            ]);
          }
        }
      });
      this.dialogInstance.open();
    },
    /**
     * @desc 全屏
     * @param {Objetc} event - 事件html对象
     */
    onClickFullScreen(event) {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        });
        return false;
      }
      this.isFullscreen = !this.isFullscreen;
      screenfull.toggle();
    },
    /**
     * @desc 下拉面板菜单-点击
     * @param {Objetc} event - 事件html对象
     * @param {option} option - 参数对象
     */
    onDropColumnDownClick(event, option = {}) {
      console.info('下拉面板菜单-点击 ', event, option);
    }
  }
};
</script>
<style lang="less" module>
@import './basic-layout.less';
.container {
}
// .button-group-cls {
//   // padding: 0px 34px;
//   padding-left: 35px !important;
//   & :hover {
//     color: #4989f4;
//   }
// }
</style>
