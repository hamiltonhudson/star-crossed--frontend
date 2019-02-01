import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/suns')
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

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
        </header>
      </div>
    );
  }
}

export default App;
