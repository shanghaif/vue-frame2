/**
 * @desc 全局组件库
 */
import Vue from 'vue';
import _has from 'lodash/has';
import BaseSelect from './select/index.js';
import BasePermissionBox from './permission-box/index.js';
import BaseBorderLayout from './border-layout/index.js';
import BaseDoubleWing from './double-wing/index.js';
import BaseNavMenu from './nav-menu/index.js';
import BaseDropDown from './drop-down/index.js';
import BaseBreadCrumb from './bread-crumb/index.js';
import BaseGrid from './grid/index.js';
import BaseDialog from './dialog/index.js';
import BaseTree from './tree/index.js';
import BaseBlockGroup from './block-group/index.js';

// 弹出框
if (!_has(window, '$baseDialog')) {
  Object.defineProperty(Vue.prototype, '$baseDialog', { value: BaseDialog });
}

export default {
  BaseSelect,
  BasePermissionBox,
  BaseBorderLayout,
  BaseDoubleWing,
  BaseNavMenu,
  BaseDropDown,
  BaseBreadCrumb,
  BaseGrid,
  BaseTree,
  BaseBlockGroup
};
