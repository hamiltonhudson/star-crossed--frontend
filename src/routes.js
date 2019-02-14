// import React from 'react';
// import { connect }from 'react-redux'
// import { BrowserRouter as Router, withRouter, Switch, Route } from 'react-router-dom';
// import { ActionCableProvider } from 'react-actioncable-provider';
// import { ActionCable } from 'react-actioncable-provider';
// // import { API_WS_ROOT } from '../constants/ActionTypes';
// import Landing from './components/Landing';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import NewUser from './components/NewUser';
// import ProfileContainer from './components/ProfileContainer';
// import EditUser from './components/EditUser';
// import MatchContainer from './components/MatchContainer'
// import ChatsBase from './components/ChatsBase';
// import Chat from './components/Chat';
// // import Cable from 'actioncable';
// import Display from './components/Display';
//
// const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable'
//
// // const routes = () => {
//   // <Router>
//   //   <Switch>
// // return (
// //   <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.currentUser.id}`}>
// //     <Route>
// //       <Route path='/' exact render={() => <Landing />} />
// //       <Route path='/signup' component={SignUp} />
// //       <Route path='/newuser' component={NewUser} />
// //       <Route path='/signin' component={SignIn} />
// //       <Route path='/profile' component={ProfileContainer} />
// //       <Route path='/edit' component={EditUser} />
// //       <Route path='/matchprofile' component={MatchContainer} />
// //       <Route path='/chat' component={ChatsBase} />
// //       {/* </Switch>
// //       </Router> */}
// //     </Route>
// //   </ActionCableProvider>
// //   )
// // }
//
// // {/* <ActionCableProvider url={config.url.API_WS_ROOT+`?user=${this.props.userId}`}> */}
//
//   routerFunction = () => {
//
//     return AdapterUser.getToken()
//       ? !!this.props.userId
//         ? <ActionCableProvider url={config.url.API_WS_ROOT+`?user=${this.props.userId}`}>
//           <Switch>
//             <Route
//               path="/profile"
//               component={ProfileContainer}
//             />
//             <Route
//               path={config.route.URL_HOME}
//               component={HomeContainer}
//             />
//             <Route
//               path={config.route.URL_ROOT}
//               component={HomeContainer}
//             />
//           </Switch>
//         </ActionCableProvider>
//         : <Route
//           path={config.route.URL_ROOT}
//           component={WelcomeContainer}
//           />
//       : <Route
//         path={config.route.URL_ROOT}
//         component={WelcomeContainer}
//         />
//   }
//
//   render() {
//     return (
//       <div>
//         <Header />
//         {this.routerFunction()}
//         <Footer />
//       </div>
//     )
//   }
// }
//
//   const mapStateToProps = (state) => {
//     return {
//       userId: state.users.currentUser.id
//       currentUser: state.users.currentUser
//     }
//   }
//
//   export default (withRouter(connect(mapStateToProps)(routes)));
