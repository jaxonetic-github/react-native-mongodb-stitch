'use strict';

exports.__esModule = true;
exports.default = getFunctionName;
function getFunctionName(fn) {
  return fn.name || '<anonymous function>';
}