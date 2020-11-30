<template>
  <div :class="[$style.container, 'basic3-layout']">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view3
          ref="topView3"
          :title="title"
          :iconfontUrl="iconfontUrl"
          :collapsed="collapsed"
          :titleClick="titleClick"
          v-if="renderTopView"
        ></top-view3>
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
import TopView3 from './components/top-view3.vue';
import _cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'Basic3Layout',
  provide: function () {
    return {
      getBase3Layout: this
    };
  },
  components: { TopView3 },
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
    },
    titleClick: {
      type: Function,
      default: () => {}
    },
    // 渲染 top-view.vue
    renderTopView: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      layout: {
        northHeight: this.renderTopView ? '60px' : '0px',
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
    /**
     * @desc 设置面包屑
     * @param {string[]} options - 面包屑参数
     * this.getBaseLayout().appendBreadCrumbOptions([{text: 'hello'},{text: 'world'}])
     */
    setBreadCrumbOptions(options = []) {
      if (_isArray(options)) {
        this.breadCrumbOptions = options;
      }
    },
    /**
     * @desc 追加面包屑
     * @param {string[]} options - 面包屑参数
     * @example
     * this.getBaseLayout().appendBreadCrumbOptions([{text: 'hello'},{text: 'world'}])
     */
    appendBreadCrumbOptions(options = []) {
      if (_isArray(options)) {
        this.breadCrumbOptions = _concat(this.breadCrumbOptions, options);
      }
    },
    /**
     * @desc 删除面包屑
     * @example
     * @param {array[]} name - 面包屑名字
     * this.getBaseLayout().removeBreadCrumbOptions()
     */
    removeBreadCrumbOptions(name = []) {
      const breadCrumbOptions = [];
      if (name && this.breadCrumbOptions.length > 0) {
        // _drop(this.breadCrumbOptions, this.breadCrumbOptions.length);
        for (const item of this.breadCrumbOptions) {
          if (!name.includes(item.text)) {
            breadCrumbOptions.push(item);
          }
        }
      }
      this.breadCrumbOptions = _cloneDeep(breadCrumbOptions);
    },
    /**
     * @desc 面包屑点击事件
     * @event
     */
    onBreadClick(option, event) {
      const { matched } = this.$router.currentRoute;
      if (!_isEmpty(matched) && !_isNil(matched[matched.length - 1].instances.default)) {
        const that = matched[matched.length - 1].instances.default;
        _has(that, 'breadClickEvent') && that.breadClickEvent(option);
      }
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
