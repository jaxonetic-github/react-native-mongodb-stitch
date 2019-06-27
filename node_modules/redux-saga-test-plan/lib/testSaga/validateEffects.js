'use strict';

exports.__esModule = true;
exports.default = validateEffects;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateEffects(eventChannel, effectName, effectKey, isHelperEffect, actual, expected, stepNumber) {
  if (actual == null) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' effect, but the saga yielded nothing', stepNumber, actual, expected, effectKey);
  }

  var bothEqual = (0, _lodash2.default)(actual, expected);

  var effectsDifferent = isHelperEffect && !bothEqual || !isHelperEffect && (actual.type !== effectKey || expected.type !== effectKey);

  if (effectsDifferent) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' effect, but the saga yielded a different effect', stepNumber, actual, expected);
  }

  if (!bothEqual) {
    return (0, _createErrorMessage2.default)(effectName + ' effects do not match', stepNumber, actual, expected, effectKey);
  }

  return null;
}