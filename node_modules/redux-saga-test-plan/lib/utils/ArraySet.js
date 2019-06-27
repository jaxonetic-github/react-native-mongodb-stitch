'use strict';

exports.__esModule = true;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _array = require('./array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable no-underscore-dangle */


var ArraySet = function () {
  function ArraySet() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ArraySet);

    this._values = values.slice(0);
  }

  ArraySet.prototype.values = function values() {
    return this._values.slice(0);
  };

  ArraySet.prototype.add = function add(value) {
    this._values.push(value);
  };

  ArraySet.prototype.has = function has(value) {
    var index = this.findIndex(value);
    return index !== -1;
  };

  ArraySet.prototype.delete = function _delete(value) {
    var index = this.findIndex(value);
    return this._deleteAtIndex(index);
  };

  ArraySet.prototype.deleteBy = function deleteBy(finder) {
    var index = this.findIndexBy(finder);
    return this._deleteAtIndex(index);
  };

  ArraySet.prototype.findIndex = function findIndex(value) {
    return this.findIndexBy(function (item) {
      return (0, _lodash2.default)(item, value);
    });
  };

  ArraySet.prototype.findIndexBy = function findIndexBy(finder) {
    return (0, _array.findIndex)(this._values, finder);
  };

  ArraySet.prototype._deleteAtIndex = function _deleteAtIndex(index) {
    if (index !== -1) {
      this._values.splice(index, 1);
      return true;
    }

    return false;
  };

  return ArraySet;
}();

exports.default = ArraySet;