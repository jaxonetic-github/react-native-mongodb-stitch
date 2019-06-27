'use strict';

exports.__esModule = true;
exports.DYNAMIC_PROVIDER = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.composeProviders = composeProviders;
exports.applyProviders = applyProviders;
exports.coalesceProviders = coalesceProviders;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.ismatch');

var _lodash4 = _interopRequireDefault(_lodash3);

var _provideValue = require('../provideValue');

var _helpers = require('../matchers/helpers');

var _parseEffect = require('../parseEffect');

var _parseEffect2 = _interopRequireDefault(_parseEffect);

var _object = require('../../utils/object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DYNAMIC_PROVIDER = exports.DYNAMIC_PROVIDER = '@@redux-saga-test-plan/dynamic-provider';

function isDynamicallyProvidedValue(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && DYNAMIC_PROVIDER in value;
}

function composeProviders() {
  for (var _len = arguments.length, providers = Array(_len), _key = 0; _key < _len; _key++) {
    providers[_key] = arguments[_key];
  }

  return function (effect, next) {
    for (var i = 0, l = providers.length; i < l; i++) {
      var provider = providers[i];
      var result = provider(effect, next);

      if (result !== _provideValue.NEXT) {
        return result;
      }
    }

    return _provideValue.NEXT;
  };
}

function applyProviders(providerFns) {
  return composeProviders.apply(undefined, providerFns);
}

function coalesceProviders(providers) {
  var collected = {};

  function addToCollected(key, value) {
    if (key in collected) {
      collected[key].push(value);
    } else {
      collected[key] = [value];
    }
  }

  providers.forEach(function (providersObject) {
    if (Array.isArray(providersObject)) {
      var expectedEffect = providersObject[0],
          providedValue = providersObject[1];


      var parsedEffect = void 0;
      var comparer = void 0;

      if ((0, _helpers.isPartialMatcher)(expectedEffect)) {
        parsedEffect = expectedEffect;
        comparer = _lodash4.default;
      } else {
        parsedEffect = (0, _parseEffect2.default)(expectedEffect);
        comparer = _lodash2.default;
      }

      if (parsedEffect.providerKey && parsedEffect.effect) {
        addToCollected(parsedEffect.providerKey, function (actualEffect, next) {
          var pass = comparer(actualEffect, parsedEffect.effect);

          if (isDynamicallyProvidedValue(providedValue) && pass) {
            return providedValue.fn(actualEffect, next);
          }

          return pass ? providedValue : next();
        });
      }
    } else {
      Object.keys(providersObject).forEach(function (providerKey) {
        // $FlowFixMe
        var provider = providersObject[providerKey];
        addToCollected(providerKey, provider);
      });
    }
  });

  return (0, _object.mapValues)(collected, applyProviders);
}