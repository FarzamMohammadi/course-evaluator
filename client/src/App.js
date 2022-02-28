import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
    };
    this.handleAuthenticationChange =
      this.handleAuthenticationChange.bind(this);
  }
  handleAuthenticationChange = (email) => {
    this.setState({ email });
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
                onIsAuthChange={this.handleAuthenticationChange}
              />
            }
          />
          <Route
            exact
            path='/register'
            element={<Register isAuthenticated={this.state.isAuthenticated} />}
          />
        </Routes>
      </Router>
    );
  }
}
