import _mergeWith from 'lodash/mergeWith';
import Core from '../core.js';
import { line } from './main.js';

const cors = Core();

const BaseMixtureChart = _mergeWith(cors, line);

export default BaseMixtureChart;
