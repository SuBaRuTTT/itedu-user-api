'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReport = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _utils = require('../../utils');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createReport = exports.createReport = function _callee(userId, courseId, content, subject) {
  var reportId, instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reportId = (0, _v2.default)();
          _context.next = 3;
          return _regenerator2.default.awrap(_db2.default.Reports.create({
            id: reportId,
            userId: userId,
            courseId: courseId,
            subject: subject,
            content: content,
            status: _utils.enums.REPORT_STATUS.PENDING
          }));

        case 3:
          instance = _context.sent;
          return _context.abrupt('return', instance);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};