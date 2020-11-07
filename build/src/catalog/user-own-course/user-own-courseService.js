'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserOwnCourse = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isUserOwnCourse = exports.isUserOwnCourse = function _callee(courseId, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var result;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.findOne({
            where: {
              courseId: courseId,
              userId: userId
            },
            raw: raw
          }));

        case 2:
          result = _context.sent;
          return _context.abrupt('return', !!result);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};