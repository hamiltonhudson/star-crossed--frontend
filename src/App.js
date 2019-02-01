import React, { Component } from 'react';
import './App.css';

class App extends Component {

  // componentDidMount() {
  //   fetch(`http://localhost:3000/api/v1/users`)
  //     .then(r => console.log(r.json))
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'../images/astro_cal.jpg'}className="App-logo" alt="astrology-calendar" />
          <a
            className="App-link" href="https://reactjs.org"
            target="_blank" rel="noopener noreferrer"
          >
            react link
          </a>
        </header>
      </div>
    );
  }
}

export default App;
