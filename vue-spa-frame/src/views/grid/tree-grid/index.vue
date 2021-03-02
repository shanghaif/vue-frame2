<template>
  <div class="full-y">
    <base-grid
      ref="base-grid"
      :columns="columns"
      :api="api"
      :options="options"
      :selectMode="false"
      :isShowIndex="true"
      :isShowPagination="true"
      :isSelectedFirstRow="false"
      :paginationAttributes="paginationAttributes"
      :tableAttributes="tableAttributes"
      :isContinuityIndex="true"
      :loadFilter="loadFilter"
      @onLoadSuccess="onLoadSuccess"
    >
      <template v-slot:search>
        <div :class="$style.search">
          <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width: 300px;margin-right: 10px;"
          ></el-input>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="info" @click="onReset">重置</el-button>
        </div>
      </template>
      <template v-slot:tBar>
        <p></p>
      </template>
    </base-grid>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    this.api = '';
    this.columns = [
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0' // 字典数据转换
      },
      {
        prop: 'productName',
        label: '产品名称'
      },
      {
        prop: 'createTime',
        label: '申请日期',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        }
      }
    ];
    this.paginationAttributes = {};
    this.tableAttributes = {
      'row-key': 'id', // 渲染树形数据时，必须要指定 row-key
      'default-expand-all': true,
      lazy: true,
      load: this.load,
      'tree-props': { children: 'children', hasChildren: 'hasChildren' } // 当 row 中包含 children 字段时，被视为树形数据
    };
    return {
      input: '',
      options: {
        code: '0000',
        message: '',
        data: {
          pageNum: 1, // 加载第1页的数据
          pageSize: 10,
          results: [],
          totalPage: 0,
          totalRecord: 0
        },
        timestamp: Date.parse(new Date())
      }
    };
  },
  created() {
    setTimeout(this.setOptions, 500);
  },
  methods: {
    setOptions() {
      const results = [];
      for (let i = 1; i < 23; i++) {
        const oRow = {
          id: i,
          productType: 1,
          productName: `融信达-${i}`,
          createTime: `2019-03-12 11:44:${i}`
        };
        if (i === 6) {
          oRow.hasChildren = true;
        }
        if (i === 8) {
          oRow.children = [
            {
              id: 'a',
              productType: 1,
              productName: '融信达-a',
              createTime: `2019-03-12 11:44:${i}`,
              children: [
                {
                  id: 'e',
                  productType: 6,
                  productName: '融信达-e',
                  createTime: `2020-01-12 19:44:${i}`
                }
              ]
            },
            {
              id: 'b',
              productType: 2,
              productName: '融信达-b',
              createTime: `2019-03-12 11:44:${i}`
            }
          ];
        }
        if (i === 18) {
          oRow.children = [
            {
              id: 'c',
              productType: 3,
              productName: '融信达-c',
              createTime: `2019-03-12 11:44:${i}`
            },
            {
              id: 'd',
              productType: 5,
              productName: '融信达-d',
              createTime: `2019-03-12 11:44:${i}`
            }
          ];
        }
        results.push(oRow);
      }
      console.log('bbbbbbbbbb ', results);
      this.options.data.totalPage = Math.ceil(
        results.length / this.options.data.pageSize
      ); // 总页数
      this.options.data.totalRecord = results.length;
      this.options.data.results = results;
    },
    /**
     * @desc 数据加载完成
     */
    onLoadSuccess(data) {
      // console.info('数据加载完成 ', data);
    },
    /**
     * @desc 数据过滤器
     */
    loadFilter(options) {
      const copyOptions = _cloneDeep(options); // 复制一份数据源，否则会触发 options 的watcher导致循环监听
      if (this.input) {
        copyOptions.data.results = _filter(copyOptions.data.results, o => {
          return _includes(o.productName, this.input);
        });
        copyOptions.data.totalRecord = copyOptions.data.results.length;
      }
      return copyOptions;
    },
    onSearch() {
      // this.$refs['base-grid'].setQueryParams({ productName: this.input }); // 搜索放到 loadFilter 过滤器函数中
      this.$refs['base-grid'].reloadGrid();
    },
    onReset() {
      this.input = '';
      this.onSearch();
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 'f',
            productType: 1,
            productName: '融信达-f',
            createTime: '2020-02-01 11:09:12'
          },
          {
            id: 't',
            productType: 2,
            productName: '融信达-t',
            createTime: '2020-02-02 08:09:12'
          }
        ]);
      }, 1000);
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;
  .search {
    height: 30px;
  }
}
</style>
