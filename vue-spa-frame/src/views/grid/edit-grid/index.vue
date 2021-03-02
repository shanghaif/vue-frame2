<template>
  <div class="edit-grid-box">
    <base-edit-grid
      ref="base-edit-grid"
      :columns="columns"
      :api="api"
      :queryParams="queryParams"
      :selectMode="false"
      :isShowIndex="true"
      :paginationAttributes="paginationAttributes"
      :editing="true"
      :inlineMessage="false"
      :buttons="buttons"
      :columnTool="{
        label: '插槽-操作列'
      }"
    >
      <!-- 工具栏 -->
      <template v-slot:tBar>
        <div>
          <span style="color: red;">注意：</span>1.
          错误提示支持行内和弹框提示两种形式。2.某一列配置中设置 `edit: false`
          禁止某列变为编辑模式。
        </div>
        <div class="row-edit-grid_bar">当前点击保存行：{{ myRow }}</div>
      </template>
      <template v-slot:columnTool="row" v-if="false">
        <div>
          <el-popconfirm
            v-if="row.edit"
            @confirm="onOkClick(row)"
            @cancel="onCancelClick(row)"
            title="确定保存吗？"
          >
            <template slot="reference">
              <el-button type="success" size="mini">保存</el-button>
            </template>
          </el-popconfirm>
          <el-button
            v-else
            type="primary"
            size="mini"
            @click="row.edit = !row.edit"
            >编辑</el-button
          >
        </div>
      </template>
    </base-edit-grid>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    this.api = 'bank/demand-manage/bankProductsList';
    this.queryParams = { key: '有数' };
    this.paginationAttributes = {
      currentPage: 1,
      pageSize: 10
    };
    this.columns = [
      {
        prop: 'productType',
        label: '产品类型',
        filter: 'DICT_0', // 字典数据转换
        component: {
          el: 'base-select',
          options: {
            // 对象形式书写的代码，如果对应的组件`base-select`没有明确定义为 `props` 属性，那么需要使用 `attrs` 参数属性传递
            props: {
              options: this.$dict.get('DICT_0'),
              width: '100px',
              displayField: 'paramDesc',
              valueField: 'paramValue',
              ctCls: { 'product-type_box': true }
            },
            style: {},
            on: {
              change: val => {
                console.info('...change...', val);
              }
            }
          }
        },
        width: '140px',
        edit: true // false 列不可编辑
      },
      {
        prop: 'createTime',
        label: '申请日期',
        width: '180px',
        render: (h, row, column, index) => {
          return moment(row[column.property]).format('YYYY-MM-DD'); // 日期格式处理
        },
        component: {
          el: 'el-date-picker',
          options: {
            style: { width: '150px' }
          }
        }
      },
      {
        prop: 'applyQuota',
        label: '融资金额',
        sortable: true,
        unit: '万元',
        rules: [
          {
            required: true,
            type: 'number',
            message: '请输入融资金额',
            trigger: 'change'
          },
          {
            pattern: /^(0|[1-9]\d?|100)$/,
            message: '范围在0-100',
            trigger: 'blur'
          }
        ],
        component: 'el-input',
        width: '120px'
      },
      {
        prop: 'applyProId',
        label: '需求单号',
        hide: false,
        component: 'el-input',
        rules: [
          { required: true, message: '请输入需求单号', trigger: 'change' },
          {
            min: 2,
            max: 30,
            message: '长度在 2 到 30 个字符',
            trigger: 'blur'
          }
        ]
      }, // 隐藏列
      {
        prop: 'fundCodeUserName',
        label: '企业名称',
        component: {
          el: 'base-select-grid',
          options: {
            attrs: {
              api: 'bank/demand-manage/bankProductsList',
              columns: [
                {
                  prop: 'productName',
                  label: '产品名称'
                },
                { prop: 'fundCodeUserName', label: '企业名称' }
              ],
              isShowIndex: true
            },
            props: {
              displayField: 'fundCodeUserName',
              valueField: 'id'
            }
          }
        }
      },
      {
        prop: 'isUsing',
        label: '启用',
        filter: 'BOOLEAN_NUMBER_TYPE',
        width: '80px',
        component: {
          el: 'el-switch',
          options: {
            props: {
              'active-value': 1,
              'inactive-value': 0
            }
          }
        }
      },
      {
        prop: 'county',
        label: '区县',
        component: {
          // 本地 mock 数据，如果真实情况下应该在修改好后再次调用 reloadGrid 刷新
          el: 'base-select-tree',
          valueField: 'countyId', // 使用其它字段取值，因为`county`字段是中文对应的数值字段是`countyId`
          options: {
            // 此处使用 `attrs` 传参，因为这些参数不在 `base-select-tree` 的 `props` 对象中
            attrs: {
              api: 'common/getCountyTree',
              lazy: false,
              rootLabel: '浙江省',
              props: {
                children: 'children',
                label: 'label',
                value: 'id',
                isLeaf: 'leaf'
              }
            },
            // `displayField`和`valueField` 在 `base-select-tree` 的 `props` 对象中
            props: {
              displayField: 'label',
              valueField: 'id'
            }
          }
        }
      }
    ];
    return {
      buttons: [
        {
          command: 'edit',
          render: (h, row, column, index, elem) => {
            return h(
              'el-button',
              {
                props: { type: 'primary', size: 'mini' },
                on: {
                  click: event => {
                    console.log('编辑', row, column, index, elem);
                    row.edit = true;
                  }
                }
              },
              ['编辑']
            );
          }
        },
        {
          command: 'submit',
          render: (h, row, column, index) => {
            return h(
              'el-popconfirm',
              {
                props: {
                  title: '确定保存吗？',
                  placement: 'left',
                  iconColor: '#67C23A'
                },
                on: {
                  confirm: () => {
                    // 验证校验
                    this.$refs['base-edit-grid'].validate(row, (valid, obj) => {
                      if (valid) {
                        console.log('...验证通过...');
                        row.edit = false; // 重置为编辑
                        this.myRow = _omit(row, ['original', 'rowRefs']);
                      } else {
                        console.log('...验证失败...');
                      }
                    });
                  },
                  cancel: () => {
                    console.log('cancel', row);
                    row.edit = false;
                    const oResetRow = this.$refs['base-edit-grid'].resetRow(
                      row
                    );
                    this.myRow = _omit(oResetRow, ['original', 'rowRefs']);
                  }
                }
              },
              [
                h(
                  'el-button',
                  {
                    slot: 'reference',
                    props: { type: 'success', size: 'mini' },
                    style: { cursor: 'pointer' }
                  },
                  ['保存']
                )
              ]
            );
          }
        }
      ],
      myRow: {},
      editing: false // 是否开启编辑模式
    };
  },
  created() {
    console.log(this.$dict.get('DICT_0'));
  },
  methods: {
    onOkClick(row) {
      // 验证校验
      this.$refs['base-edit-grid'].validate(row, (valid, obj) => {
        if (valid) {
          console.log('...验证通过...', row);
          row.edit = false; // 重置为编辑
          this.myRow = _omit(row, ['original', 'rowRefs']);
        } else {
          console.log('...验证失败...');
        }
      });
    },
    onCancelClick(row) {
      row.edit = false;
      const oResetRow = this.$refs['base-edit-grid'].resetRow(row);
      this.myRow = _omit(oResetRow, ['original', 'rowRefs']);
    }
  }
};
</script>

<style lang="less">
.edit-grid-box {
  .full-y;

  overflow: auto;
}
.row-edit-grid_bar {
  margin: 15px 0;
}
</style>
