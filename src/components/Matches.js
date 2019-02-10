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
    console.log(matchId)
    const clickedMatch = this.props.matches.find(match => match.id === matchId)
    console.log(clickedMatch)
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

  declineMatch = (matchedDisplay) => {
    // event.preventDefault()
    console.log("clicked decline")
    console.log("matchId", matchedDisplay)
    // const match = this.props.matches.find(match => match.id === matchId)
    // this.props.declineMatch(match)
  }

  // const generateMatches = () => {
  //   return this.props.currentUser.matched_users.map((matched_user) => {
  //     console.log(matched_user)
  //     return <Matches key={matched_user.id} matchedUser={matched_user} />
  //   })
  // }

  render() {
    // console.log("PROPS IN MATCHES",this.props)
    // console.log("this.props.matchedDisplay IN MATCHES", this.props.matchedDisplay)
    // console.log("STATE IN MATCHES", this.state)
    // console.log("this.props.matches IN MATCHES",this.props.matches)
    // console.log("this.props.match IN MATCHES", this.props.match)
    const matchCard =
    // return (
      <div className="Card">
        <div id="matched-users">
          <div onClick={() => this.handleViewMatch(this.props.matchedDisplay.id)}>
            <p>{this.props.matchedDisplay.first_name} >> {this.props.matchedDisplay.sun.sign}</p>
            <img src="" alt="MatchPhoto" /><br/>
          </div>
          {/* <span className="accept"></span>
          <span className="decline"></span> */}
          {/* <button className="accept"><img src="../images/check_mark_1.png" alt="accept" /></button> */}
          {/* <button className="decline"><img src="../images/x_mark_1.png" alt="decline" /></button> */}
          <button><img src='../images/check_mark_1.png' alt="accept"
            onClick={() => this.acceptMatch(this.props.matchedDisplay.id)} />Accept</button>
          <button><img src='../images/x_mark_1.png' alt="decline"
            onClick={() => this.declineMatch(this.props.matchedDisplay)} />Decline</button>
          <br/><br/>
        </div>
      </div>
    // )
    return this.state.clicked === true ? <Redirect to='/matchprofile' /> : matchCard

  }
}

const mapStateToProps = (state) => {
  return {
    // currentUser: state.users.currentUser,
    matches: state.matches.matches,
    match: state.matches.match,
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
