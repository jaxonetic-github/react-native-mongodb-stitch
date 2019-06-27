'use strict';

exports.__esModule = true;
exports.default = assertSameEffect;

var _SagaTestError = require('../shared/SagaTestError');

var _SagaTestError2 = _interopRequireDefault(_SagaTestError);

var _validateEffects = require('./validateEffects');

var _validateEffects2 = _interopRequireDefault(_validateEffects);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assertSameEffect(eventChannel, effectName, effectKey, isHelperEffect, actual, expected, stepNumber) {
  var errorMessage = (0, _validateEffects2.default)(eventChannel, effectName, effectKey, isHelperEffect, actual, expected, stepNumber);

  if (errorMessage) {
    throw new _SagaTestError2.default(errorMessage);
  }
}