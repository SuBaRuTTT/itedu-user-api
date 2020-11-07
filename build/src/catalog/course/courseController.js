'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instructorGetCourseDetail = exports.reportCourse = exports.getCoursesByUserFavoriteCategories = exports.searchCourse = exports.getRatingCourse = exports.ratingCourse = exports.getProcessCourse = exports.getCourseWithLessonDetail = exports.deleteCourseById = exports.uploadPromoVid = exports.uploadAvatar = exports.updateCourseById = exports.createCourse = exports.getCourseDetailByCourseId = exports.getCourseById = exports.getCourseNumber = exports.getTopRatedCourseHome = exports.getTopSellCourse = exports.getTopNewCourse = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _lodash = require('lodash');

var _utils = require('../../utils');

var _config = require('../../config');

var _fetch = require('../../fetch');

var _courseService = require('./courseService');

var courseService = _interopRequireWildcard(_courseService);

var _courseCategoryService = require('../course-category/course-categoryService');

var courseCategoryService = _interopRequireWildcard(_courseCategoryService);

var _instructorService = require('../instructor/instructorService');

var instructorService = _interopRequireWildcard(_instructorService);

var _userRateCourseService = require('../user-rate-course/user-rate-courseService');

var userRateCourseService = _interopRequireWildcard(_userRateCourseService);

var _reportService = require('../report/reportService');

var reportService = _interopRequireWildcard(_reportService);

var _userOwnCourseService = require('../user-own-course/user-own-courseService');

var userOwnCourse = _interopRequireWildcard(_userOwnCourseService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'courseController-' + _moment2.default.utc().toISOString();

var getTopNewCourse = exports.getTopNewCourse = function _callee(req, res, next) {
  var _req$body, limit, page, topNewCourseList;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, limit = _req$body.limit, page = _req$body.page;
          _context.next = 4;
          return _regenerator2.default.awrap(courseService.getTopNewCourseList(page, limit));

        case 4:
          topNewCourseList = _context.sent;

          if (!topNewCourseList) {
            _context.next = 7;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: topNewCourseList
          }));

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting new courses', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy khóa học mới'
          }));

        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getTopSellCourse = exports.getTopSellCourse = function _callee2(req, res, next) {
  var _req$body2, limit, page, topSellCourseList;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, limit = _req$body2.limit, page = _req$body2.page;
          _context2.next = 4;
          return _regenerator2.default.awrap(courseService.getTopSellCourseList(page, limit));

        case 4:
          topSellCourseList = _context2.sent;

          if (!topSellCourseList) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: topSellCourseList
          }));

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting top sell courses', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy top khóa học bán được'
          }));

        case 13:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getTopRatedCourseHome = exports.getTopRatedCourseHome = function _callee3(req, res, next) {
  var _req$body3, limit, page, recommendCourseList;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, limit = _req$body3.limit, page = _req$body3.page;
          _context3.next = 4;
          return _regenerator2.default.awrap(courseService.getTopRatedCourseHome(page, limit));

        case 4:
          recommendCourseList = _context3.sent;

          if (!recommendCourseList) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: recommendCourseList
          }));

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting top sell courses', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy top khóa học bán được'
          }));

        case 13:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var getCourseNumber = exports.getCourseNumber = function _callee4(req, res, next) {
  var num;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _regenerator2.default.awrap(courseService.getNumberOfCourse());

        case 3:
          num = _context4.sent;

          if (!num) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: num
          }));

        case 6:
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting number of courses', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi đếm khóa học'
          }));

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

var getCourseById = exports.getCourseById = function _callee5(req, res, next) {
  var _req$query, id, includePending, courseInfo, result, categoryIds;

  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query = req.query, id = _req$query.id, includePending = _req$query.includePending;
          _context5.next = 4;
          return _regenerator2.default.awrap(courseService.getCourseInfoById(id, { includePending: includePending }));

        case 4:
          courseInfo = _context5.sent;

          if (!courseInfo) {
            _context5.next = 14;
            break;
          }

          _context5.next = 8;
          return _regenerator2.default.awrap(courseCategoryService.getCategoryIdByCourseId(courseInfo.id));

        case 8:
          result = _context5.sent;
          categoryIds = result.map(function (item) {
            return item.categoryId;
          });

          courseInfo.categoryIds = categoryIds;
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courseInfo
          }));

        case 14:
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khóa học không tồn tại'
          }));

        case 15:
          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting course information', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi truy vấn thông tin khóa học'
          }));

        case 21:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 17]]);
};

var getCourseDetailByCourseId = exports.getCourseDetailByCourseId = function _callee6(req, res, next) {
  var _req$params, id, userId, courseInfo;

  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$params = req.params, id = _req$params.id, userId = _req$params.userId;
          _context6.next = 4;
          return _regenerator2.default.awrap(courseService.getCourseDetailByCourseId(id, userId));

        case 4:
          courseInfo = _context6.sent;

          if (!courseInfo) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courseInfo
          }));

        case 9:
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khóa học không tồn tại'
          }));

        case 10:
          _context6.next = 16;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting course information', _context6.t0);
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi truy vấn thông tin khóa học'
          }));

        case 16:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};

/**
 *
 * @param {*} req
 * body {
 *   courseInfo: {
 *     title: String,
 *     subtitle: String,
 *     price: Integer //It's just optional since this endpoint is used for create course phase 1
 *     //Price and caption will be updated in phase 2
 *     description: String,
 *     categoryIds: arrayString,
 *     requirement: arrayString,
 *     learnWhat: arrayString
 *   }
 * }
 * @param {*} res
 * body: {
 *  payload: {
 *    courseId: uuid
 *  }
 *  message: Tạo khoá học thành công
 * }
 * statusCode: 200
 */
var createCourse = exports.createCourse = function _callee7(req, res, next) {
  var userId, courseInfo, _ref, instructorId, courseId, _courseInfo, categoryIds, promises;

  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.user.id;
          courseInfo = req.body.courseInfo;

          if (!(!courseInfo || (0, _lodash.isEmpty)(courseInfo.categoryIds))) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khoá học thiếu thông tin để tạo'
          }));

        case 5:
          _context7.next = 7;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoByUserId(userId));

        case 7:
          _ref = _context7.sent;
          instructorId = _ref.id;


          courseInfo = (0, _extends3.default)({
            instructorId: instructorId
          }, courseInfo);
          _context7.next = 12;
          return _regenerator2.default.awrap(courseService.createCourse(courseInfo));

        case 12:
          courseId = _context7.sent;


          // It's not necessary to add category one by one, just add in parallel
          _courseInfo = courseInfo, categoryIds = _courseInfo.categoryIds;
          promises = categoryIds.map(function (categoryId) {
            return courseCategoryService.addCategoryToCourseById(courseId, categoryId);
          });
          _context7.next = 17;
          return _regenerator2.default.awrap(_promise2.default.all(promises));

        case 17:
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              courseId: courseId,
              courseInfo: courseInfo
            },
            message: _utils.enums.MESSAGE.OK
          }));

        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while creating course', _context7.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 24:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[0, 20]]);
};

/**
 * @param {Object} req
 *  body: {
 *   courseInfo: {
 *     id: String,
 *     title: String,
 *     subtitle: String,
 *     price: String
 *     description: String,
 *     categoryIds: arrayString,
 *     requirement: arrayString,
 *     learnWhat: arrayString,
 *     imageUrl: String, // public url
 *     promoVidUrl: String, // public url
 *     price: Integer,
 *     status: String
 *   }
 * }
 * @param {Object} res
 *  body: {
 *  message: Cập nhật khoá học thành công
 * }
 * statusCode: 200
 */
var updateCourseById = exports.updateCourseById = function _callee8(req, res, next) {
  var courseInfo, id, status, categoryIds;
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          courseInfo = req.body.courseInfo;

          if (!(!courseInfo || !courseInfo.id)) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khoá học thiếu thông tin để cập nhật'
          }));

        case 4:
          id = courseInfo.id, status = courseInfo.status, categoryIds = courseInfo.categoryIds;

          delete courseInfo.id;

          if (!(status && !(0, _lodash.includes)(_utils.enums.COURSE_STATUS, status))) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Trạng thái của khoá học không hợp lệ'
          }));

        case 8:
          _context8.next = 10;
          return _regenerator2.default.awrap(courseService.updateCourseInfo(id, courseInfo));

        case 10:
          _context8.next = 12;
          return _regenerator2.default.awrap(courseCategoryService.updateCourseCategory(id, categoryIds));

        case 12:
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: (0, _extends3.default)({}, courseInfo)
          }));

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating course info', _context8.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 19:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};

/**
 * Endpoint to upload public avatar to GCS
 * @param {*} req
 * query: {
 *  courseId: String
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
var uploadAvatar = exports.uploadAvatar = function _callee9(req, res, next) {
  var file, courseId, fileTypeRegex, isValidFileType, imgId, instance, fileExtRegex, _file$originalname$ma, _file$originalname$ma2, fileExt, filePath, imageUrl, index, oldFileName;

  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          file = req.file;
          courseId = req.query.courseId;
          fileTypeRegex = new RegExp('^(' + _utils.enums.FILE_TYPE.image + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);
          imgId = (0, _v2.default)();

          if (!(!file || !isValidFileType)) {
            _context9.next = 8;
            break;
          }

          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Ảnh được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 8:
          _context9.next = 10;
          return _regenerator2.default.awrap(courseService.getCourseInfoById(courseId, { includePending: true }));

        case 10:
          instance = _context9.sent;

          if (instance) {
            _context9.next = 13;
            break;
          }

          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khoá học không tồn tại'
          }));

        case 13:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma = file.originalname.match(fileExtRegex), _file$originalname$ma2 = (0, _slicedToArray3.default)(_file$originalname$ma, 1), fileExt = _file$originalname$ma2[0];
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/avatar/' + imgId;
          _context9.next = 18;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: '' + filePath + fileExt,
            public: true,
            resumable: false
          }));

        case 18:
          imageUrl = _context9.sent;

          if (!instance.imageUrl) {
            _context9.next = 24;
            break;
          }

          index = instance.imageUrl.indexOf('' + _config.GCP_STORAGE_COURSE_PATH_NAME);
          oldFileName = instance.imageUrl.slice(index, instance.imageUrl.length);
          _context9.next = 24;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, oldFileName));

        case 24:
          _context9.next = 26;
          return _regenerator2.default.awrap(courseService.updateCourseInfo(courseId, { imageUrl: imageUrl }));

        case 26:
          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              url: imageUrl
            }
          }));

        case 29:
          _context9.prev = 29;
          _context9.t0 = _context9['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading avatar', _context9.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 33:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined, [[0, 29]]);
};

/**
 * Endpoint to upload public promotional video to GCS
 * @param {*} req
 * query: {
 *  courseId: String
 * }
 * @param {*} res
 *  body: {
 *  message: Tải lên video quảng cáo thành công,
 *  payload: {
 *    url: String
 *  }
 * }
 * statusCode: 200
 */
var uploadPromoVid = exports.uploadPromoVid = function _callee10(req, res, next) {
  var file, courseId, fileTypeRegex, isValidFileType, videoId, instance, fileExtRegex, _file$originalname$ma3, _file$originalname$ma4, fileExt, filePath, promoVidUrl, index, oldFileName;

  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          file = req.file;
          courseId = req.query.courseId;
          fileTypeRegex = new RegExp('^(' + _utils.enums.FILE_TYPE.video + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);
          videoId = (0, _v2.default)();

          if (!(!file || !isValidFileType)) {
            _context10.next = 8;
            break;
          }

          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Video quảng cáo được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 8:
          if (courseId) {
            _context10.next = 10;
            break;
          }

          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin khoá học để tải lên video quảng cáo'
          }));

        case 10:
          _context10.next = 12;
          return _regenerator2.default.awrap(courseService.getCourseInfoById(courseId, { includePending: true }));

        case 12:
          instance = _context10.sent;

          if (instance) {
            _context10.next = 15;
            break;
          }

          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khoá học không tồn tại'
          }));

        case 15:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma3 = file.originalname.match(fileExtRegex), _file$originalname$ma4 = (0, _slicedToArray3.default)(_file$originalname$ma3, 1), fileExt = _file$originalname$ma4[0];
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/promo/' + videoId;
          _context10.next = 20;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: '' + filePath + fileExt,
            public: true,
            resumable: false
          }));

        case 20:
          promoVidUrl = _context10.sent;

          if (!instance.promoVidUrl) {
            _context10.next = 26;
            break;
          }

          index = instance.promoVidUrl.indexOf('' + _config.GCP_STORAGE_COURSE_PATH_NAME);
          oldFileName = instance.promoVidUrl.slice(index, instance.promoVidUrl.length);
          _context10.next = 26;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, oldFileName));

        case 26:
          _context10.next = 28;
          return _regenerator2.default.awrap(courseService.updateCourseInfo(courseId, { promoVidUrl: promoVidUrl }));

        case 28:
          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              url: promoVidUrl
            }
          }));

        case 31:
          _context10.prev = 31;
          _context10.t0 = _context10['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading promotional video', _context10.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 35:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined, [[0, 31]]);
};

/**
 * Delete course by id
 * @param {*} req
 * body: {
 *  courseId: String
 * }
 * @param {*} res
 * body: {
 *  message: OK
 * }
 */
var deleteCourseById = exports.deleteCourseById = function _callee11(req, res, next) {
  var courseId;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          courseId = req.body.courseId;

          if (courseId) {
            _context11.next = 4;
            break;
          }

          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id để xoá khoá học'
          }));

        case 4:
          _context11.next = 6;
          return _regenerator2.default.awrap(courseService.deleteCourseById(courseId));

        case 6:
          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              courseId: courseId
            }
          }));

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while deleting course', _context11.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 13:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

/**
 * Params: {idCourse: string}
 * Description: Get course detail: course info + section
 *              + lesson (not url video) + instrutor (id, name)
 * Issue: #69
 */
var getCourseWithLessonDetail = exports.getCourseWithLessonDetail = function _callee12(req, res, next) {
  var courseId, studentId, isUserOwnCourse, result;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          courseId = req.params.courseId;
          studentId = req.user.id;

          // check does user own course or not

          _context12.next = 5;
          return _regenerator2.default.awrap(userOwnCourse.isUserOwnCourse(courseId, studentId));

        case 5:
          isUserOwnCourse = _context12.sent;

          if (!isUserOwnCourse) {
            _context12.next = 11;
            break;
          }

          _context12.next = 9;
          return _regenerator2.default.awrap(courseService.getCourseInfoAndListSectionLesson(courseId, studentId));

        case 9:
          result = _context12.sent;
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập khóa học này.'
          }));

        case 14:
          _context12.prev = 14;
          _context12.t0 = _context12['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting video lesson', _context12.t0);
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy video bài học'
          }));

        case 18:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
 * Params: {idCourse: string}
 * Description: Get process course (%)
 * Issue: #69
 */
var getProcessCourse = exports.getProcessCourse = function _callee13(req, res, next) {
  var courseId, userId, isUserOwnCourse, result;
  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          courseId = req.params.courseId;
          userId = req.user.id;

          // check does user own course or not

          _context13.next = 5;
          return _regenerator2.default.awrap(userOwnCourse.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context13.sent;

          if (!isUserOwnCourse) {
            _context13.next = 11;
            break;
          }

          _context13.next = 9;
          return _regenerator2.default.awrap(courseService.getProcessCourse(courseId, userId));

        case 9:
          result = _context13.sent;
          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập khóa học này.'
          }));

        case 14:
          _context13.prev = 14;
          _context13.t0 = _context13['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting process course', _context13.t0);
          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy quá trình học.'
          }));

        case 18:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
 * Params: {idCourse: string}
 * Description: Rating course
 * Create date: 05/02/2020
 */
var ratingCourse = exports.ratingCourse = function _callee14(req, res, next) {
  var _req$body4, courseId, formalityPoint, contentPoint, presentationPoint, content, userId, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _req$body4 = req.body, courseId = _req$body4.courseId, formalityPoint = _req$body4.formalityPoint, contentPoint = _req$body4.contentPoint, presentationPoint = _req$body4.presentationPoint, content = _req$body4.content;
          userId = req.user.id;

          // check does user own course or not

          _context14.next = 5;
          return _regenerator2.default.awrap(userOwnCourse.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context14.sent;

          if (!isUserOwnCourse) {
            _context14.next = 11;
            break;
          }

          _context14.next = 9;
          return _regenerator2.default.awrap(courseService.ratingCourse({ userId: userId, courseId: courseId, formalityPoint: formalityPoint, contentPoint: contentPoint, presentationPoint: presentationPoint, content: content }));

        case 9:
          result = _context14.sent;
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập khóa học này.'
          }));

        case 14:
          _context14.prev = 14;
          _context14.t0 = _context14['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while rating course', _context14.t0);
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi đánh giá khóa học.'
          }));

        case 18:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
 * Params: {idCourse: string}
 * Description: get rating detail
 * Create date: 05/02/2020
 */
var getRatingCourse = exports.getRatingCourse = function _callee15(req, res, next) {
  var courseId, userId, result;
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          courseId = req.params.courseId;
          userId = req.user.id;
          _context15.next = 5;
          return _regenerator2.default.awrap(userRateCourseService.getRating({ userId: userId, courseId: courseId }));

        case 5:
          result = _context15.sent;
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while geting rate course info', _context15.t0);
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy thông tin đánh giá khóa học.'
          }));

        case 13:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var searchCourse = exports.searchCourse = function _callee16(req, res, next) {
  var _req$body5, keyword, opt, limit, offset, _ref2, rows, count;

  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _req$body5 = req.body, keyword = _req$body5.keyword, opt = _req$body5.opt;
          limit = req.body.limit || 10;
          offset = req.body.offset || 0;
          _context16.next = 6;
          return _regenerator2.default.awrap(courseService.searchCourse({ keyword: keyword, opt: opt, limit: limit, offset: offset }));

        case 6:
          _ref2 = _context16.sent;
          rows = _ref2.rows;
          count = _ref2.count;
          return _context16.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: { rows: rows, count: count }
          }));

        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while searching course', _context16.t0);
          return _context16.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi tìm khóa học'
          }));

        case 16:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};

var getCoursesByUserFavoriteCategories = exports.getCoursesByUserFavoriteCategories = function _callee17(req, res, next) {
  var userId, courseList;
  return _regenerator2.default.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          userId = req.body.userId;
          _context17.next = 4;
          return _regenerator2.default.awrap(courseService.getCoursesByUserFavoriteCategories(userId));

        case 4:
          courseList = _context17.sent;

          if (!courseList) {
            _context17.next = 7;
            break;
          }

          return _context17.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courseList
          }));

        case 7:
          _context17.next = 13;
          break;

        case 9:
          _context17.prev = 9;
          _context17.t0 = _context17['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting courses user favorite categories', _context17.t0);
          return _context17.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy khóa học theo lĩnh vực yêu thích'
          }));

        case 13:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

var reportCourse = exports.reportCourse = function _callee18(req, res, next) {
  var _req$body6, courseId, content, subject, userId, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _req$body6 = req.body, courseId = _req$body6.courseId, content = _req$body6.content, subject = _req$body6.subject;
          userId = req.user.id;

          // check does user own course or not

          _context18.next = 5;
          return _regenerator2.default.awrap(userOwnCourse.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context18.sent;

          if (!isUserOwnCourse) {
            _context18.next = 11;
            break;
          }

          _context18.next = 9;
          return _regenerator2.default.awrap(reportService.createReport(userId, courseId, content, subject));

        case 9:
          result = _context18.sent;
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while report course', _context18.t0);
          return _context18.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi khiếu nại khóa học.'
          }));

        case 18:
        case 'end':
          return _context18.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

var instructorGetCourseDetail = exports.instructorGetCourseDetail = function _callee19(req, res, next) {
  var id, courseInfo;
  return _regenerator2.default.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          id = req.params.id;
          _context19.next = 4;
          return _regenerator2.default.awrap(courseService.instructorGetCourseDetail(id));

        case 4:
          courseInfo = _context19.sent;

          if (!courseInfo) {
            _context19.next = 9;
            break;
          }

          return _context19.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: courseInfo
          }));

        case 9:
          return _context19.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Khóa học không tồn tại'
          }));

        case 10:
          _context19.next = 16;
          break;

        case 12:
          _context19.prev = 12;
          _context19.t0 = _context19['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting course information', _context19.t0);
          return _context19.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi truy vấn thông tin khóa học'
          }));

        case 16:
        case 'end':
          return _context19.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};