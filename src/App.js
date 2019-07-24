import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants/ActionTypes';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUser from './components/NewUser';
import MatchesContainer from './components/MatchesContainer';
import ProfileContainer from './components/ProfileContainer';
import MatchProfContainer from './components/MatchProfContainer'
import EditUser from './components/EditUser';
import ChatsBase from './components/ChatsBase';
import './styling/App.css';


class App extends Component {

  pageReload = () => {
    const delete_cookie = (name) => {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
      delete_cookie('X-Authorization');
      localStorage.removeItem('token')
  }

  componentDidMount() {
    this.pageReload()
  }

  render() {
    return (
      // <ActionCableProvider url={API_WS_ROOT}>
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Landing />} />
          <Route path='/signup' component={SignUp} />
          <Route path='/newuser' component={NewUser} />
          <Route path='/signin' component={SignIn} />
          <Route path='/matches' component={MatchesContainer} />
          <Route path='/profile' component={ProfileContainer} />
          <Route path='/matchprofile' component={MatchProfContainer} />
          <Route path='/edit' component={EditUser} />
          <Route path='/chat' component={ChatsBase} />
          {/* <Route path='/chat' component={ChatTest} /> */}
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
