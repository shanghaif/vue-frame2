<template>
  <div :class="$style.interfaceList">
    <p>树形表格，在进行增删改查后通过清空表格数据再重新赋值加载来实现刷新</p>
    <base-border-layout v-bind="layout">
      <!-- <template v-slot:north>
        <base-info-card-header title="用户接口配置" :borderBottom="true">
          <template slot="btn">
            <el-button type="primary" @click="onAddAuthorization"
              >增加授权</el-button
            >
          </template>
        </base-info-card-header>
      </template> -->
      <template v-slot:center>
        <base-grid
          ref="base-tree-grid"
          :columns="columns"
          :api="api"
          :options="options"
          :isShowPagination="false"
          :tableAttributes="tableAttributes"
        >
          <template v-slot:columnTool="row">
            <!-- <div :class="$style.operatorColumn" v-if="row.type === 'api'">
              <span :class="$style.mr18" @click="onAddPlugin(row)"
                >添加插件</span
              >
              <span @click="onCloseAuthorization(row)">关闭授权</span>
            </div> -->
            <div :class="$style.operatorColumn" v-if="row.type === 'plugin'">
              <span @click="onRemoveRelevance(row)">解除关联</span>
            </div>
          </template>
        </base-grid>
      </template>
    </base-border-layout>
  </div>
</template>

<script>
import { getRandomID } from '@utils/index.js';

export default {
  name: 'index',
  data() {
    this.layout = {
      northHeight: 'auto',
      westWidth: '0',
      eastWidth: '0',
      southHeight: '0',
      centerCls: this.$style.centerCls,
      isPadding: false
    };
    this.api = '';
    this.columns = [
      {
        prop: 'name',
        label: '名称'
      },
      {
        prop: 'code',
        label: '通道/接口/插件编码'
      },
      {
        prop: 'type',
        label: '类别',
        width: '100px',
        filter: 'PASS_INTER_USER_TYPE_KEY'
      },
      {
        prop: 'description',
        label: '描述',
        'show-overflow-tooltip': true
      }
    ];
    this.tableAttributes = {
      'row-key': row => {
        const id = row.type === 'channel' ? row.channelId : row.apiId;
        return `${row.type}-${id}-${this.rowRandomID}`;
      }, // 渲染树形数据时，必须要指定 row-key
      'default-expand-all': true,
      lazy: true,
      load: this.load,
      'tree-props': { children: 'children', hasChildren: 'hasChildren' } // 当 row 中包含 children 字段时，被视为树形数据
    };
    return {
      rowRandomID: getRandomID(),
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
      for (let i = 1; i < 2; i++) {
        const oRow = {
          channelId: i,
          type: 'channel',
          description: '测试通道',
          name: `测试通道${i}`,
          createTime: `2019-03-12 11:44:${i}`,
          hasChildren: true,
          code: 'Aaaaaa'
        };
        results.push(oRow);
      }

      this.options.data.totalPage = Math.ceil(
        results.length / this.options.data.pageSize
      ); // 总页数
      this.options.data.totalRecord = results.length;
      this.options.data.results = results;
    },
    setOptionsApi() {
      const results = [];
      for (let i = 1; i < 2; i++) {
        const oRow = {
          channelId: i,
          apiId: i + 1,
          type: 'api',
          description: '测试的接口修改',
          name: `测试接口${i}`,
          createTime: `2019-03-12 11:44:${i}`,
          hasChildren: true,
          code: 'Aaaaaa'
        };
        results.push(oRow);
      }
      return results;
    },
    setOptionsPlugin() {
      const results = [];
      for (let i = 1; i < 3; i++) {
        const oRow = {
          channelId: i,
          apiId: i + 1,
          pluginID: i + 2,
          type: 'plugin',
          description: '测试通道',
          name: `测试插件${i}`,
          createTime: `2019-03-12 11:44:${i}`,
          hasChildren: false,
          code: 'Aaaaaa'
        };
        results.push(oRow);
      }
      return results;
    },
    onRemoveRelevance(row) {
      this.$successMsg('关闭成功!');
      // 清空表格内容再重新输入数据实现刷新
      this.options.data.records = [];
      this.options.data.page = 1;
      this.options.data.total = 0;
      this.rowRandomID = getRandomID();
      this.$nextTick(() => {
        this.setOptions();
      });
    },
    /**
     * @desc 获取用户接口配置接口列表和插件列表
     */
    load(tree, treeNode, resolve) {
      if (tree.type === 'channel') {
        resolve(this.setOptionsApi());
      } else {
        resolve(this.setOptionsPlugin());
      }
    }
  }
};
</script>

<style lang="scss" module>
.interface-list {
  height: calc(100% - 226px);
  background-color: white;
  .center-cls {
    box-sizing: border-box;
    height: 100%;
    padding: 16px 24px 5px 24px;
    .operator-column {
      > span {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        color: rgb(24, 144, 255);
        cursor: pointer;
      }
    }
  }
}
</style>
