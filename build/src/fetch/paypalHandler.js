'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPayout = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _paypalRestSdk = require('paypal-rest-sdk');

var _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk);

var _config = require('../config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_paypalRestSdk2.default.configure({
  mode: _config.PAYPAL_MODE, //sandbox or live
  client_id: _config.PAYPAL_CLIENT_ID,
  client_secret: _config.PAYPAL_CLIENT_SECRET
});

var createPayout = exports.createPayout = function _callee(instructorEmail, usdAmount) {
  var senderBatchId, createPayoutJson;
  return _regenerator2.default.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          senderBatchId = Math.random().toString(36).substring(9);
          createPayoutJson = {
            sender_batch_header: {
              sender_batch_id: senderBatchId,
              email_subject: 'ITEDU thanh toán học phí'
            },
            items: [{
              recipient_type: 'EMAIL',
              amount: {
                value: usdAmount,
                currency: 'USD'
              },
              receiver: instructorEmail,
              note: 'Cám ơn bạn đã cộng tác với ITEDU.'
            }]
          };
          return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
            //this function is asynchronus so we have to wrap the function in Promise
            var syncMode = 'false';
            _paypalRestSdk2.default.payout.create(createPayoutJson, syncMode, function (error, payout) {
              if (error) {
                reject(error.response);
              } else {
                resolve(payout.httpStatusCode);
              }
            });
          }));

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, null, undefined);
};

exports.default = {
  createPayout: createPayout
};