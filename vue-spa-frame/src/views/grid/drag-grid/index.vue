<template>
  <div :class="$style.box">
    <p>
      鼠标按住某一行进行拖动，序号、下标列、产品类型、产品名称
      列无法在按住的时候拖动 可以通过 `ignoreColumns` 属性配置
    </p>
    <p>index 下标列、selection 复选款列</p>
    <div :class="$style.showD"><el-tag>原始顺序 :</el-tag> {{ oldList }}</div>
    <div :class="$style.showD"><el-tag>拖拽后顺序 :</el-tag> {{ newList }}</div>
    <div :class="$style.showD"><el-tag>拖拽的行 :</el-tag> {{ moveRow }}</div>
    <div :class="[$style.showD, $style.mb10]">
      <el-tag>替换的行 :</el-tag> {{ replaceRow }}
    </div>
    <div :class="$style.switch_box">
      <el-button type="primary" @click="onSwitch(true)">启用拖动</el-button>
      <el-button type="info" @click="onSwitch(false)">关闭拖动</el-button>
      &nbsp;&nbsp;拖动状态&nbsp;&nbsp;<el-switch
        v-model="this.disabled"
        :active-value="true"
        :inactive-value="false"
        :disabled="true"
      >
      </el-switch>
      {{ this.disabled }}
    </div>
    <div :class="$style.dragGrid">
      <base-drag-grid
        ref="drag-grid"
        :columns="columns"
        :api="api"
        :queryParams="queryParams"
        :isShowIndex="true"
        :selectMode="true"
        :isShowPagination="false"
        :isSelectedFirstRow="false"
        :disabled="!disabled"
        ghostClass="sortable-ghost"
        :ignoreColumns="['index', 'selection', 'productType', 'productName']"
        @onLoadSuccess="onLoadSuccess"
        @onDragStart="onDragStart"
        @onDragEnd="onDragEnd"
      >
      </base-drag-grid>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    this.api = 'bank/demand-manage/dragGridList';
    this.queryParams = {};
    this.columns = [
      {
        prop: 'id',
        label: '排序',
        width: '100px'
      },
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0', // 字典数据转换
        width: '100px'
      },
      {
        prop: 'productName',
        label: '产品名称',
        width: '160px',
        render: (h, row, column, index) => {
          return h(
            'i',
            { class: { 'el-icon-time': 'el-icon-time' } },
            row[column.property]
          );
        },
        renderHeader: (h, column, $index) => {
          return h(
            'i',
            { class: { 'el-icon-platform-eleme': true } },
            column.label
          );
        }
      },
      {
        prop: 'createTime',
        label: '申请日期',
        width: '120px',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        }
      },
      {
        prop: 'applyQuota',
        label: '融资金额',
        width: '100px',
        sortable: true,
        unit: '万元'
      }, // unit 单位
      { prop: 'applyProId', label: '需求单号', hide: true }, // 隐藏列
      { prop: 'fundCodeUserName', label: '企业名称' }
    ];
    return {
      oldList: [],
      newList: [],
      disabled: true,
      moveRow: null,
      replaceRow: null
    };
  },
  created() {},
  methods: {
    // 数据加载完成
    onLoadSuccess(data) {
      console.log('数据加载完成 ', data);
      this.oldList = this.$refs['drag-grid'].getOldSort();
    },
    // 拖拽开始
    onDragStart() {
      console.log('...拖拽开始...');
    },
    // 拖拽结束
    onDragEnd(row = {}, replaceRow = {}, sorts = []) {
      console.log('...拖拽结束...', row);
      this.moveRow = row;
      this.replaceRow = replaceRow;
      this.newList = sorts;
    },
    onSwitch(status = true) {
      this.disabled = status;
    }
  }
};
</script>
<style>
.sortable-ghost {
  color: rgba(255, 255, 255) !important;
  background: rgba(31, 163, 99) !important;
  opacity: 0.8;
}
</style>
<style lang="less" module>
.box {
  .full-y;
  .show-d {
    height: 40px;
  }
  .drag-grid {
    height: 500px;
  }
  .switch_box {
    margin-bottom: 10px;
  }
}
</style>
