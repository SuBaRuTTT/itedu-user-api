'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Sections = _db.sequelize.define('sections', {
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
  numberOrder: {
    type: _db.Sequelize.INTEGER
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

Sections.sync({ alter: true }); //create table if not exist

exports.default = Sections;
module.exports = exports.default;