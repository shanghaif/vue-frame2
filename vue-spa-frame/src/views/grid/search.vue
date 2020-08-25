<template>
  <div :class="$style.box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="name" label="企业名称">
            <el-input
              v-model="form.name"
              placeholder="请输入企业名称"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
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
        <el-col :span="10"
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
    return {
      form: {
        name: '',
        dateTimeValue: ''
      }
    };
  },
  created() {
    this.getBaseGrid.$on('onChangeRowEvent', (row) => {
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
.box {}
</style>
