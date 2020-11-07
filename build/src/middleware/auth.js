'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = auth;

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _basicAuth = require('basic-auth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

var _utils = require('../utils');

var _config = require('../config');

var _userService = require('../catalog/user/userService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function auth() {
  var _this = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function _callee(req, res, next) {
    var _options$isInstructor, isInstructor, user, authenticate, authByToken, authByBasicHeader;

    return _regenerator2.default.async(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            authByBasicHeader = function authByBasicHeader(req) {
              var credentials, _user2;

              return _regenerator2.default.async(function authByBasicHeader$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      credentials = void 0;
                      _context3.prev = 1;

                      credentials = (0, _basicAuth2.default)(req);
                      _context3.next = 5;
                      return _regenerator2.default.awrap((0, _userService.authenticate)({
                        email: credentials.name, password: credentials.pass
                      }));

                    case 5:
                      _user2 = _context3.sent;
                      return _context3.abrupt('return', _user2);

                    case 9:
                      _context3.prev = 9;
                      _context3.t0 = _context3['catch'](1);
                      return _context3.abrupt('return', null);

                    case 12:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, null, this, [[1, 9]]);
            };

            authByToken = function authByToken(token) {
              var decoded, _user;

              return _regenerator2.default.async(function authByToken$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      decoded = void 0;
                      _context2.prev = 1;
                      _context2.next = 4;
                      return _regenerator2.default.awrap(_jsonwebtoken2.default.verify(token, _config.JWT_SECRET));

                    case 4:
                      decoded = _context2.sent;
                      _context2.next = 7;
                      return _regenerator2.default.awrap((0, _userService.getUserInfoById)(decoded.id));

                    case 7:
                      _user = _context2.sent;
                      return _context2.abrupt('return', _user);

                    case 11:
                      _context2.prev = 11;
                      _context2.t0 = _context2['catch'](1);
                      return _context2.abrupt('return', null);

                    case 14:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, null, this, [[1, 11]]);
            };

            authenticate = function authenticate() {
              var auth, user;
              return _regenerator2.default.async(function authenticate$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      auth = req.headers.authorization;
                      _context.next = 3;
                      return _regenerator2.default.awrap(auth ? auth.startsWith('Bearer') ? authByToken(auth.substring('Bearer '.length)) : authByBasicHeader(req) : null);

                    case 3:
                      user = _context.sent;
                      return _context.abrupt('return', user);

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, null, this);
            };

            _options$isInstructor = options.isInstructor, isInstructor = _options$isInstructor === undefined ? false : _options$isInstructor;
            _context4.next = 6;
            return _regenerator2.default.awrap(authenticate());

          case 6:
            user = _context4.sent;

            if (!user) {
              _context4.next = 21;
              break;
            }

            if (user.isActivated) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt('return', res.status(_httpStatusCodes2.default.FORBIDDEN).json({
              message: 'Tài khoản của bạn chưa được kích hoạt.'
            }));

          case 10:
            if (!user.isDeleted) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt('return', res.status(_httpStatusCodes2.default.FORBIDDEN).json({
              message: 'Tài khoản của bạn đã bị khóa.'
            }));

          case 12:
            if (!(isInstructor && user.type === _utils.enums.USER_TYPE.STUDENT)) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt('return', res.status(_httpStatusCodes2.default.FORBIDDEN).json({
              message: 'Bạn phải đăng ký làm giảng viên mới có thể vào được trang này.'
            }));

          case 14:

            req.user = user;
            _context4.t0 = next;

            if (!_context4.t0) {
              _context4.next = 19;
              break;
            }

            _context4.next = 19;
            return _regenerator2.default.awrap(next());

          case 19:
            _context4.next = 22;
            break;

          case 21:
            return _context4.abrupt('return', res.status(_httpStatusCodes2.default.UNAUTHORIZED).json({
              message: 'Bạn phải đăng nhập mới có thể vào được trang này'
            }));

          case 22:
          case 'end':
            return _context4.stop();
        }
      }
    }, null, _this);
  };
}
// eslint-disable-next-line max-len
module.exports = exports.default;