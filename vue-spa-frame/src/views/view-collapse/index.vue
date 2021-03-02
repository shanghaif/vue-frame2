<template>
  <div class="bbb">
    <!-- <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
    </el-collapse> -->
    <base-view-collapse
      v-model="activeName"
      :propsRef="[
        { name: '1', ref: 'taskView' },
        { name: '2', ref: 'advice' }
      ]"
    >
      <div class="ddd full-y" title="与现实生活一致" name="1">
        <span @click="bbb" style="cursor: pointer;"
          >点击-切换1&nbsp;&nbsp;-></span
        >
        <collapse-view-1 ref="taskView"></collapse-view-1>
      </div>
      <div class="ccc full-y" height="auto" title="控制反馈" name="2">
        <span @click="ccc" style="cursor: pointer;"
          >点击-切换3&nbsp;&nbsp;-></span
        >
        <div style="font-size: 16px;">滚动条出现在内部</div>
        <collapse-view-2 ref="advice"></collapse-view-2>
        <div class="ppp"></div>
        <div>
          3：31省区市新增确诊25例 本土15例
        </div>
      </div>
      <div class="eee full-y" height="auto" title="效率 Efficiency" name="3">
        <span @click="eee" style="cursor: pointer;"
          >点击-切换1&nbsp;&nbsp;-></span
        >
        <div style="font-size: 16px;">滚动条出现在外部</div>
        <div>
          <span style="color: red;">注意：</span>如果设置了 height="auto"
          不设置父容器的高度值，这样外面的容器就会出现滚动条，适用于内容很多高度会超过父容器的情况
        </div>
        <div>
          1：清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div class="ppp">
          2：帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
        <div>
          3：截至2020年12月,月收入在2001-5000元的网民群体占比为32.7%;月收入在5000元以上的网民群体占比为29.3%;有收入但月收入在1000元...
        </div>
      </div>
    </base-view-collapse>
  </div>
</template>

<script>
import { ROUTER_OPEN_TYPE } from '@config/index.js';
import collapseView1 from './collapse-1.vue';
import collapseView2 from './collapse-2.vue';
import _isEqual from 'lodash/isEqual';

export default {
  inject: ['getBaseLayout'],
  components: { collapseView1, collapseView2 },
  data() {
    return {
      activeName: '1'
    };
  },
  created() {
    // setTimeout(() => {
    //   this.activeName = '2';
    // }, 3000);
    console.log('...created...');
    this.$nextTick(() => {
      setTimeout(() => {
        this.getBaseLayout().appendBreadCrumbOptions([
          { type: 'aaa', text: '与现实生活一致' }
        ]);
      }, 0);
    });
  },
  // 路由激活事件
  routerActivated() {
    console.info('路由激活事件', this.activeName);
    this.activeName = '1';
    this.getBaseLayout().removeBreadCrumbOptions([
      '控制反馈',
      '效率 Efficiency'
    ]);
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    console.log('...导航离开该组件的对应路由时调用...');
    if (
      _isNil(to.meta.toType) &&
      !_isEqual(to.meta.toType, ROUTER_OPEN_TYPE.menu)
    ) {
      // 点击浏览器回退
      if (this.activeName !== '1') {
        this.activeName = '1';
        this.getBaseLayout().removeBreadCrumbOptions([
          '控制反馈',
          '效率 Efficiency'
        ]); // 可以通过 activeName 判断来进行一级一级的回退
        next(false); // 该导航可以通过 next(false) 来取消。
        return;
      }
    }
    next();
  },
  methods: {
    /**
     * @description: 面包屑点击事件
     * @param {*} option 路由option
     */
    breadClickEvent({ type, text }) {
      console.info('option ', type, text);
      if (type === 'aaa') {
        this.activeName = '1';
        this.getBaseLayout().removeBreadCrumbOptions([
          '控制反馈',
          '效率 Efficiency'
        ]);
      }
      if (type === 'bbb') {
        this.activeName = '2';
        this.getBaseLayout().removeBreadCrumbOptions(['效率 Efficiency']);
        document.getElementsByClassName('bbb')[0].style.overflow = 'auto'; // 滚动条出现在内部
      }
      if (type === 'ccc') {
        // 面包屑组件最后一个不能点击
      }
      if (text === '视图-折叠面板') {
        this.activeName = '1';
        this.getBaseLayout().removeBreadCrumbOptions([
          '控制反馈',
          '效率 Efficiency'
        ]);
      }
      // this.activeName = '1';
      // this.getBaseLayout().removeBreadCrumbOptions(['与现实生活一致']);
    },
    bbb() {
      this.activeName = '2';
      this.getBaseLayout().appendBreadCrumbOptions([
        { type: 'bbb', text: '控制反馈' }
      ]);
      console.log('rrrrrrrr ', document.getElementsByClassName('bbb')[0].style);
      document.getElementsByClassName('bbb')[0].style.overflow = 'auto'; // 滚动条出现在内部
    },
    ccc() {
      this.activeName = '3';
      this.getBaseLayout().appendBreadCrumbOptions([
        { type: 'ccc', text: '效率 Efficiency' }
      ]);
      document.getElementsByClassName('bbb')[0].removeAttribute('style'); // 滚动条出现在外部
    },
    eee() {
      this.activeName = '1';
      this.getBaseLayout().removeBreadCrumbOptions([
        '效率 Efficiency',
        '控制反馈'
      ]);
    }
  }
};
</script>

<style>
.bbb {
  box-sizing: border-box;
  height: 100%;
  border: 1px solid red;

  /* overflow: auto; */
}
.el-collapse-item__header {
  /* height: 0px; */

  /* display: none; */
}
.ppp {
  height: 1200px;
  overflow: hidden;
  background-color: bisque;
}

/* .ddd{
  height: 300px;
}
.ccc{
  height: 300px;
} */
</style>
