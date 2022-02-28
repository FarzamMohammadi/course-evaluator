import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { registerCourse } from '../../actions/courses';
// import './auth.css';

export default function ListCourses(props) {
  let navigate = useNavigate();

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
        <p>
          <Link to='/list-courses'>View All Courses</Link>
        </p>
      </section>
    </Fragment>
  );
}
