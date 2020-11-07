'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFeedback = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _feedbacks = require('../../../models/feedbacks');

var _feedbacks2 = _interopRequireDefault(_feedbacks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFeedback = exports.createFeedback = function _callee(userId, subject, content) {
  var feedbackId;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          feedbackId = (0, _v2.default)();
          _context.next = 3;
          return _regenerator2.default.awrap(_feedbacks2.default.create({
            id: feedbackId,
            userId: userId,
            subject: subject,
            content: content
          }));

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};