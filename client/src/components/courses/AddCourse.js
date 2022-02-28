import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { registerCourse } from '../../actions/courses';
// import './auth.css';

export default function AddCourse(props) {
  let { id } = useParams();
  if (id) {
    alert(id);
  }
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    section: '',
    semester: '',
  });

  const { code, name, section, semester } = formData;

  async function handleSubmit(e) {
    e.preventDefault();
    const courseRegistrationPromise = await registerCourse(formData).then(
      function (isRegistered) {
        if (isRegistered) {
          alert('Course Created!');
          navigate('/list-courses');
        }
      }
    );
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log into Your Account
        </p>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Course Code:*</p>
            <input
              type='text'
              placeholder='COMP399'
              name='code'
              value={code}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Coures Name:</p>
            <input
              type='text'
              placeholder='Intro to full-stack development'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Course Section:</p>
            <input
              type='text'
              placeholder='003'
              name='section'
              value={section}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <div className='form-group'>
            <p>Semester:</p>
            <input
              type='text'
              placeholder='2'
              name='semester'
              value={semester}
              onChange={(e) => onChange(e)}
            />{' '}
          </div>
          <button type='submit' className='register-button'>
            Register
          </button>
        </form>
        <p>
          <Link to='/list-courses'>View All Courses</Link>
        </p>
      </section>
    </Fragment>
  );
}
