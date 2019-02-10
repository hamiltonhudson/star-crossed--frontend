import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { viewMatch, findMatches } from '../actions'
import '../styling/Profile.css';
import MatchContainer from './MatchContainer';
// import ProfileContainer from './ProfileContainer'

class Matches extends React.Component {
  state = {
    clicked: false
  }

  handleViewMatch = (matchId) => {
    const clickedMatch = this.props.matches.find(match => match.id === matchId)
    this.props.viewMatch(clickedMatch)
    this.setState({
      clicked: true
    })
  }

  acceptMatch = (matchId) => {
    // event.preventDefault()
    console.log("clicked accept")
    console.log("matchId", matchId)
    // const match = this.props.matches.find(match => match.id === matchId)
    // this.props.addrecipe(match)
  }

  declineMatch = (matchDisplayId) => {
    // event.preventDefault()
    console.log("clicked decline")
    // console.log("matchDisplay", matchDisplayId)
    const match = this.props.matchObjs.find(match => match.user_id === matchDisplayId || match.matched_user_id === matchDisplayId)
    // this.props.declineMatch(match)
    const userId = this.props.currentUser.id
    console.log("match", match, "userId", userId, "matchDisplayId", matchDisplayId)
    // console.log(this.props)
    const declineConfig = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          match: {
            user_id: userId,
            declined_user_id: matchDisplayId,
            status: "declined"
          }
        })
      }
      fetch(`http://localhost:3000/api/v1/matches/${match.id}/declined`, declineConfig)
      .then(r => r.json())
      .then(result => {
        console.log(result)
      })
    }

  render() {
    const matchCard =
    // return (
        <div id="matched-users">
          <div onClick={() => this.handleViewMatch(this.props.matchedDisplay.id)}>
            <p>{this.props.matchedDisplay.first_name}  ☾  {this.props.matchedDisplay.sun.sign}</p>
            <img src="" alt="MatchPhoto" /><br/>
          </div>
          {/* <span className="accept"></span>
          <span className="decline"></span> */}
          {/* <button className="accept"><img src="../images/check_mark_1.png" alt="accept" /></button> */}
          {/* <button className="decline"><img src="../images/x_mark_1.png" alt="decline" /></button> */}
          <button><img src='../images/check_mark_1.png' alt="accept"
            onClick={() => this.acceptMatch(this.props.matchedDisplay.id)} />Accept</button>
          <button><img src='../images/x_mark_1.png' alt="decline"
            onClick={() => this.declineMatch(this.props.matchedDisplay.id)} />Decline</button>
          <br/><br/>
        </div>
    // )
    return this.state.clicked === true ? <Redirect to='/matchprofile' /> : matchCard

  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    matches: state.matches.matches,
    match: state.matches.match,
    matchObjs: state.users.currentUser.matches
    // users: state.users.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // findMatches: (matches) => dispatch(findMatches(matches))
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
    // setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    // setUsers: (users) => dispatch(setUsers(users)),
  }
}

// export default Matches
export default connect(mapStateToProps, mapDispatchToProps)(Matches);
