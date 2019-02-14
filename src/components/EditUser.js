import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/Form.css'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { setUsers, setCurrentUser, findMatches, findMatchedUsers } from '../actions'
import ProfileContainer from './ProfileContainer'

const usersAPI = 'http://localhost:3000/api/v1/users/'
const CLOUDINARY_UPLOAD_PRESET = 'h8pruce6';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ehh/image/upload';

class EditUser extends React.Component {
  state = {
    first_name: this.props.currentUser.first_name,
    last_name: this.props.currentUser.last_name,
    // birth_year: this.props.currentUser.birth_year,
    // birth_month: this.props.currentUser.birth_month,
    // birth_day: this.props.currentUser.birth_day,
    gender: this.props.currentUser.gender,
    gender_pref: this.props.currentUser.gender_pref,
    location: this.props.currentUser.location,
    bio: this.props.currentUser.bio,
    uploadedFileCloudinaryUrl: this.props.currentUser.photo,
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
    // const userId = this.props.userDetails.id
    // console.log(userId)
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
          birth_year: this.props.birth_year,
          birth_month: this.props.birth_month,
          birth_day: this.props.birth_day,
          gender: this.state.gender,
          gender_pref: this.state.gender_pref,
          location: this.state.location,
          bio: this.state.bio,
          photo: this.state.uploadedFileCloudinaryUrl
        }
      })
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`, userConfig)
    .then(r => r.json())
    .then(result => {
      console.log("result", result)
      if (result.errors){
        alert('Please enter details correctly')
        return <Redirect to="/edit" />
      } else {
        this.props.setCurrentUser(result)
      // fetch(`http://localhost:3000/api/v1/users/${result.id}/updated_matches`)
      // .then(r => r.json())
      // .then(results => {
      //   (console.log(results))
      //   const matched = results.filter(result => result.status === "matched")
      //   this.props.findMatches(matched)
      //   matched.map(m => this.props.findMatchedUsers(m.matched_user))
      // })
        this.setState({
          updated: true
        })
      }
    })
    console.log(this.state.updated)
  }

  profileRedirect = () => {
    console.log(this.state.updated)
    if (this.state.updated) {
      return <Redirect to="/profile" />
    }
  }

  render() {
    // console.log(this.props.currentUser)
    // console.log(this.state)
    return (
      <div>
        <Link to='/profile' className="form-link"> ◁ Back</Link>
        <div className="form-container">
          <h1 className="signupHeader">edit profile</h1>
          <br/><br/>
          <div className="form">
            <form onSubmit={event => this.handleSubmit(event)}>
              <br/>
              <label>First Name</label>
              <input
                type='text'
                name='first_name'
                value={this.state.first_name}
                onChange={event => this.handleChange(event)}
                className="input"
              />
              <label>Last Name</label>
              <input
                type='text'
                name='last_name'
                value={this.state.last_name}
                onChange={event => this.handleChange(event)}
                className="input"
              />
              {/* <label>Birth Year</label>
                <input
                type='number'
                name='birth_year'
                value={this.state.birth_year}
                onChange={event => this.handleChange(event)}
                className="input"
                />
                <label>Birth Month</label>
                <input
                type='number'
                name='birth_month'
                value={this.state.birth_month}
                onChange={event => this.handleChange(event)}
                className="input"
                />
                <label>Birth Day</label>
                <input
                type='number'
                name='birth_day'
                value={this.state.birth_day}
                onChange={event => this.handleChange(event)}
                className="input"
              /> */}
              <label>Gender</label>
              <input
                type='text'
                name='gender'
                value={this.state.gender}
                onChange={event => this.handleChange(event)}
                className="input"
              />
              <label>Gender Preference</label>
              <input
                type='text'
                name='gender_pref'
                value={this.state.gender_pref}
                onChange={event => this.handleChange(event)}
                className="input"
              />
              <label>Location</label>
              <input
                type='text'
                name='location'
                value={this.state.location}
                onChange={event => this.handleChange(event)}
                className="input"
              />
              <label>Bio</label>
              <input
                type='text'
                name='bio'
                value={this.state.bio}
                onChange={event => this.handleChange(event)}
                className="input"
              />
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
                        // <p>Click to select photo or drag and drop.</p>
                        <p>Click to select photo.</p>
                      }
                    </div>
                  )
                }}
              </Dropzone>
              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
              <button className="delete-button">Delete</button>
            </form>
            <br/><br/>
          </div>
          {this.profileRedirect()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    // matches: state.matches.matches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatches(matchedUsers))
  }
}

// export default EditUser;
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
