import React, { Component } from 'react';
import './styling/App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfileContainer from './components/ProfileContainer';

class App extends Component {
  state = {
    suns: [],
    currentUser: null,
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
  //
  // })

  render() {
    console.log(this.state.suns)
    return <>
      <Route path='/' exact render={() => <Landing />} />
      <Route path='/signup' component={SignUp} />
      <Route path='/login' component={Login} />
      <Route path='/profile' render={() => <ProfileContainer sun={this.state.suns}/>} />
    </>
  }
}

// render() {
//   console.log(this.state.myPets)
//   return <>
//     <Route path='/' exact render={()=> <Dashboard animalCheck={this.state.animalCheck} checkboxClick={this.state.checkboxClick} pets={this.state.pets} handleFilter={this.handleFilter} handleSorted={this.handleSorted} currentUser={this.state.currentUser} handleMyPets={this.handleMyPets} />}/>
//     <Route path='/signin' component={Signin }/>
//     <Route path='/signup' render={() => <Signup setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser} />}
//     />
//     <Route path='/profile' render={() => <ProfileContainer petObj={this.state.petObj} pets={this.state.pets} myPets={this.state.myPets} currentUser={this.state.currentUser} adopted={this.state.adopted} handleAdopt={this.handleAdopt}/>}
//     />
//   </>
// }

export default App;
