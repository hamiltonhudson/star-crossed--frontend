import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'
// import Matches from './Matches';
// import { acceptMatch, declineMatch } from '../actions';

// class ProfileDetail extends React.Component {
class ProfileDetail extends React.Component {
  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div>
          Sign Details! | {this.props.user.sun.sign}
        </div>
    )} else if (this.props.clicked === "name") {
    // )} else if (event.target.dataset.name === "name" || event.target.dataset.name === "photo") {
      return (
        <div>
          User Details! | {this.props.user.first_name}
        </div>
    )}
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.renderDetail()}
      </div>
    )
  }
}
export default ProfileDetail;

// export const ProfileDetail = (props) => {
//   if (this.props.clicked === "sun") {
//     return (
//       <div>
//         Sign Details! | {this.props.user.sun.sign}
//       </div>
//   )} else if (this.props.clicked === "name") {
//   // )} else if (event.target.dataset.name === "name" || event.target.dataset.name === "photo") {
//     return (
//       <div>
//         User Details! | {this.props.user.first_name}
//       </div>
//   )}
// }

//   // let detail = M.Tooltip.getInstance()
// {/* <div className='tooltipped'> User Sign </div> */}
// {/* <a class="btn tooltipped" data-position="left" data-tooltip="I am a tooltip">Hover me!</a> */}

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

// export default ProfileDetail;
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
