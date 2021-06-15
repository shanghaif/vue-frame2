<template>
  <div :class="$style.formBox">
    <div v-if="true">
      <p>select 选择器-远端数据-插槽</p>
      <div>
        <base-select
          v-model="value"
          api="dict/getProductClassify"
          :loadFilter="loadFilter"
          :multiple="false"
        >
          <template v-slot:prefix>
            <span>
              f:
            </span>
          </template>
          <template v-slot:empty>
            <div style="padding: 10px;text-align: center;">
              hello，没有数据啦
            </div>
          </template>
        </base-select>
        {{ value }}
      </div>
      <div>
        <p>select 选择器-preUnit、sufUnit和isSelectedFirstRow</p>
        <base-select
          v-model="valueP"
          api="dict/getProductClassify"
          :multiple="false"
          preUnit="1-"
          sufUnit="-2"
          :isSelectedFirstRow="true"
          :loadFilter="loadFilter"
        >
        </base-select>
        {{ valueP }}
      </div>
      <p>select 选择器-远端数据-多选</p>
      <base-select
        v-model="value1"
        api="dict/getProductClassify"
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
        api="dict/getProductClassify"
        :loadFilter="loadFilter"
      ></base-select-input>
      {{ value3 }}
      <p>icon 图标选择器</p>
      <div>
        <ul>
          <li>1. 默认是 iconfont 的 symbol 模式显示</li>
          <li>
            2.支持 iconfont 的 symbol
            图，外部传入图标名称参数时请在图标名称前面添加 `symbol-`
          </li>
          <li>
            3.支持外部第三方的
            字体库图，外部传入图标名称参数时请在图标名称前面添加 `other-icon`
          </li>
          <li>
            4.支持静态资源图，外部传入图标名称参数时请输入具体路径，比如：`/static/images/hangzhou.png`
          </li>
          <li>
            5.支持 svg 组件图标，外部传入图标名称参数时请在图标名称前面添加
            `svg-`
          </li>
        </ul>
      </div>
      <base-icon-picker
        v-model="iconName"
        ref="myIconPicker"
        width="260px"
        :iconList="iconList"
      ></base-icon-picker>
      <span>&nbsp;&nbsp;&nbsp;{{ iconName }}</span>
      <p>icon 图标选择器-select</p>
      <base-select-icon-picker
        v-model="iconSelectValue"
        :options="[...iconOptions, ...selectIconList]"
        :svgIconsOptions="svgIconsOptions"
        displayField="label"
        valueField="value"
        :clearable="true"
      />
      <span>&nbsp;&nbsp;&nbsp;{{ iconSelectValue }}</span>
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
      <div>
        <p>防抖节流 input 控件</p>
        <base-defer-input
          :class="$style.searchInput"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="queryParams.data.name"
          @defer-reload="onDeferReload"
          width="300px"
        ></base-defer-input>
        {{ queryParams.data.name }}
      </div>
      <div>
        <p>密码强弱控件</p>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          style="width: 400px;"
        ></el-input>
        <base-password-check :password="password"></base-password-check>
        <br /><br />
        <p>{{ password }}</p>
      </div>
      <div>
        <div><h4>数字过滤器的使用</h4></div>
        <p>
          将number保留bitNum位小数，不够补0&nbsp;&nbsp;示例：1.2=>{{
            1.2 | fixedDecimalRetain0Format(3)
          }}
        </p>
        <p>
          只保留固定小数位 &nbsp;&nbsp;示例：1.2342=>{{
            1.2342 | fixedDecimalFormat(3)
          }}
        </p>
        <p>
          四舍五入&nbsp;&nbsp;示例：12.3456=>{{ 12.3456 | roundingNumFormat() }}
        </p>
        <p>
          转换百分比&nbsp;&nbsp;示例：0.3456=>{{ 0.3456 | percentageFormat }}%
        </p>
      </div>
    </div>
    <div v-if="true">
      <div><h4>select下拉分页搜索 支持单选和多选-远程</h4></div>
      <p>在文本框中输入 0 进行查询</p>
      <div>{{ value4 }}</div>
      <br />
      <base-select-input-table
        :api="api"
        v-model="value4"
        width="300px"
        :multiple="true"
        :loadFilter="selectLoadFilter"
        :queryParams="{ name: '' }"
        :isLocalSearch="false"
        :pageSize="15"
        :props="{ pageNum: 'current', pageSize: 'size' }"
        popperClass="my-select-input-table_cls"
        :multiple-limit="6"
        placeholder="请输入关键词"
      >
      </base-select-input-table>
      <div><h4>select下拉分页搜索 支持单选和多选-本地</h4></div>
      <p>在文本框中输入 a 进行查询，api 设置为空</p>
      <div>{{ value5 }}</div>
      <br />
      <base-select-input-table
        api=""
        v-model="value5"
        width="300px"
        :multiple="false"
        displayField="name"
        :isLocalSearch="true"
        popperClass="my-select-input-table-local_cls"
        :multiple-limit="6"
        placeholder="请输入关键词"
        :options="selectInputTableOptions"
      >
      </base-select-input-table>
    </div>
  </div>
</template>

<script>
import _map from 'lodash/map';
import svgIconComponents from '@/plugins/icons.js';
import { iconClassName } from '@/assets/font/iconfont/iconfont-classname.js';

export default {
  data() {
    this.api = 'dict/getSelectSearchList';
    this.iconOptions = [
      /* {
        value: 'symbol-iconyichu',
        label: '移除'
      }, */
      {
        value: '/static/images/123.jpg',
        label: '123'
      },
      {
        value: '/static/images/avatar.gif',
        label: 'avatar'
      },
      {
        value: 'el-icon-platform-eleme',
        label: 'eleme'
      }
    ];
    this.svgIconsOptions = svgIconComponents;
    return {
      // tableData: [],
      value: 1,
      valueP: '',
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
      },
      password: 'Ys@123456',
      value4: [],
      value5: [],
      selectInputTableOptions: [
        { id: 1, name: 'Alabama' },
        { id: 2, name: 'Alaska' },
        { id: 3, name: 'Arizona' },
        { id: 4, name: 'Arkansas' },
        { id: 5, name: 'California' },
        { id: 6, name: 'Colorado' },
        { id: 7, name: 'Indiana' },
        { id: 8, name: 'New York' },
        { id: 9, name: 'Texas' },
        { id: 10, name: 'Wisconsin' },
        { id: 11, name: 'Washington' },
        { id: 12, name: 'South Carolina' },
        { id: 13, name: 'Ohio' },
        { id: 14, name: 'South Dakota' }
      ],
      iconList: [],
      iconName: '', // iconfont symbol 图标
      // iconName: 'other-icon-el-icon-eleme' // element icon 字体图标
      // iconName: '/static/images/hangzhou.png' // 静态资源图
      // iconName: 'svg-' + svgIconComponents[0].name // svg 组件图标
      selectIconList: iconClassName,
      iconSelectValue: 'symbol-iconyichu' // symbol-iconyichu
    };
  },
  mounted() {
    setTimeout(() => {
      this.iconName = 'symbol-icongd-chanyejiqunfenxi'; // 测试响应式
      this.iconSelectValue = '/static/images/123.jpg';
    }, 1000);
    // element icon 图标
    // eslint-disable-next-line no-unused-vars
    const aElementIconList = [
      'el-icon-platform-eleme',
      'el-icon-eleme',
      'el-icon-delete-solid',
      'el-icon-delete',
      'el-icon-s-tools',
      'el-icon-star-off',
      'el-icon-search',
      'el-icon-document-remove'
    ];
    // 外部的图片 要放到 static 目录
    const aPngIconList = [
      '/static/images/123.jpg',
      '/static/images/avatar.gif',
      '/static/images/layout5-bg.png',
      '/static/images/lazy-test.jpg',
      '/static/images/router.svg',
      '/static/images/hangzhou.png'
    ];
    this.iconList = _concat(iconClassName, []);
    // console.log('rrrrrrrrrrr ', this.iconList, $log);
    /* this.$api['dict/getProductClassify']().then(response => {
      // 请求成功
      this.tableData = response.data[0].data;
      console.info(this.tableData);
    }); */
    console.info(this.$dict);
    this.$nextTick(() => {
      if (!_isNil(this.$refs.myIconPicker)) {
        console.log('ccccccccc', svgIconComponents);
        this.$refs.myIconPicker.addSvgComponent(svgIconComponents); // 组件化 svg 图
        this.$refs.myIconPicker.addIcons(aElementIconList); // 其它的 icon 字体图
        this.$refs.myIconPicker.addPngIcons(aPngIconList); // 静态资源图
      }
    });
  },
  methods: {
    // 过滤数据
    loadFilter(data) {
      console.log('aaaaaaaaaaaaa', data);
      return data[0];
      // return [];
    },
    selectLoadFilter(data) {
      return data;
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

<style lang="less" module>
.form-box {
  .full-y;

  box-sizing: border-box;
  padding-bottom: 30px;
  overflow: auto;
  .search-input {
    color: red;
  }
}
</style>
