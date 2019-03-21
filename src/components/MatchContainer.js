import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styling/Profile.css'
import MatchDetail from './MatchDetail'
import { acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser, setCurrentUser } from '../actions';

const acceptBtn = './images/check_mark_1.png'
const declineBtn = './images/x_mark_1.png'

class MatchContainer extends React.Component {
  state = {
    clicked: '',
    acceptedOrDenied: false
  }

  handleDetailClick = (event) => {
    event.preventDefault()
    this.setState({
      clicked: event.target.dataset.name,
    })
  }

  profileReturn = () => {
    if (this.state.acceptedOrDenied) {
      return <Redirect to="/profile" />
    }
  }

  handleAccept = (acceptedUserId) => {
    const acceptedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === acceptedUserId)
    const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
    // console.log(acceptedMatch, acceptedUser)
    // this.props.acceptMatch(acceptedUser)
    // this.props.acceptMatch(acceptedMatch)
    // this.props.acceptMatchedUser(acceptedUser)
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
    // .then(results => {
    //   console.log(results)
    // })
    .then(result => {
      console.log(result)
      this.props.setCurrentUser(result)
      const resultMatch = result.matches.find(match => match.id === acceptedMatch.id)
      const resultMatchedUser = resultMatch.matched_user
      this.props.acceptMatch(resultMatch)
      this.props.acceptMatchedUser(resultMatchedUser)
    })
    this.setState({
      acceptedOrDenied: true
    })
  }

  handleDecline = (declinedUserId) => {
    const declinedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === declinedUserId)
    const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
    // console.log(declinedMatch, declinedUser)
    // this.props.declineMatch(declinedMatch)
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
    this.setState({
      acceptedOrDenied: true
    })
  }

  render() {
    const matchPhoto = this.props.viewedMatch.photo
    console.log("MatchContainer THIS.PROPS", this.props)
    return (
      <div>
        <div className="prof-container">
          <div style={{"marginTop": "10px"}}>
            <Link to='/profile' className="prof-link"> ◁ Back</Link>
          </div>
          <div className="prof-card">
            <h2 className="card-title" id="prof-name" data-name="name"
              onClick={(event) => this.handleDetailClick(event)}
            > {this.props.viewedMatch.first_name} </h2>
            <MatchDetail clicked={this.state.clicked}/>
            <span onClick={(event) => this.handleDetailClick(event)}>
              {matchPhoto ? <img src={matchPhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
            </span>
            <br/>
            <span className="prof-sun" data-name="sun"
              onClick={(event) => this.handleDetailClick(event)}
            > {this.props.viewedMatch.sun.sign} </span>
            <br></br><br/>
            <div>
              <button className="accept" onClick={() => this.handleAccept(this.props.viewedMatch.id)}> <span id="picto">☑︎</span> </button>
              <button className="decline" onClick={() => this.handleDecline(this.props.viewedMatch.id)}> <span id="picto">☒</span> </button>
            </div>
            <br/>
            <p id="detail-name"> this sign's: </p>
            <span> ——— </span><br/><br/>
            <span id="sign-info"> vibe  |  {this.props.viewedMatch.sun.vibe}</span><br></br>
            <span id="sign-info"> motto  |  "{this.props.viewedMatch.sun.motto}"</span><br/><br/>
            <span id="sign-info"> qualities  |  {this.props.viewedMatch.sun.keywords}</span><br></br>
          </div>
          {this.profileReturn()}
        </div>
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      viewedMatch: state.matches.match,
      matchedUsers: state.matches.matchedUsers,
      matchObjs: state.matches.matches,
      accepted: state.matches.accepted,
      acceptedUsers: state.matches.acceptedUsers,
      currentUser: state.users.currentUser,
      // declined: state.matches.declined,
      // declinedUsers: state.matches.declinedUsers,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      acceptMatchedUser: (acceptedUser) => dispatch(acceptMatchedUser(acceptedUser)),
      declineMatchedUser: (declinedUser) => dispatch(declineMatchedUser(declinedUser)),
      acceptMatch: (acceptedMatch) => dispatch(acceptMatch(acceptedMatch)),
      setCurrentUser: (user) => dispatch(setCurrentUser(user))
      // declineMatch: (declinedMatch) => dispatch(declineMatch(declinedMatch)),
      // acceptMatch: (acceptedUser) => dispatch(acceptMatch(acceptedUser)),
      // declineMatch: (declinedMatch, declinedUser) => dispatch(declineMatch(declinedMatch, declinedUser)),
    }
  }



export default connect(mapStateToProps, mapDispatchToProps)(MatchContainer);
