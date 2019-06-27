'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = serializeEffect;

var _utilInspect = require('util-inspect');

var _utilInspect2 = _interopRequireDefault(_utilInspect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = { depth: 3 };

function serializeEffect(effect, effectKey) {
  if (effect != null && (typeof effect === 'undefined' ? 'undefined' : _typeof(effect)) === 'object' && !Array.isArray(effect) && effectKey && effectKey in effect) {
    return (0, _utilInspect2.default)(effect[effectKey], DEFAULT_OPTIONS);
  }

  return (0, _utilInspect2.default)(effect, DEFAULT_OPTIONS);
}