/**
 * Attendance Model
 */

// Dependencies
const { Schema, model } = require('mongoose');

// Attendance Schema
const AttendanceSchema = new Schema({});

// Attendance Model
const Attendance = model('Attendance', AttendanceSchema);

// Exporting Attendance
module.exports = Attendance;
