'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBasicInfo = exports.updateIntro = exports.updateInfo = exports.payoutCumalativeTuition = exports.registerInstructor = exports.getCourseByIdInstructor = exports.getCourses = exports.getActiveCourseAnalytics = exports.getStudentNumberAnalytics = exports.getIncomeAnalytics = exports.getInstructorInfo = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _instructorService = require('./instructorService');

var instructorService = _interopRequireWildcard(_instructorService);

var _userService = require('../user/userService');

var userService = _interopRequireWildcard(_userService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'instructorController-' + _moment2.default.utc().toISOString(); /* eslint-disable max-len */
var getInstructorInfo = exports.getInstructorInfo = function _callee(req, res, next) {
  var id, instructorInfo;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id;
          _context.next = 4;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoById(id));

        case 4:
          instructorInfo = _context.sent;

          if (instructorInfo) {
            _context.next = 7;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            // eslint-disable-next-line max-len
            message: 'Bạn chưa đăng ký làm giảng viên'
          }));

        case 7:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: instructorInfo
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting instructor info', _context.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy thông tin giảng viên'
          });

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 10]]);
};
/**
 * get data
 * @param {*} req
 * course: a course id
 * from: analytics from
 * to: analytics to
 * type: analytics by month, day, year, quarter
 */

var getIncomeAnalytics = exports.getIncomeAnalytics = function _callee2(req, res, next) {
  var id, _req$body, course, from, to, type, _ref, instructorId, data;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.user.id;
          _req$body = req.body, course = _req$body.course, from = _req$body.from, to = _req$body.to, type = _req$body.type;
          _context2.next = 5;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(id));

        case 5:
          _ref = _context2.sent;
          instructorId = _ref.id;
          _context2.next = 9;
          return _regenerator2.default.awrap(instructorService.getDataAnalytics(instructorId, course, from, to, type, 'income'));

        case 9:
          data = _context2.sent;
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: data
          }));

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting data income analytics', _context2.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy dữ liệu doanh thu'
          });

        case 17:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 13]]);
};
var getStudentNumberAnalytics = exports.getStudentNumberAnalytics = function _callee3(req, res, next) {
  var id, _req$body2, course, from, to, type, _ref2, instructorId, data;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.user.id;
          _req$body2 = req.body, course = _req$body2.course, from = _req$body2.from, to = _req$body2.to, type = _req$body2.type;
          _context3.next = 5;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(id));

        case 5:
          _ref2 = _context3.sent;
          instructorId = _ref2.id;
          _context3.next = 9;
          return _regenerator2.default.awrap(instructorService.getDataAnalytics(instructorId, course, from, to, type, 'student'));

        case 9:
          data = _context3.sent;
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: data
          }));

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting data student number analytics', _context3.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy dữ liệu số lượng học viên'
          });

        case 17:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 13]]);
};
var getActiveCourseAnalytics = exports.getActiveCourseAnalytics = function _callee4(req, res, next) {
  var id, _req$body3, course, from, to, type, _ref3, instructorId, data;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.user.id;
          _req$body3 = req.body, course = _req$body3.course, from = _req$body3.from, to = _req$body3.to, type = _req$body3.type;
          _context4.next = 5;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(id));

        case 5:
          _ref3 = _context4.sent;
          instructorId = _ref3.id;
          _context4.next = 9;
          return _regenerator2.default.awrap(instructorService.getActiveCourseAnalytics(instructorId, course, from, to, type, 'student'));

        case 9:
          data = _context4.sent;
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: data
          }));

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting data active course analytics', _context4.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy dữ liệu khóa học sôi động'
          });

        case 17:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 13]]);
};
var getCourses = exports.getCourses = function _callee5(req, res, next) {
  var id, _ref4, instructorId, courses, result;

  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.user.id;
          _context5.next = 4;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(id));

        case 4:
          _ref4 = _context5.sent;
          instructorId = _ref4.id;
          _context5.next = 8;
          return _regenerator2.default.awrap(instructorService.getCoursesById(instructorId));

        case 8:
          courses = _context5.sent;
          result = [];

          courses.map(function (ele) {
            result.push({ label: ele.title, value: ele.id });
          });
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting data instructor courses analytics', _context5.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy dữ liệu danh sách khóa học'
          });

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};
var getCourseByIdInstructor = exports.getCourseByIdInstructor = function _callee6(req, res, next) {
  var id, _req$query, limit, offset, _ref5, instructorId, courses, total;

  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.user.id;
          _req$query = req.query, limit = _req$query.limit, offset = _req$query.offset;
          _context6.next = 5;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(id));

        case 5:
          _ref5 = _context6.sent;
          instructorId = _ref5.id;
          _context6.next = 9;
          return _regenerator2.default.awrap(instructorService.getAllCoursesById(instructorId, req.query));

        case 9:
          courses = _context6.sent;
          _context6.next = 12;
          return _regenerator2.default.awrap(instructorService.getNumbetCourse(instructorId, req.query));

        case 12:
          total = _context6.sent;

          if (courses) {
            _context6.next = 15;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không tồn khóa học.',
            payload: {
              courses: []
            }
          }));

        case 15:

          courses = courses.map(function (item, index) {
            return (0, _extends3.default)({}, item, { key: item.id, index: index + 1 + limit * (offset - 1) });
          });
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              message: _utils.enums.MESSAGE.OK,
              courses: courses,
              total: total
            }
          }));

        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting data instructor courses analytics', _context6.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy dữ liệu danh sách khóa học'
          });

        case 23:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[0, 19]]);
};

var registerInstructor = exports.registerInstructor = function _callee7(req, res, next) {
  var id, isUserInstructor;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.user.id;
          _context7.next = 4;
          return _regenerator2.default.awrap(instructorService.isUserInstructor(id));

        case 4:
          isUserInstructor = _context7.sent;

          if (!isUserInstructor) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn đã đăng ký trở thành giảng viên.'
          }));

        case 9:
          _context7.next = 11;
          return _regenerator2.default.awrap(instructorService.createInstructor(id));

        case 11:
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 12:
          _context7.next = 18;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while registering to be instructor', _context7.t0);
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 18:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

var payoutCumalativeTuition = exports.payoutCumalativeTuition = function _callee8(req, res, next) {
  var id, _req$body4, password, amount, isPasswordCorrect, isBigger;

  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.user.id;
          _req$body4 = req.body, password = _req$body4.password, amount = _req$body4.amount;

          //checked in frontend but we still need to check here for safety

          if (!(amount < _utils.enums.PAYOUT_LIMIT.LOWER_LIMIT || amount > _utils.enums.PAYOUT_LIMIT.UPPER_LIMIT)) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'S\u1ED1 ti\u1EC1n r\xFAt c\u1EA7n n\u1EB1m trong kho\u1EA3ng ' + _utils.enums.PAYOUT_LIMIT.LOWER_LIMIT.toString() + ' \u0111\u1EBFn ' + _utils.enums.PAYOUT_LIMIT.UPPER_LIMIT.toString()
          }));

        case 5:
          _context8.next = 7;
          return _regenerator2.default.awrap(userService.checkPasswordOfUser(id, password));

        case 7:
          isPasswordCorrect = _context8.sent;

          if (isPasswordCorrect) {
            _context8.next = 10;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Mật khẩu không đúng, vui lòng thử lại.'
          }));

        case 10:
          _context8.next = 12;
          return _regenerator2.default.awrap(instructorService.isAmountBiggerThanTuition(id, amount));

        case 12:
          isBigger = _context8.sent;

          if (!isBigger) {
            _context8.next = 15;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Số tiền rút vượt quá số học phí tích lũy bạn đang có.'
          }));

        case 15:
          _context8.next = 17;
          return _regenerator2.default.awrap(instructorService.sendCumalativeTuition(id, amount));

        case 17:
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while sending payout', _context8.t0);
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 24:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined, [[0, 20]]);
};

var updateInfo = exports.updateInfo = function _callee9(req, res, next) {
  var instructor, result;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          instructor = req.body.instructor;
          _context9.next = 4;
          return _regenerator2.default.awrap(instructorService.updateInstructorInfo(instructor));

        case 4:
          result = _context9.sent;
          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while update instructor info', _context9.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi cập nhật thông tin'
          });

        case 12:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

var updateIntro = exports.updateIntro = function _callee10(req, res, next) {
  var id, intro, result;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.user.id;
          intro = req.body.intro;
          _context10.next = 5;
          return _regenerator2.default.awrap(instructorService.updateInstructorIntro(id, intro));

        case 5:
          result = _context10.sent;
          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while update instructor intro', _context10.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi cập nhật thông tin'
          });

        case 13:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getBasicInfo = exports.getBasicInfo = function _callee11(req, res, next) {
  var id, result;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.user.id;
          _context11.next = 4;
          return _regenerator2.default.awrap(instructorService.getInstructorBasicInfoByUserId(id));

        case 4:
          result = _context11.sent;
          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting instructor basic info', _context11.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy thông tin người dùng'
          });

        case 12:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};