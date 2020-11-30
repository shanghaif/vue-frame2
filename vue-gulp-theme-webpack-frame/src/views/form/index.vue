<template>
  <div class="form-box">
    <div>
      <p>select 选择器-远端数据-插槽</p>
      <div>
        <base-select
          v-model="value"
          :api="api"
          :loadFilter="loadFilter"
          :multiple="false"
        >
          <template v-slot:prefix>
            <span>
              f:
            </span>
          </template>
          <template v-slot:empty>
            <div style="text-align: center;padding: 10px;">
              hello，没有数据啦
            </div>
          </template>
        </base-select>
        {{ value }}
      </div>
      <p>select 选择器-远端数据-多选</p>
      <base-select
        v-model="value1"
        :api="api"
        :loadFilter="loadFilter"
        :multiple="true"
      ></base-select>
      {{ value1 }}
      <p>select 选择器-静态数据</p>
      <base-select
        v-model="value2"
        :options="options"
        :multiple="true"
      ></base-select>
      {{ value2 }}
      <p>select 选择器-可编辑</p>
      <base-select-input
        v-model="value3"
        :api="api"
        :loadFilter="loadFilter"
      ></base-select-input>
      {{ value3 }}
      <p>icon 图标选择器（黄色图标为 svg 图）</p>
      <base-icon-picker ref="myIconPicker" width="200px"></base-icon-picker>
      <p>checkbox-group 按钮组-远端数据</p>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      ><br /><br />
      <base-checkbox-group
        v-model="checkedButtons"
        api="common/getCheckboxGroup"
        :checkboxAttributes="{ border: true }"
        ref="base-checkbox-group"
      ></base-checkbox-group>
      {{ checkedButtons }}
      <p>checkbox-group 按钮组-本地静态远端</p>
      <el-checkbox
        :indeterminate="isIndeterminate1"
        v-model="checkAll1"
        @change="handleCheckAllChange1"
        >全选</el-checkbox
      ><br /><br />
      <base-checkbox-group
        v-model="checkedButtons1"
        :options="buttons"
        :checkboxAttributes="{ border: true }"
        ref="base-checkbox-group1"
      ></base-checkbox-group>
      {{ checkedButtons1 }}
      <br /><br />
      <p>防抖节流 input 控件</p>
      <base-defer-input
        :class="{'search-input': true}"
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="queryParams.data.name"
        @defer-reload="onDeferReload"
        width="300px"
      ></base-defer-input>
      {{queryParams.data.name}}
    </div>
  </div>
</template>

<script>
import _map from 'lodash/map';
import icons from '@/plugins/icons.js';

export default {
  data() {
    this.api = 'dict/getProductClassify';
    return {
      // tableData: [],
      value: 1,
      value1: [],
      value2: [],
      value3: '',
      options: [
        { id: 1, name: '苹果' },
        { id: 2, name: '刺梨' },
        { id: 3, name: '火龙果' },
        { id: 4, name: '香蕉' }
      ],
      checkAll: false,
      isIndeterminate: true,
      checkedButtons: [1, 2], // 默认选中
      checkAll1: false,
      isIndeterminate1: true,
      checkedButtons1: [],
      buttons: [
        { id: 1, name: '上海' },
        { id: 2, name: '北京' },
        { id: 3, name: '广州' },
        { id: 4, name: '深圳' }
      ],
      queryParams: {
        data: { name: '' }
      }
    };
  },
  mounted() {
    /* this.$api['dict/getProductClassify']().then(response => {
      // 请求成功
      this.tableData = response.data[0].data;
      console.info(this.tableData);
    }); */
    console.info(this.$dict);
    this.$nextTick(() => {
      this.$refs.myIconPicker.addSvg(icons);
    });
  },
  methods: {
    // 过滤数据
    loadFilter(data) {
      return data[0];
      // return [];
    },
    /**
     * @desc 全选按钮
     */
    handleCheckAllChange(val) {
      const options = _map(
        this.$refs['base-checkbox-group'].getStore(),
        o => o.id
      );
      this.checkedButtons = val ? options : [];
      this.isIndeterminate = false;
    },
    handleCheckAllChange1(val) {
      const options = _map(this.buttons, o => o.id);
      this.checkedButtons1 = val ? options : [];
      this.isIndeterminate1 = false;
    },
    /**
     * @desc 延迟调用，默认 500 毫秒
     */
    onDeferReload(val) {
      console.info('延迟调用，默认 500 毫秒 ', val, this.queryParams.data.name);
    }
  }
};
</script>
