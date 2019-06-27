'use strict';

exports.__esModule = true;
exports.default = sagaIdFactory;
var PREFIX = '@@redux-saga-test-plan/id-';

function sagaIdFactory() {
  var id = 1;

  return function nextSagaId() {
    var newId = '' + PREFIX + id;
    id += 1;
    return newId;
  };
}