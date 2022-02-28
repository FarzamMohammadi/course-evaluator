import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = async function () {
  if (localStorage.token) {
    console.log('THIS IS THE TOKEN!!');
    console.log(localStorage.token);
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

// Register User
export const register = async function ({ name, email, password }) {
  const body = { name, email, password };
  try {
    const res = await axios.post('http://localhost:5000/api/users', body);
  } catch (error) {}
};

// Login User
export const login = async function (fromData) {
  console.log(fromData);
  try {
    const res = await axios.get('/api/students', fromData);
    console.log(res);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

// Logout / Clear Profile
export const logout = () => (isAuthenticated) => {};
