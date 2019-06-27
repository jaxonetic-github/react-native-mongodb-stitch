'use strict';

exports.__esModule = true;
exports.default = testSaga;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _effects = require('redux-saga/effects');

var effects = _interopRequireWildcard(_effects);

var _reduxSaga = require('redux-saga');

var _historyTypes = require('./historyTypes');

var _keys = require('../shared/keys');

var _SagaTestError = require('../shared/SagaTestError');

var _SagaTestError2 = _interopRequireDefault(_SagaTestError);

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

var _assertSameEffect = require('./assertSameEffect');

var _assertSameEffect2 = _interopRequireDefault(_assertSameEffect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function testSaga(saga) {
  var api = {
    next: next,
    back: back,
    finish: finish,
    restart: restart,
    save: save,
    restore: restore,
    throw: throwError
  };

  var savePoints = {};
  var history = [];

  for (var _len = arguments.length, sagaArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sagaArgs[_key - 1] = arguments[_key];
  }

  var finalSagaArgs = sagaArgs;
  var iterator = createIterator();

  function createEffectTester(name, key, effect) {
    var isForkedEffect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return function (yieldedValue) {
      return function () {
        (0, _assertSameEffect2.default)(_reduxSaga.eventChannel, name, key, isForkedEffect, yieldedValue, effect.apply(undefined, arguments), history.length);

        return api;
      };
    };
  }

  function createEffectTesterFromEffects(name, key) {
    return createEffectTester(name, key, effects[name]);
  }

  function createEffectTesterFromHelperEffect(name) {
    return createEffectTester(name, undefined, effects[name], true);
  }

  var effectsTestersCreators = {
    actionChannel: createEffectTesterFromEffects('actionChannel', _keys.ACTION_CHANNEL),
    all: createEffectTesterFromEffects('all', _keys.ALL),
    apply: createEffectTesterFromEffects('apply', _keys.CALL),
    call: createEffectTesterFromEffects('call', _keys.CALL),
    cancel: createEffectTesterFromEffects('cancel', _keys.CANCEL),
    cancelled: createEffectTesterFromEffects('cancelled', _keys.CANCELLED),
    cps: createEffectTesterFromEffects('cps', _keys.CPS),
    delay: createEffectTesterFromEffects('delay', _keys.CALL),
    flush: createEffectTesterFromEffects('flush', _keys.FLUSH),
    fork: createEffectTesterFromEffects('fork', _keys.FORK),
    getContext: createEffectTesterFromEffects('getContext', _keys.GET_CONTEXT),
    join: createEffectTesterFromEffects('join', _keys.JOIN),
    put: createEffectTesterFromEffects('put', _keys.PUT),
    putResolve: createEffectTesterFromEffects('putResolve', _keys.PUT),
    race: createEffectTesterFromEffects('race', _keys.RACE),
    select: createEffectTesterFromEffects('select', _keys.SELECT),
    setContext: createEffectTesterFromEffects('setContext', _keys.SET_CONTEXT),
    spawn: createEffectTesterFromEffects('spawn', _keys.FORK),
    take: createEffectTesterFromEffects('take', _keys.TAKE),
    takeEvery: createEffectTesterFromHelperEffect('takeEvery'),
    takeLatest: createEffectTesterFromHelperEffect('takeLatest'),
    takeLeading: createEffectTesterFromHelperEffect('takeLeading'),
    takeMaybe: createEffectTesterFromEffects('takeMaybe', _keys.TAKE),
    throttle: createEffectTesterFromHelperEffect('throttle'),

    isDone: function isDone(done) {
      return function () {
        if (!done) {
          throw new _SagaTestError2.default('saga not done');
        }

        return api;
      };
    },

    is: function is(value) {
      return function (arg) {
        if (!(0, _lodash2.default)(arg, value)) {
          var errorMessage = (0, _createErrorMessage2.default)('yielded values do not match', history.length, value, arg);

          throw new _SagaTestError2.default(errorMessage);
        }

        return api;
      };
    },

    inspect: function inspect(value) {
      return function (fn) {
        fn(value);
        return api;
      };
    },

    returns: function returns(value, done) {
      return function (arg) {
        if (!done) {
          throw new _SagaTestError2.default('saga not done');
        }

        if (!(0, _lodash2.default)(arg, value)) {
          var errorMessage = (0, _createErrorMessage2.default)('returned values do not match', history.length, value, arg);

          throw new _SagaTestError2.default(errorMessage);
        }

        return api;
      };
    }
  };

  function createIterator() {
    return saga.apply(undefined, finalSagaArgs);
  }

  function apiWithEffectsTesters(_ref) {
    var value = _ref.value,
        done = _ref.done;

    var newApi = (0, _objectAssign2.default)({}, api, {
      actionChannel: effectsTestersCreators.actionChannel(value),
      all: effectsTestersCreators.all(value),
      apply: effectsTestersCreators.apply(value),
      call: effectsTestersCreators.call(value),
      cancel: effectsTestersCreators.cancel(value),
      cancelled: effectsTestersCreators.cancelled(value),
      cps: effectsTestersCreators.cps(value),
      delay: effectsTestersCreators.delay(value),
      flush: effectsTestersCreators.flush(value),
      fork: effectsTestersCreators.fork(value),
      getContext: effectsTestersCreators.getContext(value),
      join: effectsTestersCreators.join(value),
      put: effectsTestersCreators.put(value),
      putResolve: effectsTestersCreators.putResolve(value),
      race: effectsTestersCreators.race(value),
      select: effectsTestersCreators.select(value),
      setContext: effectsTestersCreators.setContext(value),
      spawn: effectsTestersCreators.spawn(value),
      take: effectsTestersCreators.take(value),
      takeEvery: effectsTestersCreators.takeEvery(value),
      takeLatest: effectsTestersCreators.takeLatest(value),
      takeLeading: effectsTestersCreators.takeLeading(value),
      takeMaybe: effectsTestersCreators.takeMaybe(value),
      throttle: effectsTestersCreators.throttle(value),
      is: effectsTestersCreators.is(value),
      inspect: effectsTestersCreators.inspect(value),
      isDone: effectsTestersCreators.isDone(done),
      returns: effectsTestersCreators.returns(value, done)
    });

    return newApi;
  }

  function restart() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length > 0) {
      finalSagaArgs = args;
    }

    history = [];
    iterator = createIterator();

    return api;
  }

  function next() {
    var arg = arguments.length <= 0 ? undefined : arguments[0];
    var result = void 0;

    if (arguments.length === 0) {
      history.push({ type: _historyTypes.NONE });
      result = iterator.next();
    } else {
      history.push({ type: _historyTypes.ARGUMENT, value: arg });
      result = iterator.next(arg);
    }

    return apiWithEffectsTesters(result);
  }

  function finish() {
    var arg = arguments.length <= 0 ? undefined : arguments[0];
    var result = void 0;

    if (arguments.length === 0) {
      history.push({ type: _historyTypes.FINISH });
      result = iterator.return();
    } else {
      history.push({ type: _historyTypes.FINISH_ARGUMENT, value: arg });
      result = iterator.return(arg);
    }

    return apiWithEffectsTesters(result);
  }

  function throwError(error) {
    history.push({ type: _historyTypes.ERROR, value: error });

    var result = iterator.throw(error);

    return apiWithEffectsTesters(result);
  }

  function restore(name) {
    if (!savePoints[name]) {
      throw new Error('No such save point ' + name);
    }

    iterator = createIterator();
    history = savePoints[name];
    return applyHistory();
  }

  function back() {
    var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    if (n > history.length) {
      throw new Error('Cannot go back any further');
    }

    var m = n;

    while (m--) {
      history.pop();
    }

    iterator = createIterator();

    return applyHistory();
  }

  function save(name) {
    savePoints[name] = history.slice(0);
    return api;
  }

  function applyHistory() {
    for (var i = 0, l = history.length; i < l; i++) {
      var arg = history[i];

      switch (arg.type) {
        case _historyTypes.NONE:
          iterator.next();
          break;

        case _historyTypes.ARGUMENT:
          iterator.next(arg.value);
          break;

        case _historyTypes.ERROR:
          iterator.throw(arg.value);
          break;

        case _historyTypes.FINISH:
          iterator.return();
          break;

        case _historyTypes.FINISH_ARGUMENT:
          iterator.return(arg.value);
          break;

        // no default
      }
    }

    return api;
  }

  return api;
}