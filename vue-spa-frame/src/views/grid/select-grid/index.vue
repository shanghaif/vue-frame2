<template>
  <div class="select-grid-box">
    <div class="val-box">values：{{ values }}</div>
    <div style="margin-bottom: 30px;">
      <el-button type="primary" @click="onClear">清空</el-button>
    </div>
    <div style="margin-bottom: 15px;">
      <div>
        <span style="color: red;">注意：</span>defaultCheckedRows
        默认选中参数中的 名称字段 `productName`
        需要自己写进去，因为数据未加载出来组件不知道是什么值
        <p>:defaultCheckedRows="[{ id: '1-2', productName: '值-1' }]"</p>
      </div>
    </div>
    <base-select-grid
      ref="select-grid-ref"
      :api="api"
      :queryParams="queryParams"
      :columns="columns"
      searchField="productName"
      :isShowIndex="true"
      :multiple="true"
      displayField="productName"
      valueField="id"
      v-model="values"
      :collapse-tags="false"
      :width="400"
      :defaultCheckedRows="[{ id: '1-2', productName: '值-1' }]"
    >
      <template v-slot:search v-if="false">
        <!-- 传递 searchField 配置即可生成一个带有 input 框和 button 的搜索按钮，如果需要复杂搜索请扩展 search 插槽 -->
        <!-- 如果同时传递了 searchField 配置和 search 插槽，那么插件会忽略 searchField 参数 -->
        <!-- searchField 字段搜索仅支持 get 形式，不支持 post 的 body 参数形式 -->
        <div class="select-grid__search-box">
          <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </div>
      </template>
    </base-select-grid>
  </div>
</template>

<script>
export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.queryParams = { key: '有数' };
    this.columns = [
      {
        prop: 'productName',
        label: '产品名称'
      },
      { prop: 'fundCodeUserName', label: '企业名称' }
    ];
    return {
      values: ['1-2'], // 默认选中需要和 defaultCheckedKeys 配合一起使用，单选和多选都需要传入数组形式
      searchInput: ''
    };
  },
  methods: {
    /**
     * @desc 搜索
     */
    onSearch(event) {
      const params = { name: this.searchInput };
      this.$refs['select-grid-ref'].getGrid().setQueryParams(params);
      this.$refs['select-grid-ref'].getGrid().reloadGrid();
    },
    /**
     * @desc 清空
     */
    onClear(event) {
      this.values = [];
    }
  }
};
</script>

<style lang="less">
.select-grid-box {
  position: relative;
  height: 100%;
  .val-box {
    margin-bottom: 20px;
  }
}
.select-grid__search-box {
  height: 40px;
  .el-input {
    width: 200px;
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>
