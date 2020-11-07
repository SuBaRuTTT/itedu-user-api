'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _middleware = require('../../middleware');

var _userController = require('./userController');

var userController = _interopRequireWildcard(_userController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line babel/new-cap
var router = _express2.default.Router();
var avatarMulter = _middleware.multer.avatarMulter;

/**
 * Basic registration method
 */

router.post('/register', userController.registerUser);
router.post('/send-activate-email', userController.sendActivateEmail);
router.put('/activate-email', userController.activateEmail);

/**
 * Basic logging in method
 */
router.post('/login', userController.loginUser);

/**
 * 2 external authentication methods
 */
// Facebook
router.get('/auth/facebook', _passport2.default.authenticate('FacebookAuth', { scope: ['email, user_gender, user_link'] }));

router.get('/auth/facebook/callback', _passport2.default.authenticate('FacebookAuth', {
  session: false,
  failureRedirect: '/'
}), userController.authExternal);

// Google
router.get('/auth/google', _passport2.default.authenticate('GoogleAuth', {
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/auth/google/callback', _passport2.default.authenticate('GoogleAuth', {
  session: false,
  failureRedirect: '/'
}), userController.authExternal);

/**
 * Get basic user's info with access-token after login with facebook or google
 */
router.get('/me', (0, _middleware.auth)(), userController.getBasicUserInfo);

/*
 * forget password
 * verify token forget
 * reset password
 */
router.post('/forget-pass/send-email', userController.sendMailForgetPassword);
router.get('/forget-pass/jwt/:token', userController.verifyForgetPasswordToken);
router.post('/reset-password', userController.resetPassword);

/**
 * recommend-course
 */
router.get('/recommend-course/:id/:limit/:offset', userController.getRecommendedCourses);

/**
* change password
*/
router.post('/change-password', (0, _middleware.auth)(), userController.changePassword);

/*update user's favorite categories*/
// eslint-disable-next-line max-len
router.put('/update-favorite-categories', (0, _middleware.auth)(), userController.updateUserFavoriteCategories);

/* like apis */
router.post('/like-course', (0, _middleware.auth)(), userController.userLikeCourse);
router.get('/get-course-like-status/:courseId', (0, _middleware.auth)(), userController.getCourseLikeStatus);

/* get info for intro page */
router.get('/intro-page', userController.getInfoIntroPage);

/* user profile api*/
router.put('/update-profile', (0, _middleware.auth)(), userController.updateUserProfile);
router.get('/get-process-courses', (0, _middleware.auth)(), userController.getProcessCourses);
router.get('/get-favorite-courses', (0, _middleware.auth)(), userController.getFavoriteCourses);
router.put('/change-user-email', (0, _middleware.auth)(), userController.changeUserEmail);
router.get('/intro-page', userController.getInfoIntroPage);
router.post('/upload-avatar', (0, _middleware.auth)(), avatarMulter.single('avatar'), userController.uploadAvatar);
router.get('/check-own-course/:courseId', (0, _middleware.auth)(), userController.checkUserOwnCourse);
exports.default = router;
module.exports = exports.default;