import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import '../styling/Form.css'
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
    event.preventDefault()
    this.props.getEmailAndPW(this.state)
      this.setState({
        validated: true
      })
    }


  render () {
    console.log(this.props.email, this.props.password)
    const signUpForm =
    // return (
      <div className="form-container">
        <h1 className="signupHeader">sign up</h1>
        <br/><br/>
        <div className="form">
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
            <br/><br/>
            <input className="form-button"
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
