// import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom';
// import ProfileContainer from './ProfileContainer';
// import '../styling/Profile.css';
// import { viewMatch, acceptMatch, acceptMatchedUser, declineMatch, declineMatchedUser, setCurrentUser } from '../actions'
// import acceptBtn from '../images/check_mark_white.png';
// import declineBtn from '../images/x_mark_white.png';
//
// class Matches extends React.Component {
//   state = {
//     clicked: false
//   }
//
//   handleViewMatch = (clickedMatchId) => {
//     this.props.viewMatch(this.props.matchedUsers.find(matchedUser => matchedUser.id === clickedMatchId))
//     this.setState({
//       clicked: true
//     })
//   }
//
//   handleViewPending = (pendingId) => {
//     const pending = this.props.currentUser.matches.filter(match => match.status === "pending")
//     const pendingUsers = pending.map(p => p.matched_user)
//     this.props.viewMatch(pendingUsers.find(pendingUser => pendingUser.id === pendingId))
//     this.setState({
//       clicked: true
//     })
//   }
//
//   handleAccept = (acceptedUserId) => {
//     const acceptedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === acceptedUserId)
//     const acceptedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === acceptedUserId)
//     const acceptConfig = {
//         method: "PATCH",
//         headers: {
//           "Content-type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           status: "accepted"
//         })
//     }
//     fetch(`http://localhost:3000/api/v1/matches/${acceptedMatch.id}/accept`, acceptConfig)
//     .then(r => r.json())
//     .then(result => {
//       this.props.setCurrentUser(result)
//       const resultMatch = result.matches.find(match => match.id === acceptedMatch.id)
//       const resultMatchedUser = resultMatch.matched_user
//       this.props.acceptMatch(resultMatch)
//       this.props.acceptMatchedUser(resultMatchedUser)
//     })
//   }
//
//   handleDecline = (declinedUserId) => {
//     const declinedMatch = this.props.matchObjs.find(matchObj => matchObj.matched_user.id === declinedUserId)
//     const declinedUser = this.props.matchedUsers.find(matchedUser => matchedUser.id === declinedUserId)
//     this.props.declineMatchedUser(declinedUser)
//     const declineConfig = {
//         method: "PATCH",
//         headers: {
//           "Content-type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           status: "declined"
//         })
//       }
//     fetch(`http://localhost:3000/api/v1/matches/${declinedMatch.id}/decline`, declineConfig)
//     .then(r => r.json())
//     .then(results => {
//     })
//   }
//
//   render() {
//     console.log("this.props.matches", this.props.matches)
//     console.log("this.props.currentUser.matches", this.props.currentUser.matches)
//     if (this.state.clicked) {
//       return <Redirect to="/matchprofile" />
//     }
//     const generateMatches = () => {
//       return this.props.matchedUsers.map(matchedUser => {
//         const matchPhoto = matchedUser.photo
//         return (
//           <div key={matchedUser.id} className="matched-users">
//             <div onClick={() => this.handleViewMatch(matchedUser.id)}>
//               {matchedUser.first_name}  ☽  {matchPhoto ? <img src={matchPhoto} className="match-photo" alt="match-img" /> : null}  ☆  {matchedUser.sun.sign}
//             </div>
//             {/* <div className="row" onClick={() => this.handleViewMatch(matchedUser.id)}>
//               <div className="col l2 m3 s12">{matchedUser.first_name}  ☽ </div> {matchPhoto ? <img src={matchPhoto} className="match-photo col l8 m6 s12" alt="match-img" /> : null} <div className="col l2 m3 s12"> ☆  {matchedUser.sun.sign}</div>
//             </div> */}
//             <div className="buttonDiv">
//               <button className="matchBtn" onClick={() => this.handleAccept(matchedUser.id)}> <img id="acceptBtn" src={acceptBtn} alt='accept' /> </button>
//               <button className="matchBtn" onClick={() => this.handleDecline(matchedUser.id)}> <img id="declineBtn" src={declineBtn} alt='decline' /> </button>
//             </div>
//           </div>
//         )
//       })
//     }
//     const generatePending = () => {
//       const pending = this.props.currentUser.matches.filter(match => match.status === "pending")
//       const pendingUsers = pending.map(p => p.matched_user)
//       return pendingUsers.map(p => {
//         return (
//           <span key={p.id} className="pending" onClick={() => this.handleViewPending(p.id)}>| {p.first_name} |</span>
//         )
//       })
//     }
//     return (
//       <div>
//         <div className="match-div">
//           <div className="matched-user-box">
//             {generateMatches()}
//           </div><br/>
//         </div>
//         <div style={{"marginTop": "5px", "marginBottom": "5px"}}>
//           <Link style={{"textAlign": "center"}} id="accepted-link" to='/chat'> Accepted ☞ </Link>
//         </div>
//         <div id="pending-list">Pending</div>
//         <div style={{"marginBottom": "10px"}}>
//           {generatePending()}
//         </div>
//       </div>
//     )
//   }
// }
//
//   const mapStateToProps = (state) => {
//     return {
//       currentUser: state.users.currentUser,
//       matchedUsers: state.matches.matchedUsers,
//       matches: state.matches.matches,
//       matchObjs: state.matches.matches,
//       accepted: state.matches.accepted,
//       acceptedUsers: state.matches.acceptedUsers,
//       // alreadyMatched:
//     }
//   }
//
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
//       acceptMatch: (acceptedMatch) => dispatch(acceptMatch(acceptedMatch)),
//       acceptMatchedUser: (acceptedUser) => dispatch(acceptMatchedUser(acceptedUser)),
//       declineMatchedUser: (declinedUser) => dispatch(declineMatchedUser(declinedUser)),
//       setCurrentUser: (user) => dispatch(setCurrentUser(user))
//     }
//   }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Matches);
