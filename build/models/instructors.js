/* eslint-disable babel/new-cap */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Instructors = _db.sequelize.define('instructors', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  userId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  major: {
    type: _db.Sequelize.STRING
  },
  intro: {
    type: _db.Sequelize.TEXT
  },
  skills: {
    type: _db.Sequelize.ARRAY(_db.Sequelize.STRING),
    defaultValue: []
  },
  cumulativeTuition: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
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

Instructors.associate = function (models) {
  // associations can be defined here
};

Instructors.sync({ alter: true }); //create table if not exist

exports.default = Instructors;
module.exports = exports.default;