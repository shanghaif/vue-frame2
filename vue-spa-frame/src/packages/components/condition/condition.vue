<template>
  <div class="condition">
    <div class="condition_operator">
      <span class="condition_operator-text" @click="handleToggle(data.id)">
        <i class="iconfont iconqiehuan"></i><br />
        {{ logicMap[data.logicalOperator] }}
      </span>
    </div>
    <div class="condition_child">
      <condition-item
        v-for="(filterItem, idx) in data.filterList"
        :key="'filter' + idx"
        :filterConfig="filterItem"
        :fieldList="fieldList"
      >
        <el-dropdown>
          <el-button type="text" icon="el-icon-circle-plus-outline"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="
                handleAddConidtion(
                  LOGICOPERATOR.AND,
                  filterItem,
                  data.id,
                  data.logicalOperator
                )
              "
              >且条件</el-dropdown-item
            >
            <el-dropdown-item
              @click.native="
                handleAddConidtion(
                  LOGICOPERATOR.OR,
                  filterItem,
                  data.id,
                  data.logicalOperator
                )
              "
              >或条件</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          type="text"
          icon="el-icon-delete"
          @click="
            handleDeleteFilterItem(
              idx,
              filterItem,
              data.id,
              data.parentId
            )
          "
          style="margin-left: 19px"
        ></el-button>
      </condition-item>
      <condition
        v-bind="$attrs"
        v-on="$listeners"
        v-for="(condition, idx) in data.conditionList"
        :key="'condition' + idx"
        :data="condition"
        :fieldList="fieldList"
      ></condition>
    </div>
  </div>
</template>

<script>
import { logicMap, LOGICOPERATOR } from '@constant/constant.js';
import conditionItem from './condition-item.vue';

export default {
  name: 'condition',
  provide: function () {
    return {
      getPanel: this
    };
  },
  components: {
    conditionItem
  },
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    fieldList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      logicMap, // 逻辑运算符文案
      filterData: {}, // 筛选的数据
      LOGICOPERATOR: LOGICOPERATOR
    };
  },
  created() {},
  methods: {
    /**
     * @description 删除当前数据
     * @param { index } idx 下标
     * @param { object } condition 当前筛选项
     * @param { string } 当前节点的id
     * @param { string } parentId 父节点id
     */
    handleDeleteFilterItem(idx, condition, id, parentId) {
      this.$emit('deleteFilterItem', idx, condition, id, parentId);
    },
    /**
     * @description 新增筛选条件
     * @param { string } logicalOperator 逻辑条件
     * @param { object } filterItem 当前筛选条件
     * @param { number } id 当前节点的id
     * @param { string } nodeOperator 当前节点的逻辑运算符
     */
    handleAddConidtion(logicalOperator, filterItem, id, nodeOperator) {
      this.$emit('addConidtion', logicalOperator, filterItem, id, nodeOperator);
    },
    /**
     * @description 切换逻辑条件
     * @param { number } id 当前条件的id
     */
    handleToggle(id) {
      this.$emit('toggleFilter', id);
    }
  }
};
</script>

<style lang="less" scoped>
@primaryColor: #3E7EFF;
@deepBlueColor: #1B68FD;
@gray: #f3f5f7;

@gray-border:1px solid rgba(220, 223, 230, 1);
@tab-border: 2px solid #e4e7ed;
@paddingWidth: 21px;

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.condition {
  display: table;
  width: 100%;
  border-top: @gray-border;
  & & {
    border-top: none;
  }

  &_operator {
    display: table-cell;
    width: 32px;
    text-align: center;
    border-left: @gray-border;
    border-bottom: @gray-border;
    vertical-align: middle;
    color: rgba(144, 147, 153, 1);
    font-size: 12px;
    font-family: PingFangSC-Regular;
    &-text {
      cursor: pointer;

      .iconqiehuan {
        color: #3e7eff;
        font-size: 13px;
      }
    }
  }
  &_child {
    flex: 1;
  }
}
</style>
