'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('../../middleware');

var _paymentController = require('./paymentController');

var paymentController = _interopRequireWildcard(_paymentController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();

router.post('/get-free-courses', (0, _middleware.auth)(), paymentController.userGetFreeCourses);

router.post('/checkout-vnpay', (0, _middleware.auth)(), paymentController.checkoutVNPay);
router.get('/vnpay-return-url', paymentController.responseVNPayPaymentResult);

router.post('/checkout-momo', (0, _middleware.auth)(), paymentController.checkoutMoMo);
router.get('/momo-return-url', paymentController.responseMoMoPaymentResult);
router.post('/momo-notify-url', paymentController.responseMoMoIPNPaymentResult);

router.get('/get-course-info/:courseId', (0, _middleware.auth)(), paymentController.getCourseInfo);

exports.default = router;
module.exports = exports.default;