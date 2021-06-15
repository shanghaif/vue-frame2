// 且或条件
const LOGICOPERATOR = {
  OR: 'Or',
  AND: 'And'
};

const logicMap = {
  [LOGICOPERATOR.AND]: '且',
  [LOGICOPERATOR.OR]: '或'
};

const FILTEROPERATOR = {
  Greater: 'Greater',
  GreaterEq: 'GreaterEq',
  Less: 'Less',
  LessEq: 'LessEq',
  Eq: 'Eq',
  NotEq: 'NotEq',
  IsNull: 'IsNull',
  IsNotNull: 'IsNotNull',
  Contains: 'Contains',
  NotContains: 'NotContains',
  In: 'In',
  NotIn: 'NotIn',
  Range: 'Range'
};

const emptyFilterOperatorMap = Object.freeze({
  [FILTEROPERATOR.IsNull]: '为空',
  [FILTEROPERATOR.IsNotNull]: '不为空'
});

const arrFilterOperatorMap = Object.freeze({
  [FILTEROPERATOR.In]: '等于任意一个',
  [FILTEROPERATOR.NotIn]: '不等于任意一个'
});

// number 单个输入框
const numberBaseFilterOperatorMap = Object.freeze({
  [FILTEROPERATOR.Greater]: '大于',
  [FILTEROPERATOR.GreaterEq]: '大于等于',
  [FILTEROPERATOR.Less]: '小于',
  [FILTEROPERATOR.LessEq]: '小于等于',
  [FILTEROPERATOR.Eq]: '等于',
  [FILTEROPERATOR.NotEq]: '不等于',
  [FILTEROPERATOR.Range]: '选择范围'
});

// text 单个输入框
const textBaseFilterOperatorMap = Object.freeze({
  [FILTEROPERATOR.Eq]: '等于',
  [FILTEROPERATOR.NotEq]: '不等于',
  [FILTEROPERATOR.Contains]: '包含',
  [FILTEROPERATOR.NotContains]: '不包含'
});

const VALUETYPE = {
  Formula: 'Formula',
  Field: 'Field',
  FixedValue: 'FixedValue'
};

const FIELD_SETTING_TYPE = {
  Num: 'Num',
  Text: 'Text',
  Date: 'Date',
  Boolean: 'Boolean'
};

const fieldLableMap = {
  [FIELD_SETTING_TYPE.Num]: '数值型',
  [FIELD_SETTING_TYPE.Text]: '文本类型',
  [FIELD_SETTING_TYPE.Date]: '日期类型'
  // [FIELD_SETTING_TYPE.Boolean]: '布尔型',
};
export {
  LOGICOPERATOR,
  logicMap,
  FILTEROPERATOR,
  emptyFilterOperatorMap,
  arrFilterOperatorMap,
  numberBaseFilterOperatorMap,
  textBaseFilterOperatorMap,
  VALUETYPE,
  FIELD_SETTING_TYPE,
  fieldLableMap
};
