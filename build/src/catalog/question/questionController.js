'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchQuestionInLesson = exports.updateLikedQuestion = exports.getQuestionByLesson = exports.create = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _questionService = require('./questionService');

var questionService = _interopRequireWildcard(_questionService);

var _courseService = require('../course/courseService');

var courseService = _interopRequireWildcard(_courseService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'questionController-' + _moment2.default.utc().toISOString();

var create = exports.create = function _callee(req, res, next) {
  var userId, _req$body, lessonId, content, result, newQuestion;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$body = req.body, lessonId = _req$body.lessonId, content = _req$body.content;
          _context.next = 5;
          return _regenerator2.default.awrap(questionService.createQuestion(userId, lessonId, content));

        case 5:
          result = _context.sent;

          if (!result) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return _regenerator2.default.awrap(questionService.getQuestionById(result.id, userId));

        case 9:
          newQuestion = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: newQuestion
          }));

        case 11:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Có lỗi khi đặt câu hỏi.'
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while create question', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi đặt câu hỏi.'
          }));

        case 18:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
 * Get all question and answer in lesson
 */
var getQuestionByLesson = exports.getQuestionByLesson = function _callee2(req, res, next) {
  var userId, _req$params, lessonId, courseId, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _req$params = req.params, lessonId = _req$params.lessonId, courseId = _req$params.courseId;
          _context2.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context2.sent;

          if (!isUserOwnCourse) {
            _context2.next = 13;
            break;
          }

          _context2.next = 9;
          return _regenerator2.default.awrap(questionService.getQuestionByLessonId(lessonId, userId));

        case 9:
          result = _context2.sent;

          if (!result) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 12:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Không tìm thấy câu hỏi trong bài học.'
          }));

        case 13:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get question', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy danh sách câu hỏi.'
          }));

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 16]]);
};

/**
 * Update user like question
 * params : {questionId, courseId, isLiked}
 */
var updateLikedQuestion = exports.updateLikedQuestion = function _callee3(req, res, next) {
  var userId, _req$body2, questionId, courseId, isLiked, isUserOwnCourse, isSuccess;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          _req$body2 = req.body, questionId = _req$body2.questionId, courseId = _req$body2.courseId, isLiked = _req$body2.isLiked;
          _context3.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context3.sent;

          if (!isUserOwnCourse) {
            _context3.next = 13;
            break;
          }

          _context3.next = 9;
          return _regenerator2.default.awrap(questionService.updateLikedQuestion({ questionId: questionId, userId: userId, isLiked: isLiked }));

        case 9:
          isSuccess = _context3.sent;

          if (!isSuccess) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 12:
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Có lỗi khi cập nhật trạng thái thích câu hỏi.'
          }));

        case 13:
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating like question status');
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi cập nhật trạng thái thích câu hỏi.'
          }));

        case 20:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 16]]);
};

var searchQuestionInLesson = exports.searchQuestionInLesson = function _callee4(req, res, next) {
  var userId, _req$query, lessonId, courseId, keyword, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _req$query = req.query, lessonId = _req$query.lessonId, courseId = _req$query.courseId, keyword = _req$query.keyword;
          _context4.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context4.sent;

          if (!isUserOwnCourse) {
            _context4.next = 11;
            break;
          }

          _context4.next = 9;
          return _regenerator2.default.awrap(questionService.searchQuestionInLesson({ lessonId: lessonId, userId: userId, keyword: keyword }));

        case 9:
          result = _context4.sent;
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while search question', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy danh sách tìm kiếm câu hỏi.'
          }));

        case 18:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};