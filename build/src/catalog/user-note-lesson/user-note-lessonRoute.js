'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userNoteLessonController = require('./user-note-lessonController');

var userNoteLessonController = _interopRequireWildcard(_userNoteLessonController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();

router.get('/get-by-course/:courseId', (0, _middleware.auth)(), userNoteLessonController.getNoteInCouseForUser);
router.get('/search/:courseId', (0, _middleware.auth)(), userNoteLessonController.searchNote);
router.get('/get/:id', (0, _middleware.auth)(), userNoteLessonController.getNoteById);
router.post('/create', (0, _middleware.auth)(), userNoteLessonController.createNote);
router.put('/update', (0, _middleware.auth)(), userNoteLessonController.updateNote);
router.put('/delete', (0, _middleware.auth)(), userNoteLessonController.deleteNote); //update status idDelete

exports.default = router;
module.exports = exports.default;