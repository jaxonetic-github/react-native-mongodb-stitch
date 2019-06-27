'use strict';

exports.__esModule = true;
exports.takeMaybe = exports.take = exports.spawn = exports.setContext = exports.select = exports.race = exports.putResolve = exports.put = exports.join = exports.fork = exports.getContext = exports.flush = exports.cps = exports.cancelled = exports.cancel = exports.call = exports.apply = exports.actionChannel = undefined;

var _effects = require('redux-saga/effects');

var effects = _interopRequireWildcard(_effects);

var _helpers = require('./helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var actionChannel = exports.actionChannel = (0, _helpers.wrapEffectCreator)(effects.actionChannel);
var apply = exports.apply = (0, _helpers.wrapEffectCreator)(effects.apply);
var call = exports.call = (0, _helpers.wrapEffectCreator)(effects.call);
var cancel = exports.cancel = (0, _helpers.wrapEffectCreator)(effects.cancel);
var cancelled = exports.cancelled = (0, _helpers.wrapEffectCreator)(effects.cancelled);
var cps = exports.cps = (0, _helpers.wrapEffectCreator)(effects.cps);
var flush = exports.flush = (0, _helpers.wrapEffectCreator)(effects.flush);
var getContext = exports.getContext = (0, _helpers.wrapEffectCreator)(effects.getContext);
var fork = exports.fork = (0, _helpers.wrapEffectCreator)(effects.fork);
var join = exports.join = (0, _helpers.wrapEffectCreator)(effects.join);
var put = exports.put = (0, _helpers.wrapEffectCreator)(effects.put);
var putResolve = exports.putResolve = (0, _helpers.wrapEffectCreator)(effects.putResolve);
var race = exports.race = (0, _helpers.wrapEffectCreator)(effects.race);
var select = exports.select = (0, _helpers.wrapEffectCreator)(effects.select);
var setContext = exports.setContext = (0, _helpers.wrapEffectCreator)(effects.setContext);
var spawn = exports.spawn = (0, _helpers.wrapEffectCreator)(effects.spawn);
var take = exports.take = (0, _helpers.wrapEffectCreator)(effects.take);
var takeMaybe = exports.takeMaybe = (0, _helpers.wrapEffectCreator)(effects.takeMaybe);

actionChannel.like = (0, _helpers.like)('actionChannel');
actionChannel.pattern = function (pattern) {
  return actionChannel.like({ pattern: pattern });
};

apply.like = (0, _helpers.like)('call');
apply.fn = function (fn) {
  return apply.like({ fn: fn });
};

call.like = (0, _helpers.like)('call');
call.fn = function (fn) {
  return call.like({ fn: fn });
};

cps.like = (0, _helpers.like)('cps');
cps.fn = function (fn) {
  return cps.like({ fn: fn });
};

fork.like = (0, _helpers.like)('fork');
fork.fn = function (fn) {
  return fork.like({ fn: fn });
};

put.like = (0, _helpers.like)('put');
put.actionType = function (type) {
  return put.like({ action: { type: type } });
};

putResolve.like = (0, _helpers.like)('put', { resolve: true });
putResolve.actionType = function (type) {
  return putResolve.like({ action: { type: type } });
};

select.like = (0, _helpers.like)('select');
select.selector = function (selector) {
  return select.like({ selector: selector });
};

spawn.like = (0, _helpers.like)('spawn', { detached: true });
spawn.fn = function (fn) {
  return spawn.like({ fn: fn });
};