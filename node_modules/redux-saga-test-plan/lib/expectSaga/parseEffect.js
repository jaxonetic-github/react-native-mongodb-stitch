'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-cond-assign */


exports.default = parseEffect;

var _is = require('@redux-saga/is');

var is = _interopRequireWildcard(_is);

var _keys = require('../shared/keys');

var _object = require('../utils/object');

var _asEffect = require('../utils/asEffect');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createEffectWithNestedEffects = function createEffectWithNestedEffects(type) {
  return function (effect, extra) {
    return _extends({
      type: type,
      effect: effect
    }, extra, {
      mapEffects: Array.isArray(effect) ? function (f) {
        return effect.map(f);
      } : function (f) {
        return (0, _object.mapValues)(effect, f);
      }
    });
  };
};

var createAll = createEffectWithNestedEffects(_keys.ALL);
var createRace = createEffectWithNestedEffects(_keys.RACE);

function parseEffect(effect) {
  var parsedEffect = void 0;

  switch (true) {
    case is.notUndef(parsedEffect = _asEffect.asEffect.take(effect)):
      return {
        type: _keys.TAKE,
        effect: parsedEffect,
        providerKey: 'take'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.put(effect)):
      return {
        type: _keys.PUT,
        effect: parsedEffect,
        providerKey: 'put'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.race(effect)):
      return createRace(parsedEffect, { providerKey: 'race' });

    case is.notUndef(parsedEffect = _asEffect.asEffect.call(effect)):
      return {
        type: _keys.CALL,
        effect: parsedEffect,
        providerKey: 'call'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.cancel(effect)):
      return {
        type: _keys.CANCEL,
        effect: parsedEffect,
        providerKey: 'cancel'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.cancelled(effect)):
      return {
        type: _keys.CANCELLED,
        effect: parsedEffect,
        providerKey: 'cancelled'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.cps(effect)):
      return {
        type: _keys.CPS,
        effect: parsedEffect,
        providerKey: 'cps'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.flush(effect)):
      return {
        type: _keys.FLUSH,
        effect: parsedEffect,
        providerKey: 'flush'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.fork(effect)):
      return {
        type: _keys.FORK,
        effect: parsedEffect,
        providerKey: parsedEffect.detached ? 'spawn' : 'fork'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.getContext(effect)):
      return {
        type: _keys.GET_CONTEXT,
        effect: parsedEffect,
        providerKey: 'getContext'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.join(effect)):
      return {
        type: _keys.JOIN,
        effect: parsedEffect,
        providerKey: 'join'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.select(effect)):
      return {
        type: _keys.SELECT,
        effect: parsedEffect,
        providerKey: 'select'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.setContext(effect)):
      return {
        type: _keys.SET_CONTEXT,
        effect: parsedEffect,
        providerKey: 'setContext'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.actionChannel(effect)):
      return {
        type: _keys.ACTION_CHANNEL,
        effect: parsedEffect,
        providerKey: 'actionChannel'
      };

    case is.notUndef(parsedEffect = _asEffect.asEffect.all(effect)):
      return createAll(parsedEffect);

    default:
      return { type: _keys.NONE };
  }
}