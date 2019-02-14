import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ActionCable from 'actioncable';
// import { ActionCableProvider } from 'actioncable';
import '../styling/Accepted.css';
import '../styling/App.css';
import Particles from 'react-particles-js';
import ChatsContainer from './ChatsContainer'
import Chat from './Chat';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import { API_WS_ROOT } from '../constants/ActionTypes';
import { viewMatch, enableChat } from '../actions';
// import Cable from 'actioncable';
import App from '../App';
import Display from './Display'

class ChatsBase extends React.Component {

  // state = {
  //   chatWith: ''
  // }

//   handleStartChat = (selectedUser) => {
//   // this.props.selectUser(this.props.acceptedUsers.find(acceptedUser.id === selectedUser.id))
//     console.log(selectedUser)
//     this.props.viewMatch(selectedUser)
//     this.setState({
//       chatWith: selectedUser.first_name
//   })
// }

  // chatUser = () => {
  //   return this.props.chat.users.find(user => user.id !== this.props.userId)
  // }
  //
  // initalizeConvo = () => {
  //   return this.props.chat.conversations.length === 0
  //   ? <div className="initial-convo">
  //     <p>Start chatting</p>
  //   </div>
  //   : <div className="initial-convo">
  //     {/* {(this.props.conversation.messages[(this.props.conversation.messages.length)-1].user.username)}: {`${this.props.conversation.messages[(this.props.conversation.messages.length)-1].text.substring(0, 15)}...`} */}
  //     {(this.props.chat.conversations[(this.props.chat.conversations.length)-1].user.first_name)}: {`${this.props.chat.conversations[(this.props.chat.conversations.length)-1].message.substring(0, 15)}...`}
  //   </div>
  //   }

  render() {
    console.log("ChatsBase PROPS", this.props)
    // const generateAccepted = () => {
    //   return this.props.acceptedUsers.map(acceptedUser => {
    //     return (
    //       <div onClick={() => this.handleStartChat(acceptedUser)} key={acceptedUser.id} className="users-header">
    //         {acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}
    //       </div>
    //     )
    //   })
    // }
    return (
      <ActionCableProvider url={`${API_WS_ROOT}+?user=${this.props.userId}`}>
        <div className="accepted">
          <div className="Accepted-header">
            <Link to='/profile' className="back-link"> ◁ Back</Link>
            <div className="accepted-container">
              {/* Accepted */}
              <div className="users-card">
                {/* {generateAccepted()} */}
                <div className="App">
                  <div style={{"fontColor": "white"}}>
                    {/* <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.currentUser.id}`}> */}
                    {/* { this.initializeConvo()} */}
                    <Display />
                    {/* </ActionCableProvider> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Particles className="snow"
            params={
              {
                "particles": {
                  "number": {
                    "value": 700,
                    "density": {
                      "enable": true,
                      "value_area": 400
                    }
                  },
                  "color": {
                    "value": "#fff"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 1,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.7,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 500,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 3
                  },
                  "move": {
                    "enable": true,
                    "speed": 0.9,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 721.5354273894845
                    }
                  }
                },
                "interactivity": {
                  // "detect_on": "canvas",
                  "detect_on": "window",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "bubble"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "repulse"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 0.5
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 4,
                      "duration": 0.3,
                      "opacity": 1,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
              }
            }
          />
        </div>
      </ActionCableProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userId: state.users.currentUser.id,
    acceptedUsers: state.matches.acceptedUsers,
    chats: state.chats.chats,
    // chatEnabled: state.users.chatEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase);
