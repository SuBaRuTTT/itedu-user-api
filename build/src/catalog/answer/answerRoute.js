'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _answerController = require('./answerController');

var answerController = _interopRequireWildcard(_answerController);

var _middleware = require('../../middleware');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();

router.post('/create', (0, _middleware.auth)(), answerController.create);
router.get('/get-by-question/:questionId', (0, _middleware.auth)(), answerController.getAnswerByQuestionId);

exports.default = router;
module.exports = exports.default;