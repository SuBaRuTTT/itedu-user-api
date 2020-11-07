'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLikedQuestion = exports.createRecord = exports.getRecordByQuestionIdAndUserId = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Sequelize from 'sequelize'

var getRecordByQuestionIdAndUserId = exports.getRecordByQuestionIdAndUserId = function _callee(_ref) {
  var questionId = _ref.questionId,
      userId = _ref.userId,
      _ref$raw = _ref.raw,
      raw = _ref$raw === undefined ? true : _ref$raw;
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLikeQuestions.findOne({
            where: {
              questionId: questionId,
              userId: userId
            },
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

var createRecord = exports.createRecord = function _callee2(_ref2) {
  var questionId = _ref2.questionId,
      userId = _ref2.userId;
  var id, instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = (0, _v2.default)();
          _context2.next = 3;
          return _regenerator2.default.awrap(_db2.default.UsersLikeQuestions.create({
            id: id, questionId: questionId, userId: userId, isActive: true
          }));

        case 3:
          instance = _context2.sent;
          return _context2.abrupt('return', instance);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var updateLikedQuestion = exports.updateLikedQuestion = function _callee3(_ref3) {
  var questionId = _ref3.questionId,
      userId = _ref3.userId,
      isLiked = _ref3.isLiked;

  var isExist, isUpdateStatusSuccess, instance, _instance, increment, rs;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(getRecordByQuestionIdAndUserId({ questionId: questionId, userId: userId }));

        case 2:
          isExist = _context3.sent;
          isUpdateStatusSuccess = null;

          if (!isExist) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return _regenerator2.default.awrap(_db2.default.UsersLikeQuestions.update({
            isActive: isLiked
            // isActive: false
          }, {
            where: {
              questionId: questionId,
              userId: userId,
              isActive: !isLiked
            }
          }));

        case 7:
          instance = _context3.sent;


          isUpdateStatusSuccess = instance[0] === 1;
          _context3.next = 15;
          break;

        case 11:
          _context3.next = 13;
          return _regenerator2.default.awrap(createRecord({ questionId: questionId, userId: userId }));

        case 13:
          _instance = _context3.sent;

          isUpdateStatusSuccess = _instance !== null;

        case 15:
          if (isUpdateStatusSuccess) {
            _context3.next = 17;
            break;
          }

          return _context3.abrupt('return', null);

        case 17:

          // update likeNumber in question
          increment = isLiked ? 1 : -1;
          _context3.next = 20;
          return _regenerator2.default.awrap(_db2.default.Questions.increment('likedNumber', { by: increment, where: { id: questionId, isDeleted: false } }));

        case 20:
          rs = _context3.sent;
          return _context3.abrupt('return', rs[0][1] === 1);

        case 22:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};