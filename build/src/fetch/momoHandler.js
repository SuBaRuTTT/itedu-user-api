'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDataIntegrity = exports.getMoMoPaymentUrl = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('../utils');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestId = void 0;
var orderId = void 0;

var createSignature = function createSignature(courseInfo, userId) {
  //momo will return error if orderId in every request is the same
  //assign here so requestId and orderId will be changed after each request
  requestId = (0, _v2.default)();
  orderId = (0, _v2.default)();

  var orderInfo = 'Thanh toán khóa học';
  var extraData = userId + ' mua khoa hoc ' + courseInfo.id;

  var rawSignature = 'partnerCode=' + _config.MOMO_PARTNER_CODE + '&accessKey=' + _config.MOMO_ACCESS_KEY + '&requestId=' + requestId + '&amount=' + String(courseInfo.price) + '&orderId=' + orderId + '&orderInfo=' + orderInfo + '&returnUrl=' + _config.MOMO_RETURN_URL + '&notifyUrl=' + _config.MOMO_NOTIFY_URL + '&extraData=' + extraData;

  var signature = _crypto2.default.createHmac('sha256', _config.MOMO_SECRET_KEY).update(rawSignature).digest('hex');

  return signature;
};

var createRequestBody = function createRequestBody(courseInfo, userId) {
  var signature = createSignature(courseInfo, userId);
  //cant pass full course title here cause there will be an error with queries when momo responses
  var orderInfo = 'Thanh toán khóa học';
  var extraData = userId + ' mua khoa hoc ' + courseInfo.id;

  var body = (0, _stringify2.default)({
    partnerCode: _config.MOMO_PARTNER_CODE,
    accessKey: _config.MOMO_ACCESS_KEY,
    requestId: requestId,
    amount: String(courseInfo.price),
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: _config.MOMO_RETURN_URL,
    notifyUrl: _config.MOMO_NOTIFY_URL,
    //hide userid and courseid in extraData cause extraData will not be displayed
    extraData: extraData,
    requestType: 'captureMoMoWallet',
    signature: signature
  });

  return body;
};

var getMoMoPaymentUrl = exports.getMoMoPaymentUrl = function _callee(courseInfo, userId) {
  var reqBody;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reqBody = createRequestBody(courseInfo, userId);
          return _context.abrupt('return', (0, _axios2.default)({
            method: 'post',
            url: 'https://test-payment.momo.vn/gw_payment/transactionProcessor',
            data: reqBody
          }).then(function (response) {
            return response.data.payUrl;
          }).catch(function (err) {
            _utils.debug.error('Error occured when requesting MoMo API', err.message);
          }));

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

var checkDataIntegrity = exports.checkDataIntegrity = function _callee2(momoParams) {
  var signatureInMoMoParams, rawSignature, signature;
  return _regenerator2.default.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          signatureInMoMoParams = momoParams.signature;
          rawSignature = 'partnerCode=' + momoParams.partnerCode + '&accessKey=' + momoParams.accessKey + '&requestId=' + momoParams.requestId + '&amount=' + momoParams.amount + '&orderId=' + momoParams.orderId + '&orderInfo=' + momoParams.orderInfo + '&orderType=' + momoParams.orderType + '&transId=' + momoParams.transId + '&message=' + momoParams.message + '&localMessage=' + momoParams.localMessage + '&responseTime=' + momoParams.responseTime + '&errorCode=' + momoParams.errorCode + '&payType=' + momoParams.payType + '&extraData=' + momoParams.extraData;
          signature = _crypto2.default.createHmac('sha256', _config.MOMO_SECRET_KEY).update(rawSignature).digest('hex');

          if (!(signature === signatureInMoMoParams)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt('return', true);

        case 7:
          return _context2.abrupt('return', false);

        case 8:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, undefined);
};

exports.default = {
  getMoMoPaymentUrl: getMoMoPaymentUrl,
  checkDataIntegrity: checkDataIntegrity
};