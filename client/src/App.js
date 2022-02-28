import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddCourse from './components/courses/AddCourse';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

function setAuth() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
}

export default class App extends Component {
  constructor() {
    super(setAuth());

    this.state = {
      isAuthenticated: false,
      token: '',
    };
    this.handleAuthenticationChange =
      this.handleAuthenticationChange.bind(this);
  }
  handleAuthenticationChange = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };
  handleTokenChange = (token) => {
    this.setState({ token });
  };

  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Login
                isAuthenticated={this.state.isAuthenticated}
                token={this.state.token}
                onIsAuthChange={this.handleAuthenticationChange}
                onTokenChange={this.handleTokenChange}
              />
            }
          />
          <Route
            exact
            path='/register'
            element={<Register isAuthenticated={this.state.isAuthenticated} />}
          />
          <Route exact path='/add-course'>
            <Route
              path=':id'
              element={
                <AddCourse isAuthenticated={this.state.isAuthenticated} />
              }
            />
            <Route
              path=''
              element={
                <AddCourse isAuthenticated={this.state.isAuthenticated} />
              }
            />
          </Route>
        </Routes>
      </Router>
    );
  }
}
