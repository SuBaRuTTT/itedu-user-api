'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Feedbacks = _db.sequelize.define('feedbacks', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  userId: {
    type: _db.Sequelize.UUID
  },
  subject: {
    type: _db.Sequelize.TEXT
  },
  content: {
    type: _db.Sequelize.TEXT
  },
  isResolved: {
    type: _db.Sequelize.BOOLEAN,
    defaultValue: false
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

Feedbacks.sync({ alter: true }); //create table if not exist

exports.default = Feedbacks;
module.exports = exports.default;