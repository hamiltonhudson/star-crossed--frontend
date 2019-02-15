import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import '../styling/Profile.css';
import MatchContainer from './MatchContainer';
// import ProfileContainer from './ProfileContainer'
import { viewMatch, acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser } from '../actions'

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
    // console.log("handleDecline clicked")
    const acceptedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === acceptedUserId)
    const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
    this.props.acceptMatch(acceptedMatch)
    this.props.acceptMatchedUser(acceptedUser)
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
    // console.log("handleDecline clicked")
    const declinedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === declinedUserId)
    const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
    this.props.declineMatchedUser(declinedUser)

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
      return this.props.matchedUsers.map(matchedUser => {
        const matchPhoto = matchedUser.photo
        return (
          <div key={matchedUser.id} id="matched-users">
            <div onClick={() => this.handleViewMatch(matchedUser.id)}>
              {matchedUser.first_name}   ☽   {matchPhoto ? <img src={matchPhoto} className="match-photo" alt="match-img" /> : null}    ☆    {matchedUser.sun.sign}
            </div>
            <button className="accept" onClick={() => this.handleAccept(matchedUser.id)}> <span id="picto">☑︎</span> </button>
            <button className="decline" onClick={() => this.handleDecline(matchedUser.id)}> <span id="picto">☒</span> </button>
          </div>
        )
      })
    }
    return (
      <div className="matched-user-box">
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
    accepted: state.matches.accepted,
    acceptedUsers: state.matches.acceptedUsers,
  }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
      acceptMatch: (acceptedMatch) => dispatch(acceptMatch(acceptedMatch)),
      acceptMatchedUser: (acceptedUser) => dispatch(acceptMatchedUser(acceptedUser)),
      declineMatchedUser: (declinedUser) => dispatch(declineMatchedUser(declinedUser)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
