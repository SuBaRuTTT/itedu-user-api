'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCurrentTime = exports.createRecord = exports.finishLesson = exports.findRecordByUserIdAndLessonId = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _users_learn_lessons = require('../../../models/users_learn_lessons');

var _users_learn_lessons2 = _interopRequireDefault(_users_learn_lessons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findRecordByUserIdAndLessonId = exports.findRecordByUserIdAndLessonId = function _callee(userId, lessonId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLearnLessons.findOne({
            where: {
              userId: userId,
              lessonId: lessonId
            },
            raw: true
          }));

        case 2:
          instance = _context.sent;
          return _context.abrupt('return', instance);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var finishLesson = exports.finishLesson = function _callee2(userId, lessonId) {
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLearnLessons.update({ isFinish: true }, {
            where: {
              lessonId: lessonId,
              userId: userId,
              isFinish: false
            }
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

var createRecord = exports.createRecord = function _callee3(_ref) {
  var userId = _ref.userId,
      lessonId = _ref.lessonId,
      _ref$isFinish = _ref.isFinish,
      isFinish = _ref$isFinish === undefined ? false : _ref$isFinish,
      _ref$currentTime = _ref.currentTime,
      currentTime = _ref$currentTime === undefined ? 0 : _ref$currentTime;
  var id, instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = (0, _v2.default)();
          _context3.next = 3;
          return _regenerator2.default.awrap(_users_learn_lessons2.default.create({
            id: id, userId: userId, lessonId: lessonId, isFinish: isFinish, learnedTime: new Date(), currentTime: currentTime
          }));

        case 3:
          instance = _context3.sent;
          return _context3.abrupt('return', instance.dataValues);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var updateCurrentTime = exports.updateCurrentTime = function _callee4(userId, lessonId, currentTime) {
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLearnLessons.update({ currentTime: currentTime }, {
            where: {
              lessonId: lessonId,
              userId: userId
            }
          }));

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