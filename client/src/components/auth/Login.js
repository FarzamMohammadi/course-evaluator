import React, { useState, Component, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import './auth.css';

export default function Login(props) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const { password, email } = formData;

  function handleSubmit(e) {
    e.preventDefault();
    const value = login(formData);
    // navigate('/courses');
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <section className='container'>
        <h1>Login</h1>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <p>Email:</p>
            <input
              type='email'
              placeholder='hello@courseeval.com'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>Password:</p>
            <input
              type='password'
              placeholder=''
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type='submit' className='login-button'>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </section>
    </Fragment>
  );
}
