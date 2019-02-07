import React, { Component } from 'react';
import './styling/App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Landing from './components/Landing';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NewUser from './components/NewUser';
import ProfileContainer from './components/ProfileContainer';
import ProfileDetail from './components/ProfileDetail';
import MatchContainer from './components/MatchContainer'
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
    // .then(
    //   fetch('http://localhost:3000/api/v1/users')
    //   .then(r => r.json())
    //   .then(data => {
    //     this.props.setUsers(data)
    //     // const currentUser = this.props.getUser.find(data => data.id === 1)
    //     this.props.getUser(data)
    //   })
    // )
  }

  // getUser = () => {
  //   fetch(`http://localhost:3000/api/v1/users/1`)
  //   .then(r => r.json())
  //   .then(result => {
  //     this.props.getUser(result)
  //   })
  // }
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
    console.log("props in app is", "users", this.props.users, "suns", this.props.suns)
    console.log("props in app is", "currentUser", this.props.currentUser)
    return (
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Landing />} />
          <Route path='/signin' exact component={SignIn} />
          {/* <Route path='/signin' render={() => <SignIn setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />} /> */}
          <Route path='/signup' component={SignUp} />
          {/* <Route path='/signup' render={() => <SignUp setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser}/>} /> */}
          <Route path='/newuser' component={NewUser} />
          {/* <Route path='/newuserform' render{() => <NewUser handleNewUser={this.handleNewUser} />}/> */}
          {/* <NewUser onSubmit={this.handleNewUser}/> */}
          {/* <Route path='/profile' render={() => <ProfileContainer/>} /> */}
          <Route path='/profile' component={ProfileContainer} />
          {/* <Route path='/profile' render={() => <ProfileContainer currentUser={this.props.currentUser} />} /> */}
          <Route path='/matchprofile' component={MatchContainer} />
          {/* <Route path={`${match.url}/:id`} component={MatchContainer} /> */}
        </Switch>
        </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    suns: state.suns.suns,
    // users: state.users.users,
    // curentUser: state.currentUser.currentUser
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
    // setUsers: (users) => dispatch(setUsers(users)),
    // getUser: (currentUser) => dispatch(getUser(currentUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
