import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/Form.css'
import { editUserDetails, setUsers, setUserId, findMatches } from '../actions'
// import ProfileContainer from './ProfileContainer'

const usersAPI = 'http://localhost:3000/api/v1/users/'

class EditUser extends React.Component {
  state = {
    first_name: this.props.userDetails.first_name,
    last_name: this.props.userDetails.last_name,
    birth_year: this.props.userDetails.birth_year,
    birth_month: this.props.userDetails.birth_month,
    birth_day: this.props.userDetails.birth_day,
    // first_name: '',
    // last_name: '',
    // birth_year: '',
    // birth_month: '',
    // birth_day: '',
    updated: false
  }

  handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log("state", this.state)
    console.log("props", this.props)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const userId = this.props.userDetails.id
    console.log(userId)
    const userConfig = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          birth_year: this.state.birth_year,
          birth_month: this.state.birth_month,
          birth_day: this.state.birth_day
        }
      })
    }
    fetch(`http://localhost:3000/api/v1/users/${userId}`, userConfig)
    .then(r => r.json())
    .then(result => {
      console.log("result", result)
      this.props.editUserDetails(result)
      if (result.errors){
        alert('Please enter details correctly')
        return <Redirect to="/edit" />
      } else {
        // this.props.editUserDetails(updatedUser)
      fetch(`http://localhost:3000/api/v1/users/${result.id}/update_matches`)
      .then(r => r.json())
      .then(results => {
        (console.log(results))
        this.props.findMatches(results)
      })
        this.setState({
          updated: true
        })
      }
    })
    console.log(this.state.updated)
    // console.log("state", this.state.updatedUser, this.state.updatedUser.matchedUsers)
    // console.log("props", this.props)
  }

  profileRedirect = () => {
    console.log(this.state.updated)
    if (this.state.updated) {
      return <Redirect to="/profile" />
    }
  }

  render() {
    console.log(this.props.currentUser)
    return (
      <div className="form-container">
        <Link to='/profile'>Back</Link>
        <h1 className="signupHeader">Edit Profile</h1>
        <div className="signupform">
          <div>
            <form onSubmit={event => this.handleSubmit(event)}>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                value={this.state.first_name}
                onChange={event => this.handleChange(event)}
                className="input-field"
              />
              <label>Last Name</label>
              <input
                type='text'
                name='last_name'
                value={this.state.last_name}
                onChange={event => this.handleChange(event)}
                className="input-field"
              />
              <label>Birth Year</label>
              <input
                type='number'
                name='birth_year'
                value={this.state.birth_year}
                onChange={event => this.handleChange(event)}
                className="input-field"
              />
              <label>Birth Month</label>
              <input
                type='number'
                name='birth_month'
                value={this.state.birth_month}
                onChange={event => this.handleChange(event)}
                className="input-field"
              />
              <label>Birth Day</label>
              <input
                type='number'
                name='birth_day'
                value={this.state.birth_day}
                onChange={event => this.handleChange(event)}
                className="input-field"
              />
              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
            </form>
            <br/><br/>
          </div>
          {this.profileRedirect()}
          <Link to='/profile'>Delete</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails.userDetails,
    currentUser: state.currentUser.currentUser,
    matches: state.matches.matches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUserDetails: (currentUser) => dispatch(editUserDetails(currentUser)),
    findMatches: (matchedUsers) => dispatch(findMatches(matchedUsers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
