'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveFeedbackFromUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _feebackService = require('./feebackService');

var feebackService = _interopRequireWildcard(_feebackService);

var _utils = require('../../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { feebackService.createFeedback } from './feebackService'
var NAMESPACE = 'feedbackController-' + _moment2.default.utc().toISOString();

var receiveFeedbackFromUser = exports.receiveFeedbackFromUser = function _callee(req, res, next) {
  var id, _req$body, subject, content;

  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.user.id;
          _req$body = req.body, subject = _req$body.subject, content = _req$body.content;
          _context.prev = 2;
          _context.next = 5;
          return _regenerator2.default.awrap(feebackService.createFeedback(id, subject, content));

        case 5:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK
          }));

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](2);

          _utils.debug.error(NAMESPACE, 'Error occured while creating feedback', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: 'Hệ thống gặp lỗi khi nhận phản hồi từ người dùng'
          }));

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[2, 8]]);
};