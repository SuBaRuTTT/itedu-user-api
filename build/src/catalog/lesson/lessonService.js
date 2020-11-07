'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCaptionDeleteLesson = exports.udpateCurrentTimeLearnVideo = exports.deleteAllLesson = exports.deleteLessonById = exports.updateLessonById = exports.createLesson = exports.getAllLesson = exports.updateStatusLessonFinish = exports.updateLessonInfo = exports.getLessonWithStatusLearingByCourseId = exports.getLessonByNumberOrderAndCourseId = exports.getLessonInfoByLessonIdAndCourseId = exports.getLessonInfoWithCurrentTimeById = exports.getLessonInfoById = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _fetch = require('../../fetch');

var _config = require('../../config');

var _userLearnLessonService = require('../user-learn-lesson/user-learn-lessonService');

var userLearnLessonService = _interopRequireWildcard(_userLearnLessonService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

var getLessonInfoById = exports.getLessonInfoById = function _callee(id) {
  var instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            attributes: {
              exclude: ['isDeleted']
            },
            where: {
              id: id,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Resources,
              attributes: {
                exclude: ['lessonId']
              }
            }]
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

var getLessonInfoWithCurrentTimeById = exports.getLessonInfoWithCurrentTimeById = function _callee2(_ref) {
  var userId = _ref.userId,
      lessonId = _ref.lessonId;
  var instance;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            where: {
              id: lessonId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.UsersLearnLessons,
              required: false,
              attributes: ['currentTime', 'isFinish'],
              where: {
                userId: userId
              }
            }],
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
 * Get lesson detail and check if lessonId match with courseId
 * @param {string} lessonId
 * @param {string} courseId
 */
var getLessonInfoByLessonIdAndCourseId = exports.getLessonInfoByLessonIdAndCourseId = function _callee3(_ref2) {
  var lessonId = _ref2.lessonId,
      courseId = _ref2.courseId,
      userId = _ref2.userId;
  var instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            attributes: ['id', 'numberOrder', 'name', 'content', 'videoName', 'hours', 'sectionId', 'users_learn_lessons.isFinish'],
            where: {
              id: lessonId,
              courseId: courseId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.UsersLearnLessons,
              required: false,
              attributes: [],
              where: {
                userId: userId
              }
            }],
            raw: true
          }));

        case 2:
          instance = _context3.sent;
          return _context3.abrupt('return', instance);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get lesson by number order
 * @param {string} lessonId
 * @param {string} courseId
 */
var getLessonByNumberOrderAndCourseId = exports.getLessonByNumberOrderAndCourseId = function _callee4(_ref3) {
  var numberOrder = _ref3.numberOrder,
      courseId = _ref3.courseId;
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            attributes: ['id', 'numberOrder', 'name', 'content', 'videoName', 'hours', 'sectionId'],
            where: {
              courseId: courseId,
              numberOrder: numberOrder,
              isDeleted: false
            },
            raw: true
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

/**
 * Get all lesson with status isLearned by course id, order by numberOrder (ASC)
 * Create date: 1/29/2020
 * @param {String} courseId
 * @param {String} userId as studentId
 * @param {Boolean} raw
 */
var getLessonWithStatusLearingByCourseId = exports.getLessonWithStatusLearingByCourseId = function _callee5(courseId, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instance;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findAll({
            attributes: ['id', 'numberOrder', 'name', 'content', 'videoName', 'hours', 'sectionId', 'users_learn_lessons.isFinish'],
            where: {
              courseId: courseId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.UsersLearnLessons,
              required: false,
              attributes: [],
              where: {
                userId: userId
              }
            }],
            order: [['numberOrder', 'ASC']],
            raw: raw
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

/**
 * Update lesson info
 * @param {String} id
 * @param {Object} lessonInfo {
 *  name: String,
 *  content: String,
 *  videoName: String,
 *  captionName: String
 *  hours: Double
 * }
 */
var updateLessonInfo = exports.updateLessonInfo = function _callee7(id, lessonInfo) {
  var hours, instance, previousHours, courseId;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          hours = lessonInfo.hours;
          _context7.next = 3;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 3:
          instance = _context7.sent;

          if (instance) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt('return');

        case 6:
          previousHours = instance.hours, courseId = instance.courseId;
          _context7.next = 9;
          return _regenerator2.default.awrap(instance.update((0, _extends3.default)({}, lessonInfo)));

        case 9:
          if (previousHours) {
            _context7.next = 12;
            break;
          }

          _context7.next = 12;
          return _regenerator2.default.awrap(_db2.default.Courses.increment('videoNumber', {
            where: {
              id: courseId
            }
          }));

        case 12:
          if (!hours) {
            _context7.next = 15;
            break;
          }

          _context7.next = 15;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              isDeleted: false
            }
          }).then(function _callee6(record) {
            var totalHours;
            return _regenerator2.default.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    totalHours = record.totalHours;

                    totalHours = totalHours - previousHours + hours;

                    if (!(totalHours < 0)) {
                      _context6.next = 4;
                      break;
                    }

                    return _context6.abrupt('return');

                  case 4:
                    _context6.next = 6;
                    return _regenerator2.default.awrap(record.update({ totalHours: totalHours }));

                  case 6:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, null, undefined);
          }));

        case 15:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update status isFinish to true
 * @param {String} lessonId
 * @param {String} userId
 * Output: Boolean
 */
var updateStatusLessonFinish = exports.updateStatusLessonFinish = function _callee8(_ref4) {
  var lessonId = _ref4.lessonId,
      userId = _ref4.userId;

  var isExist, _instance, instance;

  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _regenerator2.default.awrap(userLearnLessonService.findRecordByUserIdAndLessonId(userId, lessonId));

        case 2:
          isExist = _context8.sent;

          if (!isExist) {
            _context8.next = 8;
            break;
          }

          _context8.next = 6;
          return _regenerator2.default.awrap(userLearnLessonService.finishLesson(userId, lessonId));

        case 6:
          _instance = _context8.sent;
          return _context8.abrupt('return', _instance[0] === 1);

        case 8:
          _context8.next = 10;
          return _regenerator2.default.awrap(userLearnLessonService.createRecord({ userId: userId, lessonId: lessonId, isFinish: true }));

        case 10:
          instance = _context8.sent;

          if (!instance) {
            _context8.next = 13;
            break;
          }

          return _context8.abrupt('return', true);

        case 13:
          return _context8.abrupt('return', false);

        case 14:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined);
};

var getAllLesson = exports.getAllLesson = function _callee9(courseId, _ref5) {
  var numSection = _ref5.numSection,
      sectionId = _ref5.sectionId;
  var inSectionQuery, opts, finalOpts, instances;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          inSectionQuery = {
            include: [{
              model: _db2.default.Sections,
              attributes: [],
              required: true,
              where: {
                numberOrder: numSection,
                isDeleted: false
              }
            }]
          };
          opts = {
            attributes: {
              exclude: ['isDeleted']
            },
            where: {
              courseId: courseId,
              isDeleted: false
            },
            order: [['numberOrder', 'ASC']],
            include: [{
              model: _db2.default.Resources,
              attributes: ['id', 'name', 'url']
            }]
          };
          finalOpts = numSection ? (0, _extends3.default)({}, opts, inSectionQuery) : opts;
          _context9.next = 5;
          return _regenerator2.default.awrap(_db2.default.Lessons.findAll(finalOpts));

        case 5:
          instances = _context9.sent;
          return _context9.abrupt('return', instances);

        case 7:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined);
};

/**
 *
 * @param {String} sectionId
 * @param {Object} lessonInfo {
 *  name: String,
 *  content: String
 * }
 */
var createLesson = exports.createLesson = function _callee10(sectionId) {
  var instance, courseId, lessonId, numberOrder;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.findOne({
            where: {
              id: sectionId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          instance = _context10.sent;

          if (instance) {
            _context10.next = 5;
            break;
          }

          return _context10.abrupt('return');

        case 5:
          courseId = instance.courseId;
          lessonId = (0, _v2.default)();
          _context10.next = 9;
          return _regenerator2.default.awrap(_db2.default.Lessons.max('numberOrder', {
            where: {
              courseId: courseId,
              sectionId: sectionId,
              isDeleted: false
            }
          }));

        case 9:
          _context10.t0 = _context10.sent;

          if (_context10.t0) {
            _context10.next = 12;
            break;
          }

          _context10.t0 = 0;

        case 12:
          _context10.t1 = _context10.t0;
          numberOrder = _context10.t1 + 1;
          _context10.next = 16;
          return _regenerator2.default.awrap(_db2.default.Lessons.increment('numberOrder', {
            where: { numberOrder: (0, _defineProperty3.default)({}, Op.gte, numberOrder) }
          }));

        case 16:
          _context10.next = 18;
          return _regenerator2.default.awrap(_db2.default.Lessons.create({
            id: lessonId,
            courseId: courseId,
            sectionId: sectionId,
            numberOrder: numberOrder
            // ...lessonInfo
          }));

        case 18:
          return _context10.abrupt('return', lessonId);

        case 19:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update lesson by id
 * @param {String} lessonId
 * @param {Object} lessonInfo {
 *  name: String,
 *  content: String
 * }
 */
var updateLessonById = exports.updateLessonById = function _callee11(lessonId, lessonInfo) {
  var instance;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.update((0, _extends3.default)({}, lessonInfo), {
            where: {
              id: lessonId,
              isDeleted: false
            },
            returning: true
          }));

        case 2:
          instance = _context11.sent;
          return _context11.abrupt('return', instance[1][0].dataValues);

        case 4:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined);
};

/**
 * Delete lesson by id
 * @param {String} lessonId
 */
var deleteLessonById = exports.deleteLessonById = function _callee12(lessonId) {
  var instance, courseId, numberOrder, prefix;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findOne({
            where: {
              id: lessonId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          instance = _context12.sent;

          if (instance) {
            _context12.next = 5;
            break;
          }

          return _context12.abrupt('return');

        case 5:
          courseId = instance.courseId, numberOrder = instance.numberOrder;
          prefix = 'Courses/' + courseId + '/' + lessonId + '/';
          _context12.next = 9;
          return _regenerator2.default.awrap(_fetch.storage.deleteFiles(_config.GCP_STORAGE_BUCKET_NAME, prefix));

        case 9:
          _context12.next = 11;
          return _regenerator2.default.awrap(_db2.default.Lessons.decrement('numberOrder', {
            where: {
              courseId: courseId,
              numberOrder: (0, _defineProperty3.default)({}, Op.gt, numberOrder),
              isDeleted: false
            }
          }));

        case 11:
          _context12.next = 13;
          return _regenerator2.default.awrap(_db2.default.Lessons.update({
            isDeleted: true
          }, {
            where: {
              id: lessonId,
              isDeleted: false
            }
          }));

        case 13:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined);
};

/**
 * Delete lesson in course
 * @param {String} courseId
 * @param {Integer} {numSection} // Optional
 */
var deleteAllLesson = exports.deleteAllLesson = function _callee14(courseId) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      numSection = _ref6.numSection;

  var opt, sectionInclusion, finalOpts, instances, sectionId, lessonQuery, numLesson, promises;
  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          opt = {
            where: {
              isDeleted: false,
              courseId: courseId
            }
          };
          sectionInclusion = {
            include: [{
              model: _db2.default.Sections,
              required: true,
              where: {
                isDeleted: false,
                numberOrder: numSection
              }
            }]
          };
          finalOpts = numSection ? (0, _extends3.default)({}, opt, sectionInclusion) : opt;
          _context14.next = 5;
          return _regenerator2.default.awrap(_db2.default.Lessons.findAll(finalOpts));

        case 5:
          instances = _context14.sent;

          if (!(instances.length === 0)) {
            _context14.next = 8;
            break;
          }

          return _context14.abrupt('return');

        case 8:
          sectionId = numSection ? instances[0].sectionId : undefined;
          lessonQuery = numSection ? {
            where: {
              courseId: courseId,
              sectionId: sectionId,
              isDeleted: false
            }
          } : {
            where: {
              courseId: courseId,
              isDeleted: false
            }
          };
          _context14.next = 12;
          return _regenerator2.default.awrap(_db2.default.Lessons.max('numberOrder', lessonQuery));

        case 12:
          _context14.t0 = _context14.sent;

          if (_context14.t0) {
            _context14.next = 15;
            break;
          }

          _context14.t0 = 0;

        case 15:
          numLesson = _context14.t0;
          promises = instances.map(function (lesson) {
            var deleteLesson = function _callee13(id) {
              var prefix;
              return _regenerator2.default.async(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      prefix = 'Courses/' + courseId + '/' + id + '/';
                      _context13.next = 3;
                      return _regenerator2.default.awrap(_fetch.storage.deleteFiles(_config.GCP_STORAGE_BUCKET_NAME, prefix));

                    case 3:
                    case 'end':
                      return _context13.stop();
                  }
                }
              }, null, undefined);
            };
            return deleteLesson(lesson.id);
          });
          _context14.next = 19;
          return _regenerator2.default.awrap(_promise2.default.all(promises));

        case 19:
          if (!numSection) {
            _context14.next = 22;
            break;
          }

          _context14.next = 22;
          return _regenerator2.default.awrap(_db2.default.Lessons.decrement('numberOrder', {
            by: instances.length,
            where: {
              courseId: courseId,
              numberOrder: (0, _defineProperty3.default)({}, Op.gt, numLesson),
              isDeleted: false
            }
          }));

        case 22:
          _context14.next = 24;
          return _regenerator2.default.awrap(_db2.default.Lessons.update({
            isDeleted: true
          }, lessonQuery));

        case 24:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined);
};

var udpateCurrentTimeLearnVideo = exports.udpateCurrentTimeLearnVideo = function _callee15(_ref7) {
  var lessonId = _ref7.lessonId,
      userId = _ref7.userId,
      currentTime = _ref7.currentTime;
  var isExist, result, instance;
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _regenerator2.default.awrap(userLearnLessonService.findRecordByUserIdAndLessonId(userId, lessonId));

        case 2:
          isExist = _context15.sent;

          if (!isExist) {
            _context15.next = 8;
            break;
          }

          _context15.next = 6;
          return _regenerator2.default.awrap(userLearnLessonService.updateCurrentTime(userId, lessonId, currentTime));

        case 6:
          result = _context15.sent;
          return _context15.abrupt('return', result);

        case 8:
          _context15.next = 10;
          return _regenerator2.default.awrap(userLearnLessonService.createRecord({ userId: userId, lessonId: lessonId, currentTime: currentTime }));

        case 10:
          instance = _context15.sent;

          if (!instance) {
            _context15.next = 13;
            break;
          }

          return _context15.abrupt('return', true);

        case 13:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined);
};

var updateCaptionDeleteLesson = exports.updateCaptionDeleteLesson = function _callee16(_ref8) {
  var lessonId = _ref8.lessonId;
  var instance;
  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.update({
            captionName: null
          }, {
            where: {
              id: lessonId
            },
            returning: true
          }));

        case 2:
          instance = _context16.sent;
          return _context16.abrupt('return', instance[1][0].dataValues);

        case 4:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined);
};