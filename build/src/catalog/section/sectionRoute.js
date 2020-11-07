'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sectionController = require('./sectionController');

var sectionController = _interopRequireWildcard(_sectionController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();
var isInstructor = true;

router.post('/get-all-sections', sectionController.getAllSection);
router.get('/get-section-info', sectionController.getSectionById);
router.post('/create-section', (0, _middleware.auth)({ isInstructor: isInstructor }), sectionController.createSection);
router.put('/update-section', (0, _middleware.auth)({ isInstructor: isInstructor }), sectionController.updateSectionNameById);
router.delete('/delete-section', (0, _middleware.auth)({ isInstructor: isInstructor }), sectionController.deleteSectionById);

exports.default = router;
module.exports = exports.default;