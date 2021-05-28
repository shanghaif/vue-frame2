import pie from './main.js';
import Core from '../core.js';
import _mergeWith from 'lodash/mergeWith';

const cors = Core();

const BasePieChart = _mergeWith(cors, pie);

export default BasePieChart;
