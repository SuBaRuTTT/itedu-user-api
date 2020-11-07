'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userGetFreeCourses = exports.getCourseInfo = exports.responseMoMoIPNPaymentResult = exports.responseMoMoPaymentResult = exports.checkoutMoMo = exports.responseVNPayPaymentResult = exports.checkoutVNPay = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _paymentService = require('./paymentService');

var paymentService = _interopRequireWildcard(_paymentService);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _utils = require('../../utils');

var _config = require('../../config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'paymentController-' + _moment2.default.utc().toISOString();

/**
 * checking out with VNPay
 * @param {String} body.courseId
 */

var checkoutVNPay = exports.checkoutVNPay = function _callee(req, res, next) {
  var id, courseId, didUserBuyCourse, ipAddr, vnpUrl;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.user.id;
          courseId = req.body.courseId;
          _context.next = 5;
          return _regenerator2.default.awrap(paymentService.didUserBuyCourse(courseId, id));

        case 5:
          didUserBuyCourse = _context.sent;

          if (!didUserBuyCourse) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            messsage: 'Bạn đã từng mua khóa học này.'
          }));

        case 8:
          ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
          _context.next = 11;
          return _regenerator2.default.awrap(paymentService.createVNPayPaymentURL(ipAddr, courseId, id));

        case 11:
          vnpUrl = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            checkoutUrl: vnpUrl
          }));

        case 15:
          _context.prev = 15;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while checking out with VNPay', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 19:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};

var responseVNPayPaymentResult = exports.responseVNPayPaymentResult = function _callee2(req, res, next) {
  var vnpParams, courseLink;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          vnpParams = req.query;
          _context2.next = 4;
          return _regenerator2.default.awrap(paymentService.isVNPayPaymentSuccess(vnpParams));

        case 4:
          courseLink = _context2.sent;

          //VNPay doesnt responses error message
          if (courseLink) {
            res.cookie('result', 'success', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.cookie('message', 'Giao dịch thành công.', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.cookie('courseLink', courseLink, {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.redirect(_config.FRONTEND_URL + '/payment-result');
          } else {
            res.cookie('result', 'fail', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.cookie('message', 'Giao dịch thất bại.', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });
            res.redirect(_config.FRONTEND_URL + '/payment-result');
          }
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while handling VNPay return', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

/**
 * checking out with MoMo
 * @param {String} body.courseId
 */

var checkoutMoMo = exports.checkoutMoMo = function _callee3(req, res, next) {
  var id, courseId, didUserBuyCourse, momoPaymentUrl;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.user.id;
          courseId = req.body.courseId;
          _context3.next = 5;
          return _regenerator2.default.awrap(paymentService.didUserBuyCourse(courseId, id));

        case 5:
          didUserBuyCourse = _context3.sent;

          if (!didUserBuyCourse) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            messsage: 'Bạn đã từng mua khóa học này.'
          }));

        case 8:
          _context3.next = 10;
          return _regenerator2.default.awrap(paymentService.getMoMoPayUrl(courseId, id));

        case 10:
          momoPaymentUrl = _context3.sent;
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            checkoutUrl: momoPaymentUrl
          }));

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while checking out with MoMo', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 18:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

var responseMoMoPaymentResult = exports.responseMoMoPaymentResult = function _callee4(req, res, next) {
  var momoParams, courseLink;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          momoParams = req.query;


          res.cookie('message', momoParams.localMessage, {
            domain: 'itedu.me',
            maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
            httpOnly: false // only http request can read the cookie
          });

          _context4.next = 5;
          return _regenerator2.default.awrap(paymentService.isMoMoPaymentSuccess(momoParams));

        case 5:
          courseLink = _context4.sent;

          //MoMo responses error message so we can print for user
          if (courseLink) {
            res.cookie('result', 'success', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.cookie('courseLink', courseLink, {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            // eslint-disable-next-line max-len
            res.redirect(_config.FRONTEND_URL + '/payment-result');
          } else {
            res.cookie('result', 'fail', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });
            //result can be fail but localMessage can be Thành công if wrong signature
            res.redirect(_config.FRONTEND_URL + '/payment-result');
          }
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while handling MoMo return', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 13:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var responseMoMoIPNPaymentResult = exports.responseMoMoIPNPaymentResult = function _callee5(req, res, next) {
  var momoParams, courseLink;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          momoParams = req.query;


          res.cookie('message', momoParams.localMessage, {
            domain: 'itedu.me',
            maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
            httpOnly: false // only http request can read the cookie
          });
          //MoMo responses error message so we can print for user
          _context5.next = 5;
          return _regenerator2.default.awrap(paymentService.isMoMoPaymentSuccess(momoParams));

        case 5:
          courseLink = _context5.sent;

          if (courseLink) {
            res.cookie('result', 'success', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            res.cookie('courseLink', courseLink, {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });

            // eslint-disable-next-line max-len
            res.redirect(_config.FRONTEND_URL + '/payment-result');
          } else {
            res.cookie('result', 'fail', {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false // only http request can read the cookie
            });
            //result can be fail but localMessage can be Thành công if wrong signature
            res.redirect(_config.FRONTEND_URL + '/payment-result');
          }
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while handling MoMo return', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 13:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getCourseInfo = exports.getCourseInfo = function _callee6(req, res, next) {
  var courseId, id, courseInfo, didUserBuyCourse;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          courseId = req.params.courseId;
          id = req.user.id;
          _context6.next = 5;
          return _regenerator2.default.awrap(paymentService.getCourseInfo(courseId));

        case 5:
          courseInfo = _context6.sent;

          if (!courseInfo) {
            _context6.next = 13;
            break;
          }

          _context6.next = 9;
          return _regenerator2.default.awrap(paymentService.didUserBuyCourse(courseId, id));

        case 9:
          didUserBuyCourse = _context6.sent;
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: courseInfo,
            didUserBuyCourse: didUserBuyCourse
          }));

        case 13:
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            messsage: 'Không tìm thấy thông tin khóa học.'
          }));

        case 14:
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting course info', _context6.t0);
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 20:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[0, 16]]);
};

var userGetFreeCourses = exports.userGetFreeCourses = function _callee7(req, res, next) {
  var courseId, id, didUserBuyCourse, isCourseFree, courseLink;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          courseId = req.body.courseId;
          id = req.user.id;
          _context7.next = 5;
          return _regenerator2.default.awrap(paymentService.didUserBuyCourse(courseId, id));

        case 5:
          didUserBuyCourse = _context7.sent;

          if (!didUserBuyCourse) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            messsage: 'Bạn đã từng mua khóa học này.'
          }));

        case 8:
          _context7.next = 10;
          return _regenerator2.default.awrap(paymentService.isCourseFree(courseId));

        case 10:
          isCourseFree = _context7.sent;

          if (!isCourseFree) {
            _context7.next = 18;
            break;
          }

          _context7.next = 14;
          return _regenerator2.default.awrap(paymentService.createFreeUserOwnCourse(id, courseId));

        case 14:
          courseLink = _context7.sent;
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            messsage: _utils.enums.MESSAGE.OK,
            freeCourseLink: courseLink
          }));

        case 18:
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            messsage: 'Khóa học này không phải là khóa học miễn phí.'
          }));

        case 19:
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while user get free courses', _context7.t0);
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 25:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[0, 21]]);
};