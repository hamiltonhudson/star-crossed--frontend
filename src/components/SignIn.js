import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { API_ROOT, USERS_API } from '../constants/Roots';
import { setUsers, setCurrentUser, setUserId, findMatches, findMatchedUsers, allUndeclinedMatches, allUndeclinedMatchedUsers, findAccepted, findAcceptedUsers} from '../actions';
import backArrow from '../images/triangle_arrow-BACK.svg';
import '../styling/Form.css';


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

  saveTokenAsCookie() {
     document.cookie = 'X-Authorization=' + localStorage.getItem('token') + '; path=/';
  }

  handleSubmit = (event) => {
    event.preventDefault()
      fetch(`${API_ROOT}/auth`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Credentials': 'include'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then(r => r.json())
      .then(result => {
        if (result.errors) {
          alert('Please check that your email and password are entered correctly')
          return <Redirect to="/signin" />
        } else {
          localStorage.setItem('token', result.token)
          this.saveTokenAsCookie()
          const userDetails = result.user
          this.props.setCurrentUser(userDetails)
          this.props.setUserId(userDetails.id)
          const matchedOrAwaiting = userDetails.matches.filter(match => match.status === "matched" || match.status === "awaiting")
          const accepted = userDetails.matches.filter(match => match.status === "accepted")
          this.props.findMatches(matchedOrAwaiting)
          matchedOrAwaiting.map(m => this.props.findMatchedUsers(m.matched_user))
          const undeclinedMatches = userDetails.matches.filter(match => match.status !== "declined")
          this.props.allUndeclinedMatches(undeclinedMatches)
          const undeclinedMatchedUsers = undeclinedMatches.map(match => match.matched_user)
          this.props.allUndeclinedMatchedUsers(undeclinedMatchedUsers)
          this.props.findAccepted(accepted)
          accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
          this.fetchUsers()
        }
      })
    }

    fetchUsers = () => {
      fetch(USERS_API, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Credentials': 'include',
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(r => r.json())
      .then(results => {
        this.props.setUsers(results)
        this.setState({
          loggedIn: true
        })
      })
    }

  render() {
    const signInForm =
      <div>
        <div style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' className="form-link"> <img src={backArrow} alt='back'/> Back </Link>
        </div>
        <br/><br/>
        <div className="form-container" style={{"paddingLeft": "50px", "marginRight": "5px"}}>
          <h1 className="login-header">sign in</h1>
          <div className="form" style={{"width": "85%"}}>
            <form className="col s12" onSubmit={this.handleSubmit}>
              <br/>
              <span className="form-label">
                <label> Email </label>
                <div className="input-field col s6">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="input"
                  />
                </div>
              </span>
              <span className="form-label">
                <label>Password</label>
                <div className="input-field col s6">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className="input"
                  />
                </div>
              </span>
              <br/><br/>
              <input
                type="submit"
                className="submit-button"
              />
            </form>
          </div>
        </div>
      </div>
    return this.state.loggedIn === true ? <Redirect to="/matches" /> : signInForm
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userDetails: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
    allUndeclinedMatches: (undeclinedMatches) => dispatch(allUndeclinedMatches(undeclinedMatches)),
    allUndeclinedMatchedUsers: (undeclinedMatchedUsers) => dispatch(allUndeclinedMatchedUsers(undeclinedMatchedUsers)),
    findAccepted: (accepted) => dispatch(findAccepted(accepted)),
    findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
    setUserId: (userId) => dispatch(setUserId(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
