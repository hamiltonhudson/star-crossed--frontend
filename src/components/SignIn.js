import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ActionCableProvider } from 'react-actioncable-provider';
// import '../styling/Form.css'
import '../styling/FormCustom.css'
import ProfileContainer from './ProfileContainer'
import { setUsers, setCurrentUser, findMatchedUsers, findMatches, findAccepted, findAcceptedUsers} from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
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
        console.log(data)
        // const userDetails = data.find(d => d.first_name.toLowerCase() === this.state.first_name.toLowerCase())
        const userDetails = data.find(d => d.email === this.state.email && d.password === this.state.password)
        this.props.setUsers(data)
        this.props.setCurrentUser(userDetails)
        const matchedOrAccepted = userDetails.matches.filter(match => match.status !== "declined")
        const matched = userDetails.matches.filter(match => match.status === "matched")
        const accepted = userDetails.matches.filter(match => match.status === "accepted")
        const declined = userDetails.matches.filter(match => match.status === "declined")
        this.props.findMatches(matchedOrAccepted)
        matched.map(m => this.props.findMatchedUsers(m.matched_user))
        this.props.findAccepted(accepted)
        accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
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
            {/* <div className="custom-form"> */}
            <form onSubmit={this.handleSubmit}>
              <br/>
              <label className="loginLabel">Email:</label>
              <div className="form-label">
                <div className="input-field">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <label className="loginLabel">Password:</label>
              <div className="form-label">
                <div className="input-field">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* <label className="form-label">First:</label>
                <div className="form-label">
                <div className="input-field">
                <input
                className="input"
                type="text"
                placeholder="Enter first name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
                />
                </div>
                </div>
                <label className="loginLabel">Last:</label>
                <div className="form-label">
                <div className="input-field">
                <input
                className="input"
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
                />
                </div>
              </div> */}
              <br/><br/>
              <input
                type="submit"
                className="submit-button"
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
    // findMatchedUsers: (matches) => dispatch(findMatchedUsers(matches))
    findAccepted: (accepted) => dispatch(findAccepted(accepted)),
    findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
  }
}

export default connect(null, mapDispatchToProps)(SignIn);
