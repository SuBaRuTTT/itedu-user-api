'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Lessons = _db.sequelize.define('lessons', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  courseId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  sectionId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'sections',
      key: 'id'
    }
  },
  numberOrder: {
    type: _db.Sequelize.INTEGER
  },
  name: {
    type: _db.Sequelize.STRING
  },
  content: {
    type: _db.Sequelize.STRING
  },
  videoName: {
    type: _db.Sequelize.STRING
  },
  captionName: {
    type: _db.Sequelize.STRING
  },
  hours: {
    type: _db.Sequelize.DOUBLE,
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

Lessons.sync({ alter: true }); //create table if not exist

exports.default = Lessons;
module.exports = exports.default;