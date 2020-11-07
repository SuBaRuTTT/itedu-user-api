'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequelize = exports.sequelize = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAMESPACE = 'DATABASE-' + _moment2.default.utc().toISOString();
//connect postgreSQL with sequelize
var dbConnectionString = 'postgres://' + _config.DB_USERNAME + ':' + _config.DB_PASSWORD + '@' + _config.DB_HOST + ':' + _config.DB_PORT + '/' + _config.DB_NAME;
var sequelize = new _sequelize2.default(dbConnectionString, {
  logging: false
});

sequelize.authenticate().then(function () {
  _utils.debug.log(NAMESPACE, 'PostgreSQL connection has been established successfully.');
}).catch(function (err) {
  _utils.debug.error(NAMESPACE, 'Unable to connect to the database:', err);
});

exports.sequelize = sequelize;
exports.Sequelize = _sequelize2.default;