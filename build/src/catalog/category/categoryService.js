'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCategoriesWithLabelAndValue = exports.getAll = exports.getCategoryByArrayId = exports.getCategoryById = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _categories = require('../../../models/categories');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

/**
 * Nguyễn Linh
 * @param {String} id
 * @param {int} limit
 * @param {int} offset
 */

var getCategoryById = exports.getCategoryById = function _callee(id) {
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_categories2.default.findOne({
            where: {
              id: id,
              isDeleted: false
            },
            raw: true //for quick performance, delete if you need to use model's methods
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

/**
 * Nguyễn Linh
 * @param {Array} arrId
 * @param {Int16Array} limit
 * @param {Int16Array} offset
 */

var getCategoryByArrayId = exports.getCategoryByArrayId = function _callee2(arrId, limit, offset) {
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_categories2.default.findAll({
            where: {
              id: (0, _defineProperty3.default)({}, Op.in, arrId),
              isDeleted: false
            },
            limit: limit,
            offset: offset,
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

var getAll = exports.getAll = function _callee3() {
  var categories;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_categories2.default.findAll({
            where: {
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          categories = _context3.sent;
          return _context3.abrupt('return', categories);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var getAllCategoriesWithLabelAndValue = exports.getAllCategoriesWithLabelAndValue = function _callee4() {
  var categories;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.Categories.findAll({
            attributes: [['id', 'value'], ['name', 'label']],
            where: {
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          categories = _context4.sent;
          return _context4.abrupt('return', categories);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};