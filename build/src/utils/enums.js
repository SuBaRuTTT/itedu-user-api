'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_TYPE = (0, _keymirror2.default)({
  STUDENT: null,
  INSTRUCTOR: null
});

var COURSE_STATUS = (0, _keymirror2.default)({
  PENDING: null,
  COMPLETED: null
});

var EXTERNAL_ID_TYPE = (0, _keymirror2.default)({
  FACEBOOK: null,
  GOOGLE: null
});

var MESSAGE = {
  INTERNAL_SERVER_ERROR: 'Hệ thống lỗi',
  OK: 'OK'
};

var FILE_TYPE = (0, _keymirror2.default)({
  image: null,
  video: null,
  text: null,
  application: null
});

var LIMIT_FILE_SIZE = {
  AVATAR: 5 * 1024 * 1024, // 5mb
  VIDEO: 500 * 1024 * 1024, // 500mb
  RESOURCE: 30 * 1024 * 1024, // 30mb
  CAPTION: 3 * 1024 * 1024 // 3mb
};

var GCS_SIGNED_URL_EXPIRE = Date.now() + 3 * 60 * 60 * 1000;

var RESOURCE_URL_EXPIRE_TIME = 0.2 * 60 * 1000; // 12 minutes
var VIDEO_URL_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 hours

var INTIAL_RANGE_STREAM = 'bytes=3571712-';
var GCS_SIGNED_URL_ACTION = {
  READ: 'read',
  WRITE: 'write'
};

var REPORT_STATUS = (0, _keymirror2.default)({
  PENDING: null,
  SOLVED: null
});
var PAYOUT_LIMIT = {
  UPPER_LIMIT: 10000000,
  LOWER_LIMIT: 100000
};

exports.default = {
  USER_TYPE: USER_TYPE,
  EXTERNAL_ID_TYPE: EXTERNAL_ID_TYPE,
  MESSAGE: MESSAGE,
  COURSE_STATUS: COURSE_STATUS,
  FILE_TYPE: FILE_TYPE,
  LIMIT_FILE_SIZE: LIMIT_FILE_SIZE,
  GCS_SIGNED_URL_EXPIRE: GCS_SIGNED_URL_EXPIRE,
  RESOURCE_URL_EXPIRE_TIME: RESOURCE_URL_EXPIRE_TIME,
  VIDEO_URL_EXPIRE_TIME: VIDEO_URL_EXPIRE_TIME,
  INTIAL_RANGE_STREAM: INTIAL_RANGE_STREAM,
  GCS_SIGNED_URL_ACTION: GCS_SIGNED_URL_ACTION,
  REPORT_STATUS: REPORT_STATUS,
  PAYOUT_LIMIT: PAYOUT_LIMIT
};
module.exports = exports.default;