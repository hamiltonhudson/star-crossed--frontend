import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import '../styling/Login.css'
import NewUser from './NewUser'
import { getEmailAndPW } from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    validated: false
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    // const userObject = {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     // credentials: {
    //       email: this.state.email,
    //       password: this.state.password,
    //     // }
    //   })
    // }
    // fetch(usersAPI, userObject)
    // .then(r => r.json())
    // .then(result => this.props.getEmailAndPW(result))
    this.props.getEmailAndPW(this.state)
      this.setState({
        validated: true
      })
    }


  render () {
    console.log(this.props.email, this.props.password)
    const signUpForm =
    // return (
      <div className="login-container">
        <h1 className="signupHeader">Sign Up</h1>
        <br/><br/>
        <div className="login-form">
          <form onSubmit={event => this.handleSubmit(event)}>
            <br/><br/>
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter Email Address"
              onChange={this.handleChange}
              className="input-field"
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              onChange={this.handleChange}
              className="input-field"
            />
            {/* <label>first:</label>
              <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder="Enter Email Address"
              onChange={this.handleChange}
              className="input-field"
              />
              <label>last:</label>
              <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder="Enter Password"
              onChange={this.handleChange}
              className="input-field"
            /> */}
            <br/><br/>
            <input className="login-button"
              type="submit"
              placeholder="Submit"
            />
            <br/><br/>
          </form>
        </div>
      </div>
    // )
    return this.state.validated === true ? <Redirect to='/newuser' /> : signUpForm
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email.email,
    password: state.password.password,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmailAndPW: (email, password) => dispatch(getEmailAndPW(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default connect(null, mapDispatchToProps)(SignUp);
