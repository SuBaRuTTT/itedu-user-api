'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lessonController = require('./lessonController');

var lessonController = _interopRequireWildcard(_lessonController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();
var isInstructor = true;
var videoMulter = _middleware.multer.videoMulter,
    captionMulter = _middleware.multer.captionMulter;


router.post('/get-all-lessons', lessonController.getAllLesson);
router.get('/get-lesson-info', lessonController.getLessonById);
router.post('/create-lesson', (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.createLesson);
router.put('/update-lesson', (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.updateLessonById);
router.delete('/delete-lesson', (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.deleteLessonById);
router.delete('/delete-all-lessons', (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.deleteAllLesson);

/**
 * Endpoint for uploading file
 */
router.post('/upload-lesson-vid', videoMulter.single('video'), (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.uploadLessonVid);
router.post('/upload-lesson-cap', captionMulter.single('caption'), (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.uploadLessonCaption);
router.delete('/delete-caption', (0, _middleware.auth)({ isInstructor: isInstructor }), lessonController.deleteLessonCaption);
router.get('/detail/:courseId/:lessonId', (0, _middleware.auth)(), lessonController.getLessonDetail);
router.get('/video/:courseId/:lessonId', (0, _middleware.auth)(), lessonController.getVideoUrlAndCurrentTimeInVideo);
router.get('/video-signed-token/:courseId/:lessonId', (0, _middleware.auth)(), lessonController.getVideoSignedToken);
router.post('/update-status', (0, _middleware.auth)(), lessonController.updateStatusLessonFinish);
router.get('/subtitle/:courseId/:lessonId', (0, _middleware.auth)(), lessonController.getSubtitle);
router.put('/update-current-time-learn-video', (0, _middleware.auth)(), lessonController.udpateCurrentTimeLearnVideo);

exports.default = router;
module.exports = exports.default;