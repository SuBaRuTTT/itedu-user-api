'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var UsersRateCourses = _db.sequelize.define('users_rate_courses', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  userId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  courseId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  formalityPoint: {
    allowNull: false,
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  contentPoint: {
    allowNull: false,
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  presentationPoint: {
    allowNull: false,
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  content: {
    allowNull: false,
    type: _db.Sequelize.TEXT
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
UsersRateCourses.associate = function (models) {
  // associations can be defined here
};

UsersRateCourses.sync({ alter: true }); //create table if not exist

exports.default = UsersRateCourses;
module.exports = exports.default;