// import React, { Component } from 'react';
// import Script from 'react-load-script';
// import '../styling/App.css';
//
// window.onSpotifyWebPlaybackSDKReady = () => {
//   const token = 'BQBWwsnCd4Ozc6QPUYohT5A0zcsbJafmLfhDDuB9xTJgais3Ha3nnQgTJPQ88nS2xA7fQxMIyFLIWuFTbNWtdq0WXfTaUAIOVwS_qzIOA9tZ5sejjrjgvhRcZJVNE_dZlGq0vUJaHFVa3BZnon7BRn84jsnM7pIuNCktssC7FcbLl0HiEACZkO_8MmZD';
//   const player = new Spotify.Player({
//     name: 'Web Playback SDK Quick Start Player',
//     getOAuthToken: cb => { cb(token); }
//   });
//
//   // Error handling
//   player.addListener('initialization_error', ({ message }) =>   { console.error(message); });
//   player.addListener('authentication_error', ({ message }) =>   { console.error(message); });
//   player.addListener('account_error', ({ message }) => {  console.error(message); });
//   player.addListener('playback_error', ({ message }) => { console.error(message); });
//
//   // Playback status updates
//   player.addListener('player_state_changed', state => {   console.log(state); });
//
//   // Ready
//   player.addListener('ready', ({ device_id }) => {
//     console.log('Ready with Device ID', device_id);
//   });
//
//   // Not Ready
//   player.addListener('not_ready', ({ device_id }) => {
//     console.log('Device ID has gone offline', device_id);
//   });
//
//   // Connect to the player!
//   player.connect();
// };
//
// class Spotify extends Component {
//
//   constructor(props) {
//     super(props);
//     this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
//     this.handleLoadFailure = this.handleLoadSuccess.bind(this);
//     this.cb = this.cb.bind(this);
//   }
//
//   componentDidMount() {
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       this.handleLoadSuccess();
//     };
//   }
//
//   handleLoadSuccess() {
//     this.setState({ scriptLoaded: true });
//     console.log("Script loaded");
//     const token = 'BQBWwsnCd4Ozc6QPUYohT5A0zcsbJafmLfhDDuB9xTJgais3Ha3nnQgTJPQ88nS2xA7fQxMIyFLIWuFTbNWtdq0WXfTaUAIOVwS_qzIOA9tZ5sejjrjgvhRcZJVNE_dZlGq0vUJaHFVa3BZnon7BRn84jsnM7pIuNCktssC7FcbLl0HiEACZkO_8MmZD';
//     const player = new window.Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(token); }
//     });
//     console.log(player);
//
//     // Error handling
//     player.addListener('initialization_error', ({ message }) => { console.error(message); });
//     player.addListener('authentication_error', ({ message }) => { console.error(message); });
//     player.addListener('account_error', ({ message }) => { console.error(message); });
//     player.addListener('playback_error', ({ message }) => { console.error(message); });
//
//     // Playback status updates
//     player.addListener('player_state_changed', state => { console.log(state); });
//
//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });
//
//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });
//
//     // Connect to the player!
//     player.connect();
//   }
//
//   cb(token) {
//     return(token);
//   }
//
//   handleScriptCreate() {
//     this.setState({ scriptLoaded: false });
//     console.log("Script created");
//   }
//
//   handleScriptError() {
//     this.setState({ scriptError: true });
//     console.log("Script error");
//   }
//
//   handleScriptLoad() {
//     this.setState({ scriptLoaded: true});
//     console.log("Script loaded");
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <Script
//             url="https://sdk.scdn.co/spotify-player.js"
//             onCreate={this.handleScriptCreate.bind(this)}
//             onError={this.handleScriptError.bind(this)}
//             onLoad={this.handleScriptLoad.bind(this)}
//           />
//         </header>
//       </div>
//     );
//   }
// }
//
// export default Spotify;
