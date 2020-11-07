'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatesByCourseId = exports.getRatingByCourseId = exports.updateRating = exports.createRating = exports.getRating = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRating = exports.getRating = function _callee(_ref) {
  var courseId = _ref.courseId,
      userId = _ref.userId,
      _ref$raw = _ref.raw,
      raw = _ref$raw === undefined ? true : _ref$raw;
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.findOne({
            where: {
              userId: userId,
              courseId: courseId
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

var createRating = exports.createRating = function _callee2(data) {
  var courseId, userId, formalityPoint, contentPoint, presentationPoint, content, id, instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          courseId = data.courseId, userId = data.userId, formalityPoint = data.formalityPoint, contentPoint = data.contentPoint, presentationPoint = data.presentationPoint, content = data.content;
          id = (0, _v2.default)();
          _context2.next = 4;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.create({
            id: id, userId: userId, courseId: courseId, formalityPoint: formalityPoint, contentPoint: contentPoint, presentationPoint: presentationPoint, content: content
          }));

        case 4:
          instance = _context2.sent;
          return _context2.abrupt('return', instance);

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var updateRating = exports.updateRating = function _callee3(data) {
  var courseId, userId, formalityPoint, contentPoint, presentationPoint, content, instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          courseId = data.courseId, userId = data.userId, formalityPoint = data.formalityPoint, contentPoint = data.contentPoint, presentationPoint = data.presentationPoint, content = data.content;
          _context3.next = 3;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.update({
            formalityPoint: formalityPoint, contentPoint: contentPoint, presentationPoint: presentationPoint, content: content
          }, {
            where: {
              userId: userId,
              courseId: courseId
            },
            returning: true
          }));

        case 3:
          instance = _context3.sent;
          return _context3.abrupt('return', instance[1][0].dataValues);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var getRatingByCourseId = exports.getRatingByCourseId = function _callee4(_ref2) {
  var courseId = _ref2.courseId,
      _ref2$raw = _ref2.raw,
      raw = _ref2$raw === undefined ? true : _ref2$raw;

  var instances, listUser, result, stars, _loop, i;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.findAll({
            where: {
              courseId: courseId
            },
            raw: raw
          }));

        case 2:
          instances = _context4.sent;
          _context4.next = 5;
          return _regenerator2.default.awrap(_db2.default.Users.findAll());

        case 5:
          listUser = _context4.sent;
          result = instances.map(function (element) {
            var temp = listUser.find(function (elem) {
              return elem.id == element.userId;
            });
            var copy = {};
            if (temp) {
              copy = (0, _extends3.default)({}, element, {
                user: temp,
                averagePoint: (element.formalityPoint + element.presentationPoint + element.contentPoint) / 3
              });
            }
            return copy;
          });
          stars = [0, 0, 0, 0, 0];


          if (instances.length > 0) {
            _loop = function _loop(i) {
              var temp = result.filter(function (item) {
                return item.averagePoint.toFixed(0) == i + 1;
              });
              stars[i] = parseInt((temp.length / result.length * 100).toFixed(0));
            };

            for (i = 0; i < 5; i++) {
              _loop(i);
            }
          }

          return _context4.abrupt('return', { ratingList: result, stars: stars });

        case 10:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

var getRatesByCourseId = exports.getRatesByCourseId = function _callee5(_ref3) {
  var courseId = _ref3.courseId,
      _ref3$raw = _ref3.raw,
      raw = _ref3$raw === undefined ? true : _ref3$raw;
  var instances;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.findAll({
            where: {
              courseId: courseId
            },
            raw: raw
          }));

        case 2:
          instances = _context5.sent;
          return _context5.abrupt('return', instances);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};