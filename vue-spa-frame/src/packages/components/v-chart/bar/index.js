import Core from '../core.js';
import { bar } from './main.js';
import _mergeWith from 'lodash/mergeWith';

const cors = Core();

const BaseBarsChart = _mergeWith(cors, bar);

export default BaseBarsChart;
