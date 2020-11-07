'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var CoursesCategories = _db.sequelize.define('courses_categories', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  courseId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'categories',
      key: 'id'
    }
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

CoursesCategories.sync({ alter: true }); //create table if not exist

exports.default = CoursesCategories;
module.exports = exports.default;