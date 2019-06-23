import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styling/Profile.css'
import MatchProfDetail from './MatchProfDetail';
import MatchProfSun from './MatchProfSun';
import { acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser, setCurrentUser } from '../actions';
import acceptBtn from '../images/check_mark_white.png'
import declineBtn from '../images/x_mark_white.png'

class MatchProfContainer extends React.Component {
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

  matchesReturn = () => {
    if (this.state.acceptedOrDenied) {
      return <Redirect to="/matches" />
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
    console.log("MatchProfContainer THIS.PROPS", this.props)
    return (
        <div className="prof-container">
          <div className="row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
            <Link to='/' className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
            <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
            <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
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
            <div className="row">
              <div className="buttonDiv">
                <button className="matchBtn" onClick={() => this.handleAccept(this.props.viewedMatch.id)}> <img id="acceptBtn" src={acceptBtn} alt='accept' /> </button>
                <button className="matchBtn" onClick={() => this.handleDecline(this.props.viewedMatch.id)}> <img id="declineBtn" src={declineBtn} alt='decline' /> </button>
              </div>
            </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(MatchProfContainer);
