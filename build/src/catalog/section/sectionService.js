'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSectionById = exports.updateSectionNameById = exports.createSection = exports.getSectionById = exports.getAllSection = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _lessonService = require('../lesson/lessonService');

var lessonService = _interopRequireWildcard(_lessonService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;
/**
 * Get all section information
 * @param {String} courseId
 */
var getAllSection = exports.getAllSection = function _callee(courseId) {
  var instances;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.findAll({
            attributes: {
              exclude: ['isDeleted']
            },
            where: {
              courseId: courseId,
              isDeleted: false
            },
            order: [['numberOrder', 'ASC']],
            include: [{
              model: _db2.default.Lessons,
              attributes: {
                exclude: ['isDeleted', 'sectionId', 'courseId']
              },
              required: false,
              where: {
                isDeleted: false
              },
              separate: true,
              order: [['numberOrder', 'ASC']],
              include: [{
                model: _db2.default.Resources,
                attributes: {
                  exclude: ['lessonId']
                }
              }]
            }]
          }));

        case 2:
          instances = _context.sent;
          return _context.abrupt('return', instances);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var getSectionById = exports.getSectionById = function _callee2(id) {
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.findOne({
            attributes: {
              exclude: ['isDeleted']
            },
            where: {
              id: id,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Lessons,
              attributes: {
                exclude: ['isDeleted', 'sectionId', 'courseId']
              },
              required: false,
              separate: true,
              order: [['numberOrder', 'ASC']],
              where: {
                isDeleted: false
              },
              include: [{
                model: _db2.default.Resources,
                attributes: {
                  exclude: ['lessonId']
                }
              }]
            }]
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
 * Create section with numberOrder increment
 * @param {String} courseId
 * @param {String} name
 */
var createSection = exports.createSection = function _callee3(courseId, name) {
  var sectionId, numberOrder;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sectionId = (0, _v2.default)();
          _context3.next = 3;
          return _regenerator2.default.awrap(_db2.default.Sections.max('numberOrder', {
            where: { courseId: courseId }
          }));

        case 3:
          _context3.t0 = _context3.sent;

          if (_context3.t0) {
            _context3.next = 6;
            break;
          }

          _context3.t0 = 0;

        case 6:
          _context3.t1 = _context3.t0;
          numberOrder = _context3.t1 + 1;
          _context3.next = 10;
          return _regenerator2.default.awrap(_db2.default.Sections.create({
            id: sectionId,
            courseId: courseId,
            name: name,
            numberOrder: numberOrder
          }));

        case 10:
          return _context3.abrupt('return', { sectionId: sectionId, numberOrder: numberOrder });

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var updateSectionNameById = exports.updateSectionNameById = function _callee4(id, name) {
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.update({
            name: name
          }, {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

var deleteSectionById = exports.deleteSectionById = function _callee5(id) {
  var instance, courseId, numSection;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.findOne({
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 2:
          instance = _context5.sent;

          if (instance) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt('return');

        case 5:
          courseId = instance.courseId, numSection = instance.numberOrder;
          _context5.next = 8;
          return _regenerator2.default.awrap(lessonService.deleteAllLesson(courseId, { numSection: numSection }));

        case 8:
          _context5.next = 10;
          return _regenerator2.default.awrap(_db2.default.Sections.decrement('numberOrder', {
            where: {
              courseId: courseId,
              numberOrder: (0, _defineProperty3.default)({}, Op.gt, numSection),
              isDeleted: false
            }
          }));

        case 10:
          _context5.next = 12;
          return _regenerator2.default.awrap(instance.update({ isDeleted: true }));

        case 12:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};