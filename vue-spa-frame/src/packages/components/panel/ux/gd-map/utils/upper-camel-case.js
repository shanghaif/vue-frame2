'use strict';
// foo-bar -> fooBar
// foo_bar -> fooBar
// https://www.npmjs.com/package/camelcase
import { camelCase } from './camelcase.js';

export const upperCamelCase = function() {
  var cased = camelCase.apply(camelCase, arguments);
  return cased.charAt(0).toUpperCase() + cased.slice(1);
};
