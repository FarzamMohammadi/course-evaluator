import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getCourseById } from '../../actions/courses';
import { getStudentById } from '../../actions/students';
import './courses.css';

export default function ListAttendees() {
  const [attendees, setAttendees] = useState([]);
  const [courseId, setCourseId] = useState(useParams().id);
  const [executed, setExecuted] = useState(false);
  const [attendeesInfo, setAttendeesInfo] = useState([]);

  async function getAttendeesToShow() {
    const getAttendeesPromise = await getCourseById(courseId).then(function (
      course
    ) {
      if (course && !executed) {
        setAttendees(course.attendees);
        let attendeeInfoArray = [];
        for (const attendee of attendees) {
          getAttendeeInfo(attendee);
        }
      }
      setExecuted(true);
    });
  }

  async function getAttendeeInfo(attendee) {
    const getStudentsPromise = await getStudentById(attendee).then(function (
      student
    ) {
      if (student) {
        setAttendeesInfo((oldArray) => [...oldArray, student]);
      }
    });
  }

  function renderTableData() {
    getAttendeesToShow();
    const arrayToMap = [];
    for (const attendee of attendeesInfo) {
      if (!(attendee in arrayToMap)) {
        arrayToMap.push(attendee);
      }
    }

    return arrayToMap?.map((attendee, index) => {
      const { _id, studentNumber, email } = attendee;
      return (
        <tr key={_id}>
          <td>{studentNumber}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  return (
    <Fragment>
      <section className='container'>
        <div>
          <h1 id='title'>Current Course Attendees:</h1>
          <Link to='/list-courses'>
            <button type='button'>Go Back</button>
          </Link>
          <table id='attendees'>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
}
