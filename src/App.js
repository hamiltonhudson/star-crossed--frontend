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
import EditUser from './components/EditUser';
import ProfileDetail from './components/ProfileDetail';
import MatchContainer from './components/MatchContainer'
import { setSuns } from './actions';
// import Particles from 'react-particles-js';

class App extends Component {
  // state = {
  //   search: ''
  // }
  // componentDidMount() {
  //   fetch('http://localhost:3000/api/v1/suns')
  //   .then(response => response.json())
  //   .then(data => {
  //     this.props.setSuns(data)
  //   })
    // .then(
    //   fetch('http://localhost:3000/api/v1/users')
    //   .then(r => r.json())
    //   .then(data => {
    //     this.props.setUsers(data)
    //     // const currentUser = this.props.getUser.find(data => data.id === 1)
    //     this.props.getUser(data)
    //   })
    // )
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
        </Switch>
      </Router>
    )
  }
}
// const mapStateToProps = (state) => {
//   return {
//     suns: state.suns.suns,
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setSuns: (suns) => dispatch(setSuns(suns)),
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
