'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var UsersNoteLessons = _db.sequelize.define('users_note_lessons', {
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
  time: {
    allowNull: false,
    type: _db.Sequelize.DOUBLE
  },
  isDeleted: {
    type: _db.Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
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
UsersNoteLessons.associate = function (models) {
  // associations can be defined here
};

UsersNoteLessons.sync({ alter: true }); //create table if not exist

exports.default = UsersNoteLessons;
module.exports = exports.default;