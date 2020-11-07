'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLikedQuestion = exports.increaseNumberAnswer = exports.createQuestion = exports.searchQuestionInLesson = exports.getQuestionByLessonId = exports.getQuestionById = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lessonService = require('../lesson/lessonService');

var lessonService = _interopRequireWildcard(_lessonService);

var _userLikeQuesionService = require('../user-like-quesion/user-like-quesionService');

var userLikeQuestionService = _interopRequireWildcard(_userLikeQuesionService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

var getQuestionById = exports.getQuestionById = function _callee(id, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Questions.findOne({
            attributes: ['id', 'userId', 'lessonId', 'content', 'likedNumber', 'answerNumber', 'updatedAt', [_sequelize2.default.col('user.name'), 'userName'], [_sequelize2.default.col('user.avatar'), 'userAvatar'], [_sequelize2.default.col('users_like_questions.isActive'), 'isLiked']],
            where: {
              id: id,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Users,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              }
            }, {
              model: _db2.default.UsersLikeQuestions,
              required: false,
              attributes: [],
              where: {
                isActive: true,
                userId: userId
              }
            }],
            raw: raw
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

/**
 * Get all question in lesson, and isLike question status
 * @param {String} lessonId
 * @param {String} userId
 * @param {Boolean} raw
 */
var getQuestionByLessonId = exports.getQuestionByLessonId = function _callee2(lessonId, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.Questions.findAll({
            attributes: ['id', 'userId', 'lessonId', 'content', 'likedNumber', 'answerNumber', 'updatedAt', [_sequelize2.default.col('user.name'), 'userName'], [_sequelize2.default.col('user.avatar'), 'userAvatar'], [_sequelize2.default.col('users_like_questions.isActive'), 'isLiked']],
            where: {
              lessonId: lessonId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Users,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              }
            }, {
              model: _db2.default.UsersLikeQuestions,
              required: false,
              attributes: [],
              where: {
                isActive: true,
                userId: userId
              }
            }],
            order: [['updatedAt', 'DESC']],
            raw: raw
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
 * Search question
 * *NOTE: can use other lib/framework/... in the future to search full text
 */
var searchQuestionInLesson = exports.searchQuestionInLesson = function _callee3(_ref) {
  var lessonId = _ref.lessonId,
      userId = _ref.userId,
      keyword = _ref.keyword,
      _ref$raw = _ref.raw,
      raw = _ref$raw === undefined ? true : _ref$raw;
  var keywordCondition, instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          keywordCondition = keyword ? {
            content: (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
          } : [];
          _context3.next = 3;
          return _regenerator2.default.awrap(_db2.default.Questions.findAll({
            attributes: ['id', 'userId', 'lessonId', 'content', 'likedNumber', 'answerNumber', 'updatedAt', [_sequelize2.default.col('user.name'), 'userName'], [_sequelize2.default.col('user.avatar'), 'userAvatar'], [_sequelize2.default.col('users_like_questions.isActive'), 'isLiked']],
            where: (0, _extends3.default)({
              lessonId: lessonId,
              isDeleted: false
            }, keywordCondition),
            include: [{
              model: _db2.default.Users,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              }
            }, {
              model: _db2.default.UsersLikeQuestions,
              required: false,
              attributes: [],
              where: {
                isActive: true,
                userId: userId
              }
            }],
            order: [['updatedAt', 'DESC']],
            raw: raw
          }));

        case 3:
          instance = _context3.sent;
          return _context3.abrupt('return', instance);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var createQuestion = exports.createQuestion = function _callee4(userId, lessonId, content) {
  var lesson, id, instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // check if lessonId is valid
          lesson = lessonService.getLessonInfoById(lessonId);

          if (lesson) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt('return', null);

        case 3:

          // create new question
          id = (0, _v2.default)();
          _context4.next = 6;
          return _regenerator2.default.awrap(_db2.default.Questions.create({
            id: id, userId: userId, lessonId: lessonId, content: content, likedNumber: 0, answerNumber: 0, isDeleted: false
          }));

        case 6:
          instance = _context4.sent;
          return _context4.abrupt('return', instance);

        case 8:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

/**
 *
 * @param {String} id as questionId
 * Output: boolen
 */
var increaseNumberAnswer = exports.increaseNumberAnswer = function _callee5(id) {
  var instance;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.Questions.increment('answerNumber', { by: 1, where: { id: id } }));

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

/**
 * Future feature
 */
// export const updateQAByIdAndUserId = async ({ id, userId, content }) => {
// const instance = await db.Questions.update({
//     content
// }, {
//     where: {
//         id,
//         userId,
//         isDeleted: false
//     },
//     returning: true,
// })

// if (instance[0] === 1) {
//     return instance[1][0].dataValues
// }
// return null
// }

var updateLikedQuestion = exports.updateLikedQuestion = function _callee6(_ref2) {
  var questionId = _ref2.questionId,
      userId = _ref2.userId,
      isLiked = _ref2.isLiked;
  var result;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _regenerator2.default.awrap(userLikeQuestionService.updateLikedQuestion({ questionId: questionId, userId: userId, isLiked: isLiked }));

        case 2:
          result = _context6.sent;
          return _context6.abrupt('return', result);

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};