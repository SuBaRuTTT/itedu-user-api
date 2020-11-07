'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeEmailAndDeactivate = exports.getLikeStatusWithCourse = exports.getUserProcessCoursesByUserId = exports.getInfoIntroPage = exports.userLikeCourse = exports.getUserFavoriteCoursesByUserId = exports.checkPasswordOfUser = exports.updateProfile = exports.getUserFavoriteCategoriesByUserId = exports.isUserActivated = exports.updateFavoriteCategories = exports.linkExternalAccountAndActivate = exports.getUserInfoById = exports.getUserByEmail = exports.sendActivateEmailToUser = exports.activateUserEmail = exports.resetPasswordService = exports.authenticateExternal = exports.authenticate = exports.isPhoneExists = exports.isEmailExists = exports.createUserExternal = exports.createUser = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _fetch = require('../../fetch');

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'userService-' + _moment2.default.utc().toISOString();

var createUser = exports.createUser = function _callee(userInfo) {
  var email, password, avatar, name, phone, userId, verifyEmailToken;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = userInfo.email, password = userInfo.password, avatar = userInfo.avatar, name = userInfo.name, phone = userInfo.phone;
          userId = (0, _v2.default)();
          _context.next = 4;
          return _regenerator2.default.awrap(_db2.default.Users.create({
            id: userId,
            email: email,
            password: password,
            avatar: avatar,
            phone: phone,
            name: name
          }));

        case 4:
          verifyEmailToken = _utils.crypt.createActivateEmailToken(userId);

          _fetch.mail.sendActivateUserEmail(email, name, verifyEmailToken);

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var createUserExternal = exports.createUserExternal = function _callee2(externalUserInfo, type) {
  var id, displayName, email, avatar, userId;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = externalUserInfo.id, displayName = externalUserInfo.displayName, email = externalUserInfo.email, avatar = externalUserInfo.avatar;
          //get externalId, displayName, email, avatar to store in database

          userId = (0, _v2.default)();
          _context2.t0 = type;
          _context2.next = _context2.t0 === _utils.enums.EXTERNAL_ID_TYPE.FACEBOOK ? 5 : _context2.t0 === _utils.enums.EXTERNAL_ID_TYPE.GOOGLE ? 8 : 11;
          break;

        case 5:
          _context2.next = 7;
          return _regenerator2.default.awrap(_db2.default.Users.create({
            id: userId,
            email: email,
            avatar: avatar,
            name: displayName,
            isActivated: true,
            facebookId: id
          }));

        case 7:
          return _context2.abrupt('break', 11);

        case 8:
          _context2.next = 10;
          return _regenerator2.default.awrap(_db2.default.Users.create({
            id: userId,
            email: email,
            avatar: avatar,
            name: displayName,
            isActivated: true,
            googleId: id
          }));

        case 10:
          return _context2.abrupt('break', 11);

        case 11:
          return _context2.abrupt('return', userId);

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var isEmailExists = exports.isEmailExists = function _callee3(email) {
  var instance;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              email: email
            },
            raw: true
          }));

        case 2:
          instance = _context3.sent;

          if (!instance) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt('return', true);

        case 5:
          return _context3.abrupt('return', false);

        case 6:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var isPhoneExists = exports.isPhoneExists = function _callee4(phone) {
  var instance;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              phone: phone
            },
            raw: true
          }));

        case 2:
          instance = _context4.sent;

          if (!instance) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt('return', true);

        case 5:
          return _context4.abrupt('return', false);

        case 6:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

var authenticate = exports.authenticate = function _callee5(_ref) {
  var email = _ref.email,
      password = _ref.password;
  var userInfo;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userInfo = void 0;
          _context5.prev = 1;
          _context5.next = 4;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: { email: email }
          }));

        case 4:
          userInfo = _context5.sent;

          if (!(userInfo && userInfo.validPassword(password))) {
            _context5.next = 8;
            break;
          }

          ['password', 'googleId', 'facebookId'].forEach(function (prop) {
            delete userInfo.dataValues[prop];
          });
          return _context5.abrupt('return', userInfo);

        case 8:
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5['catch'](1);

          _utils.debug.error(NAMESPACE, 'Error occured while authenticating user', _context5.t0);

        case 13:
          return _context5.abrupt('return', null);

        case 14:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined, [[1, 10]]);
};

var authenticateExternal = exports.authenticateExternal = function _callee6(_ref2) {
  var id = _ref2.id,
      type = _ref2.type;
  var instance;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          instance = void 0;
          _context6.t0 = type;
          _context6.next = _context6.t0 === _utils.enums.EXTERNAL_ID_TYPE.FACEBOOK ? 4 : _context6.t0 === _utils.enums.EXTERNAL_ID_TYPE.GOOGLE ? 10 : 16;
          break;

        case 4:
          _context6.next = 6;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              facebookId: id
            },
            raw: true
          }));

        case 6:
          instance = _context6.sent;

          if (!instance) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt('return', instance);

        case 9:
          return _context6.abrupt('break', 16);

        case 10:
          _context6.next = 12;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              googleId: id
            },
            raw: true
          }));

        case 12:
          instance = _context6.sent;

          if (!instance) {
            _context6.next = 15;
            break;
          }

          return _context6.abrupt('return', instance);

        case 15:
          return _context6.abrupt('break', 16);

        case 16:
          return _context6.abrupt('return', null);

        case 17:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};

var resetPasswordService = exports.resetPasswordService = function _callee7(userId, newPassword) {
  var result;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.update({ password: _utils.crypt.hashPassword(newPassword) }, { where: { id: userId } }));

        case 2:
          result = _context7.sent;
          return _context7.abrupt('return', result);

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined);
};
var activateUserEmail = exports.activateUserEmail = function _callee8(userId) {
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.update({
            isActivated: true
          }, {
            where: {
              id: userId,
              isDeleted: false
            },
            returning: true,
            raw: true
          }));

        case 2:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined);
};

var sendActivateEmailToUser = exports.sendActivateEmailToUser = function _callee9(email) {
  var instance, verifyEmailToken;
  return _regenerator2.default.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              email: email,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          instance = _context9.sent;
          _context9.next = 5;
          return _regenerator2.default.awrap(_utils.crypt.createActivateEmailToken(instance.id));

        case 5:
          verifyEmailToken = _context9.sent;
          _context9.next = 8;
          return _regenerator2.default.awrap(_fetch.mail.sendActivateUserEmail(instance.email, instance.name, verifyEmailToken));

        case 8:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined);
};

var getUserByEmail = exports.getUserByEmail = function _callee10(email) {
  var instance;
  return _regenerator2.default.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              email: email
            }
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

var getUserInfoById = exports.getUserInfoById = function _callee11(id) {
  var instance;
  return _regenerator2.default.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: id,
              isDeleted: false
            },
            attributes: {
              exclude: ['password', 'googleId', 'facebookId']
            },
            raw: true
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

var linkExternalAccountAndActivate = exports.linkExternalAccountAndActivate = function _callee12(userInfo, externalId, type) {
  return _regenerator2.default.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.t0 = type;
          _context12.next = _context12.t0 === _utils.enums.EXTERNAL_ID_TYPE.FACEBOOK ? 3 : _context12.t0 === _utils.enums.EXTERNAL_ID_TYPE.GOOGLE ? 6 : 9;
          break;

        case 3:
          _context12.next = 5;
          return _regenerator2.default.awrap(userInfo.update({
            facebookId: externalId,
            isActivated: true
          }));

        case 5:
          return _context12.abrupt('break', 9);

        case 6:
          _context12.next = 8;
          return _regenerator2.default.awrap(userInfo.update({
            googleId: externalId,
            isActivated: true
          }));

        case 8:
          return _context12.abrupt('break', 9);

        case 9:
        case 'end':
          return _context12.stop();
      }
    }
  }, null, undefined);
};

var updateFavoriteCategories = exports.updateFavoriteCategories = function _callee13(userId, categoryIds) {
  return _regenerator2.default.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _db2.default.Users.update({
            favoriteCategories: categoryIds
          }, {
            where: {
              id: userId,
              isDeleted: false
            },
            returning: true,
            plain: true
          });

        case 1:
        case 'end':
          return _context13.stop();
      }
    }
  }, null, undefined);
};

var isUserActivated = exports.isUserActivated = function _callee14(email) {
  var instance;
  return _regenerator2.default.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              email: email,
              isDeleted: false,
              isActivated: true
            },
            raw: true
          }));

        case 2:
          instance = _context14.sent;

          if (!instance) {
            _context14.next = 5;
            break;
          }

          return _context14.abrupt('return', true);

        case 5:
          return _context14.abrupt('return', false);

        case 6:
        case 'end':
          return _context14.stop();
      }
    }
  }, null, undefined);
};

/**
 * Nguyễn Linh
 * @param {String} id
 */

var getUserFavoriteCategoriesByUserId = exports.getUserFavoriteCategoriesByUserId = function _callee15(id) {
  var instance;
  return _regenerator2.default.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: id,
              isDeleted: false
            },
            attributes: ['favoriteCategories'],
            raw: true
          }));

        case 2:
          instance = _context15.sent;
          return _context15.abrupt('return', instance);

        case 4:
        case 'end':
          return _context15.stop();
      }
    }
  }, null, undefined);
};

/**
 * @param {*} userId
 * @param {*} userInfo {
 *  name: String
 *  avatar: String
 *  phone: String
 * }
 */
var updateProfile = exports.updateProfile = function _callee16(userId, userInfo) {
  var instance;
  return _regenerator2.default.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.update((0, _extends3.default)({}, userInfo), {
            where: {
              id: userId,
              isDeleted: false,
              isActivated: true
            },
            returning: true
          }));

        case 2:
          instance = _context16.sent;


          delete instance[1][0].dataValues.password;
          return _context16.abrupt('return', instance[1][0].dataValues);

        case 5:
        case 'end':
          return _context16.stop();
      }
    }
  }, null, undefined);
};

/**
* check password by id and password
*/
var checkPasswordOfUser = exports.checkPasswordOfUser = function _callee17(id, password) {
  var userInfo;
  return _regenerator2.default.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: id,
              isDeleted: false
            }
          }));

        case 2:
          userInfo = _context17.sent;

          if (!(userInfo && userInfo.validPassword(password))) {
            _context17.next = 5;
            break;
          }

          return _context17.abrupt('return', true);

        case 5:
          return _context17.abrupt('return', false);

        case 6:
        case 'end':
          return _context17.stop();
      }
    }
  }, null, undefined);
};

var getUserFavoriteCoursesByUserId = exports.getUserFavoriteCoursesByUserId = function _callee18(userId) {
  var likeInstances;
  return _regenerator2.default.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.findAll({
            where: {
              userId: userId,
              isActivated: true
            },
            attributes: [[_sequelize2.default.col('course.id'), 'id'], [_sequelize2.default.col('course.title'), 'courseTitle'], [_sequelize2.default.col('course.price'), 'coursePrice'], [_sequelize2.default.col('course.imageUrl'), 'courseImage'], [_sequelize2.default.col('course.instructor.id'), 'instructorId'], [_sequelize2.default.col('course.instructor.user.name'), 'instructorName'], [_sequelize2.default.col('course.soldNumber'), 'courseSoldNumber'], [_sequelize2.default.col('course.contentPoint'), 'courseContentPoint'], [_sequelize2.default.col('course.formalityPoint'), 'courseFormalityPoint'], [_sequelize2.default.col('course.presentationPoint'), 'coursePresentationPoint']],
            raw: true,
            include: [{
              model: _db2.default.Users,
              attributes: []
            }, {
              model: _db2.default.Courses,
              attributes: [],
              required: true,
              where: {
                isDeleted: false,
                status: _utils.enums.COURSE_STATUS.COMPLETED
              },
              include: [{
                model: _db2.default.Instructors,
                attributes: [],
                include: [{
                  model: _db2.default.Users,
                  attributes: []
                }]
              }]
            }]
          }));

        case 2:
          likeInstances = _context18.sent;


          likeInstances.map(function (ins) {
            ins.courseAveragePoint = (ins.courseContentPoint + ins.courseFormalityPoint + ins.coursePresentationPoint) / 3;
            return ins;
          });

          return _context18.abrupt('return', likeInstances);

        case 5:
        case 'end':
          return _context18.stop();
      }
    }
  }, null, undefined);
};

var userLikeCourse = exports.userLikeCourse = function _callee19(userId, courseId) {
  var likeInstance;
  return _regenerator2.default.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.findOne({
            where: {
              userId: userId,
              courseId: courseId
            },
            attributes: ['isActivated'],
            raw: true
          }));

        case 2:
          likeInstance = _context19.sent;

          if (likeInstance) {
            _context19.next = 9;
            break;
          }

          _context19.next = 6;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.create({
            id: (0, _v2.default)(),
            userId: userId,
            courseId: courseId,
            isActivated: true
          }));

        case 6:
          return _context19.abrupt('return', true);

        case 9:
          _context19.t0 = likeInstance.isActivated;
          _context19.next = _context19.t0 === true ? 12 : _context19.t0 === false ? 15 : 18;
          break;

        case 12:
          _context19.next = 14;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.update({
            isActivated: false
          }, {
            where: {
              userId: userId,
              courseId: courseId
            }
          }));

        case 14:
          return _context19.abrupt('return', false);

        case 15:
          _context19.next = 17;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.update({
            isActivated: true
          }, {
            where: {
              userId: userId,
              courseId: courseId
            }
          }));

        case 17:
          return _context19.abrupt('return', true);

        case 18:
        case 'end':
          return _context19.stop();
      }
    }
  }, null, undefined);
};

var getInfoIntroPage = exports.getInfoIntroPage = function _callee20() {
  var categories, instructors, courses, students, result;
  return _regenerator2.default.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return _regenerator2.default.awrap(_db2.default.Categories.count());

        case 2:
          categories = _context20.sent;
          _context20.next = 5;
          return _regenerator2.default.awrap(_db2.default.Instructors.count());

        case 5:
          instructors = _context20.sent;
          _context20.next = 8;
          return _regenerator2.default.awrap(_db2.default.Courses.count());

        case 8:
          courses = _context20.sent;
          _context20.next = 11;
          return _regenerator2.default.awrap(_db2.default.Users.count());

        case 11:
          students = _context20.sent;
          result = {
            categories: categories,
            instructors: instructors,
            courses: courses,
            students: students
          };
          return _context20.abrupt('return', result);

        case 14:
        case 'end':
          return _context20.stop();
      }
    }
  }, null, undefined);
};

var getUserProcessCoursesByUserId = exports.getUserProcessCoursesByUserId = function _callee21(userId) {
  var courseList, data, Data;
  return _regenerator2.default.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.findAll({
            attributes: ['id'],
            where: {
              id: userId,
              isDeleted: false
            },
            include: [{
              model: _db2.default.Courses,
              attributes: ['id', 'title', 'imageUrl'],
              required: true,
              where: {
                isDeleted: false,
                status: _utils.enums.COURSE_STATUS.COMPLETED
              },
              include: [{
                model: _db2.default.Instructors,
                required: true,
                attributes: ['id'],
                where: {
                  isDeleted: false
                },
                include: [{
                  model: _db2.default.Users,
                  attributes: ['name'],
                  required: true,
                  where: {
                    isDeleted: false
                  }
                }]
              }, {
                model: _db2.default.Lessons,
                attributes: ['id'],
                required: true,
                where: {
                  isDeleted: false
                }
              }]
            }],
            raw: true
          }));

        case 2:
          courseList = _context21.sent;
          data = [];
          // format lại data => từ danh sách bài học đếm tổng số bài học

          courseList.map(function (ele) {
            var index = data.findIndex(function (elem) {
              return ele['courses.users_own_courses.courseId'] === elem.id;
            });
            if (index === -1) {
              data.push({
                id: ele['courses.users_own_courses.courseId'],
                courseTitle: ele['courses.title'],
                courseImage: ele['courses.imageUrl'],
                instructorId: ele['courses.instructor.id'],
                instructorName: ele['courses.instructor.user.name'],
                latestLearnTime: new Date(ele['courses.users_own_courses.updatedAt']),
                total: 1,
                learnLesson: 0
              });
            } else {
              data[index].total += 1;
            }
          });
          // lấy chi tiết danh sách bài nó đã học (user-lesson through userLearnLesson)
          _context21.next = 7;
          return _regenerator2.default.awrap(_db2.default.UsersLearnLessons.findAll({
            include: [{
              model: _db2.default.Lessons,
              required: true,
              where: {
                isDeleted: false
              }
            }],
            where: {
              userId: userId,
              isFinish: true
            },
            raw: true
          }));

        case 7:
          Data = _context21.sent;

          // đếm số bài nó đã học
          Data.forEach(function (ele) {
            var index = data.findIndex(function (elem) {
              return elem.id === ele['lesson.courseId'];
            });
            if (index != -1) {
              data[index].learnLesson += 1;
              //cập nhật ngày học gần nhất
              if (ele.learnedTime > data[index].latestLearnTime) {
                data[index].latestLearnTime = ele.learnedTime;
              }
            }
          });
          // tính số  phần trăm process
          data.map(function (ele) {
            ele.process = ele.learnLesson / ele.total * 100;
          });
          return _context21.abrupt('return', data);

        case 11:
        case 'end':
          return _context21.stop();
      }
    }
  }, null, undefined);
};

var getLikeStatusWithCourse = exports.getLikeStatusWithCourse = function _callee22(courseId, userId) {
  var likeInstance;
  return _regenerator2.default.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersLikeCourses.findOne({
            where: {
              userId: userId,
              courseId: courseId
            },
            raw: true,
            attributes: ['isActivated']
          }));

        case 2:
          likeInstance = _context22.sent;

          if (!(likeInstance && likeInstance.isActivated)) {
            _context22.next = 5;
            break;
          }

          return _context22.abrupt('return', true);

        case 5:
          return _context22.abrupt('return', false);

        case 6:
        case 'end':
          return _context22.stop();
      }
    }
  }, null, undefined);
};

var changeEmailAndDeactivate = exports.changeEmailAndDeactivate = function _callee23(userId, newEmail, userName) {
  var verifyEmailToken;
  return _regenerator2.default.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return _regenerator2.default.awrap(_db2.default.Users.update({
            email: newEmail,
            isActivated: false,
            facebookId: null,
            googleId: null
          }, {
            where: {
              id: userId,
              isDeleted: false
            }
          }));

        case 2:
          _context23.next = 4;
          return _regenerator2.default.awrap(_utils.crypt.createActivateEmailToken(userId));

        case 4:
          verifyEmailToken = _context23.sent;
          _context23.next = 7;
          return _regenerator2.default.awrap(_fetch.mail.sendConfirmChangeEmail(newEmail, userName, verifyEmailToken));

        case 7:
        case 'end':
          return _context23.stop();
      }
    }
  }, null, undefined);
};