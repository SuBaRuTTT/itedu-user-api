'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _categoryController = require('./categoryController');

var categoryController = _interopRequireWildcard(_categoryController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();

router.get('/get-all-label-value', categoryController.getAllCategoriesWithLabelAndValue);
router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

exports.default = router;
module.exports = exports.default;