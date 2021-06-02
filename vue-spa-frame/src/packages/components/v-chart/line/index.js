import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import { line } from './main.js';

const cors = Core();

const BaseLineChart = _mergeWith(cors, line);

export default BaseLineChart;
