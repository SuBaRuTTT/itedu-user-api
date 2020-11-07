'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config');

var _utils = require('./utils');

var _fetch = require('./fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_app2.default);
var NAMESPACE = 'APP-' + _moment2.default.utc().toISOString();
// eslint-disable-next-line max-len
server.listen(_config.PORT, function _callee() {
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_fetch.storage.init());

        case 2:
          _utils.debug.log(NAMESPACE, 'ITEDU user api is listening on port ' + _config.PORT);

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
});