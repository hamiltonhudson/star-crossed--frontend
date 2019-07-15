import React, { Component } from 'react';
import './styling/App.css';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants/ActionTypes';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUser from './components/NewUser';
import MatchesContainer from './components/MatchesContainer';
import Matches from './components/Matches';
import ProfileContainer from './components/ProfileContainer';
import EditUser from './components/EditUser';
import MatchProfContainer from './components/MatchProfContainer'
import ChatsBase from './components/ChatsBase';
// import ChatsList from './components/ChatsList'
import Spotify from './components/Spotify'

const TOKEN = localStorage.getItem('token')

class App extends Component {

  render() {
    console.log("TOKEN IN APP", TOKEN)
    console.log("document.cookie", document.cookie)
    console.log("this.props.userId", this.props.userId)
    return (
      // <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.userId}`}>
        // <ActionCableProvider url={API_WS_ROOT+`?token=${TOKEN}`}>
           // <ActionCableProvider url={API_WS_ROOT}>
             <Router>
               <Switch>
                 <Route path='/' exact render={() => <Landing />} />
                 <Route path='/signup' component={SignUp} />
                 <Route path='/newuser' component={NewUser} />
                 <Route path='/signin' component={SignIn} />
                 <Route path='/matches' component={MatchesContainer} />
                 <Route path='/profile' component={ProfileContainer} />
                 {/* <Route path='/profile' component={ProfileContainer} spotify={Spotify}/> */}
                 <Route path='/matchprofile' component={MatchProfContainer} />
                 <Route path='/edit' component={EditUser} />
                 <Route path='/chat' component={ChatsBase} />
                 {/* <Route path='/chat' component={ChatsList} /> */}
               </Switch>
             </Router>
             // </ActionCableProvider>
        )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.users.userId
  }
}

// export default App;
export default connect(mapStateToProps)(App);
