import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'
import Matches from './Matches';
// import { acceptMatch, declineMatch } from '../actions';

class ProfileDetail extends React.Component {
// const ProfileDetail = props => {
  // const matchDisplay = () => {
  //   this.props.currentUser.matches.map((match) => {
  //     <Match key={match.id} match={this.props.match} />
  //   }

  // acceptMatch = (matchId) => {
  //   const match = this.props.matches.find(match => match.id === matchId)
  //   this.props.addrecipe(match)
  // }
  //
  // declineMatch = (matchId) => {
  //   const match = this.props.matches.find(match => match.id === matchId)
  //   this.props.declineMatch(match)
  // }

render() {
  // let detail = M.Tooltip.getInstance()
  console.log(this.props.name)
    return (
      <div>
        <div className='tooltipped'> User Sign </div>
        <a class="btn tooltipped" data-position="left" data-tooltip="I am a tooltip">Hover me!</a>

        <div> User Details </div>
        {/* <p>{props.first_name} {props.last_name}</p>
        <p>{props.birth_month}/{props.birth_day}/{props.birth_year}</p> */}
        </div>
    )
  }
}

        // {/* const mapStateToProps = (state) => {
        //   return {
        //     matches: state.matches.matches,
        //     pending: state.pending.pending
        //   }
        //   }
        //
        //   const mapDispatchToProps = (dispatch) => {
        //   return {
        //     acceptMatch: (match) => dispatch(acceptMatch(match)),
        //     declineMatch: (match) => dispatch(declineMatch(match))
        //   }
        // } */}


export default ProfileDetail;
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
