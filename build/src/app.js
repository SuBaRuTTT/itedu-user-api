'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

require('./middleware');

var _config = require('./config');

var _userRoute = require('./catalog/user/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

var _instructorRoute = require('./catalog/instructor/instructorRoute');

var _instructorRoute2 = _interopRequireDefault(_instructorRoute);

var _categoryRoute = require('./catalog/category/categoryRoute');

var _categoryRoute2 = _interopRequireDefault(_categoryRoute);

var _courseRoute = require('./catalog/course/courseRoute');

var _courseRoute2 = _interopRequireDefault(_courseRoute);

var _lessonRoute = require('./catalog/lesson/lessonRoute');

var _lessonRoute2 = _interopRequireDefault(_lessonRoute);

var _sectionRoute = require('./catalog/section/sectionRoute');

var _sectionRoute2 = _interopRequireDefault(_sectionRoute);

var _resourceRoute = require('./catalog/resource/resourceRoute');

var _resourceRoute2 = _interopRequireDefault(_resourceRoute);

var _feedbackRoute = require('./catalog/feedback/feedbackRoute');

var _feedbackRoute2 = _interopRequireDefault(_feedbackRoute);

var _userNoteLessonRoute = require('./catalog/user-note-lesson/user-note-lessonRoute');

var _userNoteLessonRoute2 = _interopRequireDefault(_userNoteLessonRoute);

var _questionRoute = require('./catalog/question/questionRoute');

var _questionRoute2 = _interopRequireDefault(_questionRoute);

var _answerRoute = require('./catalog/answer/answerRoute');

var _answerRoute2 = _interopRequireDefault(_answerRoute);

var _paymentRoute = require('./catalog/payment/paymentRoute');

var _paymentRoute2 = _interopRequireDefault(_paymentRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//require routers here
var app = (0, _express2.default)();
app.use((0, _morgan2.default)('dev')); //log in terminal: HTTP Method - route - time

// eslint-disable-next-line max-len
app.use(_bodyParser2.default.urlencoded({
  extended: true
})); //true -> support parsing extended body with rich data/ false
// -> only support simple body with url encoded data
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)()); //for reading cookie in request
app.use((0, _cors2.default)({
  origin: [_config.FRONTEND_URL, 'http://localhost:3001', 'http://itedu.me', 'https://www.facebook.com', 'https://www.google.com', 'http://sandbox.vnpayment.vn/', 'https://test-payment.momo.vn', 'https://storage.googleapis.com'], //Prevent all domain from sending request except this one
  credentials: true //Turn on cookie HTTP through CORS
}));

//routers here
app.use('/user', _userRoute2.default);
app.use('/instructor', _instructorRoute2.default);
app.use('/category', _categoryRoute2.default);
app.use('/feedback', _feedbackRoute2.default);
app.use('/course', _courseRoute2.default);
app.use('/lesson', _lessonRoute2.default);
app.use('/section', _sectionRoute2.default);
app.use('/resource', _resourceRoute2.default);
app.use('/user-note-lesson', _userNoteLessonRoute2.default);
app.use('/question', _questionRoute2.default);
app.use('/answer', _answerRoute2.default);
app.use('/payment', _paymentRoute2.default);

//handling 'Not found' error
//if the url doesnt match any above middleware => not found error
app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

exports.default = app;
module.exports = exports.default;