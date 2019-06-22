import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableProvider } from 'actioncable';
import { API_WS_ROOT } from '../constants/ActionTypes';
import ProfileDetail from './ProfileDetail'
import ProfileSun from './ProfileSun'
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
    const profilePhoto = this.props.currentUser.photo

    return (
      <div className="prof-container">
        {/* <div className="row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' className="prof-link col s6"> ◀︎ LogOut </Link>
          <Link to='/edit' className="edit-link col s6"> Edit ▶︎ </Link>
        </div> */}
        <div className="row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' className="left-link col s4"> ◀︎ LogOut </Link>
          <Link to='/matches' className="center-link col s4"> ♀︎ Matches ♂︎ </Link>
          {/* <Link to='/matches' className="match-link col s4"> ❖ Matches ❖ </Link>
            <Link to='/matches' className="center-link col s4"> △ Matches △ </Link>
          <Link to='/matches' className="center-link col s4"> ▲ Matches ▲ </Link> */}
          <Link to='/edit' className="right-link col s4"> Edit ▶︎ </Link>
        </div>
        <div className="prof-card">
          <div className="user-card row">
            <ProfileSun clicked={this.state.clicked}/>
            <div className="col l4 m6 s12">
              <h3 className="card-title" id="prof-name" data-name="name"
                onClick={(event) => this.handleClick(event)}>
                {this.props.currentUser.first_name}
              </h3>
              <span onClick={(event) => this.handleClick(event)}>
                {profilePhoto ? <img src={profilePhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
              </span>
              <br/>
              <h6 className="prof-sun" data-name="sun" onClick={(event) => this.handleClick(event)}> {this.props.currentUser.sun.sign} </h6>
            </div>
            <ProfileDetail clicked={this.state.clicked}/>
          </div>
          <br/>
          {/* <div className="row">
            <h2 className="matches-header glow2"> Matches </h2>
            <Matches />
          </div> */}
          <div className="row">
            <h2 className="match-sign-header glow2"> your sign's: </h2><br/>
            <hr id="match-profile-hr"/>
            {/* <p style={{fontSize: "1.25vw", opacity: 0.5, "margin": "0 auto"}}> ———— </p> */}
            <div className="match-sign-details">
              <span id="detail-name"> vibe </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.currentUser.sun.vibe}</span><br></br>
              <span id="detail-name"> motto </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">"{this.props.currentUser.sun.motto}"</span><br/><br/>
              <span id="detail-name"> qualities </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.currentUser.sun.keywords}.</span><br></br>
            </div>
          </div>
        </div>
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
