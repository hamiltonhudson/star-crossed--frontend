import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styling/Profile.css'
import EditUser from './EditUser'
import ProfileDetail from './ProfileDetail'
import Matches from './Matches'
// import Tooltip from '@material-ui/core/Tooltip';

class ProfileContainer extends React.Component {

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
    // event.preventDefault()
    console.log("sign clicked")
    return (
      <span>
        <ProfileDetail />
      </span>
    )
  }
  // correctUserDetails = () => {
  //   const userId = this.props.userId
  //   fetch(`http://localhost:3000/api/v1/${userId}`)
  //   .then(r => r.json())
  //   .then(result => {
  //     const currentUser = this.props.setCurrentUser(result)
  //   })
  // }
  render () {
    console.log("PROFILECONTAINER", this.props)

    const generateMatches = () => {
      return this.props.matches.map((match) => {
        // console.log(matched_user)
        return <Matches key={match.id} matchedUser={match} />
      })
    }
    return (
      <div>
        <div className="prof-container">
          <Link to='/edit'>Edit</Link>
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
          </div>
          {/* {this.renderProfileDetails()} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // userDetails: state.users.userDetails,
    currentUser: state.users.currentUser,
    matches: state.matches.matches
    // users: state.users.users,
    // userId: state.userId.userId,
    // matches: state.matches.matches
  }
}

  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser))
  //   }
  // }

export default connect(mapStateToProps)(ProfileContainer);
