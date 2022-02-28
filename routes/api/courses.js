const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Course = require('../../models/Course');
const Student = require('../../models/Student');

// @route   GET api/courses
// @desc    Get all registered courses
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const courseList = await Course.find();
    res.status(200).json({ courses: courseList });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/courses/:id
// @desc    Get all registered courses
// @access  private
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({ course: course });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses
// @desc    Creates new course
// @access  private
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

// @route   PUT api/courses/:id
// @desc    Edits course
// @access  private
router.put(
  '/:id',
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
      course = await Course.findOneAndUpdate(
        { _id: req.params.id },
        { new: true }
      );
      course.code = code;
      course.name = name;
      course.section = section;
      course.semester = semester;
      course.save();
      return res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/courses/:id/addstudent
// @desc    Add new current user to course (if they don't already exist)
// @access  private
router.put('/:id/addstudent', auth, async (req, res) => {
  try {
    const attendeeToAdd = await Student.findById(req.user.id);
    const courseToUpdate = await Course.findById(req.params.id);
    const currentAttendees = courseToUpdate.attendees;
    var currentIds = currentAttendees.map(function (attendee) {
      return attendee.id;
    });
    const attendeeExists = currentIds.includes(attendeeToAdd.id);
    // If user is not already an attendee in DB record
    if (!attendeeExists) {
      course = await Course.findOneAndUpdate(
        { _id: req.params.id },
        { new: true }
      );
      course.attendees.unshift(attendeeToAdd);
      await course.save();
      return res.json(course);
    } else {
      res.status(400).json({ msg: 'You are already an attendee' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/courses/:id
// @desc    Edits course
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    course = await Course.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: 'Course deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
