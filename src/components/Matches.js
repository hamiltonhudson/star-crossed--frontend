import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import '../styling/Profile.css';
import MatchContainer from './MatchContainer';
// import ProfileContainer from './ProfileContainer'
import { viewMatch, declineMatch, acceptMatch } from '../actions'

const acceptBtn = './images/check_mark_1.png'
const declineBtn = './images/x_mark_1.png'

class Matches extends React.Component {
  state = {
    clicked: false
  }

  handleViewMatch = (clickedMatchId) => {
    this.props.viewMatch(this.props.matchedUsers.find(matchedUser => matchedUser.id === clickedMatchId))
    this.setState({
      clicked: true
    })
  }

  handleAccept = (acceptedUserId) => {
    console.log("handleDecline clicked")
    const acceptedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === acceptedUserId)
    const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
    // console.log(acceptedMatch, acceptedUser)
    this.props.acceptMatch(acceptedUser)
    const acceptConfig = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          status: "accepted"
        })
    }
    fetch(`http://localhost:3000/api/v1/matches/${acceptedMatch.id}/accept`, acceptConfig)
    .then(r => r.json())
    .then(results => {
      console.log(results)
    })
  }

  handleDecline = (declinedUserId) => {
    console.log("handleDecline clicked")
    const declinedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === declinedUserId)
    const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
    // console.log(declinedMatch, declinedUser)
    this.props.declineMatch(declinedUser)

    const declineConfig = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          status: "declined"
        })
      }
    fetch(`http://localhost:3000/api/v1/matches/${declinedMatch.id}/decline`, declineConfig)
    .then(r => r.json())
    .then(results => {
      console.log(results)
    })
  }

  render() {
    console.log("THIS.PROPS IN MATCHES", this.props)

    if (this.state.clicked) {
      return <Redirect to="/matchprofile" />
    }
    const generateMatches = () => {
      // this.props.matchedUsers.map(matchedUser => {
      return this.props.matchedUsers.map(matchedUser => {
        const matchPhoto = matchedUser.photo
        return (
          <div key={matchedUser.id} id="matched-users">
            <div onClick={() => this.handleViewMatch(matchedUser.id)}>
              {matchedUser.first_name}   ☾  {matchPhoto ? <img src={matchPhoto} className="match-photo" alt="match-img" /> : null}   ☾   {matchedUser.sun.sign}
            </div>
            <button><img src={acceptBtn} alt="accept" onClick={() => this.handleAccept(matchedUser.id)} /></button>
            <button><img src={declineBtn} alt="decline" onClick={() => this.handleDecline(matchedUser.id)} /></button>
          </div>
        )
      })
    }
    return (
      <div>
        {generateMatches()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    matchedUsers: state.matches.matchedUsers,
    matchObjs: state.matches.matches,
    // viewedMatch: state.matches.match
    accepted: state.matches.accepted
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
      // declineMatch: (matchedUserId) => dispatch(declineMatch(matchedUserId)),
      // findMatches: (matches) => dispatch(findMatches(matches)),
      // setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
      // findMatchedUsers: (matches) => dispatch(findMatchedUsers(matches)),
      declineMatch: (declinedMatch, declinedUser) => dispatch(declineMatch(declinedMatch, declinedUser)),
      acceptMatch: (acceptedUser) => dispatch(acceptMatch(acceptedUser))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
