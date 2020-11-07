'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInstructorOwnCourse = exports.instructorGetCourseDetail = exports.deleteCourseById = exports.getCoursesByUserFavoriteCategories = exports.ratingCourse = exports.getProcessCourse = exports.isUserOwnCourse = exports.getCourseInfoAndListSectionLesson = exports.getCourseDetailByCourseId = exports.groupResourceByLesson = exports.getResourceByCourseId = exports.getLessonByCourseId = exports.getSectionByCourseId = exports.updateAverageCoursePoint = exports.addNewPointToCourse = exports.updateCoursePoint = exports.updateCourseStatistic = exports.updateCourseInfo = exports.createCourse = exports.searchCourse = exports.getCourseWithInstructorByCourseId = exports.getNumbetCourseByIdInstructor = exports.getCoursesByInstructorIdWithPagination = exports.getCoursesByInstructorId = exports.getCourseAll = exports.getNumberOfCourse = exports.getTopRatedCourseHome = exports.getTopSellCourseList = exports.getTopNewCourseList = exports.getCourseByArrayId = exports.getCourseInfoById = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../../utils');

var _fetch = require('../../fetch');

var _config = require('../../config');

var _userRateCourseService = require('../user-rate-course/user-rate-courseService');

var userRateCourseService = _interopRequireWildcard(_userRateCourseService);

var _instructorService = require('../instructor/instructorService');

var instructorService = _interopRequireWildcard(_instructorService);

var _courseCategoryService = require('../course-category/course-categoryService');

var courseCategoryService = _interopRequireWildcard(_courseCategoryService);

var _lessonService = require('../lesson/lessonService');

var lessonService = _interopRequireWildcard(_lessonService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;

/**
 * Get course information by id
 * @param {String} id
 */

var getCourseInfoById = exports.getCourseInfoById = function _callee(id) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$includePending = _ref.includePending,
      includePending = _ref$includePending === undefined ? false : _ref$includePending,
      _ref$raw = _ref.raw,
      raw = _ref$raw === undefined ? true : _ref$raw;

  var courseQuery, instance;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          courseQuery = {
            where: {
              id: id,
              isDeleted: false
            }
          };


          if (!includePending) {
            courseQuery.where.status = _utils.enums.COURSE_STATUS.COMPLETED;
          }

          _context.next = 4;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne((0, _extends5.default)({
            attributes: {
              exclude: ['isDeleted']
            }
          }, courseQuery, {
            include: [{
              model: _db2.default.Sections,
              attributes: {
                exclude: ['courseId', 'isDeleted']
              },
              required: false,
              separate: true,
              order: [['numberOrder', 'ASC']],
              where: {
                isDeleted: false
              },
              include: [{
                model: _db2.default.Lessons,
                attributes: {
                  exclude: ['courseId', 'sectionId', 'isDeleted']
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
            }],
            raw: raw
          })));

        case 4:
          instance = _context.sent;
          return _context.abrupt('return', instance);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

/**
 * Nguyễn Linh
 * @param {Array} arrId
 * @param {int} limit
 * @param {int} offset
 */

var getCourseByArrayId = exports.getCourseByArrayId = function _callee2(arrId, limit, offset) {
  var instance, listInstructorId, listInstructor, result;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            where: {
              id: (0, _defineProperty3.default)({}, Op.in, arrId.map(function (item) {
                return (0, _values2.default)(item).toString();
              })),
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            limit: limit,
            offset: offset,
            raw: true
          }));

        case 2:
          instance = _context2.sent;
          listInstructorId = instance.map(function (item) {
            return item.instructorId.toString();
          });
          _context2.next = 6;
          return _regenerator2.default.awrap(_db2.default.Instructors.findAll({
            attributes: ['id', 'userId', 'user.name'],
            where: {
              id: (0, _defineProperty3.default)({}, Op.in, listInstructorId)
            },
            include: [{
              model: _db2.default.Users,
              required: true,
              attributes: [],
              where: {
                isDeleted: false,
                isActivated: true
              }
            }],
            raw: true
          }));

        case 6:
          listInstructor = _context2.sent;
          result = instance.map(function (element) {
            var temp = listInstructor.find(function (elem) {
              return elem.id == element.instructorId;
            });
            var copy = {};
            if (temp) {
              copy = (0, _extends5.default)({}, element, {
                instructorName: temp.name,
                averagePoint: (element.formalityPoint + element.presentationPoint + element.contentPoint) / 3
              });
            }
            return copy;
          });
          return _context2.abrupt('return', result);

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var getTopNewCourseList = exports.getTopNewCourseList = function _callee3(page, pageSize) {
  var offset, limit, instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!page) page = 1;
          offset = (page - 1) * pageSize;
          limit = offset + pageSize;
          _context3.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            where: {
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            order: [['createdAt', 'DESC']],
            include: [{
              model: _db2.default.Instructors,
              include: [{
                model: _db2.default.Users
              }]
            }],
            offset: offset,
            limit: limit,
            raw: true
          }));

        case 5:
          instance = _context3.sent;
          return _context3.abrupt('return', instance);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var getTopSellCourseList = exports.getTopSellCourseList = function _callee4(page, pageSize) {
  var offset, limit, instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!page) page = 1;
          offset = (page - 1) * pageSize;
          limit = offset + pageSize;
          _context4.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            where: {
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            order: [['soldNumber', 'DESC']],
            include: [{
              model: _db2.default.Instructors,
              include: [{
                model: _db2.default.Users
              }]
            }],
            offset: offset,
            limit: limit,
            raw: true
          }));

        case 5:
          instance = _context4.sent;
          return _context4.abrupt('return', instance);

        case 7:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

var getTopRatedCourseHome = exports.getTopRatedCourseHome = function _callee5(page, pageSize) {
  var offset, limit, instance;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!page) page = 1;
          offset = (page - 1) * pageSize;
          limit = offset + pageSize;
          _context5.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            where: {
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            order: [['ratedNumber', 'DESC']],
            include: [{
              model: _db2.default.Instructors,
              include: [{
                model: _db2.default.Users
              }]
            }],
            offset: offset,
            limit: limit,
            raw: true
          }));

        case 5:
          instance = _context5.sent;
          return _context5.abrupt('return', instance);

        case 7:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};

var getNumberOfCourse = exports.getNumberOfCourse = function _callee6() {
  var instance;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.count({
            where: {
              isDeleted: false
            }
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

/**
 * Nguyễn Linh
 * @param {int} limit
 * @param {int} offset
 */
var getCourseAll = exports.getCourseAll = function _callee7(limit, offset) {
  var instance;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            where: {
              isDeleted: false
            },
            limit: limit,
            offset: offset,
            raw: true
          }));

        case 2:
          instance = _context7.sent;
          return _context7.abrupt('return', instance);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get all courses by instructorId
 * @param {String} id
 * @param {Boolean} raw (optional)
 */
var getCoursesByInstructorId = exports.getCoursesByInstructorId = function _callee8(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: {
              exclude: ['isDeleted']
            },
            where: {
              instructorId: id,
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            raw: raw
          }));

        case 2:
          instance = _context8.sent;
          return _context8.abrupt('return', instance);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get all courses by instructorId with pagination (limit, offset)
 * @param {String} id
 * @param {Object} data
 */
var getCoursesByInstructorIdWithPagination = exports.getCoursesByInstructorIdWithPagination = function _callee9(id, data) {
  var limit, offset, search, optSearch, instance, result;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          limit = data.limit, offset = data.offset, search = data.search;
          optSearch = {};


          if (search) {
            optSearch = (0, _extends5.default)({}, optSearch, (0, _defineProperty3.default)({}, Op.or, [{
              title: (0, _defineProperty3.default)({}, Op.iLike, '%' + search + '%')
            }]));
          }

          _context9.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: ['id', 'title', 'soldNumber', 'updatedAt', 'status', 'formalityPoint', 'presentationPoint', 'contentPoint'],
            where: (0, _defineProperty3.default)({
              instructorId: id,
              isDeleted: false
            }, Op.and, [(0, _extends5.default)({}, optSearch)]),
            limit: limit,
            offset: limit * (offset - 1),
            raw: true
          }));

        case 5:
          instance = _context9.sent;

          if (instance) {
            _context9.next = 8;
            break;
          }

          return _context9.abrupt('return', null);

        case 8:
          _context9.next = 10;
          return _regenerator2.default.awrap(instance.map(function (item) {
            var averagePoint = ((item.formalityPoint + item.presentationPoint + item.contentPoint) / 3).toFixed(1);
            return (0, _extends5.default)({}, item, { averagePoint: averagePoint });
          }));

        case 10:
          result = _context9.sent;
          return _context9.abrupt('return', result);

        case 12:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined);
};

var getNumbetCourseByIdInstructor = exports.getNumbetCourseByIdInstructor = function _callee10(id, data) {
  var search, optSearch, count;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          search = data.search;
          optSearch = {};


          if (search) {
            optSearch = (0, _extends5.default)({}, optSearch, (0, _defineProperty3.default)({}, Op.or, [{
              title: (0, _defineProperty3.default)({}, Op.iLike, '%' + search + '%')
            }]));
          }
          _context10.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.count({
            where: (0, _defineProperty3.default)({
              instructorId: id,
              isDeleted: false
            }, Op.and, [(0, _extends5.default)({}, optSearch)])
          }));

        case 5:
          count = _context10.sent;
          return _context10.abrupt('return', count);

        case 7:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined);
};

var getCourseWithInstructorByCourseId = exports.getCourseWithInstructorByCourseId = function _callee11(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            attributes: ['id', 'title', 'price', 'description', 'requirement', 'learnWhat', 'soldNumber', 'ratedNumber', 'videoNumber', 'totalHours', 'formalityPoint', 'contentPoint', 'presentationPoint', 'imageUrl', 'promoVidUrl', 'status', 'createdAt', 'updatedAt', 'instructorId', [_sequelize2.default.col('instructor.user.name'), 'instructorName']],
            include: [{
              model: _db2.default.Instructors,
              required: true,
              attributes: [],
              include: [{
                model: _db2.default.Users,
                required: true,
                attributes: []
              }]
            }],
            where: {
              id: id,
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            raw: raw
          }));

        case 2:
          instance = _context11.sent;
          return _context11.abrupt('return', instance);

        case 4:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined);
};

/**
 * Search and filter course with condition (totalHours, price, category)
 * @param {String} keyword
 * @param {Object} opt {time: [{min:0, max:1}, {min: 3, max: 6}],
 *                      price: [{max:0}, {min: 0, max: 200000}, {min: 500000, max: 1000000}],
 *                      categoryId: [id1, id2]}
 * @param {*} raw
 * Issue: #78
 */
var searchCourse = exports.searchCourse = function _callee12(_ref2) {
  var keyword = _ref2.keyword,
      _ref2$opt = _ref2.opt,
      opt = _ref2$opt === undefined ? null : _ref2$opt,
      limit = _ref2.limit,
      offset = _ref2.offset;
  var orderQuery, condition, conditionIncludeCategory, sort, category, time, price, conditionTime, conditionPrice, instance;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          orderQuery = {};
          condition = { time: {}, price: {} };
          conditionIncludeCategory = [];

          if (opt) {
            sort = opt.sort, category = opt.category, time = opt.time, price = opt.price;
            // sort

            if (sort) {
              orderQuery = {
                order: [[sort.attribute, sort.rule]]
              };
            }
            // category
            if (category && category.length > 0) {
              conditionIncludeCategory = [{
                model: _db2.default.CoursesCategories,
                as: 'course_category',
                required: true,
                attributes: [],
                where: {
                  categoryId: (0, _defineProperty3.default)({}, Op.in, category)
                }
              }];
            }
            //time
            if (time && time.length > 0) {
              conditionTime = time.map(function (item) {
                if (item.max) {
                  return {
                    totalHours: (0, _defineProperty3.default)({}, Op.between, [item.min, item.max])
                  };
                } else {
                  return {
                    totalHours: (0, _defineProperty3.default)({}, Op.gte, item.min)
                  };
                }
              });


              condition = {
                time: (0, _defineProperty3.default)({}, Op.or, [].concat((0, _toConsumableArray3.default)(conditionTime)))
              };
            }

            // price
            if (price && price.length > 0) {
              conditionPrice = price.map(function (item) {

                if (item.max === 0) {
                  return {
                    price: (0, _defineProperty3.default)({}, Op.eq, 0)
                  };
                } else if (item.max) {
                  return {
                    price: (0, _defineProperty3.default)({}, Op.between, [item.min, item.max])
                  };
                } else {
                  return {
                    price: (0, _defineProperty3.default)({}, Op.gte, item.min)
                  };
                }
              });


              condition = (0, _extends5.default)({}, condition, {
                price: (0, _defineProperty3.default)({}, Op.or, [].concat((0, _toConsumableArray3.default)(conditionPrice)))
              });
            }
          }

          _context12.next = 6;
          return _regenerator2.default.awrap(_db2.default.Courses.findAndCountAll((0, _extends5.default)({
            attributes: ['id', 'title', 'price', 'description', 'requirement', 'learnWhat', 'soldNumber', 'ratedNumber', 'videoNumber', 'totalHours', 'formalityPoint', 'contentPoint', 'presentationPoint', 'imageUrl', 'updatedAt', [_sequelize2.default.col('instructor.user.name'), 'name']],
            where: (0, _defineProperty3.default)({
              status: _utils.enums.COURSE_STATUS.COMPLETED,
              isDeleted: false
            }, Op.and, [(0, _defineProperty3.default)({}, Op.or, [{
              title: (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
            }, {
              description: (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
            }, {
              '$instructor.user.name$': (0, _defineProperty3.default)({}, Op.iLike, '%' + keyword + '%')
            }]), condition.time, condition.price]),
            include: [{
              model: _db2.default.Instructors,
              required: true,
              attributes: [],
              where: {
                isDeleted: false
              },
              include: [{
                model: _db2.default.Users,
                required: true,
                attributes: [],
                where: {
                  isDeleted: false,
                  isActivated: true
                }
              }]
            }].concat((0, _toConsumableArray3.default)(conditionIncludeCategory))
          }, orderQuery, { // orderQuery sort
            limit: limit,
            offset: offset,
            raw: true
          })));

        case 6:
          instance = _context12.sent;
          return _context12.abrupt('return', instance);

        case 8:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined);
};

/**
 * Create course with info
 * @param {Object} courseInfo {
 *   title: String,
 *   subtitle: String,
 *   description: String,
 *   requirement: arrayString,
 *   learnWhat: arrayString
 * }
 */
var createCourse = exports.createCourse = function _callee13(courseInfo) {
  var courseId;
  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          courseId = (0, _v2.default)();
          _context13.next = 3;
          return _regenerator2.default.awrap(_db2.default.Courses.create((0, _extends5.default)({
            id: courseId
          }, courseInfo)));

        case 3:
          return _context13.abrupt('return', courseId);

        case 4:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update course info
 * @param {String} id //courseId
 * @param {Object} courseInfo {
 *   title: String,
 *   subtitle: String,
 *   description: String,
 *   requirement: arrayString,
 *   learnWhat: arrayString,
 *   price: Integer,
 *   imageUrl: String, // public url
 *   promoVidUrl: String, //public url
 *   status: String
 * }
 */
var updateCourseInfo = exports.updateCourseInfo = function _callee14(id, courseInfo) {
  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.update((0, _extends5.default)({}, courseInfo), {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 2:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update course statistics
 * @param {String} id //courseId
 * @param {Object} courseStatistic {
 *   soldNumber: Integer,
 *   ratedNumber: Integer,
 *   videoNumber: Integer,
 *   totalHours: Double,
 * }
 */
var updateCourseStatistic = exports.updateCourseStatistic = function _callee15(id, courseStatistic) {
  var isInvalid;
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          isInvalid = (0, _values2.default)(courseStatistic).some(function (prop) {
            return prop < 0;
          });

          if (!isInvalid) {
            _context15.next = 3;
            break;
          }

          return _context15.abrupt('return');

        case 3:
          _context15.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.update((0, _extends5.default)({}, courseStatistic), {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 5:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update course points
 * @param {String} id // courseId
 * @param {Object} coursePoint {
 *   formalityPoint: Double,
 *   contentPoint: Double,
 *   presentationPoint: Double,
 * }
 */
var updateCoursePoint = exports.updateCoursePoint = function _callee16(id, coursePoint) {
  var isInvalid;
  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          isInvalid = (0, _values2.default)(coursePoint).some(function (prop) {
            return prop < 0;
          });

          if (!isInvalid) {
            _context16.next = 3;
            break;
          }

          return _context16.abrupt('return');

        case 3:
          _context16.next = 5;
          return _regenerator2.default.awrap(_db2.default.Courses.update((0, _extends5.default)({}, coursePoint), {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 5:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update course points when new user rate course
 * This func update average of 3 type of point and increase ratedNumber by 1
 * @param {String} id // courseId
 * @param {Object} coursePoint {
 *   formalityPoint: Double,
 *   contentPoint: Double,
 *   presentationPoint: Double,
 * }
 * Output: boolean
 */
var addNewPointToCourse = exports.addNewPointToCourse = function _callee17(id, coursePoint) {
  var isInvalid, course, ratedNumber, formalityPoint, contentPoint, presentationPoint;
  return _regenerator2.default.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          isInvalid = (0, _values2.default)(coursePoint).some(function (prop) {
            return prop < 0;
          });

          if (!isInvalid) {
            _context17.next = 3;
            break;
          }

          return _context17.abrupt('return', false);

        case 3:
          _context17.next = 5;
          return _regenerator2.default.awrap(getCourseInfoById(id));

        case 5:
          course = _context17.sent;
          ratedNumber = course.ratedNumber;

          // cal new point

          formalityPoint = (course.formalityPoint * ratedNumber + coursePoint.formalityPoint) / (ratedNumber + 1);
          contentPoint = (course.contentPoint * ratedNumber + coursePoint.contentPoint) / (ratedNumber + 1);
          // eslint-disable-next-line max-len

          presentationPoint = (course.presentationPoint * ratedNumber + coursePoint.presentationPoint) / (ratedNumber + 1);
          // update

          _context17.next = 12;
          return _regenerator2.default.awrap(_db2.default.Courses.update({
            ratedNumber: ratedNumber + 1,
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint
          }, {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 12:
          return _context17.abrupt('return', true);

        case 13:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined);
};

/**
 * Update course points after 1 user update rate course
 * This func update average of 3 type of point
 * @param {String} id // courseId
 * @param {Object} coursePoint {
 *   formalityPoint: Double,
 *   contentPoint: Double,
 *   presentationPoint: Double,
 * }
 * Output: boolean
 */
var updateAverageCoursePoint = exports.updateAverageCoursePoint = function _callee18(id, oldPoint, newPoint) {
  var isInvalid, course, ratedNumber, formalityPoint, contentPoint, presentationPoint;
  return _regenerator2.default.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          isInvalid = (0, _values2.default)(oldPoint).some(function (prop) {
            return prop < 0;
          }) || (0, _values2.default)(newPoint).some(function (prop) {
            return prop < 0;
          });

          if (!isInvalid) {
            _context18.next = 3;
            break;
          }

          return _context18.abrupt('return', false);

        case 3:
          _context18.next = 5;
          return _regenerator2.default.awrap(getCourseInfoById(id));

        case 5:
          course = _context18.sent;
          ratedNumber = course.ratedNumber;

          // cal new point

          formalityPoint = (course.formalityPoint * ratedNumber - oldPoint.formalityPoint + newPoint.formalityPoint) / ratedNumber;
          contentPoint = (course.contentPoint * ratedNumber - oldPoint.contentPoint + newPoint.contentPoint) / ratedNumber;
          presentationPoint = (course.presentationPoint * ratedNumber - oldPoint.presentationPoint + newPoint.presentationPoint) / ratedNumber;
          // update

          _context18.next = 12;
          return _regenerator2.default.awrap(_db2.default.Courses.update({
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint
          }, {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 12:
          return _context18.abrupt('return', true);

        case 13:
        case 'end':
          return _context18.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get all section by course id, order by numberOrder (ASC)
 * Create date: 1/29/2020
 * @param {String} id
 * @param {Boolean} raw
 */
var getSectionByCourseId = exports.getSectionByCourseId = function _callee19(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return _regenerator2.default.awrap(_db2.default.Sections.findAll({
            where: {
              courseId: id,
              isDeleted: false
            },
            order: [['numberOrder', 'ASC']],
            raw: raw
          }));

        case 2:
          instance = _context19.sent;
          return _context19.abrupt('return', instance);

        case 4:
        case 'end':
          return _context19.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get all lesson by course id, order by numberOrder (ASC)
 * Create date: 1/29/2020
 * @param {String} id
 * @param {Boolean} raw
 */
var getLessonByCourseId = exports.getLessonByCourseId = function _callee20(id) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var instance;
  return _regenerator2.default.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return _regenerator2.default.awrap(_db2.default.Lessons.findAll({
            where: {
              courseId: id,
              isDeleted: false
            },
            order: [['numberOrder', 'ASC']],
            raw: raw
          }));

        case 2:
          instance = _context20.sent;
          return _context20.abrupt('return', instance);

        case 4:
        case 'end':
          return _context20.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get all resource of course by courseId
 * Create date: 1/29/2020
 * @param {String} courseId
 * @param {String} lessonId
 */
var getResourceByCourseId = exports.getResourceByCourseId = function _callee21(courseId) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var resource;
  return _regenerator2.default.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return _regenerator2.default.awrap(_db2.default.Resources.findAll({
            include: [{
              model: _db2.default.Lessons,
              required: true,
              attributes: [],
              where: {
                courseId: courseId
              }
            }],
            raw: raw
          }));

        case 2:
          resource = _context21.sent;
          return _context21.abrupt('return', resource);

        case 4:
        case 'end':
          return _context21.stop();
      }
    }
  }, null, undefined);
};

/**
 * Group lesson by sectionId
 * Create date: 1/29/2020
 * @param {Array} sectionAndLesson [...section, ...lesson]
 */
var groupLessonBySection = function groupLessonBySection(sectionAndLesson) {
  var result = sectionAndLesson.reduce(function (previousValue, item) {
    if (!previousValue.isNotFirst) {
      // is the first element (type: section)
      var firstSection = (0, _extends5.default)({}, previousValue);
      previousValue = {};
      // eslint-disable-next-line max-len
      previousValue[firstSection.id] = (0, _extends5.default)({}, firstSection, {
        lesson: [],
        sumHours: 0,
        sumLessonFinish: 0
      });
      previousValue.isNotFirst = true;
    }

    if (!item.sectionId) {
      // is section
      previousValue[item.id] = (0, _extends5.default)({}, item, {
        lesson: [],
        sumHours: 0,
        sumLessonFinish: 0
      });
    } else {
      // is lesson
      if (previousValue[item.sectionId]) {
        previousValue[item.sectionId].lesson.push(item);
        if (item.isFinish) {
          previousValue[item.sectionId].sumLessonFinish++;
        }
        previousValue[item.sectionId].sumHours += item.hours;
      }
    }

    return previousValue;
  });

  delete result.isNotFirst;
  return (0, _values2.default)(result);
};

/**
 * Group lesson by sectionId
 * Create date: 1/29/2020
 * @param {Array} sectionAndLesson [ ...lesson, ...resource]
 */
var groupResourceByLesson = exports.groupResourceByLesson = function groupResourceByLesson(lessonAndResource) {
  var result = lessonAndResource.reduce(function (previousValue, item) {
    if (!previousValue.isNotFirst) {
      // is the first element (type: lesson)
      var firstSection = (0, _extends5.default)({}, previousValue);
      previousValue = {};
      previousValue[firstSection.id] = (0, _extends5.default)({}, firstSection, { resource: [] });
      previousValue.isNotFirst = true;
    }

    if (!item.lessonId) {
      // is lesson
      previousValue[item.id] = (0, _extends5.default)({}, item, { resource: [] });
    } else if (previousValue[item.lessonId]) {
      // is resource
      previousValue[item.lessonId].resource.push(item);
    }

    return previousValue;
  });
  delete result.isNotFirst;
  return (0, _values2.default)(result);
};
/**
 * Get course info, list section, lesson, instructor
 * and student's isLearned-status (optional) by id course
 * NOTE: use in course-detail page
 * Create date: 1/29/2020
 * @param {String} courseId
 * @param {String} userId as studentId (optional)
 */
var getCourseDetailByCourseId = exports.getCourseDetailByCourseId = function _callee22(courseId) {
  var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var course, instructor, ratings, averagePoint, lesson, section, result, courseCategory, temp, coursesIdList, tempIdList, coursesLikeCategory;
  return _regenerator2.default.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return _regenerator2.default.awrap(getCourseInfoById(courseId));

        case 2:
          course = _context22.sent;

          if (course) {
            _context22.next = 5;
            break;
          }

          return _context22.abrupt('return', null);

        case 5:
          //get instructor info
          instructor = {};
          _context22.next = 8;
          return _regenerator2.default.awrap(instructorService.getInstructorInfoById(course.instructorId));

        case 8:
          instructor = _context22.sent;
          _context22.next = 11;
          return _regenerator2.default.awrap(userRateCourseService.getRatingByCourseId({ courseId: courseId }));

        case 11:
          ratings = _context22.sent;
          averagePoint = ((course.formalityPoint + course.contentPoint + course.presentationPoint) / 3).toFixed(1);
          // get all lesson in course

          _context22.next = 15;
          return _regenerator2.default.awrap(getLessonByCourseId(courseId));

        case 15:
          lesson = _context22.sent;
          _context22.next = 18;
          return _regenerator2.default.awrap(getSectionByCourseId(courseId));

        case 18:
          section = _context22.sent;

          // group resource, lesson, course
          result = [];

          if (section.length > 0 && lesson.length > 0) {
            result = groupLessonBySection([].concat((0, _toConsumableArray3.default)(section), (0, _toConsumableArray3.default)(lesson)));
          }

          //get course like category
          _context22.next = 23;
          return _regenerator2.default.awrap(courseCategoryService.getCategoryIdByCourseId(courseId));

        case 23:
          courseCategory = _context22.sent;
          temp = [];

          courseCategory.forEach(function (element) {
            temp.push(element.categoryId);
          });
          _context22.next = 28;
          return _regenerator2.default.awrap(courseCategoryService.getCourseIdByCategoryId(temp, 8, 0));

        case 28:
          coursesIdList = _context22.sent;
          _context22.next = 31;
          return _regenerator2.default.awrap(coursesIdList.filter(function (element) {
            return element.courseId !== courseId;
          }));

        case 31:
          tempIdList = _context22.sent;
          _context22.next = 34;
          return _regenerator2.default.awrap(getCourseByArrayId(tempIdList, 8, 0));

        case 34:
          coursesLikeCategory = _context22.sent;
          return _context22.abrupt('return', (0, _extends5.default)({}, course, {
            section: [].concat((0, _toConsumableArray3.default)(result)),
            ratings: ratings,
            averagePoint: averagePoint,
            instructor: instructor,
            coursesLikeCategory: coursesLikeCategory
          }));

        case 36:
        case 'end':
          return _context22.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get course info, list section, lesson, instructor
 * and student's isLearned-status (optional) by id course
 * NOTE: use in watch video page
 * Create date: 1/29/2020
 * @param {String} courseId
 * @param {String} userId as studentId (optional)
 */
var getCourseInfoAndListSectionLesson = exports.getCourseInfoAndListSectionLesson = function _callee23(courseId) {
  var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var course, lesson, section, resource, result, temp;
  return _regenerator2.default.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return _regenerator2.default.awrap(getCourseWithInstructorByCourseId(courseId));

        case 2:
          course = _context23.sent;


          // get all lesson in course
          lesson = {};

          if (userId) {
            _context23.next = 10;
            break;
          }

          _context23.next = 7;
          return _regenerator2.default.awrap(getLessonByCourseId(courseId));

        case 7:
          lesson = _context23.sent;
          _context23.next = 13;
          break;

        case 10:
          _context23.next = 12;
          return _regenerator2.default.awrap(lessonService.getLessonWithStatusLearingByCourseId(courseId, userId));

        case 12:
          lesson = _context23.sent;

        case 13:
          _context23.next = 15;
          return _regenerator2.default.awrap(getSectionByCourseId(courseId));

        case 15:
          section = _context23.sent;
          _context23.next = 18;
          return _regenerator2.default.awrap(getResourceByCourseId(courseId));

        case 18:
          resource = _context23.sent;
          result = [];

          if (section.length > 0 && lesson.length > 0) {
            // group resource, lesson, course
            temp = [];

            if (lesson.length > 1) {
              temp = groupResourceByLesson([].concat((0, _toConsumableArray3.default)(lesson), (0, _toConsumableArray3.default)(resource)));
            } else {
              //lesson.length = 1
              temp = [(0, _extends5.default)({}, lesson[0], { resource: [] })];
            }
            result = groupLessonBySection([].concat((0, _toConsumableArray3.default)(section), (0, _toConsumableArray3.default)(temp)));
          }

          return _context23.abrupt('return', (0, _extends5.default)({}, course, { section: [].concat((0, _toConsumableArray3.default)(result)) }));

        case 22:
        case 'end':
          return _context23.stop();
      }
    }
  }, null, undefined);
};

/**
 * Check does user own course
 * Create date: 1/31/2020
 * @param {String} courseId
 * @param {String} userId as studentId
 */
var isUserOwnCourse = exports.isUserOwnCourse = function _callee24(courseId, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var result;
  return _regenerator2.default.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.findOne({
            where: {
              courseId: courseId,
              userId: userId
            },
            raw: raw
          }));

        case 2:
          result = _context24.sent;
          return _context24.abrupt('return', !!result);

        case 4:
        case 'end':
          return _context24.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get process course (%)
 * Create date: 05/02/2020
 * @param {String} courseId
 * @param {String} userId as studentId
 */
var getProcessCourse = exports.getProcessCourse = function _callee25(courseId, userId) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var lessonFinish, lesson, sumLesson, sumLessonFinish;
  return _regenerator2.default.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLearnLessons.findAll({
            where: {
              userId: userId,
              isFinish: true
            },
            include: [{
              model: _db2.default.Lessons,
              where: {
                courseId: courseId
              }
            }]
          }));

        case 2:
          lessonFinish = _context25.sent;
          _context25.next = 5;
          return _regenerator2.default.awrap(_db2.default.Lessons.findAll({
            where: {
              courseId: courseId,
              isDeleted: false
            }
          }));

        case 5:
          lesson = _context25.sent;
          sumLesson = lesson.length;
          sumLessonFinish = lessonFinish.length;

          if (!(!sumLessonFinish || !sumLesson)) {
            _context25.next = 10;
            break;
          }

          return _context25.abrupt('return', null);

        case 10:
          return _context25.abrupt('return', Math.round(sumLessonFinish / sumLesson * 100));

        case 11:
        case 'end':
          return _context25.stop();
      }
    }
  }, null, undefined);
};

/**
 * Rating course (update if record existed or create a new one if not exist)
 * Create date: 05/02/2020
 * @param {Object} data :
 *                {courseId, userId, formalityPoint, contentPoint, presentationPoint, content}
 */
var ratingCourse = exports.ratingCourse = function _callee26(data) {
  var courseId, userId, formalityPoint, contentPoint, presentationPoint, instance, result, oldRatingPoint, newRatingPoint;
  return _regenerator2.default.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          courseId = data.courseId, userId = data.userId, formalityPoint = data.formalityPoint, contentPoint = data.contentPoint, presentationPoint = data.presentationPoint;
          _context26.next = 3;
          return _regenerator2.default.awrap(userRateCourseService.getRating({ courseId: courseId, userId: userId }));

        case 3:
          instance = _context26.sent;
          result = null;

          if (instance) {
            _context26.next = 13;
            break;
          }

          _context26.next = 8;
          return _regenerator2.default.awrap(userRateCourseService.createRating(data));

        case 8:
          result = _context26.sent;
          _context26.next = 11;
          return _regenerator2.default.awrap(addNewPointToCourse(courseId, {
            formalityPoint: formalityPoint,
            contentPoint: contentPoint,
            presentationPoint: presentationPoint
          }));

        case 11:
          _context26.next = 20;
          break;

        case 13:
          _context26.next = 15;
          return _regenerator2.default.awrap(userRateCourseService.updateRating(data));

        case 15:
          result = _context26.sent;

          // update course's point
          oldRatingPoint = {
            formalityPoint: instance.formalityPoint,
            contentPoint: instance.contentPoint,
            presentationPoint: instance.presentationPoint
          };
          newRatingPoint = { formalityPoint: formalityPoint, contentPoint: contentPoint, presentationPoint: presentationPoint };
          _context26.next = 20;
          return _regenerator2.default.awrap(updateAverageCoursePoint(courseId, oldRatingPoint, newRatingPoint));

        case 20:
          return _context26.abrupt('return', result);

        case 21:
        case 'end':
          return _context26.stop();
      }
    }
  }, null, undefined);
};

var getCoursesByUserFavoriteCategories = exports.getCoursesByUserFavoriteCategories = function _callee27(userId) {
  var raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var user, coursesIdList, result;
  return _regenerator2.default.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: userId
            },
            raw: raw
          }));

        case 2:
          user = _context27.sent;

          if (!(user.favoriteCategories !== null)) {
            _context27.next = 11;
            break;
          }

          _context27.next = 6;
          return _regenerator2.default.awrap(courseCategoryService.getCourseIdByCategoryId(user.favoriteCategories, 8, 0));

        case 6:
          coursesIdList = _context27.sent;
          _context27.next = 9;
          return _regenerator2.default.awrap(getCourseByArrayId(coursesIdList, 8, 0));

        case 9:
          result = _context27.sent;
          return _context27.abrupt('return', result);

        case 11:
          return _context27.abrupt('return', []);

        case 12:
        case 'end':
          return _context27.stop();
      }
    }
  }, null, undefined);
};

/**
 * Delete course by id (include section, lesson, resource)
 * @param {String} id // CourseId
 */
var deleteCourseById = exports.deleteCourseById = function _callee28(id) {
  var prefix;
  return _regenerator2.default.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return _regenerator2.default.awrap(_db2.default.CoursesCategories.destroy({
            where: { courseId: id }
          }));

        case 2:
          prefix = 'Courses/' + id + '/';
          _context28.next = 5;
          return _regenerator2.default.awrap(lessonService.deleteAllLesson(id));

        case 5:
          _context28.next = 7;
          return _regenerator2.default.awrap(_fetch.storage.deleteFiles(_config.GCP_STORAGE_BUCKET_NAME, prefix));

        case 7:
          _context28.next = 9;
          return _regenerator2.default.awrap(_db2.default.Sections.update({
            isDeleted: true
          }, {
            where: {
              courseId: id,
              isDeleted: false
            }
          }));

        case 9:
          _context28.next = 11;
          return _regenerator2.default.awrap(_db2.default.Courses.update({
            isDeleted: true
          }, {
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 11:
        case 'end':
          return _context28.stop();
      }
    }
  }, null, undefined);
};

var instructorGetCourseDetail = exports.instructorGetCourseDetail = function _callee29(courseId) {
  var course, instances, averagePoint, lesson, section, result;
  return _regenerator2.default.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          course = _context29.sent;

          if (course) {
            _context29.next = 5;
            break;
          }

          return _context29.abrupt('return', null);

        case 5:
          _context29.next = 7;
          return _regenerator2.default.awrap(userRateCourseService.getRatesByCourseId({ courseId: courseId }));

        case 7:
          instances = _context29.sent;
          averagePoint = ((course.formalityPoint + course.presentationPoint + course.contentPoint) / 3).toFixed(1);
          // get all lesson in course

          _context29.next = 11;
          return _regenerator2.default.awrap(getLessonByCourseId(courseId));

        case 11:
          lesson = _context29.sent;
          _context29.next = 14;
          return _regenerator2.default.awrap(getSectionByCourseId(courseId));

        case 14:
          section = _context29.sent;

          // group resource, lesson, course
          result = [];

          if (section.length > 0 && lesson.length > 0) {
            result = groupLessonBySection([].concat((0, _toConsumableArray3.default)(section), (0, _toConsumableArray3.default)(lesson)));
          }
          return _context29.abrupt('return', (0, _extends5.default)({}, course, {
            section: [].concat((0, _toConsumableArray3.default)(result)),
            rates: instances.length,
            averagePoint: averagePoint
          }));

        case 18:
        case 'end':
          return _context29.stop();
      }
    }
  }, null, undefined);
};

var isInstructorOwnCourse = exports.isInstructorOwnCourse = function _callee30(courseId, id) {
  var raw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instructor, result;
  return _regenerator2.default.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            where: {
              userId: id
            }
          }));

        case 2:
          instructor = _context30.sent;

          if (!instructor) {
            _context30.next = 8;
            break;
          }

          _context30.next = 6;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              instructorId: instructor.id
            },
            raw: raw
          }));

        case 6:
          result = _context30.sent;
          return _context30.abrupt('return', !!result);

        case 8:
          return _context30.abrupt('return', false);

        case 9:
        case 'end':
          return _context30.stop();
      }
    }
  }, null, undefined);
};