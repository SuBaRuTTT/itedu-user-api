'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var UsersOwnCourses = _db.sequelize.define('users_own_courses', {
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
  paymentMethod: {
    type: _db.Sequelize.STRING
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

UsersOwnCourses.sync({ alter: true }); //create table if not exist

exports.default = UsersOwnCourses;
module.exports = exports.default;