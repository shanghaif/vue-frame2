<template>
  <div>
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
      <p>icon 图标选择器</p>
      <base-icon-picker width="200px"></base-icon-picker>
    </div>
  </div>
</template>

<script>
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
      ]
    };
  },
  mounted() {
    /* this.$api['dict/getProductClassify']().then(response => {
      // 请求成功
      this.tableData = response.data[0].data;
      console.info(this.tableData);
    }); */
  },
  methods: {
    // 过滤数据
    loadFilter(data) {
      return data[0];
      // return [];
    }
  }
};
</script>

<style></style>
