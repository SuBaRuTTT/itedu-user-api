/* eslint-disable babel/new-cap */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var _utils = require('../src/utils');

var Users = _db.sequelize.define('users', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  email: {
    type: _db.Sequelize.STRING
  },
  password: {
    type: _db.Sequelize.STRING
  },
  avatar: {
    type: _db.Sequelize.STRING
  },
  name: {
    type: _db.Sequelize.STRING
  },
  favoriteCategories: {
    type: _db.Sequelize.ARRAY(_db.Sequelize.STRING)
  },
  point: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  phone: {
    type: _db.Sequelize.STRING
  },
  type: {
    type: _db.Sequelize.STRING,
    defaultValue: _utils.enums.USER_TYPE.STUDENT
  },
  facebookId: {
    type: _db.Sequelize.STRING,
    allowNULL: true
  },
  googleId: {
    type: _db.Sequelize.STRING,
    allowNULL: true
  },
  isDeleted: {
    type: _db.Sequelize.BOOLEAN,
    defaultValue: false
  },
  isActivated: {
    type: _db.Sequelize.BOOLEAN,
    defaultValue: false
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
Users.beforeCreate(function (userInstance, optionsObject) {
  userInstance.password = _utils.crypt.hashPassword(userInstance.password);
});

Users.prototype.validPassword = function (password) {
  return _utils.crypt.comparePassword(password, this.password);
};

Users.sync({ alter: true }); //create table if not exist

exports.default = Users;
module.exports = exports.default;