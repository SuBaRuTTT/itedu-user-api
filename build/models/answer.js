'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var Answers = _db.sequelize.define('answer', {
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
  questionId: {
    type: _db.Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'questions',
      key: 'id'
    }
  },
  content: {
    allowNull: false,
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
Answers.associate = function (models) {
  // associations can be defined here
};

Answers.sync({ alter: true }); //create table if not exist

exports.default = Answers;
module.exports = exports.default;