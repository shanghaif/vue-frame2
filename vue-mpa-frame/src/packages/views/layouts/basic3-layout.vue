<template>
  <div :class="[$style.container, 'basic3-layout']">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <base-double-wing>
          <template v-slot:left>
            <div :class="[$style.fullY, $style.logoBox, $style.flexCenter]">
              <img :src="iconfontUrl()" alt="" />
              {{ title }}
            </div>
          </template>
          <template v-slot:middle>
            <base-nav-menu
              ref="menu"
              mode="horizontal"
              :menus="getMenus"
              v-bind="menuProps"
              @select="handleSelect"
            >
            </base-nav-menu>
          </template>
          <template v-slot:right>
            <div :class="[$style.fullY, $style.rightBox, $style.flexCenter]">
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
      <template v-slot:west> </template>
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

export default {
  name: 'Basic3Layout',
  // title 标题，iconfontUrl 图标，collapsed 侧栏收起状态
  props: {
    title: {
      type: String,
      default: '项目名称'
    },
    iconfontUrl: {
      type: Function,
      default: function () {
        return require('@assets/images/logo.png');
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
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
      menuProps: {
        collapsed: this.collapsed, // 侧栏收起状态
        defaultActive: '',
        textColor: '#E0E939',
        activeTextColor: '#333',
        backgroundColor: '#fff',
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
      ]
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'getMenus'])
  },
  watch: {
    // 监听路由改变-路由动态改变
    $route: {
      handler(to, from) {
        this.setCheckedMenu(to, from);
      },
      immediate: true
    }
  },
  created() {
    // setTimeout(() => {
    // this.layout.westWidth = '64px';
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
    ...mapActions(['handlerDestroy']),
    /**
     * @desc 设置默认选中项
     */
    setCheckedMenu(to, from) {
      let navMenus = this.getMenus;
      const aPathKeyList = [];
      for (const value of Object.values(to.matched)) {
        if (value.name !== ROOT_PAGE_NAME) {
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
      if (to.name === ROOT_PAGE_NAME) {
        setTimeout(() => {
          this.menuProps.defaultActive = this.$refs.menu.getFirstElMenuItem();
          this.$router.push({
            path: `/${this.$refs.menu.getRouterPath(
              this.menuProps.defaultActive
            )}`
          });
        }, 0);
      }
      if (to.name !== ROOT_PAGE_NAME && !_isEmpty(aPathKeyList)) {
        const sPathKey = _join(aPathKeyList, '-'); // 0-0-1
        setTimeout(() => {
          this.menuProps.defaultActive = sPathKey;
          this.breadCrumbOptions = this.$refs.menu.getKeyPath2BreadCrumbPath(
            sPathKey
          ); // 设置面包屑
        }, 0);
      }
    },
    /**
     * @desc 菜单激活回调
     */
    handleSelect(key, keyPath) {
      const aKeyPathList = _split(_last(keyPath), '-');
      let menu = null;
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        if (i === 0) {
          menu = this.getMenus[aKeyPathList[i]];
        } else {
          menu = menu.children[aKeyPathList[i]];
        }
      }
      if (
        this.$route.name !== menu.menuCode &&
        !_isEmpty(menu) &&
        menu.menuCode !== ''
      ) {
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
    }
  }
};
</script>
<style lang="less" module>
@import './basic-layout.less';
.container {
  /* 修改组件样式 同 deep、<<< */
  :global .el-menu.el-menu--horizontal {
    border-bottom: 0px;
  }
}
</style>
