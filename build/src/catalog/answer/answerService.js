'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnswer = exports.getAnswerByQuestionId = exports.getAnswerById = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _questionService = require('../question/questionService');

var questionService = _interopRequireWildcard(_questionService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAnswerById = exports.getAnswerById = function _callee(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Answers.findOne({
            attributes: ['id', 'userId', 'questionId', 'content', 'updatedAt', [_sequelize2.default.col('user.name'), 'userName'], [_sequelize2.default.col('user.avatar'), 'userAvatar']],
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

var getAnswerByQuestionId = exports.getAnswerByQuestionId = function _callee2(questionId) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.Answers.findAll({
            attributes: ['id', 'userId', 'questionId', 'content', 'updatedAt', [_sequelize2.default.col('user.name'), 'userName'], [_sequelize2.default.col('user.avatar'), 'userAvatar']],
            where: {
              questionId: questionId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Users,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              }
            }],
            order: [['updatedAt', 'ASC']],
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

var createAnswer = exports.createAnswer = function _callee3(userId, questionId, content) {
  var question, id, instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(questionService.getQuestionById(questionId, userId));

        case 2:
          question = _context3.sent;

          if (question) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt('return', null);

        case 5:

          // create new answer
          id = (0, _v2.default)();
          _context3.next = 8;
          return _regenerator2.default.awrap(_db2.default.Answers.create({
            id: id, userId: userId, content: content, questionId: questionId, isDeleted: false
          }));

        case 8:
          instance = _context3.sent;

          if (!instance) {
            _context3.next = 12;
            break;
          }

          _context3.next = 12;
          return _regenerator2.default.awrap(questionService.increaseNumberAnswer(questionId));

        case 12:
          return _context3.abrupt('return', instance);

        case 13:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

/**
 * Future feature
 */
// export const updateQAByIdAndUserId = async ({id, userId, content}) => {
//     const instance = await db.UsersQA.update( {
//             content
//         }, {
//         where : {
//             id,
//             userId,
//             isDeleted: false
//         },
//         returning: true,
//     })

//     if (instance[0] === 1) {
//         return instance[1][0].dataValues
//     }
//     return null
// }