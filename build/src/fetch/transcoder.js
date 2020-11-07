'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _transloadit = require('transloadit');

var _transloadit2 = _interopRequireDefault(_transloadit);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transloadit = new _transloadit2.default({
  authKey: _config.TRANSLOADIT_KEY,
  authSecret: _config.TRANSLOADIT_SECRET
});

var encode = function encode(imported, processing, exported) {
  var options = {
    params: {
      steps: (0, _extends3.default)({
        imported: imported
      }, processing, {
        exported: exported
      }),
      notify_url: 'https://74aeec8f.ngrok.io/instructor/detail/3d3a9568-f032-492b-9ada-4d50b74e90db'
    }
  };

  console.log('opt', options.params.steps);

  return new _promise2.default(function (resolve, reject) {
    transloadit.createAssembly(options, function (err, result) {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
};

exports.default = {
  encode: encode
};
module.exports = exports.default;