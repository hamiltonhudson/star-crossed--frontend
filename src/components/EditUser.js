import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/ActionTypes';
import { setUsers, setCurrentUser, findMatches, findMatchedUsers, findAccepted, findAcceptedUsers, deleteUser, updateMatches, updateMatchedUsers } from '../actions'
import Adapter from './Adapter'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../styling/Form.css'

const CLOUDINARY_UPLOAD_PRESET = 'h8pruce6';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ehh/image/upload';


class EditUser extends React.Component {

  state = {
    first_name: this.props.currentUser.first_name,
    last_name: this.props.currentUser.last_name,
    gender: this.props.currentUser.gender,
    gender_pref: this.props.currentUser.gender_pref,
    city: this.props.city,
    usstate: this.props.usstate,
    bio: this.props.currentUser.bio,
    uploadedFileCloudinaryUrl: this.props.currentUser.photo,
    displayPhoto: '',
    updated: false,
    deleted: false,
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
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
        })
      }
    })
  }

  displayDiffPhotos = () => {
    if (this.state.uploadedFileCloudinaryUrl === this.props.userPhoto) {
      return (
        <div style={{"overflowY": "scroll"}}>
          <img src={this.props.userPhoto} className="form-photo-display" alt={'profile pic'} /><br/><br/>
        </div>
      )
    } else if (this.state.uploadedFileCloudinaryUrl !== this.props.userPhoto) {
      return (
        <div style={{"overflowY": "scroll"}}>
          <img src={this.state.uploadedFileCloudinaryUrl} className="form-photo-display" alt={'profile pic'} />
          <p style={{"margin": "2px 0px 2px 0px"}}> Photo Added! </p>
        </div>
      )
    }
  }

  displayGender = (gender) => {
    if (gender === "F") {
      return "Female"
    } else if (gender === "M")
      return "Male"
    }

  displayGenderOpt = (gender) => {
    if  (gender === "M") {
      return <option value="F" className="input" id="select" type="input">Female</option>
   }
  }

  displayGenderOptions = (gender) => {
    if (this.state.gender === "F") {
      return <option value="M" className="input-area" id="select" type="input" name="gender" style={{"borderColor": "#27116B !important"}}>Male</option>
       } else {
      return (
        <Fragment>{this.displayGenderOpt(this.state.gender)}</Fragment>
      )
    }
  }

  genderPreference = (genderPref) => {
    if (this.state.gender_pref === "F") {
      return "Women"
    } else if (this.state.gender_pref === "M") {
      return "Men"
    } else if (this.state.gender_pref === "F,M") {
      return "Men & Women"
    }
  }

  displayGenderPrefOpts = (genderPref) => {
    if (genderPref === "F,M") {
      return <Fragment><option value="F" name="gender_pref" className="input" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} >Women</option>
        <option value="M" className="input" name="gender_pref" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} >Men</option></Fragment>
    }
  }

  genderPrefOptions = (genderPref) => {
    if (this.state.gender_pref === "M") {
      return <Fragment><option value="F" name="gender_pref" className="input" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>Women</option>
        <option value="F,M" name="gender_pref" className="input" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>Men & Women</option></Fragment>
    }
  }

  displayGenderPref = (genderPref) => {
    if (this.state.gender_pref === "F") {
      return <Fragment><option value="M" name="gender_pref" className="input" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>Men</option>
        <option value="F,M" name="gender_pref" className="input" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} >Men & Women</option></Fragment>
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const currentMatchIds = this.props.matches.map(match => match.id)
    const userConfig = {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          gender: this.state.gender,
          gender_pref: this.state.gender_pref,
          location: `${this.state.city}, ${this.state.usstate}`,
          bio: this.state.bio,
          photo: this.state.uploadedFileCloudinaryUrl
        }
      })
    }
    fetch(`${API_ROOT}/users/${this.props.currentUser.id}`, userConfig)
    .then(r => r.json())
    .then(result => {
      if (result.errors) {
        console.log(result.errors)
        alert('Please check your details')
        return <Redirect to="/edit" />
      } else {
        localStorage.setItem('token', result.token)
        let updatedUser = result.user
        this.props.setCurrentUser(updatedUser)
        let matchedOrAwaiting = updatedUser.matches.filter(match => match.status === "matched" || match.status === "awaiting")
        let declined = updatedUser.matches.filter(match => match.status === "declined")
        let newMatches = matchedOrAwaiting.filter(ma => !currentMatchIds.includes(ma.id))
        let oldMatches = declined.filter(d => currentMatchIds.includes(d.id))

        if (newMatches.length > 0 && oldMatches.length === 0) {
          newMatches.map(newMatch => this.props.updateMatches(newMatch))
          newMatches.map(newMatch => this.props.findMatchedUsers(newMatch.matched_user))
        } else if (newMatches.length === 0) {
          this.props.findMatches(matchedOrAwaiting)
          let updatedMatchedUsers = matchedOrAwaiting.map(ma => ma.matched_user)
          this.props.updateMatchedUsers(updatedMatchedUsers)
        } else if (newMatches.length > 0 && oldMatches.length > 0) {
          this.props.findMatches(matchedOrAwaiting)
          let updatedMatchedUsers = matchedOrAwaiting.map(ma => ma.matched_user)
          this.props.updateMatchedUsers(updatedMatchedUsers)
        }
        this.setState({
          updated: true
        })
      }
    })
    console.log(this.state.updated)
    console.log(this.props.matches)
  }


  deleteUser = (currentUser) => {
    fetch(`${API_ROOT}/${currentUser.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
          user: this.props.currentUser
      })
    })
    .then(r => r.json())
    .then(response => {
      Adapter.signOut();
      this.props.history.push("/")
      this.props.setUsers(response)
      this.setState({
        deleted: true
      })
    })
  }

  userRedirect = () => {
    if (this.state.deleted === true) {
      return <Redirect to="/" />
    } else if (this.state.updated === true) {
      return <Redirect to="/profile" />
    }
  }

  render() {
    return (
      <Fragment>
        <div style={{"marginTop": "10px"}}>
          <Link to='/profile' className="form-link"> ◀︎ Back</Link>
        </div>
        <div className="form-container">
          <h1 className="signupHeader" style={{"fontSize": "5vw"}}>edit profile</h1>
          <div className="form" onSubmit={event => this.handleSubmit(event)}>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6" style={{"marginBottom": "-20px", "color": "pink !important"}}>
                  <span className="form-label">
                    <label>First Name</label>
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
                </div>
                <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                  <span className="form-label">
                    <label>Last Name</label>
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
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                  <span className="form-label">
                    <label>Gender</label>
                    <span className="input-field">
                      <select className="browser-default" type="text" name="gender" onChange={event => this.handleChange(event)} style={{"borderStyle": "solid", "borderColor": "#27116B !important", "fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>
                        <option value={this.state.gender} className="input-area" id="select" type="input" style={{"borderColor": "#27116B !important"}}>{this.state.gender === "F" ? "Female" : "Male"}</option>
                        {this.displayGenderOptions(this.state.gender)}
                      </select>
                    </span>
                  </span>
                </div>
                <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                  <span className="form-label">
                    <label>Gender Preference</label>
                    <span className="input-field">
                      <select className="browser-default" type="text" name="gender_pref" onChange={event => this.handleChange(event)} style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>
                        <option value={this.state.gender_pref} name="gender_pref" className="input-area" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>{this.genderPreference(this.state.gender_pref)}</option>
                        {this.displayGenderPref(this.state.gender_pref)}
                        {this.genderPrefOptions(this.state.gender_pref)}
                        {this.displayGenderPrefOpts(this.state.gender_pref)}
                      </select>
                    </span>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                  <span className="form-label">
                    <label>City</label>
                    <span className="input-field">
                      <input
                        type='text'
                        name='city'
                        value={this.state.city}
                        onChange={event => this.handleChange(event)}
                        className="input"
                      />
                    </span>
                  </span>
                </div>
                <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                  <span className="form-label">
                    <label>State</label>
                    <span className="input-field">
                      <select className="browser-default" id="state" name="usstate" onChange={event => this.handleChange(event)} style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>
                        <option value={this.state.usstate}>{this.state.usstate}</option><option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option>
                        <option value="AR">AR</option><option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="Cuba">Cuba</option>
                        <option value="DE">DE</option><option value="DC">DC</option><option value="FL">FL</option><option value="GA">GE</option><option value="Guam">Guam</option>
                        <option value="HI">HI</option><option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option>
                        <option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option><option value="ME">ME</option><option value="MD">MD</option>
                        <option value="MA">MA</option><option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option><option value="MO">MO</option>
                        <option value="MT">MT</option><option value="NE">NE</option><option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option>
                        <option value="NM">NM</option><option value="NY">NY</option><option value="NC">NC</option><option value="ND">ND</option><option value="OH">OH</option>
                        <option value="OK">OK</option><option value="OR">OR</option><option value="PA">PA</option><option value="Puerto Rico">Puerto Rico</option>
                        <option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option>
                        <option value="UT">UT</option><option value="VT">VT</option><option value="VA">VA</option><option value="Virgin Islands">Virgin Islands</option>
                        <option value="WA">WA</option><option value="WV">WV</option><option value="WI">WI</option><option value="WY">WY</option>
                      </select>
                    </span>
                  </span>
                </div>
              </div>
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
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false}>
                {({getRootProps, getInputProps}) => {
                  return (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      { <p style={{"fontSize": "calc(1em + .5vw", "margin": "8px 0px 8px 0px"}}>Click to select photo or drag and drop.</p> }
                    </div>
                  )
                }}
              </Dropzone>
              {this.displayDiffPhotos()}
              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
            </form>
          </div>
          {this.userRedirect()}
        </div>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    city: state.users.currentUser.location.split(", ")[0],
    usstate: state.users.currentUser.location.split(", ")[1],
    matchedUsers: state.matches.matchedUsers,
    matches: state.matches.matches,
    gender: state.users.currentUser.gender,
    genderPref: state.users.currentUser.gender_pref,
    userPhoto: state.users.currentUser.photo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (updatedUser) => dispatch(setCurrentUser(updatedUser)),
    updateMatches: (updatedMatches) => dispatch(updateMatches(updatedMatches)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
    updateMatchedUsers: (updatedMatchedUsers) => dispatch(updateMatchedUsers(updatedMatchedUsers)),
    findAccepted: (accepted) => dispatch(findAccepted(accepted)),
    findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
    deleteUser: (currentUser) => dispatch(deleteUser(currentUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
