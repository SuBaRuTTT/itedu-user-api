'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Categories = _db.sequelize.define('categories', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  name: {
    type: _db.Sequelize.STRING
  },
  isDeleted: {
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

Categories.associate = function (models) {
  // associations can be defined here

};

Categories.sync({ alter: true }); //create table if not exist

exports.default = Categories;
module.exports = exports.default;