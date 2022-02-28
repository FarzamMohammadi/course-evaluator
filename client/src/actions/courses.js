import axios from 'axios';

const isLoggedIn = axios.defaults.headers.common['x-auth-token'];

// Register Course
export const registerCourse = async function (fromData) {
  try {
    console.log(axios.defaults.headers.common['x-auth-token']);

    const res = await axios.post('/api/courses', fromData);
    return true;
  } catch (error) {
    if (isLoggedIn) {
      alert('Could not register course');
    } else {
      alert('Need to log in first');
    }
  }
};

// Get List of Courses
export const getCourses = async function (fromData) {
  try {
    console.log(axios.defaults.headers.common['x-auth-token']);

    const res = await axios.post('/api/courses', fromData);
    return true;
  } catch (error) {
    if (isLoggedIn) {
      alert('Could not get the list of courses');
    } else {
      alert('Need to log in first');
    }
  }
};
