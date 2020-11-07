'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchNote = exports.deleteNoteByNoteId = exports.updateNoteByNoteIdAndUserId = exports.getNoteByUserIdAndCourseId = exports.getNoteByNoteIdAndUserId = exports.createNote = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _users_note_lessons = require('../../../models/users_note_lessons');

var _users_note_lessons2 = _interopRequireDefault(_users_note_lessons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

var createNote = exports.createNote = function _callee(_ref) {
  var userId = _ref.userId,
      lessonId = _ref.lessonId,
      content = _ref.content,
      time = _ref.time;
  var id, instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = (0, _v2.default)();
          _context.next = 3;
          return _regenerator2.default.awrap(_users_note_lessons2.default.create({
            id: id, userId: userId, lessonId: lessonId, content: content, time: time
          }));

        case 3:
          instance = _context.sent;
          return _context.abrupt('return', instance.dataValues);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var getNoteByNoteIdAndUserId = exports.getNoteByNoteIdAndUserId = function _callee2(_ref2) {
  var id = _ref2.id,
      userId = _ref2.userId;
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersNoteLessons.findOne({
            attributes: ['id', 'userId', 'lessonId', 'content', 'time', 'updatedAt', [_sequelize2.default.col('lesson.name'), 'lessonName'], [_sequelize2.default.col('lesson.numberOrder'), 'lessonNumberOrder']],
            where: {
              id: id,
              userId: userId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Lessons,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              }
            }],
            raw: true
          }));

        case 2:
          instance = _context2.sent;
          return _context2.abrupt('return', instance);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

/**
 * @param {String} userId
 * @param {String} courseId
 */
var getNoteByUserIdAndCourseId = exports.getNoteByUserIdAndCourseId = function _callee3(_ref3) {
  var userId = _ref3.userId,
      courseId = _ref3.courseId;
  var instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersNoteLessons.findAll({
            attributes: ['id', 'userId', 'lessonId', 'content', 'time', 'updatedAt', [_sequelize2.default.col('lesson.name'), 'lessonName'], [_sequelize2.default.col('lesson.numberOrder'), 'lessonNumberOrder']],
            where: {
              userId: userId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Lessons,
              required: true,
              attributes: [],
              where: {
                courseId: courseId,
                isDeleted: false
              }
            }],
            order: [[_db2.default.Lessons, 'numberOrder', 'ASC']],
            raw: true
          }));

        case 2:
          instance = _context3.sent;
          return _context3.abrupt('return', instance);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update content of note in lesson
 * @param {String} id as note id
 * @param {String} content
 * Output: isSuccess: boolean
 */
var updateNoteByNoteIdAndUserId = exports.updateNoteByNoteIdAndUserId = function _callee4(_ref4) {
  var id = _ref4.id,
      content = _ref4.content,
      userId = _ref4.userId;
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersNoteLessons.update({ content: content }, {
            where: {
              id: id,
              userId: userId,
              isDeleted: false
              /* if want to return updated instance */
              // returning: true,
              // raw: false
            } }));

        case 2:
          instance = _context4.sent;
          return _context4.abrupt('return', instance[0] === 1);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

/**
 * @param {String} id as note id
 * @param {String} content
 * Output: isSuccess: boolean
 */
var deleteNoteByNoteId = exports.deleteNoteByNoteId = function _callee5(_ref5) {
  var id = _ref5.id;
  var instance;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersNoteLessons.update({ isDeleted: true }, {
            where: {
              id: id
            }
          }));

        case 2:
          instance = _context5.sent;
          return _context5.abrupt('return', instance[0] === 1);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};

var searchNote = exports.searchNote = function _callee6(_ref6) {
  var userId = _ref6.userId,
      courseId = _ref6.courseId,
      keyword = _ref6.keyword,
      _ref6$limit = _ref6.limit,
      limit = _ref6$limit === undefined ? 10 : _ref6$limit,
      _ref6$offset = _ref6.offset,
      offset = _ref6$offset === undefined ? 0 : _ref6$offset;
  var numberOrder, numberOrderQuery, instance;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          numberOrder = parseInt(keyword);
          numberOrderQuery = !isNaN(numberOrder) ? [{ '$lesson.numberOrder$': numberOrder }] : [];
          _context6.next = 4;
          return _regenerator2.default.awrap(_db2.default.UsersNoteLessons.findAndCountAll({
            attributes: ['id', 'userId', 'lessonId', 'content', 'time', 'updatedAt', [_sequelize2.default.col('lesson.name'), 'lessonName'], [_sequelize2.default.col('lesson.numberOrder'), 'lessonNumberOrder']],
            where: (0, _defineProperty3.default)({
              userId: userId,
              isDeleted: false
            }, Op.and, [(0, _defineProperty3.default)({}, Op.or, [{
              content: (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
            }, {
              '$lesson.name$': (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
            }].concat(numberOrderQuery))]),
            include: [{
              model: _db2.default.Lessons,
              required: true,
              attributes: [],
              where: {
                courseId: courseId,
                isDeleted: false
              }
            }],
            limit: limit,
            offset: offset,
            raw: true
          }));

        case 4:
          instance = _context6.sent;
          return _context6.abrupt('return', instance);

        case 6:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};