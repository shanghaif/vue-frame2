<template>
  <div :class="{'basic-layout3-container': true}">
    <base-border-layout v-bind="layout">
      <template v-slot:north>
        <top-view3 :title="title"></top-view3>
      </template>
      <template v-slot:west> </template>
      <template v-slot:center>
        <base-border-layout :class="{'bg-fff': true}" v-bind="innerLayout">
          <template v-slot:north>
            <div class="mt-8">
              <base-bread-crumb
                separator-class="el-icon-arrow-right"
                :options="breadCrumbOptions"
                @bread-click="onBreadClick"
              ></base-bread-crumb>
            </div>
          </template>
          <template v-slot:center>
            <div :class="[{'full-y': true}, {'bg-fff': true}]">
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
import _cloneDeep from 'lodash/cloneDeep';

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
        southHeight: '0px',
        northCls: 'north-cls'
      },
      innerLayout: {
        northHeight: '30px',
        westWidth: '0px',
        eastWidth: '0px',
        southHeight: '0px',
        northCls: 'border-bottom'
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
