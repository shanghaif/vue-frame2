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
      <div class="ddd" title="与现实生活一致" name="1">
        <p @click="bbb">点击-切换</p>
        <collapse-view-1 ref="taskView"></collapse-view-1>
      </div>
      <div class="ccc" title="控制反馈" name="2">
        <p @click="ccc">点击-切换</p>
        <collapse-view-2 ref="advice"></collapse-view-2>
      </div>
      <div class="eee" title="效率 Efficiency" name="3">
        <div @click="eee">3：简化流程：设计简洁直观的操作流程；</div>
        <div>
          3：清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          3：帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </div>
    </base-view-collapse>
  </div>
</template>

<script>
import collapseView1 from './collapse-1.vue';
import collapseView2 from './collapse-2.vue';

export default {
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
  },
  // 路由激活事件
  routerActivated() {
    console.info('路由激活事件', this.activeName);
    this.activeName = '1';
  },
  methods: {
    bbb() {
      this.activeName = '2';
    },
    ccc() {
      this.activeName = '3';
    },
    eee() {
      this.activeName = '1';
    }
  }
};
</script>

<style>
.bbb {
  height: 100%;
  border: 1px solid red;
  box-sizing: border-box;
}
.el-collapse-item__header {
  /* height: 0px; */
  /* display: none; */
}
/* .ddd{
  height: 300px;
}
.ccc{
  height: 300px;
} */
</style>
