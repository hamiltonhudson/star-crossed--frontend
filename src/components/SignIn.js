import React from 'react';
// import { Redirect } from 'react-router-dom';
import '../styling/Login.css'
import ProfileContainer from './ProfileContainer'

class SignIn extends React.Component {
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


  render() {
    return(
      // const newUserForm =
      <div>
        <h1 className="login-header">Sign Into Account w/ Profile Details</h1>
        <div className="login-form">
          <div>
            <form>
              <input
                // first_name="First Name"
                name='first_name'
                placeholder='First Name'
              />
              <input
                name='last_name'
                placeholder='Last Name'
              />
              <input
                name='birth_year'
                placeholder='Birth Year'
              />
              <input
                name='birth_month'
                placeholder='Birth Month'
              />
              <input
                name='birth_month'
                placeholder='Birth Day'
              />
              <input className="submit-button"
                type="submit"
                classNam="Birth Day"
              />
            </form>
          </div>
          {/* <ProfileContainer /> */}
        </div>
      </div>
    )
  }
}

export default SignIn;
