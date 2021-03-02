<template>
  <div :class="$style.templateConfigTable">
    <el-table
      ref="indicatorsTable"
      class="indicatorsTable"
      :data="firstLevelIndicators"
      style="width: 50%"
      border
      @cell-mouse-enter="indicatorsTableOver"
      @cell-mouse-leave="indicatorsTableLeave"
    >
      <el-table-column prop="name" label="指标"> </el-table-column>
    </el-table>
    <el-table
      ref="secondLevelIndicators"
      class="indicatorsTable jcZbTable"
      :data="secondLevelIndicators"
      style="width: calc(50% - 30px)"
      border
    >
      <el-table-column prop="name" label="基础指标">
        <template slot-scope="scope">
          <div
            class="td-wb"
            :style="{
              background: hoverCode.includes(scope.row.code)
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
  data() {
    return {
      firstLevelIndicators: [
        {
          name: '亩均增加值（万元/亩）',
          childCodes: {
            INDUS_ADD: '工业增加值',
            TAX: '实缴税金'
          }
        },
        {
          name: '亩均税收（万元/亩）',
          childCodes: {
            LAND: '用地面积',
            TAX: '实缴税金'
          }
        },
        {
          name: '单位能耗增加值（万元/吨标煤）',
          childCodes: {
            ENERGY: '工业企业能源消费量',
            INDUS_ADD: '工业增加值'
          }
        },
        {
          name: '全员劳动生产率',
          childCodes: {
            INDUS_ADD: '工业增加值',
            NUMBER_OF_EMPLOYEES: '从业人员平均人数'
          }
        },
        {
          name: '净资产收益率',
          childCodes: {
            EQUITIES: '所有者权益',
            PROFITS: '利润总额'
          }
        }
      ],
      secondLevelIndicators: [
        {
          code: 'TAX',
          name: '实缴税金'
        },
        {
          code: 'LAND',
          name: '用地面积'
        },
        {
          code: 'INDUS_ADD',
          name: '工业增加值'
        },
        {
          code: 'ELE',
          name: '用电量'
        },
        {
          code: 'ENERGY',
          name: '工业企业能源消费量'
        },
        {
          code: 'NUMBER_OF_EMPLOYEES',
          name: '从业人员平均人数'
        },
        {
          code: 'PROFITS',
          name: '利润总额'
        },
        {
          code: 'EQUITIES',
          name: '所有者权益'
        }
      ],
      tableHeight: 0,
      hoverCode: []
    };
  },
  created() {},
  methods: {
    /**
     * @description 鼠标移入某单元格
     */
    indicatorsTableOver(row, column, cell, event) {
      if (row.childCodes) {
        for (const k in row.childCodes) {
          this.hoverCode.push(k);
        }
      }
    },
    /**
     * @description 鼠标移除单元格
     */
    indicatorsTableLeave(row, column, cell, event) {
      this.hoverCode = [];
    }
  }
};
</script>
<style lang="less" module>
.template-config-table {
  width: 98%;
  height: 100%;
  padding: 0 19px;

  > div {
    display: inline-block;
    vertical-align: top;
  }

  :global .indicatorsTable {
    margin-right: 10px;
  }

  :global .active-row {
    background-color: rgb(245, 247, 250);
  }

  :global .jcZbTable {
    td {
      padding: 0;
      /* stylelint-disable selector-max-compound-selectors */
      .cell {
        padding: 0;
        .td-wb {
          padding: 9px 10px;
        }
      }
    }
  }
}
</style>
