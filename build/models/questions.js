'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Questions = _db.sequelize.define('questions', {
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
  lessonId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  content: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  likedNumber: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  answerNumber: {
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
Questions.associate = function (models) {
  // associations can be defined here
};

Questions.sync({ alter: true }); //create table if not exist

exports.default = Questions;
module.exports = exports.default;