<template>
  <div :class="$style.box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item prop="name" label="企业名称">
            <el-input
              v-model="form.name"
              placeholder="请输入企业名称"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item prop="dateTimeValue" label="申请时间">
            <el-date-picker
              v-model="form.dateTimeValue"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width: 100%;"
            >
            </el-date-picker> </el-form-item
        ></el-col>
        <el-col :span="5">
          <el-form-item prop="name" label="企业名称">
            <base-select-tree
              ref="more-select-tree"
              :width="250"
              :treeWidth="250"
              :multiple="true"
              :check-strictly="false"
              :isRenderRoot="false"
              :props="defaultProps"
              :collapse-tags="false"
              api="common/getIndustryTree"
              v-model="industry"
              displayField="industryname"
              valueField="code"
              :lazy="false"
              :isSelectedLastNode="false"
              :showAllLevels="true"
            ></base-select-tree></el-form-item
        ></el-col>
        <el-col :span="9"
          ><div :class="$style.ml30">
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button type="info" @click="onReset">重置</el-button>
          </div></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: ['getBaseGrid'],
  props: {
    // 点击选中的行-注意 row 不会立马传递进来因为初始化 props 时数据还没有加载，如果你要使用 row 需要用 watch 或 computed。
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    this.defaultProps = {
      children: 'children',
      label: 'industryname',
      value: 'id'
    };
    return {
      form: {
        name: '',
        dateTimeValue: ''
      },
      industry: []
    };
  },
  created() {
    this.getBaseGrid.$on('onChangeRowEvent', row => {
      console.info('点击选中的行', row);
    });
  },
  methods: {
    /**
     * @desc 搜索
     */
    onSearch(event) {
      const params = {
        applyTimeStart: this.form.dateTimeValue[0] || '',
        getApplyTimeEnd: this.form.dateTimeValue[1] || '',
        nodeStatus: '',
        key: this.form.name,
        productType: ''
      };
      this.getBaseGrid.setQueryParams(params);
      // this.getBaseGrid.setQueryParams({ params: {name: '查询条件'}, data: { role: 1 }, headers: { myAutoId: '123' } }); // post请求 data 和 headers 参数怎么传递
      this.getBaseGrid.reloadGrid();
    },
    /**
     * @desc 重置
     */
    onReset(event) {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" module>
.box {
}
</style>
