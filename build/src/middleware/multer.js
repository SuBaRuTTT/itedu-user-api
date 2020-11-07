'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIMIT_FILE_SIZE = _utils.enums.LIMIT_FILE_SIZE;


var avatarMulter = (0, _multer2.default)({
  storage: _multer2.default.memoryStorage(),
  limits: {
    fileSize: LIMIT_FILE_SIZE.AVATAR
  }
});

var videoMulter = (0, _multer2.default)({
  storage: _multer2.default.memoryStorage(),
  limits: {
    fileSize: LIMIT_FILE_SIZE.VIDEO
  }
});

var resourceMulter = (0, _multer2.default)({
  storage: _multer2.default.memoryStorage(),
  limits: {
    fileSize: LIMIT_FILE_SIZE.RESOURCE
  }
});

var captionMulter = (0, _multer2.default)({
  storage: _multer2.default.memoryStorage(),
  limits: {
    fileSize: LIMIT_FILE_SIZE.CAPTION
  }
});

exports.default = {
  avatarMulter: avatarMulter,
  videoMulter: videoMulter,
  resourceMulter: resourceMulter,
  captionMulter: captionMulter
};
module.exports = exports.default;