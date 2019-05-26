import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableProvider } from 'actioncable';
import { API_WS_ROOT } from '../constants/ActionTypes';
import ProfileDetail from './ProfileDetail'
import Matches from './Matches';
// import EditUser from './EditUser'
// import { findMatchedUsers, setCurrentUser } from '../actions';
// import { ViewMatch } from '../actions';
import '../styling/Profile.css'
import '../styling/App.css'
import Chat from './Chat'
import App from '../App';
// import Tooltip from '@material-ui/core/Tooltip';

class ProfileContainer extends React.Component {

  state = {
    clicked: '',
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({
      clicked: event.target.dataset.name
    })
  }

  // openChat = () => {
  //   return (
  //     <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.currentUser.id}`}>
  //       <Chats />
  //     </ActionCableProvider>
  //   )
  // }

  render () {
    console.log("THIS.PROPS PROFILE CONTAINER", this.props)
    console.log("THIS.STATE PROFILE CONTAINER", this.state)
    console.log("profileContainer this.props.matches", this.props.matches)
    const profilePhoto = this.props.currentUser.photo

    return (
      <div className="prof-container">
        <div>
          <div style={{"marginTop": "10px"}}>
            <Link to='/' className="prof-link"> ◁ LogOut</Link>
            {/* <Link to='/' className="prof-link" onClick={this.props.setCurrentUser({first_name: "", last_name: "", birth_date: "", gender: "", gender_pref: "", location: ""})}> ◁ Log Out</Link> */}
            <Link to='/edit' className="edit-link"> Edit ▷ </Link>
          </div>
          <div className="prof-card">
            <h3 className="card-title" id="prof-name" data-name="name"
              onClick={(event) => this.handleClick(event)}>
              {this.props.currentUser.first_name}
            </h3>
            <ProfileDetail clicked={this.state.clicked}/>
            <span onClick={(event) => this.handleClick(event)}>
              {profilePhoto ? <img src={profilePhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
            </span>
            <br/>
            <span className="prof-sun" data-name="sun" onClick={(event) => this.handleClick(event)}> {this.props.currentUser.sun.sign} </span>
            <br/>
            <h2 className="matches-header"> Matches </h2>
            {/* {generateMatches()} */}
            <Matches />
          </div>
        </div>
        {/* <Link style={{"textAlign": "center"}} id="accepted-link" to='/chat'> Chat ☞ </Link> */}
        <br/><br/><br/>
      </div>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      matchObjs: state.matches.matches,
      // matchObjs: state.users.currentUser.matches,
      // matchedUsers: state.matchedUsers.matchedUsers,
      // matchedUsers: state.matchedUsers.matchedUsers,
      userId: state.users.userId
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      // findMatchedUsers: (matches) => dispatch(findMatchedUsers(matches)),
      // setCurrentUser: (userObj) => dispatch(setCurrentUser(userObj))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
