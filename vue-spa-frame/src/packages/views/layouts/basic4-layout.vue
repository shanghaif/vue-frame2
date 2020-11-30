<template>
  <div :class="$style.container">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view :title="title"></top-view>
      </template>
      <template v-slot:center>
        <base-route-view
          :keep-alive="false"
          :key="$route.fullPath"
        ></base-route-view>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import { DEFAULT_SETTINGS } from '@config/index.js';
import TopView from './components/top-view.vue';

export default {
  name: 'Basic4Layout',
  components: { TopView },
  props: {
    // 顶部栏目标题文字
    title: {
      type: String,
      default: DEFAULT_SETTINGS.title
    }
  },
  data() {
    return {
      menus: [],
      navTitle: '',
      layout: {
        northHeight: '64px',
        westWidth: 'auto', // 设置为定值时，配合 nav-menu 导航菜单收缩菜单面板之后的宽度还是定值所以这里推荐自动
        eastWidth: '0px',
        southHeight: '0px',
        northCls: this.$style.northCls,
        centerCls: this.$style.centerCls
      }
    };
  },
  created() {
    console.info(this.$slots);
  },
  methods: {}
};
</script>
<style lang="less" module>
@import './basic-layout.less';
.container {
  .center-cls {
    > div:first-child {
      height: 100%;
      background-color: #fff;
    }
  }
}
</style>
