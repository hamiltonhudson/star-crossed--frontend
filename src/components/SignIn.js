import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
import '../styling/Form.css'
import ProfileContainer from './ProfileContainer'
import { setUsers, setCurrentUser, findMatches } from '../actions'

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
        const userDetails = data.find(d => d.first_name.toLowerCase() === this.state.first_name.toLowerCase())
        this.props.setUsers(data)
        this.props.setCurrentUser(userDetails)
        this.props.findMatches(userDetails.matched_users)
        this.setState({
          loggedIn: true
        })
      })
    }

  render() {
    // return(
    // console.log(this.props)
    const signInForm =
    <div>
      {/* <Link to='/'> Back </Link> */}
      <Link to='/' className="form-link"> ◁ Back </Link>
      <div className="form-container">
        <h1 className="signupHeader">sign in</h1>
        <br/><br/>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <br/>
            {/* <label className="loginLabel">Email:</label>
              <input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              placeholder="Enter Email Address"
              className="input"
              />
              <label className="loginLabel">Password:</label>
              <input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              placeholder="Enter Password"
              className="input"
            /> */}
            <label className="loginLabel">First:</label>
            <input
              className="input"
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
            <label className="loginLabel">Last:</label>
            <input
              className="input"
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
            <br/><br/>
            <input
              type="submit"
              className="submit-button"
              // placeholder="Submit"
                // className="signupButton"
            />
            <br/><br/>
          </form>
        </div>
      </div>
    </div>
    // )
    return this.state.loggedIn === true ? <Redirect to="/profile" /> : signInForm
    }
  }

// const mapStateToProps = (state) => {
//   return {
//     userDetails: state.users.userDetails,
//     users: state.users.users,
//     //state.users represents the whole object of 'initial state' in userReducer
//     //whatever you call on state.users here has to exist as a key in 'initial state' of userReducer
//     //key of users here just represent this prop, as long as it matches what you call in your app
//     matches: state.matches.matches,
//     currentUser: state.users.currentUser,
//       // userId: state.userId.userId,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    findMatches: (matchedUsers) => dispatch(findMatches(matchedUsers))
  }
}

export default connect(null, mapDispatchToProps)(SignIn);

// const userId = userDetails.id
// this.props.setUserId(userId)
// const currentUser = this.props.users.find(user => user.first_name.toLowerCase() === this.state.first_name.toLowerCase())
// this.props.setCurrentUser(this.props.users.find(user => user.first_name.toLowerCase() === this.state.first_name.toLowerCase()))
// this.props.getUser(userDetails)
// const currentUser = userDetails
// const matchedUsers = userDetails.matched_users
// this.props.findMatches(matchedUsers)

//     fetch(`users/${this.props.currentUser.id}/user_matches/`)
//     .then(r => r.json())
// // debugger
//   .then(updatedMatches => {
//     this.props.findMatches(updatedMatches)
//   })
// setCurrentUser = (users) => {
//   const user = users.find(u => u.first_name.toLowerCase( ) === this.state.first_name.toLowerCase())
//   this.props.setCurrentUser(user)
// }
