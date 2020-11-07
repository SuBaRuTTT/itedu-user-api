'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Resources = _db.sequelize.define('resources', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  lessonId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  name: {
    type: _db.Sequelize.STRING
  },
  url: {
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

Resources.sync({ alter: true }); //create table if not exist

exports.default = Resources;
module.exports = exports.default;