import React from 'react';
import { Redirect } from 'react-router-dom';
import '../styling/Login.css'
import SignIn from './SignIn'

class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    birth_year: '',
    birth_month: '',
    brth_day: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render () {
    return (
      <div>
        <h1 className="login-header">Sign Up</h1>
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
        {/* <SignIn /> */}
      </div>
    )
  }
}

export default SignUp;
