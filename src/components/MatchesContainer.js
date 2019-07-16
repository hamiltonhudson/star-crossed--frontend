import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Adapter from './Adapter'
import { viewMatch, acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser, setCurrentUser, findMatches, allUndeclinedMatches, allUndeclinedMatchedUsers } from '../actions';
import acceptBtn from '../images/check_mark_white.png';
import declineBtn from '../images/x_mark_white.png';
import '../styling/Matches.css';
import '../styling/App.css';

const matchesAPI = 'http://localhost:3000/api/v1/matches'


class MatchesContainer extends React.Component {

  state = {
    clicked: false,
    statusSet: false,
    statusResult: '',
  }

  handleViewMatch = (clickedMatchId) => {
    this.props.viewMatch(this.props.matchedUsers.find(matchedUser => matchedUser.id === clickedMatchId))
    this.setState({
      clicked: true
    })
  }

  handleViewPending = (pendingId) => {
    const pending = this.props.currentUser.matches.filter(match => match.status === "pending")
    const pendingUsers = pending.map(p => p.matched_user)
    this.props.viewMatch(pendingUsers.find(pendingUser => pendingUser.id === pendingId))
    this.setState({
      clicked: true
    })
  }

  determineStatus = (matchStatus) => {
    this.setState ({
      statusSet: true,
      statusResult: matchStatus
    })
  }

  setStatusAndRedirect = () => {
    if (this.state.clicked === true) {
      return <Redirect to="/matchprofile" />
    } else if (this.state.statusSet === true && this.state.statusResult === "accepted") {
      return <Redirect to="chat" />
    }
  }

  handleAccept = (acceptedUserId) => {
    const acceptedMatch = this.props.matches.find(match => match.matched_user.id === acceptedUserId)
    const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
    this.props.acceptMatch(acceptedMatch)
    this.props.acceptMatchedUser(acceptedUser)
    const acceptConfig = {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': localStorage.getItem('token'),
        'Credentials': 'include'
      },
      body: JSON.stringify({
        status: "accepted"
      })
    }
    fetch(`${matchesAPI}/${acceptedMatch.id}/accept`, acceptConfig)
    .then(r => r.json())
    .then(result => {
      this.props.setCurrentUser(result.user)
      const resultMatchStatus = result.match_status
      const undeclinedMatches = result.user.matches.filter(match => match.status !== "declined")
      this.props.allUndeclinedMatches(undeclinedMatches)
      const undeclinedMatchedUsers = undeclinedMatches.map(match => match.matched_user)
      this.props.allUndeclinedMatchedUsers(undeclinedMatchedUsers)
      return this.determineStatus(resultMatchStatus)
    })
  }

  handleDecline = (declinedUserId) => {
    const declinedMatch = this.props.matches.find(match => match.matched_user.id === declinedUserId)
    const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
    this.props.declineMatch(declinedMatch)
    this.props.declineMatchedUser(declinedUser)
    const declineConfig = {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        status: "declined"
      })
    }
    fetch(`${matchesAPI}/${declinedMatch.id}/decline`, declineConfig)
    .then(r => r.json())
    .then(result => {
      this.props.setCurrentUser(result.user)
    })
  }

  render() {
    const generateMatches = () => {
      return this.props.matchedUsers.map(matchedUser => {
        const matchPhoto = matchedUser.photo
        return (
          <div key={matchedUser.id} className="match-card">
            <div className="row" onClick={() => this.handleViewMatch(matchedUser.id)}>
              <span> {matchedUser.first_name} ☽ </span>
              {matchPhoto ? <img src={matchPhoto} className="matches-container-photo" alt="match-img" /> : null}
              <span> ☆ {matchedUser.sun.sign} </span>
            </div>
            <div className="row">
              <div className="buttonDiv col s12">
                <button className="matchBtn" onClick={() => this.handleAccept(matchedUser.id)}> <img id="acceptBtn" src={acceptBtn} alt='accept' /> </button>
                <button className="matchBtn" onClick={() => this.handleDecline(matchedUser.id)}> <img id="declineBtn" src={declineBtn} alt='decline' /> </button>
              </div>
            </div>
          </div>
        )
      })
    }
    const generatePending = () => {
      const pending = this.props.currentUser.matches.filter(match => match.status === "pending")
      const pendingUsers = pending.map(p => p.matched_user)
      return pendingUsers.map(p => {
        return (
          <span key={p.id} className="pending" onClick={() => this.handleViewPending(p.id)}>| {p.first_name} |</span>
        )
      })
    }
    return (
      <div className="matches-container">
        {this.setStatusAndRedirect()}
        {/* {(!this.state.acceptedStatus) ? null : <Redirect to="/chat" />} */}
        <div className="row" style={{"marginTop": "1vh", "marginBottom": "1vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ LogOut </Link>
          <Link className="center-link col l4 m4 s6" to='/chat'> ▲ Accepted ▲ </Link>
          <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
        </div><br/>
        <div className="row">
          <h2 className="matches-container-header glow2"> Matches </h2>
        </div>
        <div className="matches-scroll-box">
          {generateMatches()}
        </div>
        <hr id="matches-hr"/>
        <h4 id="pending-list"> Pending </h4>
        <div style={{"marginBottom": "10px"}}>
          {generatePending()}
        </div>
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      matches: state.matches.matches,
      matchedUsers: state.matches.matchedUsers,
      undeclinedMatches: state.matches.undeclinedMatches,
      undeclinedMatchedUsers: state.matches.undeclinedMatchedUsers,
      accepted: state.matches.accepted,
      acceptedUsers: state.matches.acceptedUsers,
      allUsers: state.users.users
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
      acceptMatch: (acceptedMatch) => dispatch(acceptMatch(acceptedMatch)),
      acceptMatchedUser: (acceptedUser) => dispatch(acceptMatchedUser(acceptedUser)),
      declineMatch: (declinedMatch) => dispatch(declineMatch(declinedMatch)),
      declineMatchedUser: (declinedUser) => dispatch(declineMatchedUser(declinedUser)),
      setCurrentUser: (user) => dispatch(setCurrentUser(user)),
      allUndeclinedMatches: (undeclinedMatches) => dispatch(allUndeclinedMatches(undeclinedMatches)),
      allUndeclinedMatchedUsers: (undeclinedMatchedUsers) => dispatch(allUndeclinedMatchedUsers(undeclinedMatchedUsers))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MatchesContainer);
