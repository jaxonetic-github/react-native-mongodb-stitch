'use strict';

exports.__esModule = true;
exports.asEffect = undefined;

var _effects = require('redux-saga/effects');

var _symbols = require('@redux-saga/symbols');

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    if (effect && effect[_symbols.IO] && effect.type === type) {
      return effect.payload;
    }

    return undefined;
  };
};

// eslint-disable-next-line import/prefer-default-export
var asEffect = exports.asEffect = {
  take: createAsEffectType(_effects.effectTypes.TAKE),
  put: createAsEffectType(_effects.effectTypes.PUT),
  all: createAsEffectType(_effects.effectTypes.ALL),
  race: createAsEffectType(_effects.effectTypes.RACE),
  call: createAsEffectType(_effects.effectTypes.CALL),
  cps: createAsEffectType(_effects.effectTypes.CPS),
  fork: createAsEffectType(_effects.effectTypes.FORK),
  join: createAsEffectType(_effects.effectTypes.JOIN),
  cancel: createAsEffectType(_effects.effectTypes.CANCEL),
  select: createAsEffectType(_effects.effectTypes.SELECT),
  actionChannel: createAsEffectType(_effects.effectTypes.ACTION_CHANNEL),
  cancelled: createAsEffectType(_effects.effectTypes.CANCELLED),
  flush: createAsEffectType(_effects.effectTypes.FLUSH),
  getContext: createAsEffectType(_effects.effectTypes.GET_CONTEXT),
  setContext: createAsEffectType(_effects.effectTypes.SET_CONTEXT)
};