'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = function log(message) {
  for (var _len = arguments.length, opt = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opt[_key - 1] = arguments[_key];
  }

  if (opt.length > 0) {
    process.env.DEBUG = message;
    var stdout = (0, _debug2.default)(message);
    _debug2.default.enable(process.env.DEBUG);
    // eslint-disable-next-line no-console
    stdout.log = console.log.bind(console);
    stdout.apply(undefined, opt);
  } else {
    _debug2.default.log.apply(_debug2.default, [message].concat(opt));
  }
};

var error = function error(message) {
  for (var _len2 = arguments.length, opt = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    opt[_key2 - 1] = arguments[_key2];
  }

  if (opt.length > 1) {
    process.env.DEBUG = message;
    var stderr = (0, _debug2.default)(message);
    _debug2.default.enable(process.env.DEBUG);
    stderr.apply(undefined, opt);
  } else {
    var _console;

    // eslint-disable-next-line no-console
    (_console = console).error.apply(_console, [message].concat(opt));
  }
};

exports.default = {
  log: log, error: error
};
module.exports = exports.default;