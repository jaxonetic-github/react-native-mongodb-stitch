'use strict';

exports.__esModule = true;
exports.handlers = exports.next = exports.NEXT = undefined;

var _handlers;

exports.provideValue = provideValue;

var _parseEffect = require('./parseEffect');

var _parseEffect2 = _interopRequireDefault(_parseEffect);

var _keys = require('../shared/keys');

var _asEffect = require('../utils/asEffect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NEXT = exports.NEXT = Object.create(null);
var next = exports.next = function next() {
  return NEXT;
};

var handlers = exports.handlers = (_handlers = {}, _handlers[_keys.ACTION_CHANNEL] = 'actionChannel', _handlers[_keys.ALL] = function (providers, value) {
  if (providers.all) {
    return providers.all(value, next);
  }

  return NEXT;
}, _handlers[_keys.CALL] = 'call', _handlers[_keys.CANCEL] = 'cancel', _handlers[_keys.CANCELLED] = 'cancelled', _handlers[_keys.CPS] = 'cps', _handlers[_keys.FLUSH] = 'flush', _handlers[_keys.FORK] = function (providers, value) {
  var effect = _asEffect.asEffect.fork(value);

  if (providers.fork && !effect.detached) {
    return providers.fork(effect, next);
  }

  if (providers.spawn && effect.detached) {
    return providers.spawn(effect, next);
  }

  return NEXT;
}, _handlers[_keys.GET_CONTEXT] = 'getContext', _handlers[_keys.JOIN] = 'join', _handlers[_keys.PUT] = 'put', _handlers[_keys.RACE] = 'race', _handlers[_keys.SELECT] = 'select', _handlers[_keys.SET_CONTEXT] = 'setContext', _handlers[_keys.TAKE] = 'take', _handlers);

function provideValue(providers, value) {
  if (providers) {
    var effectType = (0, _parseEffect2.default)(value).type;
    var handler = handlers[effectType];

    if (typeof handler === 'string' && handler in providers) {
      var effect = _asEffect.asEffect[handler](value);
      return providers[handler](effect, next);
    }

    if (typeof handler === 'function') {
      return handler(providers, value);
    }
  }

  return NEXT;
}