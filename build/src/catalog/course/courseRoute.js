'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _courseController = require('./courseController');

var courseController = _interopRequireWildcard(_courseController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();
var isInstructor = true;
var avatarMulter = _middleware.multer.avatarMulter,
    videoMulter = _middleware.multer.videoMulter;


router.get('/total-number', courseController.getCourseNumber);
router.post('/top-sell', courseController.getTopSellCourse);
router.post('/top-new', courseController.getTopNewCourse);
router.post('/top-rate', courseController.getTopRatedCourseHome);
router.post('/courses-user-favorite-categories', courseController.getCoursesByUserFavoriteCategories);
router.get('/get-course-info', courseController.getCourseById);
router.post('/top-rate', courseController.getTopNewCourse);
router.get('/get-course-detail/:id/:userId', courseController.getCourseDetailByCourseId);
router.get('/instructor-get-course-detail/:id', courseController.instructorGetCourseDetail);
router.post('/create-course', (0, _middleware.auth)({ isInstructor: isInstructor }), courseController.createCourse);
router.put('/update-course', (0, _middleware.auth)({ isInstructor: isInstructor }), courseController.updateCourseById);
router.delete('/delete-course', (0, _middleware.auth)({ isInstructor: isInstructor }), courseController.deleteCourseById);
// Because body is complex, using POST method instead to make it more easy
router.post('/search', courseController.searchCourse);

/**
 * Endpoint for uploading file
 */
router.post('/upload-avatar', avatarMulter.single('avatar'), (0, _middleware.auth)({ isInstructor: isInstructor }), courseController.uploadAvatar);
router.post('/upload-promo-vid', videoMulter.single('video'), (0, _middleware.auth)({ isInstructor: isInstructor }), courseController.uploadPromoVid);

router.get('/detail-with-lesson/:courseId', (0, _middleware.auth)(), courseController.getCourseWithLessonDetail);
router.get('/process-course/:courseId', (0, _middleware.auth)(), courseController.getProcessCourse);
router.post('/rating-course/', (0, _middleware.auth)(), courseController.ratingCourse);
router.get('/get-rating/:courseId', (0, _middleware.auth)(), courseController.getRatingCourse);
router.post('/report-course/', (0, _middleware.auth)(), courseController.reportCourse);
exports.default = router;
module.exports = exports.default;