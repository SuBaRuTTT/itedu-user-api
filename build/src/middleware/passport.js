'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require('passport-facebook');

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _passportGoogleOauth = require('passport-google-oauth20');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Passport for Facebook
 */
_passport2.default.use('FacebookAuth', new _passportFacebook2.default({
  clientID: _config.FACEBOOK_CLIENT_ID,
  clientSecret: _config.FACEBOOK_CLIENT_SECRET,
  callbackURL: _config.FACEBOOK_AUTH_CALLBACK_URL,
  profileFields: ['id', 'email', 'picture.type(large)', 'gender', 'link', 'name', 'displayName']
}, function (accessToken, refreshToken, profile, done) {
  var id = profile.id,
      provider = profile.provider,
      displayName = profile.displayName;

  var email = profile.emails.length > 0 ? profile.emails[0].value : null;
  var avatar = profile.photos.length > 0 ? profile.photos[0].value : null;
  var externalUserInfo = {
    id: id, provider: provider, displayName: displayName, email: email, avatar: avatar
  };

  return done(null, externalUserInfo);
}));

/**
 * Passport for Google Oauth2
 */
_passport2.default.use('GoogleAuth', new _passportGoogleOauth2.default({
  clientID: _config.GOOGLE_CLIENT_ID,
  clientSecret: _config.GOOGLE_CLIENT_SECRET,
  callbackURL: _config.GOOGLE_AUTH_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  var id = profile.id,
      provider = profile.provider,
      displayName = profile.displayName;

  var email = profile.emails[0].value;
  var avatar = profile.photos[0].value;
  var externalUserInfo = {
    id: id, provider: provider, displayName: displayName, email: email, avatar: avatar
  };

  return done(null, externalUserInfo);
}));

exports.default = _passport2.default;
module.exports = exports.default;