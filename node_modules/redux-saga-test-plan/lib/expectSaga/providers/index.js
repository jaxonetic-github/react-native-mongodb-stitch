'use strict';

exports.__esModule = true;
exports.composeProviders = undefined;
exports.dynamic = dynamic;
exports.throwError = throwError;

var _helpers = require('./helpers');

function dynamic(fn) {
  var _ref;

  return _ref = { fn: fn }, _ref[_helpers.DYNAMIC_PROVIDER] = true, _ref;
}
function throwError(error) {
  return dynamic(function () {
    throw error;
  });
}

exports.composeProviders = _helpers.composeProviders;