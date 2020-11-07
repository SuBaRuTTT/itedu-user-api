'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchNote = exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteInCouseForUser = exports.getNoteById = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _courseService = require('../course/courseService');

var courseService = _interopRequireWildcard(_courseService);

var _userNoteLessonService = require('./user-note-lessonService');

var usersNoteLessonsService = _interopRequireWildcard(_userNoteLessonService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'user-note-lessonController-' + _moment2.default.utc().toISOString();

var getNoteById = exports.getNoteById = function _callee(req, res, next) {
  var userId, id, result;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          id = req.params.id;
          _context.next = 5;
          return _regenerator2.default.awrap(usersNoteLessonsService.getNoteByNoteIdAndUserId({ userId: userId, id: id }));

        case 5:
          result = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get note', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy ghi chú.'
          }));

        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

/**
//  * Params: {courseId: string, lessonId: string, content: string, time: double}
//  * Description: Create note
//  */
var getNoteInCouseForUser = exports.getNoteInCouseForUser = function _callee2(req, res, next) {
  var userId, courseId, isUserOwnCourse, result;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          courseId = req.params.courseId;
          _context2.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context2.sent;

          if (!isUserOwnCourse) {
            _context2.next = 11;
            break;
          }

          _context2.next = 9;
          return _regenerator2.default.awrap(usersNoteLessonsService.getNoteByUserIdAndCourseId({ userId: userId, courseId: courseId }));

        case 9:
          result = _context2.sent;
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 11:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get note for user', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy ghi chú'
          }));

        case 18:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
//  * Params: {courseId: string, lessonId: string, content: string, time: double}
//  * Description: Create note
//  */
var createNote = exports.createNote = function _callee3(req, res, next) {
  var userId, _req$body, courseId, lessonId, content, time, isUserOwnCourse, rs, newNote;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          _req$body = req.body, courseId = _req$body.courseId, lessonId = _req$body.lessonId, content = _req$body.content, time = _req$body.time;
          _context3.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context3.sent;

          if (!isUserOwnCourse) {
            _context3.next = 14;
            break;
          }

          _context3.next = 9;
          return _regenerator2.default.awrap(usersNoteLessonsService.createNote({ courseId: courseId, lessonId: lessonId, userId: userId, content: content, time: time }));

        case 9:
          rs = _context3.sent;
          _context3.next = 12;
          return _regenerator2.default.awrap(usersNoteLessonsService.getNoteByNoteIdAndUserId({ id: rs.id, userId: userId }));

        case 12:
          newNote = _context3.sent;
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Tạo ghi chú thành công.',
            payload: newNote
          }));

        case 14:
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while create note', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi tạo ghi chú'
          }));

        case 21:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 17]]);
};

/**
//  * Params: {noteId as id, content, courseId}
//  * Description: Update note
//  */
var updateNote = exports.updateNote = function _callee4(req, res, next) {
  var userId, _req$body2, id, content, courseId, isUserOwnCourse, isSuccess, updatedNote;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _req$body2 = req.body, id = _req$body2.id, content = _req$body2.content, courseId = _req$body2.courseId;
          _context4.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context4.sent;

          if (!isUserOwnCourse) {
            _context4.next = 16;
            break;
          }

          _context4.next = 9;
          return _regenerator2.default.awrap(usersNoteLessonsService.updateNoteByNoteIdAndUserId({ id: id, content: content, userId: userId }));

        case 9:
          isSuccess = _context4.sent;

          if (!isSuccess) {
            _context4.next = 15;
            break;
          }

          _context4.next = 13;
          return _regenerator2.default.awrap(usersNoteLessonsService.getNoteByNoteIdAndUserId({ id: id, userId: userId }));

        case 13:
          updatedNote = _context4.sent;
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Cập nhật ghi chú thành công.',
            payload: updatedNote
          }));

        case 15:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Cập nhật ghi chú thất bại.',
            payload: isSuccess
          }));

        case 16:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while update note', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi cập nhật ghi chú'
          }));

        case 23:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 19]]);
};

/**
//  * Params: {noteId as id, courseId}
//  * Description: Update note
//  */
var deleteNote = exports.deleteNote = function _callee5(req, res, next) {
  var userId, _req$body3, id, courseId, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          _req$body3 = req.body, id = _req$body3.id, courseId = _req$body3.courseId;
          _context5.next = 5;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 5:
          isUserOwnCourse = _context5.sent;

          if (!isUserOwnCourse) {
            _context5.next = 11;
            break;
          }

          _context5.next = 9;
          return _regenerator2.default.awrap(usersNoteLessonsService.deleteNoteByNoteId({ id: id }));

        case 9:
          result = _context5.sent;
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: 'Xóa ghi chú thành công.',
            payload: result
          }));

        case 11:
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while delete note', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi xóa ghi chú.'
          }));

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

/**
//  * Params: {courseId: string, lessonId: string, content: string, time: double}
//  * Description: Create note
//  */
var searchNote = exports.searchNote = function _callee6(req, res, next) {
  var userId, courseId, _req$query, keyword, limit, offset, isUserOwnCourse, result;

  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.user.id;
          courseId = req.params.courseId;
          _req$query = req.query, keyword = _req$query.keyword, limit = _req$query.limit, offset = _req$query.offset;
          _context6.next = 6;
          return _regenerator2.default.awrap(courseService.isUserOwnCourse(courseId, userId));

        case 6:
          isUserOwnCourse = _context6.sent;

          if (!isUserOwnCourse) {
            _context6.next = 12;
            break;
          }

          _context6.next = 10;
          return _regenerator2.default.awrap(usersNoteLessonsService.searchNote({ userId: userId, courseId: courseId, keyword: keyword, limit: limit, offset: offset }));

        case 10:
          result = _context6.sent;
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 12:
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Bạn không thể thực hiện thao tác này.'
          }));

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get note for user', _context6.t0);
          return _context6.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy ghi chú'
          }));

        case 19:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined, [[0, 15]]);
};