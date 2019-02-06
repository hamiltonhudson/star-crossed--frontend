import React, { Component } from 'react';
import './styling/App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUserForm from './components/NewUserForm';
import ProfileContainer from './components/ProfileContainer';
import ProfileDetail from './components/ProfileDetail';
import { setSuns, setUsers, getUser } from './actions'

class App extends Component {
  state = {
    search: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/suns')
    .then(response => response.json())
    .then(data => {
      this.props.setSuns(data)
    })
    .then(
      fetch('http://localhost:3000/api/v1/users')
      .then(r => r.json())
      .then(data => {
        this.props.setUsers(data)
      })
    )
  }
  // getUsers = () => {
  //   fetch('http://localhost:3000/api/v1/users')
  //   .then(r => r.json())
  //   .then(data => {
  //     console.log("data", data)
  //     this.props.setUsers(data)
  //   })
  // }

  // setUser = (currentUser) => {
  //   fetch(`usersAPI/#{curentUser.id}`)
  //   .then(r => r.json())
  //   .then(result => {
  //     console.log(result)
  //     this.props.setUser(result)
  //   })
  // }
  // findCurrentUser = (userInput) => {
  //   let currentUser = this.props.users.find((user) => user.first_name === userInput)
  //   this.props.getUser(currentUser)
  // }

  // findCurrentUser = userObject => this.setState({currentUser: userObjet}, () {
  // })
  // setCurrentUser = (userObject) => {
  //   this.setState({
  //     currentUser: userObject
  //   })
  // }

  handleNewUser = values => {
    console.log(values)
  }

  render() {
    console.log("state in app is", this.state)
    console.log("props in app is", "users", this.props.users, "suns", this.props.suns, "user", this.props.user)
    return <>
      <Route path='/' exact render={() => <Landing />} />
      {/* <Route path='/signin' component={SignIn} /> */}
      <Route path='/signin' render={() => <SignIn setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signup' render={() => <SignUp setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser}/>} />
      <Route path='/newuser' component={NewUserForm} />
      {/* <Route path='/newuserform' render{() => <NewUserForm handleNewUser={this.handleNewUser} />}/> */}
      {/* <NewUserForm onSubmit={this.handleNewUser}/> */}
      <Route path='/profile' render={() => <ProfileContainer />} />
      {/* <Route path='/profile' render={() => <ProfileContainer currentUser={this.props.currentUser} />} /> */}
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    suns: state.suns.suns,
    users: state.users.users,
    // curentUser: state.users.currentUser
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setSuns: (suns) => dispatch({ type: 'GET_SUNS', payload: suns })
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    setSuns: (suns) => dispatch(setSuns(suns)),
    setUsers: (users) => dispatch(setUsers(users)),
    // getUser: () => dispatch({ type: 'GET_CURRENT_USER', paylod: 'who is this user?'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
