import React from 'react';
// import { Redirect } from 'react-router-dom';
import '../styling/Login.css'
import ProfileContainer from './ProfileContainer'

class Login extends React.Component {
  render () {
    return (
      <div>
        <h1 className="login-header">Login</h1>
        <div className="login-form">
          <form>
            <input
              name="email"
              placeholder="Email Address"
            />
            <input
              name="password"
              placeholder="Password"
            />
            <input className="login-button"
              type="submit"
              placeholder="Submit"
            />
          </form>
        </div>
        {/* <ProfileContainer /> */}
      </div>
    )
  }
}

export default Login;
