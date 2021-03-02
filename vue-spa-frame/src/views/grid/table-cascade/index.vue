<template>
  <div :class="$style.cascadeTable">
    <el-table
      ref="indicatorsTable"
      class="indicatorsTable"
      :data="indicatorsData"
      style="width: 50%"
      v-if="loadTable"
      :height="tableHeight"
      border
      @select="handleSelectionChange"
      @select-all="selectAll"
      @cell-mouse-enter="indicatorsTableOver"
      @cell-mouse-leave="indicatorsTableLeave"
    >
      <el-table-column type="selection" :selectable="selectEnable" width="55">
      </el-table-column>
      <el-table-column prop="name" label="指标"> </el-table-column>
    </el-table>
    <el-table
      ref="secondLevelIndicators"
      class="indicatorsTable jcZbTable"
      :data="secondLevelIndicators"
      style="width: calc(50% - 30px)"
      v-if="loadTable"
      :height="tableHeight"
      border
    >
      <el-table-column prop="name" label="基础指标">
        <template slot-scope="scope">
          <div
            class="td-wb"
            :style="{
              color: hoverCode.includes(scope.row.code)
                ? '#1890ff'
                : 'rgba(0, 0, 0, 0.3)',
              background: selectCode.includes(scope.row.code)
                ? '#F7FAFF'
                : '#fff'
            }"
          >
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tableCascade',
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
