import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import '../styling/Login.css'
import NewUserForm from './NewUserForm'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.emailAndPW(this.state)
    // this.props.setCurrentUser(userObject)
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.dispatch({
  //     type: 'ADD_EMAIL_AND_PW',
  //     payload: this.state
  //   });
  // };


  render () {
    // const signUpForm =
    return (
      <div className="login-container">
        <h1 className="signupHeader">Sign Up</h1>
        <br/><br/>
        <div className="login">
          <form onSubmit={event => this.handleSubmit(event)}>
            <label>Email Address:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Enter Email Address"
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              onChange={this.handleChange}
            />
            <input className="login-button"
              type="submit"
              placeholder="Submit"
              // onClick={this.props.handleClick}
            />
          </form>
          <br/><br/>
          {this.state.email} <br/>
          {this.state.password} <br/>
        </div>
        {/* <p>New User Form</p> */}
        {/* <NewUserForm /> */}
      </div>
    )
    // return this.props.currentUser ? <Redirect to='/newuserform' /> : signUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    emailAndPW: formData => dispatch({
      type: 'ADD_EMAIL_AND_PW',
      payload: formData })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);

// export default connect()(SignUp);
