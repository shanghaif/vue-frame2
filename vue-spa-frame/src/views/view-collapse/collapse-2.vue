<template>
  <div>
    <div>
      2：控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
    </div>
    <div>2：页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    <div>
      <el-button type="primary" @click="onOpen">打开其它路由</el-button>
    </div>
  </div>
</template>

<script>
import { ROUTER_OPEN_TYPE } from '@config/index.js';

export default {
  viewCollapseActivated() {
    console.info('222 折叠面板 激活事件');
  },
  methods: {
    /**
     * @desc 打开事件
     */
    onOpen(event) {
      // 这里需要注意，要设置路由打开的形式，不然会被父组件的 `beforeRouteLeave` 钩子拦截无法调整
      const currentRoute = this.$router.resolve({ path: '/helper' });
      _set(currentRoute, 'resolved.meta.toType', ROUTER_OPEN_TYPE.push); // 标识路由是从菜单点击打开的
      this.$router.push({ path: '/helper' });
    }
  }
};
</script>
