// import React from 'react';
// import { connect }from 'react-redux'
// import { BrowserRouter as Router, withRouter, Switch, Route } from 'react-router-dom';
// import { ActionCableProvider } from 'react-actioncable-provider';
// import { ActionCable } from 'react-actioncable-provider';
// import Landing from './components/Landing';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import NewUser from './components/NewUser';
// import ProfileContainer from './components/ProfileContainer';
// import EditUser from './components/EditUser';
// import MatchContainer from './components/MatchContainer'
// import ChatsBase from './components/ChatsBase';
// import Chat from './components/Chat';
// import Display from './components/Display';
// // import Cable from 'actioncable';
//
// const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable'
//
// const Routes = () => {
//
//   return (
//    <ActionCableProvider url={`ws://localhost:3000/api/v1/cable+?user=${this.props.userId}`}>
//      <Router>
//        <Switch>
//          <Route path='/' exact render={() => <Landing />} />
//          <Route path='/signup' component={SignUp} />
//          <Route path='/newuser' component={NewUser} />
//          <Route path='/signin' component={SignIn} />
//          <Route path='/profile' component={ProfileContainer} />
//          <Route path='/edit' component={EditUser} />
//          <Route path='/matchprofile' component={MatchContainer} />
//          <Route path='/chat' component={ChatsBase} />
//        </Switch>
//      </Router>
//    </ActionCableProvider>
//   )
// }
//
// // <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.currentUser.id}`}>
// //   <Chats />
// // </ActionCableProvider>
//
// const mapStateToProps = (state) => {
//   return {
//     userId: state.users.currentUser.id,
//     currentUser: state.users.currentUser
//   }
// }
//
// export default (withRouter(connect(mapStateToProps)(Routes)));
