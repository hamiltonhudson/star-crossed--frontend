import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { setUsers, viewMatch } from '../actions'
import MatchContainer from './MatchContainer'

class Matches extends React.Component {
  // console.log(props)
  // props.matchedUser.forEach(m => {

  handleViewMatch = (matchId) => {
    // event.preventDefault()
    console.log(matchId)
    console.log(this.props.users)
    console.log(this.props)
    this.props.viewMatch(matchId)
    // console.log(match)
  }

  render() {
    return (
      <div className="matched-users">
        <div onClick={(event) => this.handleViewMatch(this.props.matchedUser.id)}>
          <p>{this.props.matchedUser.first_name} >> {this.props.matchedUser.sun.sign}</p>
          <img src="" alt="MatchPhoto" /><br/><br/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // matches: state.matches.matches,
    // match: state.match.match,
    users: state.users.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (matchId) => dispatch(viewMatch(matchId))
  }
}

// export default Matches
export default connect(mapStateToProps, mapDispatchToProps)(Matches);
