import Core from '../core.js';
import { line } from './main.js';
import _mergeWith from 'lodash/mergeWith';

const cors = Core();

const BaseLineChart = _mergeWith(cors, line);

export default BaseLineChart;
