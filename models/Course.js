const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  attendees: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
});

module.exports = Course = mongoose.model('course', CourseSchema);
