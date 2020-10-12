<template>
  <div :class="$style.container">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view
          ref="topView"
          :title="title"
          :iconfontUrl="iconfontUrl"
          :collapsed="collapsed"
          :titleClick="titleClick"
        ></top-view>
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
import TopView from './components/top-view.vue';

export default {
  name: 'Basic4Layout',
  components: { TopView },
  // title 顶部栏目标题文字，iconfontUrl 图标，collapsed 侧栏收起状态
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
    },
    titleClick: {
      type: Function,
      default: () => {}
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
        northCls: this.$style.northBox
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
}
</style>
