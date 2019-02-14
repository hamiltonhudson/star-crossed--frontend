import React, { Component } from 'react';
import './styling/App.css';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
// import { API_WS_ROOT } from '../constants/ActionTypes';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUser from './components/NewUser';
import ProfileContainer from './components/ProfileContainer';
import EditUser from './components/EditUser';
import MatchContainer from './components/MatchContainer'
import Chat from './components/Chat';
import ChatsBase from './components/ChatsBase';
import Cable from 'actioncable';
import ChatsCable from 'actioncable';
import ConversationsCable from 'actioncable';
import Display from './components/Display';
// import { setUserId } from '../actions'

// import { setSuns } from './actions';

class App extends Component {
  // state = {
  //   chats: [],
  //   conversation: []
  // }

// ---------------------
//   componentDidMount = () => {
//     fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/`)
//       .then(r => r.json())
//       .then(user => {
//         this.props.setCurrentUser(user)
//       })
//
//       fetch (`http://localhost:3000/api/v1/users/${this.props.user.id}/matches`)
//       .then (r => r.json())
//       .then(matches => {
//         this.props.findMatches(matches)
//       })
//     }
// -----------------------
// routerFunction = () => {
// return (
//   this.props.userId ?
//     <ActionCableProvider url={`ws://localhost:3000/api/v1/cable+?user=${this.props.userId}`}>
//       <Switch>
//         <Route
//           path="/profile"
//           component={ProfileContainer}
//         />
//         <Route
//           path='/new'
//           component={NewUser}
//         />
//         <Route
//           path="/edit"
//           component={EditUser}
//         />
//         <Route
//           path="/matchprofile"
//           component={MatchContainer}
//         />
//         <Route
//           path='/chat'
//           component={ChatsBase}
//         />
//         <Route
//           path='/display'
//           component={Display}
//         />
//         <Route
//           path='/'
//           component={Landing}
//         />
//         <Route path='/signin'
//           component={SignIn}
//         />
//       </Switch>
//     </ActionCableProvider>
//       :
//       <Route
//         path='/'
//         component={Landing}
//       />
//     )
//   };
//
// render() {
//   return (
//     <div>
//       {this.routerFunction()}
//     </div>
//   )
// }
// }


  render() {
    return (
       <Router>
         <Switch>
           <Route path='/' exact render={() => <Landing />} />
           <Route path='/signup' component={SignUp} />
           <Route path='/newuser' component={NewUser} />
           <Route path='/signin' component={SignIn} />
           <Route path='/profile' component={ProfileContainer} />
           <Route path='/edit' component={EditUser} />
           <Route path='/matchprofile' component={MatchContainer} />
           <Route path='/chat' component={ChatsBase} />

         </Switch>
       </Router>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.users.userId,
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps)(App);
// export default App;
// export default (withRouter(connect(mapStateToProps)(App)));
