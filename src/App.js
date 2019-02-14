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

// const API_ROOT = 'ws://localhost:3000/api/v1/cable'

class App extends Component {
//   state = {
//     chats: [],
//     conversation: []
//   }
//
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
// const mapStateToProps = (state) => {
//   return {
//     userId: state.users.userId,
//     currentUser: state.users.currentUser
//   }
// }

export default App;
// export default connect(mapStateToProps)(App);
// export default (withRouter(connect(mapStateToProps)(App)));


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
