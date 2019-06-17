import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import Routes from '../routes'
import '../styling/Form.css'
import '../styling/FormCustom.css'
import { setUsers, setCurrentUser, setUserId, findMatchedUsers, findMatches, findAccepted, findAcceptedUsers} from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'

class SignIn extends React.Component {
  state = {
    // first_name: '',
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
        // const userDetails = data.find(d => d.first_name.toLowerCase() === this.state.first_name.toLowerCase() && d.password === this.state.password)
        this.props.setUsers(data)
        this.props.setCurrentUser(userDetails)
        const matchedOrAwaiting = userDetails.matches.filter(match => match.status === "matched" || match.status === "awaiting")
        const pending = userDetails.matches.filter(match => match.status === "pending")
        const awaiting = userDetails.matches.filter(match => match.status === "awaiting")
        const accepted = userDetails.matches.filter(match => match.status === "accepted")
        const declined = userDetails.matches.filter(match => match.status === "declined")
        this.props.findMatches(matchedOrAwaiting)
        matchedOrAwaiting.map(m => this.props.findMatchedUsers(m.matched_user))
        this.props.findAccepted(accepted)
        accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
        this.setState({
          loggedIn: true
        })
      })
    }

  render() {
    // return(
    console.log(this.props)
    const signInForm =
      <div>
        <div style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' className="form-link"> ◀︎ Back </Link>
        </div>
        <br/><br/>
        <div className="form-container" style={{"paddingLeft": "50px", "marginRight": "5px"}}>
          <h1 className="signupHeader">sign in</h1>
          {/* <br/><br/> */}
          <div className="form" style={{"width": "85%"}}>
            {/* <div className="custom-form"> */}
            <form className="col s12" onSubmit={this.handleSubmit}>
              <br/>
              {/* <label className="loginLabel">Email:</label> */}
              <span className="form-label">
                <label>Email</label>
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
              {/* <label className="loginLabel">Password:</label> */}
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
      // )
      return this.state.loggedIn === true ? <Redirect to="/profile" /> : signInForm
        // {/* <ActionCableProvider url={`ws://localhost:3000/api/v1/cable+?user=${this.props.userId}`}>
        //   <Redirect to="/profile" />
        //   </ActionCableProvider>
        //   :
        // signInForm */}
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
    findAccepted: (accepted) => dispatch(findAccepted(accepted)),
    findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
    setUserId: (userId) => dispatch(mapDispatchToProps(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
