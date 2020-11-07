'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _instructors = require('./instructors');

var _instructors2 = _interopRequireDefault(_instructors);

var _courses = require('./courses');

var _courses2 = _interopRequireDefault(_courses);

var _users_own_courses = require('./users_own_courses');

var _users_own_courses2 = _interopRequireDefault(_users_own_courses);

var _users_like_courses = require('./users_like_courses');

var _users_like_courses2 = _interopRequireDefault(_users_like_courses);

var _lessons = require('./lessons');

var _lessons2 = _interopRequireDefault(_lessons);

var _sections = require('./sections');

var _sections2 = _interopRequireDefault(_sections);

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

var _users_learn_lessons = require('./users_learn_lessons');

var _users_learn_lessons2 = _interopRequireDefault(_users_learn_lessons);

var _users_note_lessons = require('./users_note_lessons');

var _users_note_lessons2 = _interopRequireDefault(_users_note_lessons);

var _users_rate_courses = require('./users_rate_courses');

var _users_rate_courses2 = _interopRequireDefault(_users_rate_courses);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

var _answers = require('./answers');

var _answers2 = _interopRequireDefault(_answers);

var _users_like_questions = require('./users_like_questions');

var _users_like_questions2 = _interopRequireDefault(_users_like_questions);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _courses_categories = require('./courses_categories');

var _courses_categories2 = _interopRequireDefault(_courses_categories);

var _reports = require('./reports');

var _reports2 = _interopRequireDefault(_reports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create association for all models
_instructors2.default.belongsTo(_users2.default, { foreignKey: 'userId' });
_instructors2.default.hasMany(_courses2.default, { foreignKey: 'instructorId' });

_users2.default.hasOne(_instructors2.default, { foreignKey: 'userId' });
_users2.default.belongsToMany(_courses2.default, { through: _users_own_courses2.default, foreignKey: 'userId' });

_users_like_courses2.default.belongsTo(_users2.default, { foreignKey: 'userId' });
_users_like_courses2.default.belongsTo(_courses2.default, { foreignKey: 'courseId' });

_courses2.default.belongsToMany(_users2.default, { through: _users_own_courses2.default, as: 'ownedUser', foreignKey: 'courseId' });
_courses2.default.belongsToMany(_users2.default, { through: _users_like_courses2.default, as: 'likedUser', foreignKey: 'courseId' });
_courses2.default.hasMany(_lessons2.default, { foreignKey: 'courseId' });
_courses2.default.hasMany(_sections2.default, { foreignKey: 'courseId' });
_courses2.default.belongsTo(_instructors2.default, { foreignKey: 'instructorId' });
_courses2.default.belongsToMany(_categories2.default, { through: _courses_categories2.default, foreignKey: 'courseId' });
_courses2.default.hasMany(_courses_categories2.default, { as: 'course_category', foreignKey: 'courseId' });

_categories2.default.belongsToMany(_courses2.default, { through: _courses_categories2.default, foreignKey: 'categoryId' });

_sections2.default.hasMany(_lessons2.default, { foreignKey: 'sectionId' });
_sections2.default.belongsTo(_courses2.default, { foreignKey: 'courseId' });

_resources2.default.belongsTo(_lessons2.default, { foreignKey: 'lessonId' });

_lessons2.default.belongsTo(_courses2.default, { foreignKey: 'courseId' });
_lessons2.default.belongsTo(_sections2.default, { foreignKey: 'sectionId' });
_lessons2.default.hasMany(_resources2.default, { foreignKey: 'lessonId' });
_lessons2.default.hasMany(_users_learn_lessons2.default, { foreignKey: 'lessonId' });
_lessons2.default.hasMany(_users_note_lessons2.default, { foreignKey: 'lessonId' });

_users_learn_lessons2.default.belongsTo(_lessons2.default, { foreignKey: 'lessonId' });

_users_note_lessons2.default.belongsTo(_lessons2.default, { foreignKey: 'lessonId' });
_users_note_lessons2.default.belongsTo(_users2.default, { foreignKey: 'userId' });

_users_rate_courses2.default.belongsTo(_users2.default, { foreignKey: 'userId' });
_users_rate_courses2.default.belongsTo(_courses2.default, { foreignKey: 'courseId' });

_users_like_questions2.default.belongsTo(_questions2.default, { foreignKey: 'questionId' });

_questions2.default.belongsTo(_lessons2.default, { foreignKey: 'lessonId' });
_questions2.default.belongsTo(_users2.default, { foreignKey: 'userId' });
_questions2.default.hasMany(_answers2.default, { foreignKey: 'questionId' });
_questions2.default.hasMany(_users_like_questions2.default, { foreignKey: 'questionId' });

_answers2.default.belongsTo(_questions2.default, { foreignKey: 'questionId' });
_answers2.default.belongsTo(_users2.default, { foreignKey: 'userId' });

_questions2.default.belongsTo(_users2.default, { foreignKey: 'userId' });
_questions2.default.belongsTo(_lessons2.default, { foreignKey: 'lessonId' });
_lessons2.default.hasMany(_questions2.default, { foreignKey: 'lessonId' });

_users2.default.hasMany(_users_learn_lessons2.default, { foreignKey: 'userId' });

_users2.default.hasMany(_reports2.default, { foreignKey: 'userId' });
_courses2.default.hasMany(_reports2.default, { foreignKey: 'courseId' });
// Users.belongsToMany(
//   Lessons,
//   {
//     through: UsersLearnLessons,
//     as: 'learn',
//     foreignKey: 'userId'
//   })
// Lessons.belongsToMany(
//   Users,
//   {
//     through: UsersLearnLessons,
//     as: 'learnLesson',
//     foreignKey: 'lessonId'
//   })

exports.default = {
  Users: _users2.default,
  Courses: _courses2.default,
  UsersLikeCourses: _users_like_courses2.default,
  Instructors: _instructors2.default,
  UsersOwnCourses: _users_own_courses2.default,
  Lessons: _lessons2.default,
  Sections: _sections2.default,
  Resources: _resources2.default,
  UsersLearnLessons: _users_learn_lessons2.default,
  UsersNoteLessons: _users_note_lessons2.default,
  UsersRateCourses: _users_rate_courses2.default,
  UsersLikeQuestions: _users_like_questions2.default,
  Questions: _questions2.default,
  Answers: _answers2.default,
  Categories: _categories2.default,
  CoursesCategories: _courses_categories2.default,
  Reports: _reports2.default
};
module.exports = exports.default;