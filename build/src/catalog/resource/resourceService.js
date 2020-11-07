'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResourceById = exports.getResourceByIdLesson = exports.getResourceInfo = exports.removeAllResources = exports.removeResource = exports.createResource = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _config = require('../../config');

var _fetch = require('../../fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResource = exports.createResource = function _callee(lessonId, name, url) {
  var instance, resourceId;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Resources.findOne({
            where: {
              name: name,
              url: url
            }
          }));

        case 2:
          instance = _context.sent;
          resourceId = instance ? instance.id : (0, _v2.default)();

          if (!instance) {
            _context.next = 9;
            break;
          }

          //Update new version of file, just change updatedAt field
          instance.changed('updatedAt', true);
          instance.save();
          _context.next = 11;
          break;

        case 9:
          _context.next = 11;
          return _regenerator2.default.awrap(_db2.default.Resources.create({
            id: resourceId,
            lessonId: lessonId,
            name: name,
            url: url
          }));

        case 11:
          return _context.abrupt('return', resourceId);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var removeResource = exports.removeResource = function _callee2(resourceId, filePath) {
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_fetch.storage.deleteFile(_config.GCP_STORAGE_BUCKET_NAME, filePath));

        case 2:
          _context2.next = 4;
          return _regenerator2.default.awrap(_db2.default.Resources.destroy({
            where: {
              id: resourceId
            }
          }));

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var removeAllResources = exports.removeAllResources = function _callee3(lessonId, courseId) {
  var prefix;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          prefix = _config.GCP_STORAGE_COURSE_PATH_NAME + '/' + courseId + '/' + lessonId + '/' + _config.GCP_STORAGE_RESOURCE_PATH_NAME + '/';
          _context3.next = 3;
          return _regenerator2.default.awrap(_fetch.storage.deleteFiles(_config.GCP_STORAGE_BUCKET_NAME, prefix));

        case 3:
          _context3.next = 5;
          return _regenerator2.default.awrap(_db2.default.Resources.destroy({
            where: {
              lessonId: lessonId
            }
          }));

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var getResourceInfo = exports.getResourceInfo = function _callee4(resourceId) {
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.Resources.findOne({
            attributes: ['id', 'lessonId', 'name', 'createdAt', 'updatedAt', 'lesson.courseId'],
            where: {
              id: resourceId
            },
            raw: true,
            include: [{
              model: _db2.default.Lessons,
              attributes: [],
              where: {
                isDeleted: false
              }
            }]
          }));

        case 2:
          instance = _context4.sent;
          return _context4.abrupt('return', instance);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

var getResourceByIdLesson = exports.getResourceByIdLesson = function _callee5(lessonId) {
  var instance;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.Resources.findAll({
            attributes: ['id', 'name', 'url'],
            where: {
              lessonId: lessonId
            },
            raw: true
          }));

        case 2:
          instance = _context5.sent;
          return _context5.abrupt('return', instance);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};

var getResourceById = exports.getResourceById = function _callee6(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _regenerator2.default.awrap(_db2.default.Resources.findOne({
            where: {
              id: id
            },
            raw: raw
          }));

        case 2:
          instance = _context6.sent;
          return _context6.abrupt('return', instance);

        case 4:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};