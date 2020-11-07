'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var _utils = require('../src/utils');

var Reports = _db.sequelize.define('reports', {
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
  courseId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  subject: {
    allowNull: true,
    type: _db.Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: _db.Sequelize.TEXT
  },
  status: {
    allowNull: false,
    type: _db.Sequelize.STRING,
    defaultValue: _utils.enums.REPORT_STATUS.PENDING
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

Reports.sync({ alter: true }); //create table if not exist

exports.default = Reports;
module.exports = exports.default;