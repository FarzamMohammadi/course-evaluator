const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Course = require('../../models/Course');
const Student = require('../../models/Student');

router.get('/', auth, async (res, next) => {
  try {
    const courseList = await Course.find();
    res.status(200).json({ courses: courseList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [
    auth,
    check('name', 'Coruse name is required').not().isEmpty(),
    check('code', 'Coruse code is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { code, name, section, semester } = req.body;
      const attendees = await Student.findById(req.user.id);
      const newCourse = new Course({
        code: code,
        name: name,
        section: section,
        semester: semester,
        attendees: attendees,
      });
      const course = await newCourse.save();
      res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
