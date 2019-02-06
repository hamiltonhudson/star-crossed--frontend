import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import '../styling/Login.css'
import NewUserForm from './NewUserForm'
import { setUsers, getEmailAndPW, getUser } from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'

class SignUp extends React.Component {
  state = {
    // email: '',
    // password: '',
    first_name: '',
    last_name: ''
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
    // this.props.emailAndPW(this.state)
    console.log(this.state)
    const userObject = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        currentUser: {
          first_name: this.state.first_name,
          last_name: this.state.last_name
        }
      })
    }
    fetch(usersAPI, userObject)
    .then(r => r.json())
    .then(result => this.props.getUser(result))
  }
    // this.props.setCurrentUser(currentUser)
  // }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.dispatch({
  //     type: 'SET_EMAIL_AND_PW',
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
            {/* <label>Email Address:</label>
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
            /> */}
            <label>first:</label>
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder="Enter Email Address"
              onChange={this.handleChange}
            />
            <label>last:</label>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
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
          {this.state.first_name} <br/>
          {this.state.last_name} <br/>
        </div>
        {/* <p>New User Form</p> */}
        {/* <NewUserForm /> */}
      </div>
    )
    // return this.props.currentUser ? <Redirect to='/newuserform' /> : signUp
  }
}

// const mapStateToProps = () => {
//   return {
//     users: state.users.users,
//     currentUser: state.currentUser.currentUser
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // emailAndPW: formData => dispatch({
//     //   type: 'SET_EMAIL_AND_PW',
//     //   payload: formData })
//     getUser: (currentUser) => dispatch(getUser(currentUser))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default connect()(SignUp);
