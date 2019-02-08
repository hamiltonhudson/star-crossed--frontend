import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
import '../styling/Form.css'
import ProfileContainer from './ProfileContainer'
import { setUsers, getUser, findMatches } from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'
// const retrieveMatches = 'users/:id/user_matches'

class SignIn extends React.Component {
  state = {
    // email: '',
    // password: '',
    first_name: '',
    last_name: '',
    loggedIn: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
      fetch(usersAPI)
      .then(r => r.json())
      .then(data => {
        this.props.setUsers(data)
        const userDetails = this.props.users.find(user => user.first_name.toLowerCase() === this.state.first_name.toLowerCase())
        this.props.getUser(userDetails)
        // const matchedUsers = this.props.currentUser.matched_users
        // this.props.findMatches(matchedUsers)
        this.setState({
          loggedIn: true
      })
    })
//     fetch(`users/${this.props.currentUser.id}/user_matches/`)
//     .then(r => r.json())
// // debugger
//   .then(updatedMatches => {
//     this.props.findMatches(updatedMatches)
//   })
}

  render() {
    // return(
    const signInForm =
    <div>
      <div className="form-container">
        <h1 className="signupHeader">sign in</h1>
        <br/><br/>
        <div className="form">
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
      </div>
    </div>
    // )
    return this.state.loggedIn === true ? <Redirect to="/profile" /> : signInForm
    }
  }

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    currentUser: state.userDetails.userDetails,
    matches: state.matches.matches,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    getUser: (userDetails) => dispatch(getUser(userDetails)),
    findMatches: (matchedUsers) => dispatch(findMatches(matchedUsers)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
