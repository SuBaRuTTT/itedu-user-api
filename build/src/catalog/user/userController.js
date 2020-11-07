'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserOwnCourse = exports.getLearnedCourses = exports.uploadAvatar = exports.getCourseLikeStatus = exports.changeUserEmail = exports.getProcessCourses = exports.getInfoIntroPage = exports.userLikeCourse = exports.getFavoriteCourses = exports.changePassword = exports.updateUserProfile = exports.updateUserFavoriteCategories = exports.getRecommendedCourses = exports.getBasicUserInfo = exports.sendActivateEmail = exports.activateEmail = exports.resetPassword = exports.verifyForgetPasswordToken = exports.sendMailForgetPassword = exports.authExternal = exports.loginUser = exports.registerUser = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _fetch = require('../../fetch');

var _userService = require('./userService');

var userService = _interopRequireWildcard(_userService);

var _courseCategoryService = require('../course-category/course-categoryService');

var courseCategoryService = _interopRequireWildcard(_courseCategoryService);

var _courseService = require('../course/courseService');

var courseService = _interopRequireWildcard(_courseService);

var _categoryService = require('../category/categoryService');

var categoryService = _interopRequireWildcard(_categoryService);

var _userOwnCourseService = require('../user-own-course/user-own-courseService');

var userOwnCourse = _interopRequireWildcard(_userOwnCourseService);

var _config = require('../../config');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'userController-' + _moment2.default.utc().toISOString();
/**
 * User register
 * @param {String} body.email
 * @param {String} body.password
 * @param {String} body.name full name
 * @param {String} body.phone phone number
 */
var registerUser = exports.registerUser = function _callee(req, res, next) {
  var userInfo, emailExists, phoneExists;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userInfo = req.body;
          _context.prev = 1;
          _context.next = 4;
          return _regenerator2.default.awrap(userService.isEmailExists(userInfo.email));

        case 4:
          emailExists = _context.sent;

          if (emailExists) {
            _context.next = 16;
            break;
          }

          _context.next = 8;
          return _regenerator2.default.awrap(userService.isPhoneExists(userInfo.phone));

        case 8:
          phoneExists = _context.sent;

          if (!phoneExists) {
            _context.next = 11;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Số điện thoại đã tồn tại'
          }));

        case 11:
          _context.next = 13;
          return _regenerator2.default.awrap(userService.createUser(userInfo));

        case 13:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 16:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Email đã tồn tại'
          }));

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while registering user', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi đăng ký'
          }));

        case 23:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[1, 19]]);
};

/**
 * User login
 * @param {String} body.email
 * @param {String} body.password
 * @returns {JSON} userInfo {
 *    id: Integer,
 *    email: String,
 *    avatar: String,
 *    name: String,
 *    point: Integer,
 *    type: String [STUDENT, INSTRUCTOR]
 *    isDeleted: Boolean,
 *    createdAt: Date,
 *    updatedAt: Date
 * }
 * @returns {cookie} access_token: JWT string
 */
var loginUser = exports.loginUser = function _callee2(req, res, next) {
  var _req$body, email, password, userInfo, token;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Email hoặc/và mật khẩu không hợp lệ'
          }));

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _regenerator2.default.awrap(userService.authenticate({ email: email, password: password }));

        case 6:
          userInfo = _context2.sent;

          if (userInfo) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Sai email hoặc mật khẩu.'
          }));

        case 9:
          if (userInfo.isActivated) {
            _context2.next = 13;
            break;
          }

          _context2.next = 12;
          return _regenerator2.default.awrap(userService.sendActivateEmailToUser(email));

        case 12:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.FORBIDDEN).json({
            message: 'Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email.'
          }));

        case 13:
          if (!userInfo.isDeleted) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Tài khoản của bạn đã bị khóa.'
          }));

        case 15:
          _context2.next = 17;
          return _regenerator2.default.awrap(_utils.crypt.createAuthToken(userInfo.id));

        case 17:
          token = _context2.sent;
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            userInfo: userInfo,
            token: token
          }));

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2['catch'](3);

          _utils.debug.error(NAMESPACE, 'Error occured while logging user in', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 25:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[3, 21]]);
};

/**
 * User auth external
 * @param {Object} body.user {
 *   id: String, // I don't know why facebookId which Facebook response is string
 *   provider: String
 * }
 * @returns {cookie} access_token: JWT string
 */
var authExternal = exports.authExternal = function _callee3(req, res, next) {
  var user, id, type, userInfo, token, userResult, userId;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user = req.user;
          id = user.id;
          type = user.provider.toUpperCase();
          _context3.next = 6;
          return _regenerator2.default.awrap(userService.authenticateExternal({ id: id, type: type }));

        case 6:
          userInfo = _context3.sent;
          token = void 0;

          if (userInfo) {
            _context3.next = 28;
            break;
          }

          _context3.next = 11;
          return _regenerator2.default.awrap(userService.getUserByEmail(user.email));

        case 11:
          userResult = _context3.sent;

          if (!userResult) {
            _context3.next = 20;
            break;
          }

          _context3.next = 15;
          return _regenerator2.default.awrap(_utils.crypt.createAuthToken(userResult.id));

        case 15:
          token = _context3.sent;
          _context3.next = 18;
          return _regenerator2.default.awrap(userService.linkExternalAccountAndActivate(userResult, id, type));

        case 18:
          _context3.next = 26;
          break;

        case 20:
          _context3.next = 22;
          return _regenerator2.default.awrap(userService.createUserExternal(user, type));

        case 22:
          userId = _context3.sent;
          _context3.next = 25;
          return _regenerator2.default.awrap(_utils.crypt.createAuthToken(userId));

        case 25:
          token = _context3.sent;

        case 26:
          _context3.next = 29;
          break;

        case 28:
          if (!userInfo.isDeleted) {
            //Generate JWT token
            token = _utils.crypt.createAuthToken(userInfo.id);
          } else {
            res.cookie('is_deleted', userInfo.isDeleted, {
              domain: 'itedu.me',
              maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
              httpOnly: false
            });
          }

        case 29:

          res.cookie('access_token', token, {
            domain: 'itedu.me',
            maxAge: _config.COOKIE_EXPIRED_TIME_IN_MS,
            httpOnly: false // only http request can read the cookie
            //secure: true // use for ssl => have to comment this line when we run in localhost
          });

          res.redirect(_config.FRONTEND_URL + '/saveToken');
          _context3.next = 37;
          break;

        case 33:
          _context3.prev = 33;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while logging external', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 37:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 33]]);
};

/**
 * Send Email change pass
 * @param {String} body.email
 */
var sendMailForgetPassword = exports.sendMailForgetPassword = function _callee4(req, res, next) {
  var email, user, id, name, token;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.body.email;
          _context4.prev = 1;
          _context4.next = 4;
          return _regenerator2.default.awrap(userService.getUserByEmail(email));

        case 4:
          user = _context4.sent;

          if (user) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Email của người dùng chưa được đăng kí'
          }));

        case 9:
          id = user.id, name = user.name;
          //Generate JWT token

          _context4.next = 12;
          return _regenerator2.default.awrap(_utils.crypt.createForgetPassToken(id));

        case 12:
          token = _context4.sent;
          _context4.next = 15;
          return _regenerator2.default.awrap(_fetch.mail.sendForgetPasswordEmail(email, name, token));

        case 15:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Email đã được gửi đi'
          }));

        case 16:
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4['catch'](1);

          _utils.debug.error(NAMESPACE, 'System error when send mail forget pass', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi gửi email '
          }));

        case 22:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[1, 18]]);
};
/**
 * @param {String} res.params.token
 */
var verifyForgetPasswordToken = exports.verifyForgetPasswordToken = function _callee5(req, res, next) {
  var token, decode;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.params.token;
          _context5.prev = 1;
          _context5.next = 4;
          return _regenerator2.default.awrap(_utils.crypt.decodeForgetPassToken(token));

        case 4:
          decode = _context5.sent;

          if (decode.id) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Link bạn được cấp đã hết hạn hoặc không đúng'
          }));

        case 9:
          _context5.next = 11;
          return _regenerator2.default.awrap(userService.activateUserEmail(decode.id));

        case 11:
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Xác thực thành công',
            id: decode.id
          }));

        case 12:
          _context5.next = 18;
          break;

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5['catch'](1);

          _utils.debug.error(NAMESPACE, 'System error when verify token forget pass ', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi xác thực ',
            result: false
          }));

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[1, 14]]);
};
/**
 * @param {String} req.body.id
 * @param {String} req.body.password
 */
var resetPassword = exports.resetPassword = function _callee6(req, res, next) {
  var _req$body2, id, password, user, _id;

  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, password = _req$body2.password;
          _context6.prev = 1;
          _context6.next = 4;
          return _regenerator2.default.awrap(userService.getUserInfoById(id));

        case 4:
          user = _context6.sent;

          if (user) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Người dùng không tồn tại'
          }));

        case 9:
          _id = user.id;
          _context6.next = 12;
          return _regenerator2.default.awrap(userService.resetPasswordService(_id, password));

        case 12:
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Mật khẩu đã được đổi'
          }));

        case 13:
          _context6.next = 19;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6['catch'](1);

          _utils.debug.error(NAMESPACE, 'System error when reset password', _context6.t0);
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi đổi mật khẩu mới '
          }));

        case 19:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[1, 15]]);
};
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var activateEmail = exports.activateEmail = function _callee7(req, res, next) {
  var token, decoded, loginToken;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          token = req.body.token;
          _context7.prev = 1;
          _context7.next = 4;
          return _regenerator2.default.awrap(_utils.crypt.decodeActivateEmailToken(token));

        case 4:
          decoded = _context7.sent;
          _context7.next = 7;
          return _regenerator2.default.awrap(userService.activateUserEmail(decoded.userId));

        case 7:
          _context7.next = 9;
          return _regenerator2.default.awrap(_utils.crypt.createAuthToken(decoded.userId));

        case 9:
          loginToken = _context7.sent;
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            access_token: loginToken
          }));

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while activating email', _context7.t0);
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Hệ thống gặp lỗi khi kích hoạt email'
          }));

        case 17:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[1, 13]]);
};

var sendActivateEmail = exports.sendActivateEmail = function _callee8(req, res, next) {
  var email, emailExists, userActivated;
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          email = req.body.email;
          _context8.prev = 1;
          _context8.next = 4;
          return _regenerator2.default.awrap(userService.isEmailExists(email));

        case 4:
          emailExists = _context8.sent;

          if (!emailExists) {
            _context8.next = 18;
            break;
          }

          _context8.next = 8;
          return _regenerator2.default.awrap(userService.isUserActivated(email));

        case 8:
          userActivated = _context8.sent;

          if (!userActivated) {
            _context8.next = 13;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Tài khoản của bạn đã được kích hoạt.'
          }));

        case 13:
          _context8.next = 15;
          return _regenerator2.default.awrap(userService.sendActivateEmailToUser(email));

        case 15:
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Gửi email kích hoạt tài khoản thành công'
          }));

        case 16:
          _context8.next = 19;
          break;

        case 18:
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Tài khoản không tồn tại.'
          }));

        case 19:
          _context8.next = 25;
          break;

        case 21:
          _context8.prev = 21;
          _context8.t0 = _context8['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while sending activate email', _context8.t0);
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi gửi email kích hoạt'
          }));

        case 25:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined, [[1, 21]]);
};

/**
 * Get basic user's info with access-token after login with facebook or google
 */
var getBasicUserInfo = exports.getBasicUserInfo = function _callee9(req, res, next) {
  var id, user;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.user.id;
          _context9.prev = 1;
          _context9.next = 4;
          return _regenerator2.default.awrap(userService.getUserInfoById(id));

        case 4:
          user = _context9.sent;

          if (!user) {
            _context9.next = 9;
            break;
          }

          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: user
          }));

        case 9:
          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Tài khoản không tồn tại'
          }));

        case 10:
          _context9.next = 16;
          break;

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while get infor user', _context9.t0);
          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Có lỗi xảy ra'
          }));

        case 16:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined, [[1, 12]]);
};

/**
 * Nguyễn Linh
 * @param {*} req
 * @param {*} res
 */

var getRecommendedCourses = exports.getRecommendedCourses = function _callee10(req, res) {
  var _req$params, id, limit, offset, categoriesId, favoriteCategories, courseId, course, _course;

  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, limit = _req$params.limit, offset = _req$params.offset;
          _context10.prev = 1;
          _context10.next = 4;
          return _regenerator2.default.awrap(userService.getUserFavoriteCategoriesByUserId(id));

        case 4:
          categoriesId = _context10.sent;
          favoriteCategories = categoriesId.favoriteCategories;

          if (!(favoriteCategories && favoriteCategories.length > 0)) {
            _context10.next = 17;
            break;
          }

          _context10.next = 9;
          return _regenerator2.default.awrap(courseCategoryService.getCourseIdByCategoryId(favoriteCategories, limit, offset));

        case 9:
          courseId = _context10.sent;

          if (!(courseId && courseId.length > 0)) {
            _context10.next = 15;
            break;
          }

          _context10.next = 13;
          return _regenerator2.default.awrap(courseService.getCourseByArrayId(courseId, limit, offset));

        case 13:
          course = _context10.sent;
          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: course
          }));

        case 15:
          _context10.next = 22;
          break;

        case 17:
          _context10.next = 19;
          return _regenerator2.default.awrap(courseService.getCourseAll(limit, offset));

        case 19:
          _course = _context10.sent;

          if (!_course) {
            _context10.next = 22;
            break;
          }

          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: _course
          }));

        case 22:
          _context10.next = 28;
          break;

        case 24:
          _context10.prev = 24;
          _context10.t0 = _context10['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while get course', _context10.t0);
          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Có lỗi xảy ra'
          }));

        case 28:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined, [[1, 24]]);
};

var updateUserFavoriteCategories = exports.updateUserFavoriteCategories = function _callee11(req, res, next) {
  var id, categoryIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, categoryId, categoryInstance;

  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          id = req.user.id;
          categoryIds = req.body.categoryIds;
          _context11.prev = 2;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context11.prev = 6;
          _iterator = (0, _getIterator3.default)(categoryIds);

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context11.next = 23;
            break;
          }

          categoryId = _step.value;
          _context11.next = 12;
          return _regenerator2.default.awrap(categoryService.getCategoryById(categoryId));

        case 12:
          categoryInstance = _context11.sent;

          if (categoryInstance) {
            _context11.next = 17;
            break;
          }

          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'L\u0129nh v\u1EF1c c\xF3 ID: ' + categoryId + ' kh\xF4ng t\u1ED3n t\u1EA1i'
            //for frontend to debug more easily
          }));

        case 17:
          _context11.next = 19;
          return _regenerator2.default.awrap(userService.updateFavoriteCategories(id, categoryIds));

        case 19:
          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 20:
          _iteratorNormalCompletion = true;
          _context11.next = 8;
          break;

        case 23:
          _context11.next = 29;
          break;

        case 25:
          _context11.prev = 25;
          _context11.t0 = _context11['catch'](6);
          _didIteratorError = true;
          _iteratorError = _context11.t0;

        case 29:
          _context11.prev = 29;
          _context11.prev = 30;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 32:
          _context11.prev = 32;

          if (!_didIteratorError) {
            _context11.next = 35;
            break;
          }

          throw _iteratorError;

        case 35:
          return _context11.finish(32);

        case 36:
          return _context11.finish(29);

        case 37:
          _context11.next = 43;
          break;

        case 39:
          _context11.prev = 39;
          _context11.t1 = _context11['catch'](2);

          _utils.debug.error(NAMESPACE, 'Error occured while updating user favorite categories', _context11.t1);
          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 43:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined, [[2, 39], [6, 25, 29, 37], [30,, 32, 36]]);
};

var updateUserProfile = exports.updateUserProfile = function _callee12(req, res, next) {
  var id, userInfo, result;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id = req.user.id;
          userInfo = req.body;
          _context12.prev = 2;
          _context12.next = 5;
          return _regenerator2.default.awrap(userService.updateProfile(id, userInfo));

        case 5:
          result = _context12.sent;
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12['catch'](2);

          _utils.debug.error(NAMESPACE, 'Error occured while updating user profile', _context12.t0);
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi cập nhật tài khoản'
          }));

        case 13:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined, [[2, 9]]);
};
/**
* change password
*/
var changePassword = exports.changePassword = function _callee13(req, res, next) {
  var id, _req$body3, oldPass, newPass, check;

  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          id = req.user.id;
          _req$body3 = req.body, oldPass = _req$body3.oldPass, newPass = _req$body3.newPass;
          _context13.prev = 2;
          _context13.next = 5;
          return _regenerator2.default.awrap(userService.checkPasswordOfUser(id, oldPass));

        case 5:
          check = _context13.sent;

          if (check) {
            _context13.next = 8;
            break;
          }

          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Mật khẩu cũ không đúng'
          }));

        case 8:
          if (!(oldPass === newPass)) {
            _context13.next = 12;
            break;
          }

          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Mật khẩu bạn đổi giống mật khẩu cũ'
          }));

        case 12:
          _context13.next = 14;
          return _regenerator2.default.awrap(userService.resetPasswordService(id, newPass));

        case 14:
          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Mật khẩu đã được đổi'
          }));

        case 15:
          _context13.next = 20;
          break;

        case 17:
          _context13.prev = 17;
          _context13.t0 = _context13['catch'](2);

          _utils.debug.error(NAMESPACE, 'Error occured while changing password', _context13.t0);

        case 20:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined, [[2, 17]]);
};
var getFavoriteCourses = exports.getFavoriteCourses = function _callee14(req, res, next) {
  var id, courses;
  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.user.id;
          _context14.next = 4;
          return _regenerator2.default.awrap(userService.getUserFavoriteCoursesByUserId(id));

        case 4:
          courses = _context14.sent;
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courses
          }));

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting user favorite courses', _context14.t0);
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 12:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

//response status of the like in database (isDeleted is true or false)
var userLikeCourse = exports.userLikeCourse = function _callee15(req, res, next) {
  var id, courseId, likeStatus;
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          id = req.user.id;
          courseId = req.body.courseId;
          _context15.next = 5;
          return _regenerator2.default.awrap(userService.userLikeCourse(id, courseId));

        case 5:
          likeStatus = _context15.sent;
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            likeStatus: likeStatus
          }));

        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while liking course', _context15.t0);
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 13:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getInfoIntroPage = exports.getInfoIntroPage = function _callee16(req, res, next) {
  var result;
  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return _regenerator2.default.awrap(userService.getInfoIntroPage());

        case 2:
          result = _context16.sent;
          return _context16.abrupt('return', res.status(_httpStatusCodes2.default.OK).json(result));

        case 4:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined);
};

var getProcessCourses = exports.getProcessCourses = function _callee17(req, res, next) {
  var id, courses;
  return _regenerator2.default.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          id = req.user.id;
          _context17.next = 4;
          return _regenerator2.default.awrap(userService.getUserProcessCoursesByUserId(id));

        case 4:
          courses = _context17.sent;
          return _context17.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courses
          }));

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting user process courses', _context17.t0);
          return _context17.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 12:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

var changeUserEmail = exports.changeUserEmail = function _callee18(req, res, next) {
  var id, _req$body4, newEmail, name, emailExists;

  return _regenerator2.default.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          id = req.user.id;
          _req$body4 = req.body, newEmail = _req$body4.newEmail, name = _req$body4.name;
          _context18.next = 5;
          return _regenerator2.default.awrap(userService.isEmailExists(newEmail));

        case 5:
          emailExists = _context18.sent;

          if (emailExists) {
            _context18.next = 12;
            break;
          }

          _context18.next = 9;
          return _regenerator2.default.awrap(userService.changeEmailAndDeactivate(id, newEmail, name));

        case 9:
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 12:
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Email đã tồn tại'
          }));

        case 13:
          _context18.next = 19;
          break;

        case 15:
          _context18.prev = 15;
          _context18.t0 = _context18['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while changing user email', _context18.t0);
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 19:
        case 'end':
          return _context18.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};

var getCourseLikeStatus = exports.getCourseLikeStatus = function _callee19(req, res, next) {
  var id, courseId, likeStatus;
  return _regenerator2.default.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          id = req.user.id;
          courseId = req.params.courseId;
          _context19.next = 5;
          return _regenerator2.default.awrap(userService.getLikeStatusWithCourse(courseId, id));

        case 5:
          likeStatus = _context19.sent;
          return _context19.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            likeStatus: likeStatus
          }));

        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting course like status', _context19.t0);
          return _context19.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 13:
        case 'end':
          return _context19.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

/**
 * Endpoint to upload public avatar to GCS
 * @param {*} req
 * user: {
 *  id: String
 * }
 * @param {*} res
 *  body: {
 *  message: Tải lên ảnh đại diện thành công,
 *  payload: {
 *    url: String
 *  }
 * }
 * statusCode: 200
 */
var uploadAvatar = exports.uploadAvatar = function _callee20(req, res, next) {
  var file, userId, fileTypeRegex, isValidFileType, imgId, fileExtRegex, _file$originalname$ma, _file$originalname$ma2, fileExt, filePath, imageUrl, instance, isOwnAvatar, index, oldFileName;

  return _regenerator2.default.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          file = req.file, userId = req.user.id;
          fileTypeRegex = new RegExp('^(' + _utils.enums.FILE_TYPE.image + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);
          imgId = (0, _v2.default)();

          if (!(!file || !isValidFileType)) {
            _context20.next = 7;
            break;
          }

          return _context20.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Ảnh được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 7:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma = file.originalname.match(fileExtRegex), _file$originalname$ma2 = (0, _slicedToArray3.default)(_file$originalname$ma, 1), fileExt = _file$originalname$ma2[0];
          filePath = 'Avatar/' + imgId;
          _context20.next = 12;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: '' + filePath + fileExt,
            public: true,
            resumable: false
          }));

        case 12:
          imageUrl = _context20.sent;
          _context20.next = 15;
          return _regenerator2.default.awrap(userService.getUserInfoById(userId));

        case 15:
          instance = _context20.sent;
          isOwnAvatar = instance.avatar && instance.avatar.includes('https://storage.googleapis.com/itedu-bucket/Avatar/');

          if (!isOwnAvatar) {
            _context20.next = 22;
            break;
          }

          index = instance.avatar.indexOf('Avatar');
          oldFileName = instance.avatar.slice(index, instance.avatar.length);
          _context20.next = 22;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, oldFileName));

        case 22:
          _context20.next = 24;
          return _regenerator2.default.awrap(userService.updateProfile(userId, { avatar: imageUrl }));

        case 24:
          return _context20.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              url: imageUrl
            }
          }));

        case 27:
          _context20.prev = 27;
          _context20.t0 = _context20['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading avatar', _context20.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 31:
        case 'end':
          return _context20.stop();
      }
    }
  }, null, undefined, [[0, 27]]);
};

var getLearnedCourses = exports.getLearnedCourses = function _callee21(req, res, next) {
  var id, payload;
  return _regenerator2.default.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          id = req.user.id;
          _context21.next = 4;
          return _regenerator2.default.awrap(userService.getLearnedCoursesByUserId(id));

        case 4:
          payload = _context21.sent;
          return _context21.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: payload
          }));

        case 8:
          _context21.prev = 8;
          _context21.t0 = _context21['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting learned courses', _context21.t0);
          return _context21.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 12:
        case 'end':
          return _context21.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

var checkUserOwnCourse = exports.checkUserOwnCourse = function _callee22(req, res, next) {
  var id, courseId, isUserOwnCourse, isInstructorOwnCourse;
  return _regenerator2.default.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          id = req.user.id;
          courseId = req.params.courseId;
          _context22.next = 5;
          return _regenerator2.default.awrap(userOwnCourse.isUserOwnCourse(courseId, id));

        case 5:
          isUserOwnCourse = _context22.sent;
          _context22.next = 8;
          return _regenerator2.default.awrap(courseService.isInstructorOwnCourse(courseId, id));

        case 8:
          isInstructorOwnCourse = _context22.sent;
          return _context22.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: { isUserOwnCourse: isUserOwnCourse, isInstructorOwnCourse: isInstructorOwnCourse }
          }));

        case 12:
          _context22.prev = 12;
          _context22.t0 = _context22['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get data', _context22.t0);
          return _context22.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Có lỗi xảy ra'
          }));

        case 16:
        case 'end':
          return _context22.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};