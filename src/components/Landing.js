import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import ProfileContainer from './ProfileContainer'

class Landing extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">App.js</h1>
          <img src={'../images/astro_cal.jpg'} className="App-image" alt="astrology-calendar" />
          {/* <a
            className="App-link" href="https://reactjs.org"
            target="_blank" rel="noopener noreferrer"
            >
            react link
          </a> */}
          <Link to='/signup'>Sign Up</Link>
          <br/>
          <Link to='/login'>Login</Link>
          <br/>
          <Link to='/profile'>View Profile</Link>
        </header>
      </div>
    )
  }
}

export default Landing;
