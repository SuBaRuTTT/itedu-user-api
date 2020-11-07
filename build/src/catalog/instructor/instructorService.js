'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendCumalativeTuition = exports.isAmountBiggerThanTuition = exports.createInstructor = exports.isUserInstructor = exports.updateInstructorIntro = exports.updateInstructorInfo = exports.getInstructorBasicInfoByUserId = exports.getInstructorInfoByUserId = exports.getNumbetCourse = exports.getAllCoursesById = exports.getCoursesById = exports.getActiveCourseAnalytics = exports.getDataAnalytics = exports.getInstructorInfoById = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _courseService = require('../course/courseService');

var _utils = require('../../utils');

var _fetch = require('../../fetch');

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Op = _sequelize2.default.Op;
/**
 * Get instructor info by id
 * @param {String} id //instructorId
 */
/* eslint-disable max-len */
var getInstructorInfoById = exports.getInstructorInfoById = function _callee(id) {
  var basicInstructorInfo, instructorId, courses, resultAveragePoint, statistics, stat;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            attributes: ['id', 'userId', 'user.name', 'user.email', 'user.avatar', 'user.phone', 'major', 'intro', 'skills', 'createdAt', 'updatedAt'],
            where: {
              id: id,
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
            }],
            raw: true
          }));

        case 2:
          basicInstructorInfo = _context.sent;

          if (basicInstructorInfo) {
            _context.next = 5;
            break;
          }

          return _context.abrupt('return', null);

        case 5:
          instructorId = basicInstructorInfo.id;
          _context.next = 8;
          return _regenerator2.default.awrap((0, _courseService.getCoursesByInstructorId)(instructorId));

        case 8:
          courses = _context.sent;
          _context.next = 11;
          return _regenerator2.default.awrap(getAveragePointByInstructorId(instructorId));

        case 11:
          resultAveragePoint = _context.sent;
          statistics = courses.reduce(function (stat, curCourse) {
            return {
              ratedNumber: stat.ratedNumber + curCourse.ratedNumber,
              soldNumber: stat.soldNumber + curCourse.soldNumber
            };
          }, { totalPoint: 0, ratedNumber: 0, soldNumber: 0 });
          stat = {
            averagePoint: resultAveragePoint.averagePoint,
            countRating: resultAveragePoint.count,
            ratedNumber: statistics.ratedNumber,
            soldNumber: statistics.soldNumber
          };
          return _context.abrupt('return', (0, _extends3.default)({}, basicInstructorInfo, {
            totalCourse: courses.length
          }, stat, {
            courses: courses
          }));

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};
/**
 *
 * @param {string} instructorId
 * output:  averagePoint, count
 */
var getAveragePointByInstructorId = function _callee2(instructorId) {
  var instance, count, _instance$rows$, totalContentPoint, totalPresentationPoint, totalFormalityPoint, averagePoint;

  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersRateCourses.findAndCountAll({
            attributes: [[_sequelize2.default.fn('sum', _sequelize2.default.col('users_rate_courses.contentPoint')), 'totalContentPoint'], [_sequelize2.default.fn('sum', _sequelize2.default.col('users_rate_courses.presentationPoint')), 'totalPresentationPoint'], [_sequelize2.default.fn('sum', _sequelize2.default.col('users_rate_courses.formalityPoint')), 'totalFormalityPoint']],
            include: [{
              model: _db2.default.Courses,
              required: true,
              attributes: [],
              where: {
                instructorId: instructorId,
                status: _utils.enums.COURSE_STATUS.COMPLETED,
                isDeleted: false
              }
            }],
            raw: true
          }));

        case 2:
          instance = _context2.sent;
          count = instance.count;

          if (!(count === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt('return', {
            averagePoint: 0, count: 0
          });

        case 6:
          _instance$rows$ = instance.rows[0], totalContentPoint = _instance$rows$.totalContentPoint, totalPresentationPoint = _instance$rows$.totalPresentationPoint, totalFormalityPoint = _instance$rows$.totalFormalityPoint;
          averagePoint = (+totalContentPoint + totalPresentationPoint + totalFormalityPoint) / 3 / count;
          return _context2.abrupt('return', {
            averagePoint: averagePoint, count: count
          });

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

/**
 * Format data
 */
var createDataTime = function createDataTime(type, from, to) {
  var data = [];
  switch (type) {
    case 'day':
      {
        var temp = new Date(from);
        for (var i = temp; i.getTime() <= to.getTime(); i.setDate(i.getDate() + 1)) {
          data.push({ time: (0, _moment2.default)(i).format('DD/MM'), value: 0, ques: 0, ans: 0 });
        }
        break;
      }
    case 'month':
    case 'year':
    case 'quater':
      {
        var _temp = new Date(from);
        for (var _i = _temp; _i.getTime() <= to.getTime(); _i.setMonth(_i.getMonth() + 1)) {
          data.push({ time: (0, _moment2.default)(_i).format('MM/YYYY'), value: 0, ques: 0, ans: 0 });
        }
        break;
      }
  }
  return data;
};

var formatDataAnalytics = function _callee3(dataCourse, data, from, to, type, typeAnalytics) {
  var dataChart;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dataChart = [];

          dataCourse.forEach(function (ele) {
            dataChart.push({
              id: ele.id,
              title: ele.title,
              img: ele.imageUrl,
              sum: 0,
              data: createDataTime(type, from, to)
            });
          });
          _context3.t0 = type;
          _context3.next = _context3.t0 === 'day' ? 5 : _context3.t0 === 'month' ? 7 : _context3.t0 === 'year' ? 7 : _context3.t0 === 'quater' ? 7 : 9;
          break;

        case 5:
          data.forEach(function (element) {
            var indexCourse = dataChart.findIndex(function (elem) {
              return elem.id === element.id;
            });
            var index = dataChart[indexCourse].data.findIndex(function (elem) {
              return elem.time === (0, _moment2.default)(element['ownedUser.users_own_courses.createdAt']).format('DD/MM');
            });
            dataChart[indexCourse].data[index].value += typeAnalytics === 'student' ? 1 : element.price;
            dataChart[indexCourse].sum += typeAnalytics === 'student' ? 1 : element.price;
          });
          return _context3.abrupt('break', 9);

        case 7:
          data.forEach(function (element) {
            var indexCourse = dataChart.findIndex(function (elem) {
              return elem.id === element.id;
            });
            var index = dataChart[indexCourse].data.findIndex(function (elem) {
              return elem.time === (0, _moment2.default)(element['ownedUser.users_own_courses.createdAt']).format('MM/YYYY');
            });
            dataChart[indexCourse].data[index].value += typeAnalytics === 'student' ? 1 : element.price;
            dataChart[indexCourse].sum += typeAnalytics === 'student' ? 1 : element.price;
          });
          return _context3.abrupt('break', 9);

        case 9:
          return _context3.abrupt('return', dataChart);

        case 10:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};
var formatDataActiveCourseAnalytics = function _callee4(dataCourse, data, from, to, type) {
  var dataChart;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          dataChart = [];

          dataCourse.forEach(function (ele) {
            dataChart.push({
              id: ele.id,
              title: ele.title,
              img: ele.imageUrl,
              rating: (ele.formalityPoint + ele.contentPoint + ele.presentationPoint) / 3,
              data: createDataTime(type, from, to)
            });
          });
          _context4.t0 = type;
          _context4.next = _context4.t0 === 'day' ? 5 : _context4.t0 === 'month' ? 7 : _context4.t0 === 'year' ? 7 : _context4.t0 === 'quater' ? 7 : 9;
          break;

        case 5:
          data.forEach(function (element) {
            var indexCourse = dataChart.findIndex(function (elem) {
              return elem.id === element.id;
            });
            var index = dataChart[indexCourse].data.findIndex(function (elem) {
              return elem.time === (0, _moment2.default)(element['lessons.questions.createdAt']).format('DD/MM');
            });
            dataChart[indexCourse].data[index].ques += 1;
            dataChart[indexCourse].data[index].ans += element['lessons.questions.answerNumber'] ? 1 : 0;
          });
          return _context4.abrupt('break', 9);

        case 7:
          data.forEach(function (element) {
            var indexCourse = dataChart.findIndex(function (elem) {
              return elem.id === element.id;
            });
            var index = dataChart[indexCourse].data.findIndex(function (elem) {
              return elem.time === (0, _moment2.default)(element['lessons.questions.createdAt']).format('MM/YYYY');
            });
            dataChart[indexCourse].data[index].ques += 1;
            dataChart[indexCourse].data[index].ans += element['lessons.questions.answerNumber'] ? 1 : 0;
          });
          return _context4.abrupt('break', 9);

        case 9:
          return _context4.abrupt('return', dataChart);

        case 10:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

/**
 * Get data to analytics
 * income and student number
 * @param {String} id
 * @param {String} from
 * @param {String} to
 */
var getDataAnalytics = exports.getDataAnalytics = function _callee5(id, course, from, to, type, typeAnalytics) {
  var result, From, To, dataCourse, data;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          result = [];
          From = new Date(from);

          From.setHours(0, 0, 0, 0);
          To = new Date(to);

          To.setHours(0, 0, 0, 0);
          To.setDate(To.getDate() + 1);
          if (type !== 'day') {
            From.setDate(2);
            To.setDate(1);
            To.setMonth(To.getMonth() + 1);
          }
          _context5.next = 9;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: ['id', 'title', 'imageUrl'],
            where: {
              isDeleted: false,
              instructorId: id,
              status: 'COMPLETED'
            },
            raw: true
          }));

        case 9:
          dataCourse = _context5.sent;
          _context5.next = 12;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: ['id', 'price'],
            include: [{
              model: _db2.default.Users,
              as: 'ownedUser',
              required: true,
              through: {
                attributes: ['courseId'],
                where: {
                  createdAt: (0, _defineProperty3.default)({}, Op.between, [From, To])
                }
              }
            }],
            where: {
              isDeleted: false,
              instructorId: id,
              status: 'COMPLETED'
            },
            raw: true
          }));

        case 12:
          data = _context5.sent;

          if (course !== '0') {
            data = data.filter(function (ele) {
              return ele.id === course;
            });
            dataCourse = dataCourse.filter(function (ele) {
              return ele.id === course;
            });
          }
          _context5.next = 16;
          return _regenerator2.default.awrap(formatDataAnalytics(dataCourse, data, From, To, type, typeAnalytics));

        case 16:
          result = _context5.sent;
          return _context5.abrupt('return', result);

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};

var getActiveCourseAnalytics = exports.getActiveCourseAnalytics = function _callee6(id, course, from, to, type, typeAnalytics) {
  var result, From, To, dataCourse, data;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          result = [];
          From = new Date(from);

          From.setHours(0, 0, 0, 0);
          To = new Date(to);

          To.setHours(0, 0, 0, 0);
          To.setDate(To.getDate() + 1);
          if (type !== 'day') {
            From.setDate(2);
            To.setDate(1);
            To.setMonth(To.getMonth() + 1);
          }
          _context6.next = 9;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: ['id', 'title', 'formalityPoint', 'contentPoint', 'presentationPoint', 'imageUrl'],
            where: {
              isDeleted: false,
              instructorId: id,
              status: 'COMPLETED'
            },
            raw: true
          }));

        case 9:
          dataCourse = _context6.sent;
          _context6.next = 12;
          return _regenerator2.default.awrap(_db2.default.Courses.findAll({
            attributes: ['id'],
            include: [{
              model: _db2.default.Lessons,
              required: true,
              include: [{
                model: _db2.default.Questions,
                where: {
                  createdAt: (0, _defineProperty3.default)({}, Op.between, [From, To]),
                  isDeleted: false
                }
              }]
            }],
            where: {
              isDeleted: false,
              instructorId: id,
              status: 'COMPLETED'
            },
            raw: true
          }));

        case 12:
          data = _context6.sent;

          if (course !== '0') {
            data = data.filter(function (ele) {
              return ele.id === course;
            });
            dataCourse = dataCourse.filter(function (ele) {
              return ele.id === course;
            });
          }
          _context6.next = 16;
          return _regenerator2.default.awrap(formatDataActiveCourseAnalytics(dataCourse, data, From, To, type));

        case 16:
          result = _context6.sent;
          return _context6.abrupt('return', result);

        case 18:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};

var getCoursesById = exports.getCoursesById = function _callee7(id) {
  var data, result;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _regenerator2.default.awrap((0, _courseService.getCoursesByInstructorId)(id, true));

        case 2:
          data = _context7.sent;
          result = data.filter(function (ele) {
            return ele.status === 'COMPLETED';
          });
          return _context7.abrupt('return', result);

        case 5:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined);
};

var getAllCoursesById = exports.getAllCoursesById = function _callee8(id, data) {
  var result;
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _regenerator2.default.awrap((0, _courseService.getCoursesByInstructorIdWithPagination)(id, data));

        case 2:
          result = _context8.sent;
          return _context8.abrupt('return', result);

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined);
};

var getNumbetCourse = exports.getNumbetCourse = function _callee9(id, data) {
  var result;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _regenerator2.default.awrap((0, _courseService.getNumbetCourseByIdInstructor)(id, data));

        case 2:
          result = _context9.sent;
          return _context9.abrupt('return', result);

        case 4:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined);
};
var getInstructorInfoByUserId = exports.getInstructorInfoByUserId = function _callee10(id) {
  var instance;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            where: {
              userId: id,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          instance = _context10.sent;
          return _context10.abrupt('return', instance);

        case 4:
        case 'end':
          return _context10.stop();
      }
    }
  }, null, undefined);
};

var getInstructorBasicInfoByUserId = exports.getInstructorBasicInfoByUserId = function _callee11(userId) {
  var basicInstructorInfo;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            attributes: ['id', 'userId', 'user.name', 'user.email', 'user.avatar', 'user.phone', 'major', 'intro', 'skills', 'cumulativeTuition', 'createdAt', 'updatedAt'],
            where: {
              userId: userId,
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
            }],
            raw: true
          }));

        case 2:
          basicInstructorInfo = _context11.sent;

          if (basicInstructorInfo) {
            _context11.next = 5;
            break;
          }

          return _context11.abrupt('return', null);

        case 5:
          return _context11.abrupt('return', basicInstructorInfo);

        case 6:
        case 'end':
          return _context11.stop();
      }
    }
  }, null, undefined);
};

var updateInstructorInfo = exports.updateInstructorInfo = function _callee12(data) {
  var id, userId, name, phone, major, skills, instance;
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id = data.id, userId = data.userId, name = data.name, phone = data.phone, major = data.major, skills = data.skills;
          _context12.next = 3;
          return _regenerator2.default.awrap(_db2.default.Instructors.update({
            major: major, skills: skills
          }, {
            where: { id: id }
          }));

        case 3:
          _context12.next = 5;
          return _regenerator2.default.awrap(_db2.default.Users.update({
            name: name, phone: phone
          }, {
            where: {
              id: userId
            }
          }));

        case 5:
          _context12.next = 7;
          return _regenerator2.default.awrap(getInstructorBasicInfoByUserId(userId));

        case 7:
          instance = _context12.sent;
          return _context12.abrupt('return', instance);

        case 9:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined);
};

var updateInstructorIntro = exports.updateInstructorIntro = function _callee13(id, intro) {
  var instance;
  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.update({
            intro: intro
          }, {
            where: { userId: id }
          }));

        case 2:
          _context13.next = 4;
          return _regenerator2.default.awrap(getInstructorBasicInfoByUserId(id));

        case 4:
          instance = _context13.sent;
          return _context13.abrupt('return', instance);

        case 6:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined);
};

var isUserInstructor = exports.isUserInstructor = function _callee14(userId) {
  var instance;
  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            where: {
              userId: userId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          instance = _context14.sent;
          return _context14.abrupt('return', instance);

        case 4:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined);
};

var createInstructor = exports.createInstructor = function _callee15(userId) {
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.create({
            id: (0, _v2.default)(),
            userId: userId,
            isDeleted: false
          }));

        case 2:
          _context15.next = 4;
          return _regenerator2.default.awrap(_db2.default.Users.update({ type: _utils.enums.USER_TYPE.INSTRUCTOR }, { where: { id: userId } }));

        case 4:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined);
};

var isAmountBiggerThanTuition = exports.isAmountBiggerThanTuition = function _callee16(userId, amount) {
  var instance;
  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return _regenerator2.default.awrap(_db2.default.Instructors.findOne({
            where: {
              userId: userId,
              isDeleted: false
            },
            attributes: ['cumulativeTuition'],
            raw: true
          }));

        case 2:
          instance = _context16.sent;

          if (!(amount <= instance.cumulativeTuition)) {
            _context16.next = 5;
            break;
          }

          return _context16.abrupt('return', false);

        case 5:
          return _context16.abrupt('return', true);

        case 6:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined);
};

var sendCumalativeTuition = exports.sendCumalativeTuition = function _callee17(userId, amount) {
  var instance, usdAmount, resHTTPCode;
  return _regenerator2.default.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: userId,
              isDeleted: false
            },
            attributes: ['email'],
            raw: true
          }));

        case 2:
          instance = _context17.sent;
          usdAmount = (parseFloat(amount) / 23205.5).toFixed(2);
          _context17.next = 6;
          return _regenerator2.default.awrap(_fetch.paypalHandler.createPayout(instance.email, usdAmount));

        case 6:
          resHTTPCode = _context17.sent;

          if (!(resHTTPCode == 201)) {
            _context17.next = 10;
            break;
          }

          _context17.next = 10;
          return _regenerator2.default.awrap(_db2.default.Instructors.decrement(['cumulativeTuition'], { by: amount, where: { userId: userId } }));

        case 10:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined);
};