'use strict';

exports.__esModule = true;
exports.default = reportActualEffects;

var _serializeEffect = require('../shared/serializeEffect');

var _serializeEffect2 = _interopRequireDefault(_serializeEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reportActualEffects(store, storeKey) {
  var values = store.values();

  if (values.length === 0) {
    return '';
  }

  var serializedEffects = values.map(function (effect, i) {
    return i + 1 + '. ' + (0, _serializeEffect2.default)(effect, storeKey);
  });

  return '\nActual:\n------\n' + serializedEffects.join('\n') + '\n';
}