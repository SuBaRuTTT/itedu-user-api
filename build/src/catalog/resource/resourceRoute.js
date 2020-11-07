'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _resourceController = require('./resourceController');

var resourceController = _interopRequireWildcard(_resourceController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();
var isInstructor = true;
var resourceMulter = _middleware.multer.resourceMulter;


router.delete('/remove-resource', (0, _middleware.auth)({ isInstructor: isInstructor }), resourceController.removeResource);
router.delete('/remove-all-resources', (0, _middleware.auth)({ isInstructor: isInstructor }), resourceController.removeAllResource);
router.get('/get-url/:courseId/:lessonId/:id', (0, _middleware.auth)(), resourceController.getResourceUrl);

/**
 * Endpoint for uploading file
 */
router.post('/upload-resource', resourceMulter.single('resource'), (0, _middleware.auth)({ isInstructor: isInstructor }), resourceController.uploadResource);

exports.default = router;
module.exports = exports.default;