const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Student = mongoose.model('student', StudentSchema);
