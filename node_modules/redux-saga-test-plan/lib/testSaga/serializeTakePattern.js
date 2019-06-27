'use strict';

exports.__esModule = true;
exports.default = serializeTakePattern;

var _getFunctionName = require('./getFunctionName');

var _getFunctionName2 = _interopRequireDefault(_getFunctionName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeTakePattern(pattern) {
  if (Array.isArray(pattern)) {
    return '[' + pattern.join(', ') + ']';
  }

  if (typeof pattern === 'function') {
    return '[Function: ' + (0, _getFunctionName2.default)(pattern) + ']';
  }

  return pattern;
}