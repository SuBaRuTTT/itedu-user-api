'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnswerByQuestionId = exports.create = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _answerService = require('../answer/answerService');

var answerService = _interopRequireWildcard(_answerService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'answerController-' + _moment2.default.utc().toISOString();

var create = exports.create = function _callee(req, res, next) {
  var userId, _req$body, questionId, content, result, newAnswer;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$body = req.body, questionId = _req$body.questionId, content = _req$body.content;
          _context.next = 5;
          return _regenerator2.default.awrap(answerService.createAnswer(userId, questionId, content));

        case 5:
          result = _context.sent;

          if (!result) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return _regenerator2.default.awrap(answerService.getAnswerById(result.id));

        case 9:
          newAnswer = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: newAnswer
          }));

        case 11:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: "Có lỗi khi gửi câu trả lời."
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while create question', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi gửi câu trả lời.'
          }));

        case 18:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};

var getAnswerByQuestionId = exports.getAnswerByQuestionId = function _callee2(req, res, next) {
  var questionId, result;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          questionId = req.params.questionId;
          _context2.next = 4;
          return _regenerator2.default.awrap(answerService.getAnswerByQuestionId(questionId));

        case 4:
          result = _context2.sent;

          if (!result) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: result
          }));

        case 7:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: "Có lỗi khi lấy câu hỏi."
          }));

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting answer', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi lấy câu hỏi.'
          }));

        case 14:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 10]]);
};