'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('../../middleware');

var _instructorController = require('./instructorController');

var instructorController = _interopRequireWildcard(_instructorController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router(); /* eslint-disable max-len */

var isInstructor = true;
/**
 *  Get basic instructor's info with access-token after login
 */

router.post('/register', (0, _middleware.auth)(), instructorController.registerInstructor);
router.get('/detail/:id', instructorController.getInstructorInfo);

router.get('/get-course-by-id', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getCourseByIdInstructor);
router.get('/course', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getCourses);
router.post('/analytics/income', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getIncomeAnalytics);
router.post('/analytics/student-number', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getStudentNumberAnalytics);
router.post('/analytics/active-course', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getActiveCourseAnalytics);
router.post('/update-info', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.updateInfo);
router.post('/update-intro', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.updateIntro);
router.get('/get-basic-info', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.getBasicInfo);

router.post('/payout', (0, _middleware.auth)({ isInstructor: isInstructor }), instructorController.payoutCumalativeTuition);
exports.default = router;
module.exports = exports.default;