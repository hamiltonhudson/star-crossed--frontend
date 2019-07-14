import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styling/Profile.css'
import MatchProfDetail from './MatchProfDetail';
import MatchProfSun from './MatchProfSun';
import { acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser, setCurrentUser, findMatchedUsers, declinePendingMatch, declinePendingMatchedUser, allUndeclinedMatches, allUndeclinedMatchedUsers } from '../actions';
import acceptBtn from '../images/check_mark_white.png';
import declineBtn from '../images/x_mark_white.png';
import Adapter from './Adapter';

const matchesAPI = 'http://localhost:3000/api/v1/matches'


class MatchProfContainer extends React.Component {

  state = {
    clicked: '',
    acceptedOrDeclined: false,
    resultStatus: '',
    pendingStatus: false,
    matchedOrAwaitingStatus: false
  }

  handleDetailClick = (event) => {
    event.preventDefault()
    this.setState({
      clicked: event.target.dataset.name,
    })
  }

  matchesReturn = () => {
    if (this.state.acceptedOrDeclined === true && this.state.resultStatus === "pending") {
      return <Redirect to="/matches" />
    } else if (this.state.acceptedOrDeclined === true && this.state.resultStatus === "declined") {
      return <Redirect to="/matches" />
    } else if (this.state.acceptedOrDeclined === true && this.state.resultStatus === "accepted") {
      return <Redirect to="/chat" />
    }
  }

  buttonsDisplay = (viewedMatchedUser) => {
    const thisViewedMatch = this.props.undeclinedMatches.find(match => match.matched_user.id === viewedMatchedUser.id)
    if (thisViewedMatch === undefined) {
      return <Redirect to="/matches" />
    } else if (thisViewedMatch.status === "matched" || thisViewedMatch.status === "awaiting") {
      return (
        <div className="row">
          <div className="buttonDiv">
            <button className="matchBtn" onClick={() => this.handleAccept(viewedMatchedUser.id)}> <img id="acceptBtn" src={acceptBtn} alt='accept' /> </button>
            <button className="matchBtn" onClick={() => this.handleDecline(viewedMatchedUser.id)}> <img id="declineBtn" src={declineBtn} alt='decline' /> </button>
          </div>
        </div>
      )
    } else if (thisViewedMatch.status === "pending") {
      return (
        <div className="pending-load">
          ♾ PENDING
        </div>
      )
    }
  }

  handleAccept = (acceptedUserId) => {
    const acceptedMatch = this.props.matches.find(match => match.matched_user.id === acceptedUserId)
    const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
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
      this.props.acceptMatch(acceptedMatch)
      this.props.acceptMatchedUser(acceptedUser)
      const resultMatchStatus = result.match_status
      const undeclinedMatches = result.user.matches.filter(match => match.status !== "declined")
      this.props.allUndeclinedMatches(undeclinedMatches)
      const undeclinedMatchedUsers = undeclinedMatches.map(match => match.matched_user)
      this.props.allUndeclinedMatchedUsers(undeclinedMatchedUsers)
      this.setState({
        acceptedOrDeclined: true,
        resultStatus: resultMatchStatus
      })
    })
  }

  handleDecline = (declinedUserId) => {
    const declinedMatch = this.props.matches.find(match => match.matched_user.id === declinedUserId)
    const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
    // this.props.declineMatch(declinedMatch)
    // this.props.declineMatchedUser(declinedUser)
    const declineConfig = {
        method: "PATCH",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': localStorage.getItem('token'),
          'Credentials': 'include'
        },
        body: JSON.stringify({
          status: "declined"
        })
      }
    fetch(`${matchesAPI}/${declinedMatch.id}/decline`, declineConfig)
    .then(r => r.json())
    .then(result => {
      this.props.setCurrentUser(result.user)
      // const resultMatchStatus = result.match_status
      this.props.declineMatch(declinedMatch)
      this.props.declineMatchedUser(declinedUser)
      const undeclinedMatches = result.user.matches.filter(match => match.status !== "declined")
      this.props.allUndeclinedMatches(undeclinedMatches)
      const undeclinedMatchedUsers = undeclinedMatches.map(match => match.matched_user)
      this.props.allUndeclinedMatchedUsers(undeclinedMatchedUsers)
    })
  }

  render() {
    const matchPhoto = this.props.viewedMatch.photo
    return (
      <div className="prof-container">
        {/* {this.matchesReturn()} */}
        <div className="row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l3 m3 s6"> ◀︎ LogOut </Link>
          <Link to='/matches' className="center-link col l3 m3 s6"> △ Matches △ </Link>
          <Link to='/chat' className="center-link col l3 m3 s6"> ▲ Accepted ▲ </Link>
          <Link to='/profile' className="right-link col l3 m3 s6"> Profile ▷ </Link>
        </div><br/>
        <div className="prof-card">
          <div className="user-card row">
            <MatchProfDetail clicked={this.state.clicked}/>
            <div className="col l4 m6 s12">
              <h3 className="card-title prof-name" data-name="name"
                onClick={(event) => this.handleDetailClick(event)}>
                {this.props.viewedMatch.first_name}
              </h3>
              <span onClick={(event) => this.handleDetailClick(event)}>
                {matchPhoto ? <img src={matchPhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
              </span>
              <br/>
              <h6 className="prof-sun" data-name="sun" onClick={(event) => this.handleDetailClick(event)}> {this.props.viewedMatch.sun.sign} </h6>
            </div>
            <MatchProfSun clicked={this.state.clicked}/>
          </div>
          <br/>
          {this.buttonsDisplay(this.props.viewedMatch)}
          <div className="row">
            <h2 className="match-sign-header glow2"> their sign's: </h2><br/>
            <hr id="match-profile-hr"/>
            <div className="match-sign-details">
              <span id="detail-name"> vibe </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.viewedMatch.sun.vibe}</span><br/>
              <span id="detail-name"> motto </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">"{this.props.viewedMatch.sun.motto}"</span><br/>
              <span id="detail-name"> compatible with </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info"> {this.props.viewedMatch.sun.compat_signs} </span><br/><br/>
              <div className="row">
                <div className="col s1 traits">
                  <span>
                    <span className="row">T</span>
                    <span className="row">R</span>
                    <span className="row">A</span>
                    <span className="row">I</span>
                    <span className="row">T</span>
                    <span className="row">S</span>
                  </span>
                </div>
                <div className="col s11" style={{"verticalAlign": "middle"}}>
                  <span id="detail-name"> good </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.viewedMatch.sun.good_traits}.</span><br/>
                  <span id="detail-name"> bad </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.viewedMatch.sun.bad_traits}.</span><br/>
                </div>
              </div>
              {this.matchesReturn()}
            </div>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      viewedMatch: state.matches.match,
      matches: state.matches.matches,
      matchedUsers: state.matches.matchedUsers,
      undeclinedMatches: state.matches.undeclinedMatches,
      undeclinedMatchedUsers: state.matches.undeclinedMatchedUsers,
      accepted: state.matches.accepted,
      acceptedUsers: state.matches.acceptedUsers,
      currentUser: state.users.currentUser,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      acceptMatch: (acceptedMatch) => dispatch(acceptMatch(acceptedMatch)),
      acceptMatchedUser: (acceptedUser) => dispatch(acceptMatchedUser(acceptedUser)),
      declineMatch: (declinedMatch) => dispatch(declineMatch(declinedMatch)),
      declineMatchedUser: (declinedUser) => dispatch(declineMatchedUser(declinedUser)),
      declinePendingMatch: (declinedMatch) => dispatch(declinePendingMatch(declinedMatch)),
      declinePendingMatchedUser: (declinedUser) => dispatch(declinePendingMatchedUser(declinedUser)),
      setCurrentUser: (user) => dispatch(setCurrentUser(user)),
      allUndeclinedMatches: (undeclinedMatches) => dispatch(allUndeclinedMatches(undeclinedMatches)),
      allUndeclinedMatchedUsers: (undeclinedMatchedUsers) => dispatch(allUndeclinedMatchedUsers(undeclinedMatchedUsers)),
      findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers))
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(MatchProfContainer);
