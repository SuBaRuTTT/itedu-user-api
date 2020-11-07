'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSectionById = exports.updateSectionNameById = exports.createSection = exports.getSectionById = exports.getAllSection = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _sectionService = require('./sectionService');

var sectionService = _interopRequireWildcard(_sectionService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'sectionController-' + _moment2.default.utc().toISOString();

/**
 * Get all section information
 * @param {*} req
 * body: {
 *  courseId: String
 * }
 * @param {*} res: {
 *  message: OK
 *  payload: {
 *    [...]
 *  }
 * }
 */
var getAllSection = exports.getAllSection = function _callee(req, res, next) {
  var courseId, instances;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          courseId = req.body.courseId;

          if (courseId) {
            _context.next = 4;
            break;
          }

          return _context.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id khoá học để lấy thông tin các chương học'
          }));

        case 4:
          _context.next = 6;
          return _regenerator2.default.awrap(sectionService.getAllSection(courseId));

        case 6:
          instances = _context.sent;
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: instances
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting all sections', _context.t0);
          return _context.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined, [[0, 10]]);
};

/**
 * Get section information
 * @param {*} req
 * body: {
 *  sectionId: String
 * }
 * @param {*} res
 * message: OK
 * payload: {
 *   sectionInfo: String
 * }
 */
var getSectionById = exports.getSectionById = function _callee2(req, res, next) {
  var sectionId, sectionInfo;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          sectionId = req.body.sectionId;

          if (sectionId) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id để lấy thông tin chương học'
          }));

        case 4:
          _context2.next = 6;
          return _regenerator2.default.awrap(sectionService.getSectionById(sectionId));

        case 6:
          sectionInfo = _context2.sent;

          if (sectionInfo) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.NOT_FOUND).json({
            message: 'Chương học không tồn tại'
          }));

        case 9:
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              sectionInfo: sectionInfo
            }
          }));

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while getting section information', _context2.t0);
          return _context2.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 16:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined, [[0, 12]]);
};

/**
 * Create section
 * @param {*} req
 * body: {
 *  courseId: String,
 *  sectionName: String
 * }
 * @param {*} res
 * message: OK
 * payload: {
 *   sectionId: String
 * }
 */
var createSection = exports.createSection = function _callee3(req, res, next) {
  var _req$body, courseId, name, section, sectionId, numberOrder;

  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, courseId = _req$body.courseId, name = _req$body.name;

          if (!(!courseId || !name)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin để tạo chương học'
          }));

        case 4:
          _context3.next = 6;
          return _regenerator2.default.awrap(sectionService.createSection(courseId, name));

        case 6:
          section = _context3.sent;
          sectionId = section.sectionId, numberOrder = section.numberOrder;
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            message: _utils.enums.MESSAGE.OK,
            payload: {
              id: sectionId,
              name: name,
              numberOrder: numberOrder
            }
          }));

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while creating section', _context3.t0);
          return _context3.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined, [[0, 11]]);
};

/**
 * Update section name by id
 * @param {*} req
 * body: {
 *  sectionId: String,
 *  sectionName: String
 * }
 * @param {*} res
 * message: OK
 */
var updateSectionNameById = exports.updateSectionNameById = function _callee4(req, res, next) {
  var _req$body2, sectionId, name;

  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, sectionId = _req$body2.sectionId, name = _req$body2.name;

          if (!(!sectionId || !name)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu thông tin để cập nhật chương học'
          }));

        case 4:
          _context4.next = 6;
          return _regenerator2.default.awrap(sectionService.updateSectionNameById(sectionId, name));

        case 6:
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              message: _utils.enums.MESSAGE.OK,
              id: sectionId,
              name: name
            }
          }));

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while updating section', _context4.t0);
          return _context4.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 13:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};

/**
 * Delete section and its lessons
 * @param {*} req
 * body: {
 *  sectionId: String
 * }
 * @param {*} res
 * message: OK
 */
var deleteSectionById = exports.deleteSectionById = function _callee5(req, res, next) {
  var sectionId;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          sectionId = req.body.sectionId;

          if (sectionId) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.BAD_REQUEST).json({
            message: 'Thiếu id để xoá chương học'
          }));

        case 4:
          _context5.next = 6;
          return _regenerator2.default.awrap(sectionService.deleteSectionById(sectionId));

        case 6:
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.OK).json({
            payload: {
              message: _utils.enums.MESSAGE.OK,
              id: sectionId
            }
          }));

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5['catch'](0);

          _utils.debug.error(NAMESPACE, 'Error occured while removing section', _context5.t0);
          return _context5.abrupt('return', res.status(_httpStatusCodes2.default.INTERNAL_SERVER_ERROR).json({
            message: _utils.enums.MESSAGE.INTERNAL_SERVER_ERROR
          }));

        case 13:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[0, 9]]);
};