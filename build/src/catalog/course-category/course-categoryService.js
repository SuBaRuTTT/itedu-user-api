'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCourseCategory = exports.removeCategoryfromCourseById = exports.addCategoryToCourseById = exports.getCategoryIdByCourseId = exports.getCourseIdByCategoryId = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _lodash = require('lodash');

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

/**
 * Nguyễn Linh
 * @param {Array} arrId
 * @param {Int16Array} limit
 * @param {Int16Array} offset
 */

var getCourseIdByCategoryId = exports.getCourseIdByCategoryId = function _callee(arrId, limit, offset) {
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.findAll({
            where: {
              categoryId: (0, _defineProperty3.default)({}, Op.in, arrId)
            },
            attributes: ['courseId'],
            limit: limit,
            offset: offset,
            raw: true
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

var getCategoryIdByCourseId = exports.getCategoryIdByCourseId = function _callee2(courseId) {
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.findAll({
            where: { courseId: courseId },
            attributes: ['categoryId'],
            raw: true
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
 * Add category from course
 * @param {String} categoryId
 * @param {String} courseId
 */
var addCategoryToCourseById = exports.addCategoryToCourseById = function _callee3(courseId, categoryId) {
  var instance, courseCategoryId;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.findOne({
            where: {
              categoryId: categoryId,
              courseId: courseId
            },
            raw: true
          }));

        case 2:
          instance = _context3.sent;
          courseCategoryId = instance ? instance.id : (0, _v2.default)();

          if (instance) {
            _context3.next = 7;
            break;
          }

          _context3.next = 7;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.create({
            id: courseCategoryId,
            categoryId: categoryId,
            courseId: courseId
          }));

        case 7:
          return _context3.abrupt('return', courseCategoryId);

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

/**
 * Remove category from course
 * @param {String} categoryId
 * @param {String} courseId
 */
var removeCategoryfromCourseById = exports.removeCategoryfromCourseById = function _callee4(courseId, categoryId) {
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.findOne({
            where: {
              categoryId: categoryId,
              courseId: courseId
            }
          }));

        case 2:
          instance = _context4.sent;

          if (!instance) {
            _context4.next = 6;
            break;
          }

          _context4.next = 6;
          return _regenerator2.default.awrap(instance.destroy());

        case 6:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update category of course (add or remove)
 * @param {String} courseId
 * @param {Array} categoryIds
 */
var updateCourseCategory = exports.updateCourseCategory = function _callee5(courseId, categoryIds) {
  var instances, curCategoryIds, extraCategoryIds, removeCategoryIds, addPromises, removePromises;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.findAll({
            where: {
              courseId: courseId
            },
            raw: true
          }));

        case 2:
          instances = _context5.sent;

          if (instances) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt('return');

        case 5:
          curCategoryIds = instances.map(function (ins) {
            return ins.categoryId;
          });
          extraCategoryIds = (0, _lodash.differenceBy)(categoryIds, curCategoryIds);
          removeCategoryIds = (0, _lodash.differenceBy)(curCategoryIds, categoryIds);

          // It's not necessary to update category one by one, just update in parallel

          addPromises = extraCategoryIds.map(function (id) {
            return addCategoryToCourseById(courseId, id);
          });
          removePromises = removeCategoryIds.map(function (id) {
            return removeCategoryfromCourseById(courseId, id);
          });
          _context5.next = 12;
          return _regenerator2.default.awrap(_promise2.default.all([].concat((0, _toConsumableArray3.default)(addPromises), (0, _toConsumableArray3.default)(removePromises))));

        case 12:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};