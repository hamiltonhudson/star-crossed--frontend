import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
import '../styling/Login.css'
import ProfileContainer from './ProfileContainer'
import { setUsers, getUser, findMatches } from '../actions'

//HIT MY REDUCER TO UPDATE THE STORE, WHEN I SUBMIT IT SHOULD
// ALSO FETCH TO USERS & GRAB USER DATA TO UPDATE STATE AND MAKE IT AVAILABLE

const usersAPI = 'http://localhost:3000/api/v1/users/'

class SignIn extends React.Component {
  state = {
    // email: '',
    // password: '',
    first_name: '',
    last_name: '',
    loggedIn: false
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event, this.state)
      fetch('http://localhost:3000/api/v1/users')
      .then(r => r.json())
      .then(data => {
        this.props.setUsers(data)
        const currentUser = this.props.users.find(user => user.first_name.toLowerCase() === this.state.first_name.toLowerCase())
        this.props.getUser(currentUser)
        const matchedUsers = this.props.currentUser.matched_users
        this.props.findMatches(matchedUsers)
        this.setState({
          loggedIn: true
        })
      console.log(this.props.matches)
    })
  }

  render() {
    // return(
    const signInForm =
    <div>
      <div className="login-container">
        <h1 className="signupHeader">Sign In</h1>
        <br/><br/>
        <div className="login-form">
          <form onSubmit={this.handleSubmit}>
            <br/><br/>
            {/* <label className="loginLabel">Email:</label>
              <input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              placeholder="Enter Email Address"
              className="input-field"
              />
              <label className="loginLabel">Password:</label>
              <input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              className="input-field"
            /> */}
            <label className="loginLabel">First:</label>
            <input
              onChange={this.handleChange}
              name="first_name"
              value={this.state.first_name}
              placeholder="Enter first name"
              className="input-field"
            />
            <label className="loginLabel">Last:</label>
            <input
              onChange={this.handleChange}
              name="last_name"
              value={this.state.last_name}
              placeholder="Enter last name"
              className="input-field"
            />
            <br/><br/>
            <input
              type="submit"
              className="signupButton"
            />
            <br/><br/>
          </form>
          <br/><br/>
        </div>
        {/* <ProfileContainer /> */}
      </div>
      {/* <Link to='/profile'>View Profile</Link> */}
    </div>
    // )
    return this.state.loggedIn === true ? <Redirect to="/profile" /> : signInForm
    }
  }

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.currentUser.currentUser,
    matches: state.matches.matches,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    getUser: (currentUser) => dispatch(getUser(currentUser)),
    findMatches: (matchedUsers) => dispatch(findMatches(matchedUsers)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
