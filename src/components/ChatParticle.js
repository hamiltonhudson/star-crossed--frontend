import React from 'react';
import Particles from 'react-particles-js';
import '../styling/Accepted.css';

class ChatParticle extends React.Component {
  render() {
    return (
      <Particles className="snow"
        params={
          {
            "particles": {
              "number": {
                "value": 700,
                "density": {
                  "enable": true,
                  "value_area": 700
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
    )
  }
}

export default ChatParticle
