/**
 * @desc 公共的一些字典
 */
export default {
  WF_TYPE: [
    { paramValue: 0, paramDesc: '退回' },
    { paramValue: 1, paramDesc: '提交' },
    { paramValue: 2, paramDesc: '转交' }
  ],
  BOOLEAN_NUMBER_TYPE: [
    { paramValue: 0, paramDesc: '否' },
    { paramValue: 1, paramDesc: '是' }
  ],
  BOOLEAN_BOOLEAN_TYPE: [
    { paramValue: false, paramDesc: '否' },
    { paramValue: true, paramDesc: '是' }
  ],
  // 模块权限
  ACCESS_TYPE: [
    { paramValue: 0, paramDesc: 'default' }, // 可分配
    { paramValue: 1, paramDesc: 'read' }, // 只读
    { paramValue: 2, paramDesc: 'write' }, // 可写
    { paramValue: 3, paramDesc: 'write' } // 可写
  ]
};
