"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var convertDurationToHour = function convertDurationToHour(duration) {
  var hours = Math.round(duration / 3600 * 100) / 100;
  return hours;
};

exports.default = {
  convertDurationToHour: convertDurationToHour
};
module.exports = exports.default;