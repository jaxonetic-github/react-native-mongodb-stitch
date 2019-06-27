'use strict';

exports.__esModule = true;
exports.default = deprecate;

var _logging = require('../utils/logging');

function deprecate(fn, message) {
  var printed = false;

  return function () {
    if (!printed) {
      (0, _logging.warn)(message);
      printed = true;
    }

    return fn.apply(undefined, arguments);
  };
}