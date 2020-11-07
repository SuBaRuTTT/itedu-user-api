'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.udpateCurrentTimeLearnVideo = exports.getSubtitle = exports.deleteAllLesson = exports.deleteLessonById = exports.updateLessonById = exports.createLesson = exports.getLessonById = exports.getAllLesson = exports.deleteLessonCaption = exports.uploadLessonCaption = exports.getVideoSignedToken = exports.uploadLessonVid = exports.updateStatusLessonFinish = exports.getVideoUrlAndCurrentTimeInVideo = exports.getLessonDetail = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _utils = require('../../utils');

var _config = require('../../config');

var _fetch = require('../../fetch');

var _getVideoDuration = require('get-video-duration');

var _lessonService = require('./lessonService');

var lessonService = _interopRequireWildcard(_lessonService);

var _resourceService = require('../resource/resourceService');

var resourceService = _interopRequireWildcard(_resourceService);

var _courseService = require('../course/courseService');

var courseService = _interopRequireWildcard(_courseService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'lessonController-' + _moment2.default.utc().toISOString();

/**
//  * Params: {idCourse: string, idLesson: string}
//  * Description: Get lesson detail, next lesson id, prev lesson id
//  * Issue: #69
//  */
var getLessonDetail = exports.getLessonDetail = function _callee(req, res) {
  var userId, _req$params, lessonId, courseId, isUserOwnCourse, payload, numberOrder, nextLesson, nextLessonId, prevLesson, prevLessonId;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$params = req.params, lessonId = _req$params.lessonId, courseId = _req$params.courseId;
          _context.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context.sent;

          if (!isUserOwnCourse) {
            _context.next = 22;
            break;
          }

          _context.next = 9;
          return _regenerator2.default.awrap(lessonService.getLessonInfoByLessonIdAndCourseId({ lessonId: lessonId, courseId: courseId, userId: userId }));

        case 9:
          payload = _context.sent;

          if (!payload) {
            _context.next = 21;
            break;
          }

          numberOrder = payload.numberOrder;
          // get next and prev lesson

          _context.next = 14;
          return _regenerator2.default.awrap(lessonService.getLessonByNumberOrderAndCourseId({
            numberOrder: numberOrder + 1, courseId: courseId
          }));

        case 14:
          nextLesson = _context.sent;
          nextLessonId = nextLesson ? nextLesson.id : null;
          _context.next = 18;
          return _regenerator2.default.awrap(lessonService.getLessonByNumberOrderAndCourseId({
            numberOrder: numberOrder - 1, courseId: courseId
          }));

        case 18:
          prevLesson = _context.sent;
          prevLessonId = prevLesson ? prevLesson.id : null;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: (0, _extends3.default)({}, payload, { nextLessonId: nextLessonId, prevLessonId: prevLessonId })
          }));

        case 21:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            // incorrect lessonId or courseId
            message: 'Không tìm thấy thông tin bài học, vui lòng kiểm tra lại đường link.'
          }));

        case 22:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập link này.'
          }));

        case 25:
          _context.prev = 25;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting video lesson', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy thông tin chi tiết bài học'
          }));

        case 29:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 25]]);
};

/**
//  * Params: {idCourse: string, idLesson: string}
//  * Description: Get video url of lesson and current time that user is watching at the last time
//  */
var getVideoUrlAndCurrentTimeInVideo = exports.getVideoUrlAndCurrentTimeInVideo = function _callee2(req, res) {
  var userId, _req$params2, courseId, lessonId, isUserOwnCourse, lessonInfo, videoName, opts, videoUrl;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _req$params2 = req.params, courseId = _req$params2.courseId, lessonId = _req$params2.lessonId;
          _context2.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context2.sent;

          if (!isUserOwnCourse) {
            _context2.next = 18;
            break;
          }

          _context2.next = 9;
          return _regenerator2.default.awrap(lessonService.getLessonInfoWithCurrentTimeById({ userId: userId, lessonId: lessonId }));

        case 9:
          lessonInfo = _context2.sent;
          videoName = lessonInfo.videoName;

          if (!videoName) {
            _context2.next = 17;
            break;
          }

          opts = {
            action: 'read',
            expires: Date.now() + _utils.enums.VIDEO_URL_EXPIRE_TIME
          };
          _context2.next = 15;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + videoName, opts));

        case 15:
          videoUrl = _context2.sent;
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              videoUrl: videoUrl,
              currentTime: lessonInfo['users_learn_lessons.currentTime'],
              isFinish: lessonInfo['users_learn_lessons.isFinish']
            }
          }));

        case 17:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không tìm thấy tên video.'
          }));

        case 18:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập link này.'
          }));

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting video lesson', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy video bài học'
          }));

        case 25:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 21]]);
};

var updateStatusLessonFinish = exports.updateStatusLessonFinish = function _callee3(req, res) {
  var userId, lessonId, isSuccess;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          lessonId = req.body.lessonId;
          _context3.next = 5;
          return _regenerator2.default.awrap(lessonService.updateStatusLessonFinish({ lessonId: lessonId, userId: userId }));

        case 5:
          isSuccess = _context3.sent;

          if (!isSuccess) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Ghi nhận quá trình học thành công.'
          }));

        case 8:
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Ghi nhận quá trình học thất bại.'
          }));

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating status isFinish in lesson', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi ghi nhận quá trình học.'
          }));

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 11]]);
};

/**
 * Endpoint to upload private lesson video to GCS
 * @param {*} req
 * query: {
 *  courseId: String,
 *  lessonId: String
 * }
 * @param {*} res
 *  body: {
 *  message: OK
 * }
 * statusCode: 200
 */
var uploadLessonVid = exports.uploadLessonVid = function _callee4(req, res, next) {
  var file, _req$query, courseId, lessonId, fileTypeRegex, isValidFileType, instance, fileExtRegex, _file$originalname$ma, _file$originalname$ma2, fileExt, filePath, opts, signedUrl, duration, videoName, oldFilePath;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          file = req.file;
          _req$query = req.query, courseId = _req$query.courseId, lessonId = _req$query.lessonId;
          fileTypeRegex = new RegExp('^(' + _utils.enums.FILE_TYPE.video + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);

          if (!(!file || !isValidFileType)) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Video bài học được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 7:
          if (!(!courseId || !lessonId)) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin khoá học để tải lên video bài học'
          }));

        case 9:
          _context4.next = 11;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 11:
          instance = _context4.sent;

          if (!(!instance || instance.courseId !== courseId)) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bài học không tồn tại'
          }));

        case 14:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma = file.originalname.match(fileExtRegex), _file$originalname$ma2 = (0, _slicedToArray3.default)(_file$originalname$ma, 1), fileExt = _file$originalname$ma2[0];
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/video';
          _context4.next = 19;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: '' + filePath + fileExt,
            private: true,
            resumable: false
          }));

        case 19:
          opts = {
            action: _utils.enums.GCS_SIGNED_URL_ACTION.READ,
            expires: _utils.enums.GCS_SIGNED_URL_EXPIRE
          };
          _context4.next = 22;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, '' + filePath + fileExt, opts));

        case 22:
          signedUrl = _context4.sent;
          _context4.next = 25;
          return _regenerator2.default.awrap((0, _getVideoDuration.getVideoDurationInSeconds)(signedUrl));

        case 25:
          duration = _context4.sent;
          videoName = 'video' + fileExt;
          //Remove old lesson video since GCS does not overwrite when uploading different files

          if (!(instance.videoName && videoName != instance.videoName)) {
            _context4.next = 31;
            break;
          }

          // eslint-disable-next-line max-len
          oldFilePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + instance.videoName;
          _context4.next = 31;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, oldFilePath));

        case 31:
          _context4.next = 33;
          return _regenerator2.default.awrap(lessonService.updateLessonInfo(lessonId, {
            videoName: videoName,
            hours: _utils.video.convertDurationToHour(duration)
          }));

        case 33:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              url: signedUrl,
              videoName: videoName
            }
          }));

        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading lesson video', _context4.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 40:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 36]]);
};

/**
 * Get video signed token (userId, courseId, lessonId)
 */
var getVideoSignedToken = exports.getVideoSignedToken = function _callee5(req, res) {
  var userId, _req$params3, courseId, lessonId, isUserOwnCourse, token;

  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          _req$params3 = req.params, courseId = _req$params3.courseId, lessonId = _req$params3.lessonId;
          _context5.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context5.sent;

          if (!isUserOwnCourse) {
            _context5.next = 11;
            break;
          }

          _context5.next = 9;
          return _regenerator2.default.awrap(_utils.crypt.createVideoSignedToken({ userId: userId, courseId: courseId, lessonId: lessonId }));

        case 9:
          token = _context5.sent;
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: token
          }));

        case 11:
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập link này.'
          }));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting video lesson', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy video bài học'
          }));

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
 * Endpoint to upload private lesson resource to GCS
 * @param {*} req
 * query: {
 *  courseId: String,
 *  lessonId: String
 * }
 * @param {*} res
 *  body: {
 *  message: OK
 * }
 * statusCode: 200
 */
var uploadLessonCaption = exports.uploadLessonCaption = function _callee6(req, res, next) {
  var file, _req$query2, courseId, lessonId, fileTypeRegex, isValidFileType, instance, fileExtRegex, _file$originalname$ma3, _file$originalname$ma4, fileExt, filePath, opts, signedUrl, captionName, oldFilePath;

  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          file = req.file;
          _req$query2 = req.query, courseId = _req$query2.courseId, lessonId = _req$query2.lessonId;
          fileTypeRegex = new RegExp('^(' + _utils.enums.FILE_TYPE.application + ')(?=/)');
          isValidFileType = fileTypeRegex.test(file.mimetype);

          if (!(!file || !isValidFileType)) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Phụ đề bài học được tải lên không tồn tại hoặc sai định dạng'
          }));

        case 7:
          if (!(!courseId || !lessonId)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin khoá học để tải lên phụ đề bài học'
          }));

        case 9:
          _context6.next = 11;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 11:
          instance = _context6.sent;

          if (!(!instance || instance.courseId !== courseId)) {
            _context6.next = 14;
            break;
          }

          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bài học không tồn tại'
          }));

        case 14:
          fileExtRegex = /.\w+$/;
          _file$originalname$ma3 = file.originalname.match(fileExtRegex), _file$originalname$ma4 = (0, _slicedToArray3.default)(_file$originalname$ma3, 1), fileExt = _file$originalname$ma4[0];
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/caption';
          _context6.next = 19;
          return _regenerator2.default.awrap(_fetch.storage.uploadFile(_config.GCP_STORAGE_BUCKET_NAME, file, {
            newFileName: '' + filePath + fileExt,
            private: true,
            resumable: false
          }));

        case 19:
          opts = {
            action: _utils.enums.GCS_SIGNED_URL_ACTION.READ,
            expires: _utils.enums.GCS_SIGNED_URL_EXPIRE
          };
          _context6.next = 22;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, '' + filePath + fileExt, opts));

        case 22:
          signedUrl = _context6.sent;
          captionName = 'caption' + fileExt;

          //Remove old lesson caption since GCS does not overwrite when uploading different files

          if (!(instance.captionName && instance.captionName !== captionName)) {
            _context6.next = 28;
            break;
          }

          // eslint-disable-next-line max-len
          oldFilePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + instance.captionName;
          _context6.next = 28;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, oldFilePath));

        case 28:
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              url: signedUrl,
              captionName: captionName
            }
          }));

        case 31:
          _context6.prev = 31;
          _context6.t0 = _context6['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while uploading lesson caption', _context6.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 35:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[0, 31]]);
};

var deleteLessonCaption = exports.deleteLessonCaption = function _callee7(req, res, next) {
  var lessonId, instance, filePath;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          lessonId = req.body.lessonId;
          _context7.next = 4;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 4:
          instance = _context7.sent;

          if (instance) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bài học không tồn tại'
          }));

        case 7:
          //Remove old lesson caption since GCS does not overwrite when uploading different files
          filePath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + instance.courseId + '/' + lessonId + '/' + instance.captionName;
          _context7.next = 10;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, filePath));

        case 10:
          _context7.next = 12;
          return _regenerator2.default.awrap(lessonService.updateLessonById(lessonId, { captionName: null }));

        case 12:
          return _context7.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while delete lesson caption', _context7.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 19:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};

/**
 * Get all lesson information
 * @param {*} req
 * body: {
 *  courseId: String
 * }
 * params: {
 *  numberOrder: Integer // Optional: numberOrder of section which owns lesson
 * }
 * @param {*} res: {
 *  message: OK
 *  payload: {
 *    [...]
 *  }
 * }
 */
var getAllLesson = exports.getAllLesson = function _callee8(req, res, next) {
  var _req$body, courseId, isIntructor, numSection, instances, opts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, instance, lessonPath, videoUrl, captionUrl;

  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$body = req.body, courseId = _req$body.courseId, isIntructor = _req$body.isIntructor, numSection = _req$body.numSection;

          if (courseId) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id khoá học để lấy thông tin tất cả bài học'
          }));

        case 4:
          _context8.next = 6;
          return _regenerator2.default.awrap(lessonService.getAllLesson(courseId, { numSection: numSection }));

        case 6:
          instances = _context8.sent;

          if (!isIntructor) {
            _context8.next = 52;
            break;
          }

          opts = {
            action: _utils.enums.GCS_SIGNED_URL_ACTION.READ,
            expires: _utils.enums.GCS_SIGNED_URL_EXPIRE
          };
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context8.prev = 12;
          _iterator = (0, _getIterator3.default)(instances);

        case 14:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context8.next = 38;
            break;
          }

          instance = _step.value;
          lessonPath = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + instance.id;

          if (!instance.videoName) {
            _context8.next = 23;
            break;
          }

          _context8.next = 20;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, lessonPath + '/' + instance.videoName, opts));

        case 20:
          _context8.t0 = _context8.sent;
          _context8.next = 24;
          break;

        case 23:
          _context8.t0 = null;

        case 24:
          videoUrl = _context8.t0;

          instance.dataValues.videoUrl = videoUrl;

          // eslint-disable-next-line max-len

          if (!instance.captionName) {
            _context8.next = 32;
            break;
          }

          _context8.next = 29;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, lessonPath + '/' + instance.captionName, opts));

        case 29:
          _context8.t1 = _context8.sent;
          _context8.next = 33;
          break;

        case 32:
          _context8.t1 = null;

        case 33:
          captionUrl = _context8.t1;

          instance.dataValues.captionUrl = captionUrl;

        case 35:
          _iteratorNormalCompletion = true;
          _context8.next = 14;
          break;

        case 38:
          _context8.next = 44;
          break;

        case 40:
          _context8.prev = 40;
          _context8.t2 = _context8['catch'](12);
          _didIteratorError = true;
          _iteratorError = _context8.t2;

        case 44:
          _context8.prev = 44;
          _context8.prev = 45;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 47:
          _context8.prev = 47;

          if (!_didIteratorError) {
            _context8.next = 50;
            break;
          }

          throw _iteratorError;

        case 50:
          return _context8.finish(47);

        case 51:
          return _context8.finish(44);

        case 52:
          return _context8.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: instances.map(function (item) {
              return item.dataValues;
            })
          }));

        case 55:
          _context8.prev = 55;
          _context8.t3 = _context8['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting all lessons', _context8.t3);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 59:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined, [[0, 55], [12, 40, 44, 52], [45,, 47, 51]]);
};

/**
 * Get lesson information
 * @param {*} req
 * body: {
 *  lessonId: String
 * }
 * @param {*} res
 * message: OK
 * payload: {
 *   lessonInfo: String
 * }
 */
var getLessonById = exports.getLessonById = function _callee9(req, res, next) {
  var lessonId, lessonInfo;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          lessonId = req.body.lessonId;

          if (lessonId) {
            _context9.next = 4;
            break;
          }

          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id để lấy thông tin bài học'
          }));

        case 4:
          _context9.next = 6;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 6:
          lessonInfo = _context9.sent;

          if (lessonInfo) {
            _context9.next = 9;
            break;
          }

          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.NOT_FOUND).json({
            message: 'Bài học không tồn tại'
          }));

        case 9:
          return _context9.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              lessonInfo: lessonInfo
            }
          }));

        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting lesson information', _context9.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 16:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};

/**
 * Create lesson
 * @param {*} req
 * body: {
 *  sectionId: String,
 *  lessonInfo: {
 *   name: String,
 *   content: String
 *  }
 * }
 * @param {*} res
 * message: OK
 * payload: {
 *   lessonId: String
 * }
 */
var createLesson = exports.createLesson = function _callee10(req, res, next) {
  var sectionId, lessonId;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          sectionId = req.body.sectionId;
          _context10.next = 4;
          return _regenerator2.default.awrap(lessonService.createLesson(sectionId));

        case 4:
          lessonId = _context10.sent;
          return _context10.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              id: lessonId,
              sectionId: sectionId
            }
          }));

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while creating lesson', _context10.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 12:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined, [[0, 8]]);
};

/**
 * Update lesson info by id
 * @param {*} req
 * body: {
 *  lessonId: String,
 *  lessonInfo: {
 *    name: String,
 *    content: String
 *  }
 * }
 * @param {*} res
 * message: OK
 */
var updateLessonById = exports.updateLessonById = function _callee11(req, res, next) {
  var _req$body2, lessonId, lessonInfo, instance, resources;

  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body2 = req.body, lessonId = _req$body2.lessonId, lessonInfo = _req$body2.lessonInfo;

          if (!(!lessonId || !lessonInfo)) {
            _context11.next = 4;
            break;
          }

          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin để cập nhật bài học'
          }));

        case 4:
          _context11.next = 6;
          return _regenerator2.default.awrap(lessonService.updateLessonById(lessonId, lessonInfo));

        case 6:
          instance = _context11.sent;
          _context11.next = 9;
          return _regenerator2.default.awrap(resourceService.getResourceByIdLesson(lessonId));

        case 9:
          resources = _context11.sent;
          return _context11.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: (0, _extends3.default)({}, lessonInfo, {
              name: instance.name,
              courseId: instance.courseId,
              id: instance.id,
              resources: resources
            })
          }));

        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating lesson', _context11.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 17:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined, [[0, 13]]);
};

/**
 * Delete lesson by id
 * @param {*} req
 * body: {
 *  lessonId: String
 * }
 * @param {*} res
 * body: {
 *  message: OK
 * }
 */
var deleteLessonById = exports.deleteLessonById = function _callee12(req, res, next) {
  var lessonId;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          lessonId = req.body.lessonId;

          if (lessonId) {
            _context12.next = 4;
            break;
          }

          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin để xoá bài học'
          }));

        case 4:
          _context12.next = 6;
          return _regenerator2.default.awrap(lessonService.deleteLessonById(lessonId));

        case 6:
          return _context12.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              message: _utils.enums.MESSAGE.OK,
              id: lessonId
            }
          }));

        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while deleting lesson', _context12.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 13:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

/**
 * Delete all lesson in course
 * @param {*} req
 * body: {
 *  courseId: String
 * }
 * @param {*} res
 * body: {
 *  message: OK
 * }
 */
var deleteAllLesson = exports.deleteAllLesson = function _callee13(req, res, next) {
  var courseId;
  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          courseId = req.body.courseId;

          if (courseId) {
            _context13.next = 4;
            break;
          }

          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin để xoá tất cả bài học'
          }));

        case 4:
          _context13.next = 6;
          return _regenerator2.default.awrap(lessonService.deleteAllLesson(courseId));

        case 6:
          return _context13.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while deleting all lesson', _context13.t0);
          res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          });

        case 13:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

// read subtitle content
function doRequest(url) {
  return new _promise2.default(function (resolve, reject) {
    (0, _request2.default)(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
var getSubtitle = exports.getSubtitle = function _callee14(req, res) {
  var userId, _req$params4, lessonId, courseId, isUserOwnCourse, opts, _ref, captionName, subtitle, fileUrl;

  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          userId = req.user.id;
          _req$params4 = req.params, lessonId = _req$params4.lessonId, courseId = _req$params4.courseId;
          _context14.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context14.sent;

          if (!isUserOwnCourse) {
            _context14.next = 21;
            break;
          }

          opts = {
            action: 'read',
            // subtitle expire time = video expire time
            expires: Date.now() + _utils.enums.VIDEO_URL_EXPIRE_TIME
            // TODO: Edit this path in when has sub
          };
          _context14.next = 10;
          return _regenerator2.default.awrap(lessonService.getLessonInfoById(lessonId));

        case 10:
          _ref = _context14.sent;
          captionName = _ref.captionName;
          // caption file name
          subtitle = null;

          if (!captionName) {
            _context14.next = 20;
            break;
          }

          _context14.next = 16;
          return _regenerator2.default.awrap(_fetch.storage.getV4SignedUrl(_config.GCP_STORAGE_BUCKET_NAME, _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + captionName, opts));

        case 16:
          fileUrl = _context14.sent;
          _context14.next = 19;
          return _regenerator2.default.awrap(doRequest(fileUrl));

        case 19:
          subtitle = _context14.sent;

        case 20:
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: subtitle
          }));

        case 21:
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể truy cập link này.'
          }));

        case 24:
          _context14.prev = 24;
          _context14.t0 = _context14['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while streaming video', _context14.t0);
          return _context14.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy video.'
          }));

        case 28:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined, [[0, 24]]);
};

var udpateCurrentTimeLearnVideo = exports.udpateCurrentTimeLearnVideo = function _callee15(req, res) {
  var userId, _req$body3, lessonId, currentTime, isSuccess;

  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          userId = req.user.id;
          _req$body3 = req.body, lessonId = _req$body3.lessonId, currentTime = _req$body3.currentTime;

          // eslint-disable-next-line max-len

          _context15.next = 5;
          return _regenerator2.default.awrap(lessonService.udpateCurrentTimeLearnVideo({ lessonId: lessonId, userId: userId, currentTime: currentTime }));

        case 5:
          isSuccess = _context15.sent;

          if (!isSuccess) {
            _context15.next = 8;
            break;
          }

          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Ghi nhận quá trình học thành công.'
          }));

        case 8:
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Ghi nhận quá trình học thất bại.'
          }));

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating status isFinish in lesson', _context15.t0);
          return _context15.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi ghi nhận quá trình học.'
          }));

        case 15:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined, [[0, 11]]);
};