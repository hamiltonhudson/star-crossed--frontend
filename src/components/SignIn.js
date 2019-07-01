import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import Routes from '../routes';
import '../styling/Form.css';
import { setUsers, setCurrentUser, setUserId, findMatchedUsers, findMatches, findAccepted, findAcceptedUsers} from '../actions'

const authAPI = 'http://localhost:3000/api/v1/auth'
const usersAPI = 'http://localhost:3000/api/v1/users/'
let headers = {}
let body = ""
let method = ""
let init = { method: method, headers: headers, body: body }
// method = "POST"
// headers = {"Content-Type": "application/json"}
// body = JSON.stringify({ email: this.state.email, password: this.state.password })

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

  method = "POST"
  headers = {"Content-Type": "application/json"}
  body = JSON.stringify({ email: this.state.email, password: this.state.password })

  handleSubmit = (event) => {
    event.preventDefault()
      fetch(`${authAPI}/`, {init})
      .then(r => r.json())
      .then(data => {
        console.log(data)
        this.jwt = data.token;
        let userDetails = data
        console.log(userDetails)
        this.props.setCurrentUser(userDetails)
        let user_id = data.user_id
        // const matchedOrAwaiting = userDetails.matches.filter(match => match.status === "matched" || match.status === "awaiting")
        // const pending = userDetails.matches.filter(match => match.status === "pending")
        // const awaiting = userDetails.matches.filter(match => match.status === "awaiting")
        // const accepted = userDetails.matches.filter(match => match.status === "accepted")
        // const declined = userDetails.matches.filter(match => match.status === "declined")
        // this.props.findMatches(matchedOrAwaiting)
        // matchedOrAwaiting.map(m => this.props.findMatchedUsers(m.matched_user))
        // this.props.findAccepted(accepted)
        // accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
        // method = "GET"
        this.setState({
          loggedIn: true
        })
      })
    }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //     fetch(usersAPI)
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data)
  //       // const userDetails = data.find(d => d.first_name.toLowerCase() === this.state.first_name.toLowerCase())
  //       const userDetails = data.find(d => d.email === this.state.email && d.password === this.state.password)
  //       // const userDetails = data.find(d => d.first_name.toLowerCase() === this.state.first_name.toLowerCase() && d.password === this.state.password)
  //       this.props.setUsers(data)
  //       this.props.setCurrentUser(userDetails)
  //       const matchedOrAwaiting = userDetails.matches.filter(match => match.status === "matched" || match.status === "awaiting")
  //       const pending = userDetails.matches.filter(match => match.status === "pending")
  //       const awaiting = userDetails.matches.filter(match => match.status === "awaiting")
  //       const accepted = userDetails.matches.filter(match => match.status === "accepted")
  //       const declined = userDetails.matches.filter(match => match.status === "declined")
  //       this.props.findMatches(matchedOrAwaiting)
  //       matchedOrAwaiting.map(m => this.props.findMatchedUsers(m.matched_user))
  //       this.props.findAccepted(accepted)
  //       accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
  //       this.setState({
  //         loggedIn: true
  //       })
  //     })
  //   }

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
          <h1 className="loginHeader">sign in</h1>
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
      // )
      // return this.state.loggedIn === true ? <Redirect to="/profile" /> : signInForm
      return this.state.loggedIn === true ? <Redirect to="/matches" /> : signInForm
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
