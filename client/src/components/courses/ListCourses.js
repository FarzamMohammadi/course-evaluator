import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getCourses, addAsAttendee } from '../../actions/courses';
// import './auth.css';

export default function Courses() {
  const [courses, setCourses] = useState();
  const [executed, setExecuted] = useState(false);

  async function getCoursesToShow() {
    const getCoursesPromise = await getCourses().then(function (courses) {
      if (courses && !executed) {
        setCourses(courses);
        setExecuted(true);
        console.log(courses);
      }
    });
  }

  async function addStudent(courseId) {
    const addAsAttendeePromise = await addAsAttendee(courseId).then(function (
      isAdded
    ) {
      if (isAdded) {
        alert("You've been added to this course");
      }
    });
  }

  function renderTableData() {
    getCoursesToShow();
    return courses?.map((course, index) => {
      const { _id, name, code, section, semester } = course;
      return (
        <tr key={_id}>
          <td>{name}</td>
          <td>{code}</td>
          <td>{section}</td>
          <td>{semester}</td>
          <Link to={`/course/${_id}`}>
            <button type='button'>Update</button>
          </Link>
          <button type='button' onClick={() => addStudent(_id)}>
            Add As Attendee
          </button>
          <Link to='/dashboard'>
            <button type='button'>List Attendees</button>
          </Link>
          <Link to={`/add-course/${_id}`}>
            <button type='button'>Drop</button>
          </Link>
        </tr>
      );
    });
  }

  return (
    <Fragment>
      <section className='container'>
        <div>
          <h1 id='title'>List of All Registered Courses:</h1>
          <Link to='/course'>
            <button type='button'>Add New Course</button>
          </Link>
          <table id='courses'>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
}
