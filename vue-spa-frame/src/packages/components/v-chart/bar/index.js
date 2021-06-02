import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import { bar } from './main.js';

const cors = Core();

const BaseBarsChart = _mergeWith(cors, bar);

export default BaseBarsChart;
