import React from 'react';
import { connect } from 'react-redux';
import Matches from './Matches';
import { acceptMatch, declineMatch } from '../actions';

class ProfileDetail extends React.Component {
// const ProfileDetail = props => {
  // const matchDisplay = () => {
  //   this.props.currentUser.matches.map((match) => {
  //     <Match key={match.id} match={this.props.match} />
  //   }

  acceptMatch = (matchId) => {
    const match = this.props.matches.find(match => match.id === matchId)
    this.props.addrecipe(match)
  }

  declineMatch = (matchId) => {
    const match = this.props.matches.find(match => match.id === matchId)
    this.props.declineMatch(match)
  }

render() {
  // console.log(props)
    return (
      <div>
        Profile Detail + Matches
        {/* <p>{props.first_name} {props.last_name}</p>
        <p>{props.birth_month}/{props.birth_day}/{props.birth_year}</p> */}
        {/* {this.displayMatches} */}
        {/* {
          this.props.matches.map(match =>
            return <Match key={match.id} match={...match} />
          )
        } */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.matches,
    pending: state.pending.pending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptMatch: (match) => dispatch(acceptMatch(match)),
    declineMatch: (match) => dispatch(declineMatch(match))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
