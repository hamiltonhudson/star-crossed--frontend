import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from '../routes'
import '../styling/App.css';
import '../styling/Landing.css';
// import '../styling/index.css'
import Particles from 'react-particles-js';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import ProfileContainer from './ProfileContainer';
import { setCurrentUser } from '../actions'
// import AcceptedList from './AcceptedList';
// import ChatsCable from './ChatsCable'

class Landing extends React.Component {
  render() {
    let nonExistentUser = {first_name: "", last_name: "", birth_date: " - - ", location: " , "}
    this.props.setCurrentUser(nonExistentUser)
    console.log("this.props.currentUser in Landing", this.props.currentUser)
    return (
      // <ActionCableProvider url={`ws://localhost:3000/api/v1/cable+?user=${this.props.userId}`}>
        <div className="landing">
          <header className="App-header">
            <h1 id="App-title" className="glow">Star-Crossed</h1>
            <br/><br/>
            <Link to='/signin' className="App-link">Sign In</Link>
            <span style={{fontSize: 12, opacity: 0.5, paddingTop: 10, paddingBottom: 10}}> ———— </span>
            <Link to='/newuser' className="App-link">Sign Up</Link>
            <br/>
            {/* <Link to='/profile' className="App-link">View Profile</Link> */}
          </header>
          <Particles className="particle"
            params={
              {
                "particles": {
                  "number": {
                    "value": 432,
                    "density": {
                      "enable": true,
                      "value_area":5854.732123833044
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 1,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 8
                    },
                    "image": {
                      "src": "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.8759538822118227,
                    "random": true,
                    "anim": {
                      "enable": true,
                      "speed": 3.329516570435515,
                      "opacity_min": 0,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 1.9,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 3.9,
                      "size_min": 0.31,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 0,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1.4430708547789706
                  },
                  "move": {
                    "enable": true,
                    "speed": 1.4,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 803.7060304327614,
                      "rotateY": 884.8766334760375
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "window",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "bubble"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 72.08694910712106,
                      "line_linked": {
                        "opacity": 0.7568154521972333
                      }
                    },
                    "bubble": {
                      "distance": 120.81158184520176,
                      "size": 6,
                      "duration": 2.8,
                      "opacity": 0.008120772123013452,
                      "speed": 5
                    },
                    "repulse": {
                      "distance": 284.2270243054708,
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
      // </ActionCableProvider>
    )
  }
}

// export default Landing;

const mapStateToProps = (state) => {
  return {
    // chatEnabled: state.users.chatEnabled
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // findMatchedUsers: (matches) => dispatch(findMatchedUsers(matches))
    setCurrentUser: (userObj) => dispatch(setCurrentUser(userObj))
  }
}

export default connect(null, mapDispatchToProps)(Landing);
