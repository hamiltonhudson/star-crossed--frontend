import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUser from './components/NewUser';
import MatchesContainer from './components/MatchesContainer';
import Profile from './components/Profile';
import MatchProfile from './components/MatchProfile'
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
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Landing />} />
          <Route path='/signup' component={SignUp} />
          <Route path='/newuser' component={NewUser} />
          <Route path='/signin' component={SignIn} />
          <Route path='/matches' component={MatchesContainer} />
          <Route path='/profile' component={Profile} />
          <Route path='/matchprofile' component={MatchProfile} />
          <Route path='/edit' component={EditUser} />
          <Route path='/chat' component={ChatsBase} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.users.userId
  }
}

export default connect(mapStateToProps)(App);
