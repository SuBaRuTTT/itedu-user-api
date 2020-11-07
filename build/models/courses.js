/* eslint-disable babel/new-cap */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../src/db');

var _utils = require('../src/utils');

var Courses = _db.sequelize.define('courses', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: _db.Sequelize.UUID
  },
  title: {
    type: _db.Sequelize.STRING
  },
  subtitle: {
    type: _db.Sequelize.STRING
  },
  price: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  description: {
    type: _db.Sequelize.STRING
  },
  requirement: {
    type: _db.Sequelize.ARRAY(_db.Sequelize.STRING),
    defaultValue: []
  },
  learnWhat: {
    type: _db.Sequelize.ARRAY(_db.Sequelize.STRING),
    defaultValue: []
  },
  soldNumber: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  ratedNumber: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  videoNumber: {
    type: _db.Sequelize.INTEGER,
    defaultValue: 0
  },
  totalHours: {
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  // điểm hình thức
  formalityPoint: {
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  // điểm nội dung
  contentPoint: {
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  // điểm truyền đạt
  presentationPoint: {
    type: _db.Sequelize.DOUBLE,
    defaultValue: 0
  },
  imageUrl: {
    type: _db.Sequelize.STRING
  },
  promoVidUrl: {
    type: _db.Sequelize.STRING
  },
  status: {
    type: _db.Sequelize.STRING,
    defaultValue: _utils.enums.COURSE_STATUS.PENDING
  },
  isHidden: {
    type: _db.Sequelize.BOOLEAN,
    defaultValue: false
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
  },
  instructorId: {
    allowNull: false,
    type: _db.Sequelize.UUID,
    references: {
      model: 'instructors',
      key: 'id'
    }
  }
}, {});

Courses.sync({ alter: true }); //create table if not exist

exports.default = Courses;
module.exports = exports.default;