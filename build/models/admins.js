'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var _utils = require('../src/utils');

var Admin = _db.sequelize.define('admins', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  email: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  password: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  name: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  avatar: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  position: {
    allowNull: false,
    type: _db.Sequelize.STRING,
    defaultValue: _utils.enums.POSITION.ADMIN
  },
  createdAt: {
    allowNull: false,
    type: _db.Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: _db.Sequelize.DATE
  }
}, {});

//hash password before being created on database
Admin.beforeCreate(function (userInstance, optionsObject) {
  userInstance.password = _utils.crypt.hashPassword(userInstance.password);
});

Admin.prototype.validPassword = function (password) {
  return _utils.crypt.comparePassword(password, this.password);
};

Admin.sync({ alter: true }); //create table if not exist

exports.default = Admin;
module.exports = exports.default;