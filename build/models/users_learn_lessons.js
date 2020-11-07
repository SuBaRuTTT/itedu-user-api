/* eslint-disable babel/new-cap */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var UsersLearnLessons = _db.sequelize.define('users_learn_lessons', {
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
  lessonId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  currentTime: { // save currentTime to remind user and suggest continue play at this time
    type: _db.Sequelize.DOUBLE
  },
  learnedTime: {
    allowNull: false,
    type: _db.Sequelize.DATE
  },
  isFinish: {
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

UsersLearnLessons.sync({ alter: true }); //create table if not exist

exports.default = UsersLearnLessons;
module.exports = exports.default;