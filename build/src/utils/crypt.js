'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _config = require('../config');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashPassword = function hashPassword(password) {
  return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(_config.SALT_ROUNDS));
};

var comparePassword = function comparePassword(password, hash) {
  return _bcryptNodejs2.default.compareSync(password, hash);
};

var createAuthToken = function createAuthToken(userId) {
  return _jsonwebtoken2.default.sign({ id: userId }, _config.JWT_SECRET, { expiresIn: _config.TOKEN_EXPIRED_TIME });
};
var createForgetPassToken = function createForgetPassToken(userId) {
  return _jsonwebtoken2.default.sign({ id: userId }, _config.JWT_SECRET_FORGET, { expiresIn: _config.TOKEN_FORGET_PASS_EXPIRED_TIME });
};
var decodeForgetPassToken = function decodeForgetPassToken(token) {
  return _jsonwebtoken2.default.verify(token, _config.JWT_SECRET_FORGET);
};

var createActivateEmailToken = function createActivateEmailToken(userId) {
  return _jsonwebtoken2.default.sign({ userId: userId }, _config.ACTIVATE_EMAIL_JWT_SECRET, { expiresIn: _config.ACTIVATE_EMAIL_TOKEN_EXPIRED_TIME });
};

var decodeActivateEmailToken = function decodeActivateEmailToken(token) {
  return _jsonwebtoken2.default.verify(token, _config.ACTIVATE_EMAIL_JWT_SECRET);
};

var createVideoSignedToken = function createVideoSignedToken(_ref) {
  var userId = _ref.userId,
      courseId = _ref.courseId,
      lessonId = _ref.lessonId;

  return _jsonwebtoken2.default.sign({ userId: userId, courseId: courseId, lessonId: lessonId }, _config.JWT_SECRET, { expiresIn: _config.VIDEO_TOKEN_EXPIRED_TIME });
};

exports.default = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
  createAuthToken: createAuthToken,
  createForgetPassToken: createForgetPassToken,
  decodeForgetPassToken: decodeForgetPassToken,
  createActivateEmailToken: createActivateEmailToken,
  decodeActivateEmailToken: decodeActivateEmailToken,
  createVideoSignedToken: createVideoSignedToken
};
module.exports = exports.default;