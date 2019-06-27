"use strict";

exports.__esModule = true;
exports.mapValues = mapValues;

/* eslint-disable no-param-reassign, import/prefer-default-export */
function mapValues(object, fn) {
  return Object.keys(object).reduce(function (memo, key) {
    memo[key] = fn(object[key]);
    return memo;
  }, {});
}