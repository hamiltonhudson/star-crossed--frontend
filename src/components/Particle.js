import React from 'react';
import Particles from 'react-particles-js';
import '../styling/Landing.css';

class Particle extends React.Component {
  render() {
    return (
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
                  // "src": "https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  // "width": 100,
                  // "height": 100
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
    )
  }
}

export default Particle


// ** OLD VERSION **
// class Particle extends React.Component {
//   render() {
//     return(
//       <Particles className="particle"
//         params={{
//           particles: {
//             number: {
//               // "value": 232,
//               "density": {
//                 // "enable": true,
//                 // "value_area": 7654.732123833044
//               }
//             },
//             "color": {
//               "value": "#ffffff"
//             },
//             "shape": {
//               "type": "circle",
//               "stroke": {
//                 "width": 0,
//                 "color": "#000000"
//               },
//               "polygon": {
//                 "nb_sides": 8
//               },
//               "image": {
//                 // "width": 100,
//                 // "height": 100,
//                 // "src": "url(https://images.pexels.com/photos/957061/milky-way-starry-sky-night-sky-star-957061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
//                 // "background-color": "#232741",
//                 // "background-repeat": "no-repeat",
//                 // "background-size": 140,
//                 "retina_detect": true,
//               }
//             },
//             "opacity": {
//               "value": 0.8759538822118227,
//               "random": true,
//               "anim": {
//                 "enable": true,
//                 "speed": 10.329516570435515,
//                 "opacity_min": 0,
//                 "sync": false
//               }
//             },
//             "size": {
//               "value": 1.8,
//               "random": false,
//               "anim": {
//                 "enable": true,
//                 "speed": 10.8,
//                 "size_min": 0.31,
//                 "sync": false
//               }
//             },
//             "line_linked": {
//               "enable": false,
//               "distance": 0,
//               "color": "#ffffff",
//               "opacity": 0.4,
//               "width": 1.4430708547789706
//             },
//             "move": {
//               "enable": true,
//               "speed": 2.3,
//               "direction": "none",
//               "random": true,
//               "straight": false,
//               "out_mode": "out",
//               "bounce": false,
//               "attract": {
//                 "enable": false,
//                 "rotateX": 801.7060304327614,
//                 "rotateY": 881.8766334760375
//               }
//             }
//           },
//           "interactivity": {
//             "detect_on": "canvas",
//             "events": {
//               "onhover": {
//                 "enable": true,
//                 "mode": "bubble"
//               },
//               "onclick": {
//                 "enable": true,
//                 "mode": "push"
//               },
//               "resize": true
//             },
//             "modes": {
//               "grab": {
//                 "distance": 73.08694910712106,
//                 "line_linked": {
//                   "opacity": 0.7568154521972333
//                 }
//               },
//               "bubble": {
//                 "distance": 121.81158184520176,
//                 "size": 8,
//                 "duration": 2.8,
//                 "opacity": 0.008120772123013452,
//                 "speed": 3
//               },
//               "repulse": {
//                 "distance": 284.2270243054708,
//                 "duration": 0.4
//               },
//               "push": {
//                 "particles_nb": 4
//               },
//               "remove": {
//                 "particles_nb": 2
//               }
//             }
//           },
//         }}
//         />
//     )}
// }
// export default Particle
