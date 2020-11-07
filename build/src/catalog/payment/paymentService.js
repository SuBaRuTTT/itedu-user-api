'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFreeUserOwnCourse = exports.isCourseFree = exports.didUserBuyCourse = exports.getCourseInfo = exports.isMoMoPaymentSuccess = exports.getMoMoPayUrl = exports.isVNPayPaymentSuccess = exports.createVNPayPaymentURL = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _utils = require('../../utils');

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _sha = require('sha256');

var _sha2 = _interopRequireDefault(_sha);

var _fetch = require('../../fetch');

var _db = require('../../../models/db');

var _db2 = _interopRequireDefault(_db);

var _config = require('../../config');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVNPayPaymentURL = exports.createVNPayPaymentURL = function _callee(ipAddr, courseId, userId) {
  var course, date, vnpParams, signData, secureHash, vnpUrl;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          course = _context.sent;
          date = new Date();
          vnpParams = {};

          vnpParams.vnp_Version = '2';
          vnpParams.vnp_Command = 'pay';
          vnpParams.vnp_TmnCode = _config.VNPAY_TMN_CODE;
          // vnpParams.vnp_Merchant = ''
          vnpParams.vnp_Locale = 'vn';
          vnpParams.vnp_CurrCode = 'VND';
          vnpParams.vnp_TxnRef = (0, _dateformat2.default)(date, 'HHmmss');
          //hide userid and courseid in ordeInfo cause orderInfo will not be displayed
          vnpParams.vnp_OrderInfo = userId + ' mua khoa hoc ' + course.id; //for saving data into database
          vnpParams.vnp_OrderType = '190000'; //VNPay code for entertaiment & education goods
          vnpParams.vnp_Amount = course.price * 100; //to delete decimals
          vnpParams.vnp_ReturnUrl = _config.VNPAY_RETURN_URL;
          vnpParams.vnp_IpAddr = ipAddr;
          vnpParams.vnp_CreateDate = (0, _dateformat2.default)(date, 'yyyymmddHHmmss');

          vnpParams = _utils.paymentHandler.sortObject(vnpParams);

          signData = _config.VNPAY_HASH_SECRET + _qs2.default.stringify(vnpParams, { encode: false });
          secureHash = (0, _sha2.default)(signData);


          vnpParams.vnp_SecureHashType = 'SHA256';
          vnpParams.vnp_SecureHash = secureHash;

          vnpUrl = _config.VNPAY_URL;

          vnpUrl += '?' + _qs2.default.stringify(vnpParams, { encode: true });

          return _context.abrupt('return', vnpUrl);

        case 25:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

//check vnpay payment success and return a link to course
var isVNPayPaymentSuccess = exports.isVNPayPaymentSuccess = function _callee2(vnpParams) {
  var secureHash, signData, checkSum, orderInfo, orderInfoLength, userId, courseId, paymentDate, userInfo, courseInfo, tuition;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          secureHash = vnpParams.vnp_SecureHash;

          delete vnpParams.vnp_SecureHash;
          delete vnpParams.vnp_SecureHashType;

          vnpParams = _utils.paymentHandler.sortObject(vnpParams);

          signData = _config.VNPAY_HASH_SECRET + _qs2.default.stringify(vnpParams, { encode: false });
          checkSum = (0, _sha2.default)(signData);

          if (!(secureHash === checkSum && vnpParams.vnp_ResponseCode == '00')) {
            _context2.next = 30;
            break;
          }

          orderInfo = vnpParams.vnp_OrderInfo;
          orderInfoLength = orderInfo.length;
          //get userId and courseId from orderInfo which is sent when creating vnpay payment url

          userId = orderInfo.substring(0, 36); //uuid's length is 36

          courseId = orderInfo.substring(orderInfoLength - 36, orderInfoLength);
          paymentDate = new Date();
          _context2.next = 14;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.create({
            id: (0, _v2.default)(),
            userId: userId,
            courseId: courseId,
            paymentMethod: vnpParams.vnp_CardType,
            createdAt: paymentDate
          }));

        case 14:
          _context2.next = 16;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: userId
            },
            raw: true
          }));

        case 16:
          userInfo = _context2.sent;
          _context2.next = 19;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId
            },
            raw: true
          }));

        case 19:
          courseInfo = _context2.sent;
          _context2.next = 22;
          return _regenerator2.default.awrap(_db2.default.Courses.increment(['soldNumber'], { by: 1, where: { id: courseId } }));

        case 22:
          tuition = courseInfo.price * _config.INSTRUCTOR_TUITION_PERCENTAGE;
          _context2.next = 25;
          return _regenerator2.default.awrap(_db2.default.Instructors.increment(['cumulativeTuition'], { by: tuition, where: { id: courseInfo.instructorId } }));

        case 25:
          _context2.next = 27;
          return _regenerator2.default.awrap(_fetch.mail.sendThankyouEmail(courseInfo, userInfo, (0, _dateformat2.default)(paymentDate, 'dd-mm-yyyy HH:mm:ss'), vnpParams.vnp_CardType + ' với VNPay'));

        case 27:
          return _context2.abrupt('return', '/course-detail/' + courseId);

        case 30:
          return _context2.abrupt('return', null);

        case 31:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

var getMoMoPayUrl = exports.getMoMoPayUrl = function _callee3(courseId, userId) {
  var couseInfo, momoPaymentUrl;
  return _regenerator2.default.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              isDeleted: false
            },
            raw: true
          }));

        case 2:
          couseInfo = _context3.sent;
          _context3.next = 5;
          return _regenerator2.default.awrap(_fetch.momoHandler.getMoMoPaymentUrl(couseInfo, userId));

        case 5:
          momoPaymentUrl = _context3.sent;
          return _context3.abrupt('return', momoPaymentUrl);

        case 7:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, undefined);
};

var isMoMoPaymentSuccess = exports.isMoMoPaymentSuccess = function _callee4(momoParams) {
  var isDataIntegrity, extraData, extraDataLength, userId, courseId, paymentDate, userInfo, courseInfo, tuition;
  return _regenerator2.default.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _regenerator2.default.awrap(_fetch.momoHandler.checkDataIntegrity(momoParams));

        case 2:
          isDataIntegrity = _context4.sent;

          if (!(isDataIntegrity && momoParams.errorCode == '0')) {
            _context4.next = 27;
            break;
          }

          extraData = momoParams.extraData;
          extraDataLength = extraData.length;
          //get userId and courseId from extraData which is sent when creating momo payment url

          userId = extraData.substring(0, 36); //uuid's length is 36

          courseId = extraData.substring(extraDataLength - 36, extraDataLength);
          paymentDate = new Date();
          _context4.next = 11;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.create({
            id: (0, _v2.default)(),
            userId: userId,
            courseId: courseId,
            paymentMethod: 'MOMO',
            createdAt: paymentDate
          }));

        case 11:
          _context4.next = 13;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: userId
            },
            raw: true
          }));

        case 13:
          userInfo = _context4.sent;
          _context4.next = 16;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId
            },
            raw: true
          }));

        case 16:
          courseInfo = _context4.sent;
          _context4.next = 19;
          return _regenerator2.default.awrap(_db2.default.Courses.increment(['soldNumber'], { by: 1, where: { id: courseId } }));

        case 19:
          tuition = courseInfo.price * _config.INSTRUCTOR_TUITION_PERCENTAGE;
          _context4.next = 22;
          return _regenerator2.default.awrap(_db2.default.Instructors.increment(['cumulativeTuition'], { by: tuition, where: { id: courseInfo.instructorId } }));

        case 22:
          _context4.next = 24;
          return _regenerator2.default.awrap(_fetch.mail.sendThankyouEmail(courseInfo, userInfo, (0, _dateformat2.default)(paymentDate, 'dd-mm-yyyy HH:mm:ss'), 'ví điện tử MoMo'));

        case 24:
          return _context4.abrupt('return', '/course-detail/' + courseId);

        case 27:
          return _context4.abrupt('return', null);

        case 28:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, undefined);
};

//getCourseInfo and check if user buy this course
var getCourseInfo = exports.getCourseInfo = function _callee5(courseId, userId) {
  var courseInfo;
  return _regenerator2.default.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId,
              isDeleted: false,
              status: _utils.enums.COURSE_STATUS.COMPLETED
            },
            attributes: ['title', 'price', 'imageUrl', [_sequelize2.default.col('instructor.user.name'), 'instructorName']],
            include: [{
              model: _db2.default.Instructors,
              required: true,
              attributes: ['id'],
              include: [{
                model: _db2.default.Users,
                required: true,
                attributes: ['name']
              }]
            }],
            raw: true
          }));

        case 2:
          courseInfo = _context5.sent;
          return _context5.abrupt('return', courseInfo);

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, undefined);
};

var didUserBuyCourse = exports.didUserBuyCourse = function _callee6(courseId, userId) {
  var instance;
  return _regenerator2.default.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.findOne({
            where: {
              userId: userId,
              courseId: courseId
            },
            raw: true
          }));

        case 2:
          instance = _context6.sent;

          if (!instance) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt('return', true);

        case 5:
          return _context6.abrupt('return', false);

        case 6:
        case 'end':
          return _context6.stop();
      }
    }
  }, null, undefined);
};

var isCourseFree = exports.isCourseFree = function _callee7(courseId) {
  var courseInfo;
  return _regenerator2.default.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: { id: courseId },
            attributes: ['price'],
            raw: true
          }));

        case 2:
          courseInfo = _context7.sent;
          return _context7.abrupt('return', courseInfo.price == '0');

        case 4:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined);
};

var createFreeUserOwnCourse = exports.createFreeUserOwnCourse = function _callee8(userId, courseId) {
  var userInfo, courseInfo;
  return _regenerator2.default.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _regenerator2.default.awrap(_db2.default.UsersOwnCourses.create({
            id: (0, _v2.default)(),
            userId: userId,
            courseId: courseId,
            paymentMethod: 'FREE'
          }));

        case 2:
          _context8.next = 4;
          return _regenerator2.default.awrap(_db2.default.Users.findOne({
            where: {
              id: userId
            },
            raw: true
          }));

        case 4:
          userInfo = _context8.sent;
          _context8.next = 7;
          return _regenerator2.default.awrap(_db2.default.Courses.findOne({
            where: {
              id: courseId
            },
            raw: true
          }));

        case 7:
          courseInfo = _context8.sent;
          _context8.next = 10;
          return _regenerator2.default.awrap(_db2.default.Courses.increment(['soldNumber'], { by: 1, where: { id: courseId } }));

        case 10:
          _context8.next = 12;
          return _regenerator2.default.awrap(_fetch.mail.sendFreeCourseThankyouEmail(courseInfo, userInfo, (0, _dateformat2.default)(new Date(), 'dd-mm-yyyy HH:mm:ss')));

        case 12:
          return _context8.abrupt('return', '/course-detail/' + courseId);

        case 13:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined);
};