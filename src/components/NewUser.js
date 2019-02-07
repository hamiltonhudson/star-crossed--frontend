import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';
import { reduxForm, Field, propTypes } from 'redux-form';
import '../styling/Login.css'
import ProfileContainer from './ProfileContainer'
import { getUser, addUserDetails, setUsers } from '../actions'

class NewUser extends React.Component {
// const NewUserForm = (props) => {
  state = {
    first_name: '',
    last_name: '',
    birth_year: '',
    birth_month: '',
    brth_day: ''
  }

  // state = {
  //   newUser: {
  //     first_name: '',
  //     last_name: '',
  //     birth_year: '',
  //     birth_month: '',
  //     brth_day: ''
  //   }
  // }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
    // this.setState({
    //   newUser: {
    //     [event.target.name]: event.target.value
    //   }
    // })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addUserDetails(this.state)
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.dispatch({
  //     type: 'ADD_USER_DETAILS',
  //     payload: this.state
  //   });
  // };


  render() {
    console.log(this.props.details)
    return(
      // const newUserForm =
      <div className="login-container">
        <h1 className="signupHeader">Create New Account</h1>
        <div className="signupform">
          <div>
            <form onSubmit={event => this.handleSubmit(event)}>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                value={this.state.first_name}
                // value={this.state.newUser.first_name}
                onChange={event => this.handleChange(event)}
              />
              <label>Last Name</label>
              <input
                type='text'
                name='last_name'
                value={this.state.last_name}
                // value={this.state.newUser.last_name}
                onChange={event => this.handleChange(event)}
              />
              <label>Birth Year</label>
              <input
                type='number'
                name='birth_year'
                value={this.state.birth_year}
                // value={this.state.newUser.birth_year}
                onChange={event => this.handleChange(event)}
              />
              <label>Birth Month</label>
              <input
                type='number'
                name='birth_month'
                value={this.state.birth_month}
                // value={this.state.newUser.birth_month}
                onChange={event => this.handleChange(event)}
              />
              <label>Birth Day</label>
              <input
                type='number'
                name='birth_day'
                value={this.state.birth_day}
                // value={this.state.newUser.birth_day}
                onChange={event => this.handleChange(event)}
              />
              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
            </form>
            {this.state.first_name} {this.state.last_name} <br/>
            {this.state.birth_year} {this.state.birth_month} {this.state.birth_day} <br/>
          </div>
          {/* <ProfileContainer /> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.details.details
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // addUserDetails: formData => dispatch({
    //   type: 'ADD_USER_DETAILS',
    //   payload: formData
    // })
    addUserDetails: (details) => dispatch(addUserDetails(details))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

// export default connect()(NewUser);
