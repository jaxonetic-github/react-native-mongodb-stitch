'use strict';

exports.__esModule = true;
exports.default = createErrorMessage;

var _serializeEffect = require('../shared/serializeEffect');

var _serializeEffect2 = _interopRequireDefault(_serializeEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createErrorMessage(header, stepNumber, actual, expected, effectKey) {
  var errorMessage = '\nAssertion ' + stepNumber + ' failed: ' + header + '\n';

  if (actual && expected) {
    var serializedExpected = (0, _serializeEffect2.default)(expected, effectKey);
    var serializedActual = (0, _serializeEffect2.default)(actual, effectKey);

    errorMessage += '\nExpected\n--------\n' + serializedExpected + '\n\n' + ('Actual\n------\n' + serializedActual + '\n');
  }

  return errorMessage;
}