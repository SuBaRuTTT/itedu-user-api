'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCategoriesWithLabelAndValue = exports.getAllCategories = exports.getCategoryById = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _categoryService = require('./categoryService');

var CategoryService = _interopRequireWildcard(_categoryService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'categoryController-' + _moment2.default.utc().toISOString();

/**
 * Nguyễn Linh
 * @param {*} req
 * @param {*} res
 */

var getCategoryById = exports.getCategoryById = function _callee(req, res) {
  var id, category;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.prev = 1;
          _context.next = 4;
          return _regenerator2.default.awrap(CategoryService.getCategoryById(id));

        case 4:
          category = _context.sent;

          if (!category) {
            _context.next = 9;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: category
          }));

        case 9:
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Lĩnh vực không tồn tại.'
          }));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while get category', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Có lỗi xảy ra'
          }));

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[1, 12]]);
};

var getAllCategories = exports.getAllCategories = function _callee2(req, res, next) {
  var categories;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _regenerator2.default.awrap(CategoryService.getAll());

        case 3:
          categories = _context2.sent;
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: categories
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get all categories', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Có lỗi xảy ra'
          }));

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 7]]);
};

var getAllCategoriesWithLabelAndValue = exports.getAllCategoriesWithLabelAndValue = function _callee3(req, res, next) {
  var categories;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _regenerator2.default.awrap(CategoryService.getAllCategoriesWithLabelAndValue());

        case 3:
          categories = _context3.sent;
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: categories
          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while get all categories', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 7]]);
};