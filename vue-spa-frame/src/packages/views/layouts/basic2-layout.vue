<template>
  <div :class="$style.container">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view2 ref="topView2" :title="title"></top-view2>
      </template>
      <template v-slot:west>
        <base-nav-menu
          ref="menu"
          :menus="menus"
          v-bind="menuProps"
          :navTitle="navTitle"
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
              <base-route-view
                :keep-alive="false"
                :key="$route.fullPath"
              ></base-route-view>
            </div>
          </template>
        </base-border-layout>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import TopView2 from './components/top-view2.vue';
import {
  DEFAULT_SETTINGS
} from '@config/index.js';
import _last from 'lodash/last';
import _split from 'lodash/split';
import _isEmpty from 'lodash/isEmpty';
import _drop from 'lodash/drop';
import _concat from 'lodash/concat';
import _get from 'lodash/get';
import _map from 'lodash/map';

export default {
  name: 'Basic2Layout',
  provide: function () {
    return {
      getBase2Layout: this
    };
  },
  components: { TopView2 },
  props: {
    // 顶部栏目标题文字
    title: {
      type: String,
      default: DEFAULT_SETTINGS.title
    }
  },
  data() {
    return {
      layout: {
        northHeight: '60px',
        westWidth: 'auto',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: this.$style.northCls
      },
      innerLayout: {
        northHeight: '30px',
        westWidth: '0px',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: this.$style.borderBottom
      },
      navTitle: '示例平台',
      menus: [],
      menuProps: {
        collapsed: DEFAULT_SETTINGS.collapsed, // 侧栏收起状态
        defaultActive: '',
        textColor: '#BFCBD9',
        activeTextColor: '#409EFF',
        navIcon: 'el-icon-menu',
        backgroundColor: '#304156',
        collapseText: '收起导航',
        collapsePosition: 'bottom'
      },
      breadCrumbOptions: [],
      buttonGroup: []
    };
  },
  created() {
    // setTimeout(() => {
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
    /**
     * @desc 设置 menus
     */
    setMenus(menus) {
      this.menus = menus;
    },
    /**
     * @desc 获取 menus
     */
    getMenus() {
      return this.menus;
    },
    /**
     * @desc 菜单激活回调
     */
    handleSelect(key, keyPath) {
      // this.checkedFirstMenu2BlockIndex = this.$refs.topView2.buttonGroupOption.defaultActive;
      this.$refs.topView2.setCheckedFirstMenu2BlockIndex(this.$refs.topView2.buttonGroupOption.defaultActive);
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
          { text: _get(this.$refs.topView2.checkedFirstMenu, 'menuName', '') },
          _map(menuList, menu => ({ text: menu.menuName }))
        ); // 设置面包屑
        this.$router.push({ name: menu.menuCode });
      }
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
