import Mock from 'mockjs2';
import { builder, getQueryParameters } from '../util';

const rollGridList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  const result = [];
  for (let i = 1; i < 12; i++) {
    result.push({
      id: i,
      date: Mock.mock('@datetime()'),
      name: Mock.mock('@cname()') + '-' + i,
      address: Mock.mock('@county(true)')
    });
  }
  return builder({ results: result });
};
Mock.mock(/\/mock\/roll\/grid/, 'get', rollGridList); // 贷款需求管理列表
