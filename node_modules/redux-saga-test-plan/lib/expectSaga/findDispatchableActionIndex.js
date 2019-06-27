'use strict';

exports.__esModule = true;
exports.default = findDispatchableActionIndex;

var _array = require('../utils/array');

function findDispatchableActionIndex(actions, pattern) {
  if (pattern == null || actions.length <= 0) {
    return -1;
  }

  if (pattern === '*') {
    return 0;
  }

  if (typeof pattern === 'function' && hasOwn(pattern, 'toString')) {
    return findDispatchableActionIndex(actions, String(pattern));
  }

  if (typeof pattern === 'function') {
    // Refinements not catching that `pattern` is a function
    // $FlowFixMe
    return (0, _array.findIndex)(actions, function (a) {
      return pattern(a);
    });
  }

  if (Array.isArray(pattern)) {
    for (var i = 0, l = pattern.length; i < l; i++) {
      var index = findDispatchableActionIndex(actions, pattern[i]);

      if (index > -1) {
        return index;
      }
    }

    return -1;
  }

  return (0, _array.findIndex)(actions, function (a) {
    return a.type === pattern;
  });
}


function hasOwn(object, key) {
  return {}.hasOwnProperty.call(object, key);
}