'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var UsersLikeLessons = _db.sequelize.define('users_like_questions', {
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
  isActive: {
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
UsersLikeLessons.associate = function (models) {
  // associations can be defined here
};

UsersLikeLessons.sync({ alter: true }); //create table if not exist

exports.default = UsersLikeLessons;
module.exports = exports.default;