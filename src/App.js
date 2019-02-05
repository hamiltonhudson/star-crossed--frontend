import React, { Component } from 'react';
import './styling/App.css';
import { Route } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUserForm from './components/NewUserForm';
import ProfileContainer from './components/ProfileContainer';
import ProfileDetail from './components/ProfileDetail';

const usersAPI = 'http://localhost:3000/api/v1/users/'

class App extends Component {
  state = {
    suns: [],
    // users: [],
    currentUser: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/suns')
    .then(response => response.json())
    .then(data => {
      this.setState({
          suns: data
      })
    })
  }

  // setCurrentUser = userObject => this.setState({currentUser: userObjet}, () {
  // })
  setCurrentUser = (userObject) => {
    this.setState({
      currentUser: userObject
    })
  }

  handleNewUser = values => {
    console.log(values)
  }

  render() {
    console.log(this.state.suns)
    console.log(this.state.currentUser)
    return <>
      <Route path='/' exact render={() => <Landing />} />
      <Route path='/signin' component={SignIn} />
      {/* <Route path='/signin' render={() => <SignIn setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />} /> */}
      <Route path='/signup' component={SignUp} />
      {/* <Route path='/signup' render={() => <SignUp setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser}/>} /> */}
      <Route path='/newuser' component={NewUserForm} />
      {/* <Route path='/newuserform' render{() => <NewUserForm handleNewUser={this.handleNewUser} />}/> */}
      {/* <NewUserForm onSubmit={this.handleNewUser}/> */}
      <Route path='/profile' render={() => <ProfileContainer currentUser={this.state.currentUser} />} />
    </>
  }
}

export default App;
