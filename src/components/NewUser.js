import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/Form.css'
import Dropzone from 'react-dropzone';
import request from 'superagent';
// import { reduxForm, Field, propTypes } from 'redux-form';
// import ProfileContainer from './ProfileContainer'
import { setUsers, setCurrentUser, findMatches, findMatchedUsers } from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'
const CLOUDINARY_UPLOAD_PRESET = 'h8pruce6';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ehh/image/upload';

class NewUser extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    birth_month: '',
    birth_day: '',
    birth_year: '',
    gender: '',
    gender_pref: '',
    location: '',
    bio: '',
    uploadedFileCloudinaryUrl: '',
    loggedIn: false
  }

  handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state)
    console.log(this.props)
    const newUserConfig = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          birth_day: this.state.birth_day,
          birth_month: this.state.birth_month,
          birth_year: this.state.birth_year,
          gender: this.state.gender,
          gender_pref: this.state.gender_pref,
          location: this.state.location,
          bio: this.state.bio,
          photo: this.state.uploadedFileCloudinaryUrl
        }
      })
    }
    fetch(usersAPI, newUserConfig)
    .then(r => r.json())
    .then(result => {
      console.log(result)
      if (result.errors){
        alert('Please check your details')
        return <Redirect to="/newuser" />
      } else {
        this.props.setCurrentUser(result)
        // this.props.findMatches(result.matched_users)
        const newUserMatches = result.matches
        this.props.findMatches(result.matches)
        // this.props.findMatches(newUserMatches)
        result.matches.map(m => this.props.findMatchedUsers(m.matched_user))
        // newUserMatches.map(m => this.props.findMatchedUsers(m.matched_user))
        fetch(usersAPI)
        .then(r => r.json())
        .then(results => {
          this.props.setUsers(results)
          this.setState({
            loggedIn: true
          })
        })
      }
    })
  }

  profileRedirect = () => {
    if (this.state.loggedIn) {
      return <Redirect to="/profile" />
    }
  }

  render() {
    return(
      // const newUserForm =
      <div className="form-container">
        <h1 className="signupHeader">Create New Account</h1>
        <div className="form">
          <div>
            <form onSubmit={event => this.handleSubmit(event)}>
              <label>First Name</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='first_name'
                    value={this.state.first_name}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Last Name</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='last_name'
                    value={this.state.last_name}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Birth Month</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='number'
                    placeholder="Enter correctly."
                    name='birth_month'
                    value={this.state.birth_month}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Birth Day</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='number'
                    placeholder="Enter correctly."
                    name='birth_day'
                    value={this.state.birth_day}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Birth Year</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='number'
                    placeholder="Enter correctly."
                    name='birth_year'
                    value={this.state.birth_year}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Gender</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='gender'
                    value={this.state.gender}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Gender Preference</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='gender_pref'
                    value={this.state.gender_pref}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Location</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='location'
                    value={this.state.location}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              <label>Bio</label>
              <span className="form-label">
                <span className="input-field">
                  <input
                    type='text'
                    name='bio'
                    value={this.state.bio}
                    onChange={event => this.handleChange(event)}
                    className="input"
                  />
                </span>
              </span>
              {/* <label>Upload Photo</label> */}
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false}>
                {({getRootProps, getInputProps}) => {
                  return (
                    <div
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {
                        <p>Click to select photo or drag and drop.</p>
                      }
                    </div>
                  )
                }}
              </Dropzone>
              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
            </form>
            <br/>

          </div>
          {this.profileRedirect()}
        </div>
      </div>
    )
  }
}



// const mapStateToProps = (state) => {
//   return {
//     // email: state.email.email,
//     // password: state.password.password,
//     // currentUser: state.users.userDetails,
//     // users: state.users.users,
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (userDetails) => dispatch(setCurrentUser(userDetails)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers))
  }
}

export default connect(null, mapDispatchToProps)(NewUser);
