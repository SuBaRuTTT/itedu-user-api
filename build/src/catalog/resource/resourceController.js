'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResourceUrl = exports.removeAllResource = exports.removeResource = exports.uploadResource = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _fetch = require('../../fetch');

var _resourceService = require('./resourceService');

var resourceService = _interopRequireWildcard(_resourceService);

var _courseService = require('../course/courseService');

var courseService = _interopRequireWildcard(_courseService);

var _lessonService = require('../lesson/lessonService');

var lessonService = _interopRequireWildcard(_lessonService);

var _config = require('../../config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'resourceController-' + _moment2.default.utc().toISOString();

/**
 * Endpoint to upload private lesson resource to GCS
 * @param {*} req
 * body: {
 *  courseId: String,
 *  lessonId: String
 * }
 * @param {*} res
 *  body: {
 *  message: Tải lên tệp đính kèm thành công
 * }
 * statusCode: 200
 */
var uploadResource = exports.uploadResource = function _callee(req, res, next) {
  var file, _req$query, courseId, lessonId, _enums$FILE_TYPE, image, text, application, fileTypeRegex, isValidFileType, instance, fileExtRegex, _file$originalname$ma, _file$originalname$ma2, fileExt, filePath, opts, signedUrl, resourceId;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          // const { file, body: { courseId, lessonId } } = req
          file = req.file;
          _req$query = req.query, courseId = _req$query.courseId, lessonId = _req$query.lessonId;
          _enums$FILE_TYPE = _utils.enums.FILE_TYPE, image = _enums$FILE_TYPE.image, text = _enums$FILE_TYPE.text, application = _enums$FILE_TYPE.application;
          fileTypeRegex = new RegExp('^(' + image + '|' + text + '|' + application + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);

          if (!(!file || file.length || !isValidFileType)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Tệp đính kèm được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 8:
          if (!(!courseId || !lessonId)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin khoá học để tải lên tệp đính kèm'
          }));

        case 10:
          _context.next = 12;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 12:
          instance = _context.sent;

          if (!(!instance || instance.courseId !== courseId)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bài học không tồn tại'
          }));

        case 15:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma = file.originalname.match(fileExtRegex), _file$originalname$ma2 = (0, _slicedToArray3.default)(_file$originalname$ma, 1), fileExt = _file$originalname$ma2[0];
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/Resources/' + file.originalname;
          _context.next = 20;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: filePath,
            private: true,
            resumable: true
          }));

        case 20:
          opts = {
            action: _utils.enums.GCS_SIGNED_URL_ACTION.READ,
            expires: _utils.enums.GCS_SIGNED_URL_EXPIRE
          };
          _context.next = 23;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, '' + filePath + fileExt, opts));

        case 23:
          signedUrl = _context.sent;
          _context.next = 26;
          return _regenerator2.default.awrap(resourceService.createResource(lessonId, file.originalname, signedUrl));

        case 26:
          resourceId = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              url: signedUrl,
              resourceId: resourceId
            },
            message: 'Tải lên tệp đính kèm thành công'
          }));

        case 30:
          _context.prev = 30;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading lesson resource', _context.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 34:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 30]]);
};

/**
 * Remove resource by id
 * @param {*} req
 * body: {
 *  resourceId: String
 * }
 * @param {*} res
 * body: {
 *  message: OK
 * }
 */
var removeResource = exports.removeResource = function _callee2(req, res, next) {
  var resourceId, instance, lessonId, courseId, name, filePath;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          resourceId = req.body.resourceId;

          if (resourceId) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không đủ thông tin để xoá tệp đính kèm'
          }));

        case 4:
          _context2.next = 6;
          return _regenerator2.default.awrap(resourceService.getResourceInfo(resourceId));

        case 6:
          instance = _context2.sent;
          lessonId = instance.lessonId, courseId = instance.courseId, name = instance.name;

          if (name) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.NOT_FOUND).json({
            message: 'Tệp đính kèm chưa được tải lên storage'
          }));

        case 10:
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/Resources/' + name;
          _context2.next = 13;
          return _regenerator2.default.awrap(resourceService.removeResource(resourceId, filePath));

        case 13:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              resourceId: resourceId
            }
          }));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while removing lesson resource', _context2.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 16]]);
};

/**
 * Remove all resources
 * @param {*} req
 * body: {
 *  lessonId: String
 * }
 * @param {*} res
 * body: {
 *  message: OK
 * }
 */
var removeAllResource = exports.removeAllResource = function _callee3(req, res, next) {
  var lessonId, instance, courseId;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          lessonId = req.body.lessonId;

          if (lessonId) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không đủ thông tin để xoá tất cả tệp đính kèm'
          }));

        case 4:
          _context3.next = 6;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 6:
          instance = _context3.sent;
          courseId = instance.courseId;
          _context3.next = 10;
          return _regenerator2.default.awrap(resourceService.removeAllResources(lessonId, courseId));

        case 10:
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while removing all resources in lesson', _context3.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 17:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 13]]);
};

/**
 * Get resource url
 */
var getResourceUrl = exports.getResourceUrl = function _callee4(req, res, next) {
  var userId, _req$params, id, courseId, lessonId, isUserOwnCourse, _ref, name, opts, fileUrl;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _req$params = req.params, id = _req$params.id, courseId = _req$params.courseId, lessonId = _req$params.lessonId;
          _context4.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context4.sent;

          if (!isUserOwnCourse) {
            _context4.next = 18;
            break;
          }

          _context4.next = 9;
          return _regenerator2.default.awrap(resourceService.getResourceById(id));

        case 9:
          _ref = _context4.sent;
          name = _ref.name;

          if (!name) {
            _context4.next = 17;
            break;
          }

          opts = {
            action: 'read',
            expires: Date.now() + _utils.enums.RESOURCE_URL_EXPIRE_TIME
            // eslint-disable-next-line max-len
          };
          _context4.next = 15;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + _config.GCP_STORAGE_RESOURCE_PATH_NAME + '/' + name, opts));

        case 15:
          fileUrl = _context4.sent;
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: fileUrl
          }));

        case 17:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không tìm thấy lấy tài liệu đính kèm.'
          }));

        case 18:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting video lesson', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy tài liệu đính kèm'
          }));

        case 25:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 21]]);
};