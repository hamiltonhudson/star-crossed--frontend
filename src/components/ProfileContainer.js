import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { redirect } from 'react-router-dom'
import SignIn from './SignIn'
import ProfileDetail from './ProfileDetail'
import { viewMatch, accetMatch, declineMatch } from '../actions'
import '../styling/Profile.css'
import Matches from './Matches'
// import Tooltip from '@material-ui/core/Tooltip';

class ProfileContainer extends React.Component {

  // renderProfileDetails = () => this.props.map((detail, id) => <ProfileDetail key={id} text={detail} />)

  handleDetailClick = (event) => {
    event.preventDefault()
    console.log("name clicked", event.target.dataset.name)
    return (
      <div>
        <ProfileDetail name={event.target.dataset.name}/>
      </div>
    )
  }

  handleSignClick = () => {
    console.log("sign clicked")
    return (
      <span>
        <ProfileDetail />
      </span>
    )
  }

  render () {
    console.log("state in profilecontainer is", this.state)
    console.log("props in profilecontainer is", this.props.users)
    console.log(this.props.currentUser)

    const generateMatches = () => {
      return this.props.currentUser.matched_users.map((matched_user) => {
        console.log(matched_user)
        return <Matches key={matched_user.id} matchedUser={matched_user} />
      })
    }

    return (
      <div className="prof-container">
        <div className="prof-card">
          <h1 className="card-title">Profile</h1>
          <p className="prof-name" data-name="name" onClick={this.handleDetailClick}> {this.props.currentUser.first_name} </p>
          <br/><br/>
          <img src="" alt="ProfilePhoto" className="prof-photo"/>
          <br/><br/>
          <span className="prof-sun" data-name="sun" onClick={this.handleSignClick}> {this.props.currentUser.sun.sign} </span>
          <br/><br/><br/>
          {/* <ProfileDetail matches={this.props.currentUser.matches} /> */}
          {
            generateMatches()
          }
          {
            // generateUserMatches()
          }
        </div>
        {/* {this.renderProfileDetails()} */}
      </div>
    )
  }
}
// const mapStateToProps = state => {
//   return {
//     // newUser: state.newUser
//       first_name: this.state.first_name,
//       last_name: this.state.last_name,
//       birth_year: this.state.birth_year,
//       birth_month: this.state.birth_month,
//       birth_day: this.state.birth_day,
//     }
//   }
//
  const mapStateToProps = (state) => {
    return {
      // users: this.state.users,
      // suns: this.state.suns
      currentUser: state.currentUser.currentUser,
      users: state.users.users,
      matches: state.matches.matches
    }
  }

export default connect(mapStateToProps)(ProfileContainer);
