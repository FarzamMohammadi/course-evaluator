const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Student = require('../../models/Student');

// @route   POST api/students
// @desc    register students
// @access  public
router.post(
  '/',
  [
    check('studentNumber', 'Student number is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be longer than 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      studentNumber,
      fname,
      lname,
      email,
      password,
      address,
      city,
      phoneNumber,
      program,
    } = req.body;

    try {
      let student = await Student.findOne({ email });

      if (student) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Student already exits' }] });
      }

      student = new Student({
        studentNumber,
        fname,
        lname,
        email,
        password,
        address,
        city,
        phoneNumber,
        program,
      });

      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(password, salt);

      await student.save();

      const payload = {
        student: {
          id: student.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
