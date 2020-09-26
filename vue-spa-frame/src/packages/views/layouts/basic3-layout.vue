<template>
  <div :class="[$style.container, 'basic3-layout']">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view3 :title="title"></top-view3>
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
import TopView3 from './components/top-view3.vue';
import {
  DEFAULT_SETTINGS
} from '@config/index.js';

export default {
  name: 'Basic3Layout',
  provide: function () {
    return {
      getBase3Layout: this
    };
  },
  components: { TopView3 },
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
        southHeight: '0px'
      },
      innerLayout: {
        northHeight: '30px',
        westWidth: '0px',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: this.$style.borderBottom
      },
      breadCrumbOptions: []
    };
  },
  created() {
    // setTimeout(() => {
    // this.layout.westWidth = '64px';
    // this.menuProps.collapsed = false;
    // }, 3000);
  },
  methods: {
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
