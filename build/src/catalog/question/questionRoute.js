'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questionController = require('./questionController');

var questionController = _interopRequireWildcard(_questionController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();

router.post('/create', (0, _middleware.auth)(), questionController.create);
router.get('/get-by-lesson/:courseId/:lessonId', (0, _middleware.auth)(), questionController.getQuestionByLesson);
router.get('/search-in-lesson', (0, _middleware.auth)(), questionController.searchQuestionInLesson);
router.put('/update-liked-question', (0, _middleware.auth)(), questionController.updateLikedQuestion);

exports.default = router;
module.exports = exports.default;