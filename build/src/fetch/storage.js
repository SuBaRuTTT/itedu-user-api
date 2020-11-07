'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _storage = require('@google-cloud/storage');

var _fs = require('fs');

var _utils = require('../utils');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StorageClass = function () {
  function StorageClass() {
    (0, _classCallCheck3.default)(this, StorageClass);

    this.instance = null;
  }

  (0, _createClass3.default)(StorageClass, [{
    key: 'init',
    value: function init() {
      return _regenerator2.default.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(this.instance === null)) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return _regenerator2.default.awrap(writeKeyFile());

            case 4:
              this.instance = new _storage.Storage({
                projectId: _config.GCP_STORAGE_PROJECT_ID,
                keyFilename: '' + _config.GCP_STORAGE_FILE_NAME
              });

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              _utils.debug.error('Error occured while init GCP Storage client', _context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: 'getBuckets',
    value: function getBuckets() {
      var _ref, _ref2, buckets;

      return _regenerator2.default.async(function getBuckets$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator2.default.awrap(this.instance.getBuckets());

            case 2:
              _ref = _context2.sent;
              _ref2 = (0, _slicedToArray3.default)(_ref, 1);
              buckets = _ref2[0];
              return _context2.abrupt('return', buckets);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'getBucketMetadata',
    value: function getBucketMetadata(bucketName) {
      var _ref3, _ref4, metadata;

      return _regenerator2.default.async(function getBucketMetadata$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator2.default.awrap(this.instance.bucket(bucketName).getMetadata());

            case 2:
              _ref3 = _context3.sent;
              _ref4 = (0, _slicedToArray3.default)(_ref3, 1);
              metadata = _ref4[0];
              return _context3.abrupt('return', metadata);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }

    /**
     * @param {String} bucketName // name of the bucket
     * @param {Object} file // req.file object from request
     * @param {Object} opts {
     *  public: Boolean,
     *  newFileName: String, // It will upload the file to root
     *                       // with original name by default when omitting this option
     *  resumable: Boolean
     * }
     */

  }, {
    key: 'uploadFile',
    value: function uploadFile(bucketName, file, opts) {
      var _this = this;

      // Because Writable event listener is asynchronous, we have to wrap the function in Promise
      // to wait for 'finish' event emitting
      return new _promise2.default(function (resolve, reject) {
        var newFileName = opts.newFileName;

        delete opts.newFileName;
        var isPublic = opts.public || false;
        delete opts.public;

        var fileName = newFileName || file.originalname;
        var blob = _this.instance.bucket(bucketName).file(fileName);
        var blobStream = blob.createWriteStream((0, _extends3.default)({
          metadata: {
            contentType: file.mimetype,
            cacheControl: isPublic ? 'no-cache, max-age=0' : undefined
          }
        }, opts));

        blobStream.on('error', function (err) {
          reject(err);
        });

        blobStream.on('finish', function _callee() {
          var publicUrl;
          return _regenerator2.default.async(function _callee$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!isPublic) {
                    _context4.next = 11;
                    break;
                  }

                  // The public URL can be used to access the file via HTTP
                  // Ex: https://storage.googleapis.com/bucket-name/dir/subDir/file.exe
                  publicUrl = 'https://storage.googleapis.com/' + bucketName + '/' + fileName;

                  // Make the file public
                  // Since the default behavior for newly uploaded file to be private

                  _context4.prev = 2;
                  _context4.next = 5;
                  return _regenerator2.default.awrap(blob.makePublic());

                case 5:
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4['catch'](2);

                  reject(_context4.t0);

                case 10:

                  resolve(publicUrl);

                case 11:
                  resolve();

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, _this, [[2, 7]]);
        });

        blobStream.end(file.buffer);
      });
    }
  }, {
    key: 'deleteFile',
    value: function deleteFile(bucketName, fileName) {
      return _regenerator2.default.async(function deleteFile$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _regenerator2.default.awrap(this.instance.bucket(bucketName).file(fileName).delete());

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'getFile',
    value: function getFile(bucketName, fileName) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _regenerator2.default.async(function getFile$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', this.instance.bucket(bucketName).file(fileName).get(opts));

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, null, this);
    }

    /**
     * @param {String} bucketName // name of the bucket
     * @param {String} fileName // name of the file (contains parent directory ex: parent/file.png)
     * @param {Object} opts {
     *  action: 'read' or 'write',
     *  expires: Date
     * }
     * For more information https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl
     */

  }, {
    key: 'getV4SignedUrl',
    value: function getV4SignedUrl(bucketName, fileName) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var finalOpts, _ref5, _ref6, url;

      return _regenerator2.default.async(function getV4SignedUrl$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              finalOpts = (0, _extends3.default)({
                version: 'v4'
              }, opts);
              _context7.next = 3;
              return _regenerator2.default.awrap(this.instance.bucket(bucketName).file(fileName).getSignedUrl(finalOpts));

            case 3:
              _ref5 = _context7.sent;
              _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
              url = _ref6[0];
              return _context7.abrupt('return', url);

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'deleteFiles',
    value: function deleteFiles(bucketName, prefix) {
      return _regenerator2.default.async(function deleteFiles$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _regenerator2.default.awrap(this.instance.bucket(bucketName).deleteFiles({
                prefix: prefix
              }));

            case 2:
            case 'end':
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);
  return StorageClass;
}();

var writeKeyFile = function _callee2() {
  var keyInfo, data;
  return _regenerator2.default.async(function _callee2$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          keyInfo = {
            type: 'service_account',
            project_id: _config.GCP_STORAGE_PROJECT_ID,
            private_key_id: _config.GCP_STORAGE_PRIVATE_KEY_ID,
            private_key: _config.GCP_STORAGE_PRIVATE_KEY,
            client_email: _config.GCP_STORAGE_CLIENT_EMAIL,
            client_id: _config.GCP_STORAGE_CLIENT_ID,
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: _config.GCP_STORAGE_CLIENT_CERT_URL
          };
          data = (0, _stringify2.default)(keyInfo, null, 2);
          _context9.next = 5;
          return _regenerator2.default.awrap(_fs.promises.writeFile(_config.GCP_STORAGE_FILE_NAME, data.replace(/\\n/g, 'n')));

        case 5:
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9['catch'](0);

          _utils.debug.error('Error occured while write key file from GCP Storage', _context9.t0);

        case 10:
        case 'end':
          return _context9.stop();
      }
    }
  }, null, undefined, [[0, 7]]);
};

var storage = new StorageClass();
exports.default = storage;
module.exports = exports.default;