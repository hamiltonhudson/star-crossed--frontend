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
        <div className="prof-sun-detail">
          <h5>{this.props.user.sun.sign}</h5>
          <span> ------ </span>
          <p>Vibe  |  {this.props.user.sun.vibe}</p>
          <p>Symbol  |  {this.props.user.sun.symbol}</p>
          <p>Element  |  {this.props.user.sun.element}</p>
          <br/>
          <p>Qualities  |  {this.props.user.sun.keywords}</p>
        </div>
    )} else if (this.props.clicked === "name") {
    // )} else if (event.target.dataset.name === "name" || event.target.dataset.name === "photo") {
      return (
        <div className="prof-name-detail">
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

// export default ProfileDetail;
// export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
