'use strict';

exports.__esModule = true;
exports.wrapEffectCreator = wrapEffectCreator;
exports.like = like;
exports.isPartialMatcher = isPartialMatcher;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PARTIAL_MATCH = '@@redux-saga-test-plan/partial-matcher';
function wrapEffectCreator(effectCreator) {
  return function wrappedEffectCreator() {
    return effectCreator.apply(undefined, arguments);
  };
}

function like(providerKey) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function effectMatcher(effect) {
    var _assign;

    return (0, _objectAssign2.default)({}, defaults, (_assign = {
      effect: effect,
      providerKey: providerKey
    }, _assign[PARTIAL_MATCH] = true, _assign));
  };
}

function isPartialMatcher(effect) {
  return PARTIAL_MATCH in effect;
}