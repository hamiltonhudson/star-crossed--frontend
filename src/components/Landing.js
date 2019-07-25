import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Particle from './Particle';
import Adapter from './Adapter';
import star from '../images/Star.png';
import '../styling/Landing.css';
import '../styling/App.css';


class Landing extends React.Component {

  render() {
    Adapter.signOut()
    return (
      <div className="landing">
        <header className="App-header">
          <h1 id="App-title" className="glow1">Star-Crossed</h1>
          <br/><br/>
          <Link to='/signin' className="App-link">Sign In</Link>
          {/* {Adapter.signOut()} */}
          <p style={{fontSize: "1.25vw", opacity: 0.5, "margin": "0 auto"}}> ———— </p>
          <Link to='/signup' className="App-link">Sign Up</Link>
        </header>
        <Particle className="particle" />
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
    }
  }

export default connect(mapStateToProps)(Landing);
