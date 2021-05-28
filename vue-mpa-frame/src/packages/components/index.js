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
import BaseDropColumnDown from './drop-column-down/index.js';
import BaseRollGrid from './roll-grid/index.js';
import BaseDrawer from './drawer/index.js';
import BaseIconPicker from './icon-picker/index.js';
import BaseSelectTree from './select-tree/index.js';
import BaseTempVar from './temp-var/index.js';
import BaseSelectInput from './select-input/index.js';
import BaseCheckboxGroup from './checkbox-group/index.js';
import BaseViewCollapse from './view-collapse/index.js';
import BaseDeferInput from './defer-input/index.js';
import BaseLabel from './label/index.js';
import BaseButton from './button/index.js';
import BasePasswordCheck from './password-check/index.js';
import BaseSelectGrid from './select-grid/index.js';
import BaseTableSelectCondition from './condition/index.js';
import BaseNestingGrid from './nesting-grid/grid.js';
import BaseEditGrid from './edit-grid/grid.js';
import { Steps, Step } from './steps/index.js';
import BaseIframe from './panel/ux/iframe/index.js';
import BaseDragGrid from './drag-grid/index.js';
import BaseSelectInputTable from './select-input-table/index.js';
import BaseCarouselProgress from './carousel-progress/index.js';
import BaseTransferTree from './transfer-tree/index.js';
import BaseTreeAnchor from './tree-anchor/index.js';
import BaseSvgIcon from './svg-icon/index.js';
import BaseTransferGrid from './transfer-table/index.js';
import BaseDragDialog from './dialog/drag.js';
import BaseVBoxLayout from './v-box-layout/index.js';
import BaseHBoxLayout from './h-box-layout/index.js';
import BaseColumnLayout from './column-layout/index.js';
import BaseSelectIconPicker from './select-icon-picker/index.js';
import BaseAmap from './panel/ux/gd-map/index.js';
import BaseTabs from './tabs/index.js';
import BaseAbsoluteLayout from './absolute-layout/index.js';
import BaseFitLayout from './fit-layout/index.js';
import BaseCascaderTree from './cascader-tree/index.js';
import BaseScrollbar from './scrollbar/index.js';
import BaseBarChart from './v-chart/bar/index.js';
import BaseLineChart from './v-chart/line/index.js';
import BasePieChart from './v-chart/pie/index.js';
import BaseMixtureChart from './v-chart/mixture/index.js';
import BaseFormLayout from './form-layout/index.js';
import BasePropertyGrid from './property-grid/index.js';
import BaseMenuButton from './menu-button/index.js';
import BaseRenderSelf from './render-self/index.js';
import BaseTimeAxiosHistory from './time-axios-history/index.vue';
import BaseHorizontalMenu from './horizontal-menu/index.js';

// 弹出框
if (!_has(window, '$baseDialog')) {
  Object.defineProperty(Vue.prototype, '$baseDialog', { value: BaseDialog });
}
// 弹出框-拖拽
if (!_has(window, '$BaseDragDialog')) {
  Object.defineProperty(Vue.prototype, '$BaseDragDialog', {
    value: BaseDragDialog
  });
}
// 弹出抽屉
if (!_has(window, '$baseDrawer')) {
  Object.defineProperty(Vue.prototype, '$baseDrawer', { value: BaseDrawer });
}
// 高德地图
export { BaseAmap };

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
  BaseBlockGroup,
  BaseDropColumnDown,
  BaseRollGrid,
  BaseIconPicker,
  BaseSelectTree,
  BaseTempVar,
  BaseSelectInput,
  BaseCheckboxGroup,
  BaseViewCollapse,
  BaseDeferInput,
  BaseLabel,
  BaseButton,
  BasePasswordCheck,
  BaseSelectGrid,
  BaseTableSelectCondition,
  BaseNestingGrid,
  BaseEditGrid,
  BaseSteps: Steps,
  BaseStep: Step,
  BaseIframe,
  BaseDragGrid,
  BaseSelectInputTable,
  BaseCarouselProgress,
  BaseTransferTree,
  BaseTreeAnchor,
  BaseSvgIcon,
  BaseTransferGrid,
  BaseVBoxLayout,
  BaseHBoxLayout,
  BaseColumnLayout,
  BaseSelectIconPicker,
  BaseTabs,
  BaseAbsoluteLayout,
  BaseFitLayout,
  BaseCascaderTree,
  BaseScrollbar,
  BaseBarChart,
  BaseLineChart,
  BasePieChart,
  BaseFormLayout,
  BasePropertyGrid,
  BaseMenuButton,
  BaseRenderSelf,
  BaseTimeAxiosHistory,
  BaseHorizontalMenu,
  BaseMixtureChart
};
