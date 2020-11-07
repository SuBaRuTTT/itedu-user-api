'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INSTRUCTOR_TUITION_PERCENTAGE = exports.PAYPAL_CLIENT_SECRET = exports.PAYPAL_CLIENT_ID = exports.PAYPAL_MODE = exports.GCP_STORAGE_RESOURCE_PATH_NAME = exports.GCP_STORAGE_COURSE_PATH_NAME = exports.GCP_STORAGE_CLIENT_CERT_URL = exports.GCP_STORAGE_CLIENT_ID = exports.GCP_STORAGE_CLIENT_EMAIL = exports.GCP_STORAGE_PRIVATE_KEY = exports.GCP_STORAGE_PRIVATE_KEY_ID = exports.GCP_STORAGE_PROJECT_ID = exports.GCP_STORAGE_FILE_NAME = exports.GCP_STORAGE_BUCKET_NAME = exports.MOMO_NOTIFY_URL = exports.MOMO_RETURN_URL = exports.MOMO_API_ENDPOINT = exports.MOMO_SECRET_KEY = exports.MOMO_ACCESS_KEY = exports.MOMO_PARTNER_CODE = exports.VNPAY_RETURN_URL = exports.VNPAY_URL = exports.VNPAY_HASH_SECRET = exports.VNPAY_TMN_CODE = exports.JWT_SECRET_FORGET = exports.TOKEN_FORGET_PASS_EXPIRED_TIME = exports.TEAM_EMAIL = exports.SENDGRID_API_KEY = exports.GOOGLE_AUTH_CALLBACK_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.FACEBOOK_AUTH_CALLBACK_URL = exports.FACEBOOK_CLIENT_SECRET = exports.FACEBOOK_CLIENT_ID = exports.COOKIE_EXPIRED_TIME_IN_MS = exports.ACTIVATE_EMAIL_TOKEN_EXPIRED_TIME = exports.VIDEO_TOKEN_EXPIRED_TIME = exports.TOKEN_EXPIRED_TIME = exports.ACTIVATE_EMAIL_JWT_SECRET = exports.JWT_SECRET = exports.SALT_ROUNDS = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.API_URL = exports.FRONTEND_URL = exports.PORT = undefined;

var _trimEnd = require('lodash/trimEnd');

var _trimEnd2 = _interopRequireDefault(_trimEnd);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var PORT = exports.PORT = Number(process.env.PORT) || 3000;
var FRONTEND_URL = exports.FRONTEND_URL = (0, _trimEnd2.default)(process.env.FRONTEND_URL || 'http://localhost:3001', '/');
var API_URL = exports.API_URL = (0, _trimEnd2.default)(process.env.API_URL || 'http://localhost:3000', '/');

var DB_HOST = exports.DB_HOST = process.env.DB_HOST || '127.0.0.1';
var DB_PORT = exports.DB_PORT = Number(process.env.DB_PORT) || 5432;
var DB_USERNAME = exports.DB_USERNAME = process.env.DB_USERNAME || '';
var DB_PASSWORD = exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
var DB_NAME = exports.DB_NAME = process.env.DB_NAME || 'itedu';

var SALT_ROUNDS = exports.SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 8;
var JWT_SECRET = exports.JWT_SECRET = process.env.JWT_SECRET || 'hahaha';
var ACTIVATE_EMAIL_JWT_SECRET = exports.ACTIVATE_EMAIL_JWT_SECRET = process.env.ACTIVATE_EMAIL_JWT_SECRET || 'hihihi';
var TOKEN_EXPIRED_TIME = exports.TOKEN_EXPIRED_TIME = process.env.TOKEN_EXPIRED_TIME || '2h';
var VIDEO_TOKEN_EXPIRED_TIME = exports.VIDEO_TOKEN_EXPIRED_TIME = process.env.VIDEO_TOKEN_EXPIRED_TIME || '24h';
var ACTIVATE_EMAIL_TOKEN_EXPIRED_TIME = exports.ACTIVATE_EMAIL_TOKEN_EXPIRED_TIME = process.env.ACTIVATE_EMAIL_TOKEN_EXPIRED_TIME || '24h';

var COOKIE_EXPIRED_TIME_IN_MS = exports.COOKIE_EXPIRED_TIME_IN_MS = Number(process.env.COOKIE_EXPIRED_TIME_IN_MS) || _moment2.default.duration({ hours: 2 }).asMilliseconds();

var FACEBOOK_CLIENT_ID = exports.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '';
var FACEBOOK_CLIENT_SECRET = exports.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '';
var FACEBOOK_AUTH_CALLBACK_URL = exports.FACEBOOK_AUTH_CALLBACK_URL = process.env.FACEBOOK_AUTH_CALLBACK_URL || API_URL + '/user/auth/facebook/callback';

var GOOGLE_CLIENT_ID = exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
var GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
var GOOGLE_AUTH_CALLBACK_URL = exports.GOOGLE_AUTH_CALLBACK_URL = process.env.GOOGLE_AUTH_CALLBACK_URL || API_URL + '/user/auth/google/callback';

var SENDGRID_API_KEY = exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
var TEAM_EMAIL = exports.TEAM_EMAIL = process.env.TEAM_EMAIL || '';

var TOKEN_FORGET_PASS_EXPIRED_TIME = exports.TOKEN_FORGET_PASS_EXPIRED_TIME = process.env.TOKEN_FORGET_PASS_EXPIRED_TIME || '1h';
var JWT_SECRET_FORGET = exports.JWT_SECRET_FORGET = process.env.JWT_SECRET_FORGET || 'forget';

var VNPAY_TMN_CODE = exports.VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE || '';
var VNPAY_HASH_SECRET = exports.VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET || '';
var VNPAY_URL = exports.VNPAY_URL = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
var VNPAY_RETURN_URL = exports.VNPAY_RETURN_URL = API_URL + '/payment/vnpay-return-url';

//momo ipn required api to be deployed
//change when deploying
var MOMO_PARTNER_CODE = exports.MOMO_PARTNER_CODE = process.env.MOMO_PARTNER_CODE || '';
var MOMO_ACCESS_KEY = exports.MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY || '';
var MOMO_SECRET_KEY = exports.MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY || '';
var MOMO_API_ENDPOINT = exports.MOMO_API_ENDPOINT = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
var MOMO_RETURN_URL = exports.MOMO_RETURN_URL = API_URL + '/payment/momo-return-url';
var MOMO_NOTIFY_URL = exports.MOMO_NOTIFY_URL = API_URL + '/payment/momo-notify-url'; //used for momo ipn

var GCP_STORAGE_BUCKET_NAME = exports.GCP_STORAGE_BUCKET_NAME = process.env.GCP_STORAGE_BUCKET_NAME || '';
var GCP_STORAGE_FILE_NAME = exports.GCP_STORAGE_FILE_NAME = process.env.GCP_STORAGE_FILE_NAME || 'storage-key.json';
var GCP_STORAGE_PROJECT_ID = exports.GCP_STORAGE_PROJECT_ID = process.env.GCP_STORAGE_PROJECT_ID || '';
var GCP_STORAGE_PRIVATE_KEY_ID = exports.GCP_STORAGE_PRIVATE_KEY_ID = process.env.GCP_STORAGE_PRIVATE_KEY_ID || '';
var GCP_STORAGE_PRIVATE_KEY = exports.GCP_STORAGE_PRIVATE_KEY = process.env.GCP_STORAGE_PRIVATE_KEY || '';
var GCP_STORAGE_CLIENT_EMAIL = exports.GCP_STORAGE_CLIENT_EMAIL = process.env.GCP_STORAGE_CLIENT_EMAIL || '';
var GCP_STORAGE_CLIENT_ID = exports.GCP_STORAGE_CLIENT_ID = process.env.GCP_STORAGE_CLIENT_ID || '';
var GCP_STORAGE_CLIENT_CERT_URL = exports.GCP_STORAGE_CLIENT_CERT_URL = process.env.GCP_STORAGE_CLIENT_CERT_URL || '';
var GCP_STORAGE_COURSE_PATH_NAME = exports.GCP_STORAGE_COURSE_PATH_NAME = process.env.GCP_STORAGE_COURSE_PATH_NAME || 'Courses';
var GCP_STORAGE_RESOURCE_PATH_NAME = exports.GCP_STORAGE_RESOURCE_PATH_NAME = process.env.GCP_STORAGE_RESOURCE_PATH_NAME || 'Resource';

var PAYPAL_MODE = exports.PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
var PAYPAL_CLIENT_ID = exports.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
var PAYPAL_CLIENT_SECRET = exports.PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';
var INSTRUCTOR_TUITION_PERCENTAGE = exports.INSTRUCTOR_TUITION_PERCENTAGE = process.env.INSTRUCTOR_TUITION_PERCENTAGE || 0.9;