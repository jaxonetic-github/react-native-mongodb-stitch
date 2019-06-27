"use strict";

exports.__esModule = true;
exports.splitAt = splitAt;
var findIndex = exports.findIndex = [].findIndex ? function findIndex(array, fn) {
  return array.findIndex(fn);
} : function findIndex(array, fn) {
  for (var i = 0, l = array.length; i < l; i++) {
    if (fn(array[i], i, array)) {
      return i;
    }
  }

  return -1;
};
/* eslint-disable import/prefer-default-export */

function splitAt(array, index) {
  return [array.slice(0, index), array.slice(index)];
}