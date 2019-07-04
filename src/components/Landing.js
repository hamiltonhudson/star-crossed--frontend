import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from '../routes'
import Particle from './Particle';
import Adapter from './Adapter';
import '../styling/App.css';
import '../styling/Landing.css';
import star from '../images/Star.png';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import { setCurrentUser } from '../actions'
// import AcceptedList from './AcceptedList';
// import ChatsCable from './ChatsCable'

class Landing extends React.Component {

  render() {
    Adapter.signOut()
    return (
      // <ActionCableProvider url={`ws://localhost:3000/api/v1/cable+?user=${this.props.userId}`}>
        <div className="landing">
          <header className="App-header">
            <h1 id="App-title" className="glow1">Star-Crossed</h1>
            <br/><br/>
            <Link to='/signin' className="App-link">Sign In</Link>
            {/* <hr/> */}
            <p style={{fontSize: "1.25vw", opacity: 0.5, "margin": "0 auto"}}> ———— </p>
            <Link to='/signup' className="App-link">Sign Up</Link>
          </header>
          <Particle className="particle" />
        </div>
      // </ActionCableProvider>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    // chatEnabled: state.users.chatEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setCurrentUser: (userObj) => dispatch(setCurrentUser(userObj)),
    // findMatchedUsers: (matchObj) => dispatch(findMatchedUsers(matchObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
