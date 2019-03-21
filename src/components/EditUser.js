import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/Form.css'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { setUsers, setCurrentUser, setUserId, findMatchedUsers, findMatches, findAccepted, findAcceptedUsers, deleteUser} from '../actions'
import ProfileContainer from './ProfileContainer'

const usersAPI = 'http://localhost:3000/api/v1/users/'
const CLOUDINARY_UPLOAD_PRESET = 'h8pruce6';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ehh/image/upload';

class EditUser extends React.Component {

  state = {
    first_name: this.props.currentUser.first_name,
    last_name: this.props.currentUser.last_name,
    gender: this.props.currentUser.gender,
    gender_pref: this.props.currentUser.gender_pref,
    // birth_date: this.props.currentUser.birth_date,
    // location: this.props.currentUser.location,
    city: this.props.city,
    usstate: this.props.usstate,
    bio: this.props.currentUser.bio,
    uploadedFileCloudinaryUrl: this.props.currentUser.photo,
    updated: false,
    deleted: false,
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
          // birth_date: this.state.birth_date,
          gender: this.state.gender,
          gender_pref: this.state.gender_pref,
          location: `${this.state.city}, ${this.state.usstate}`,
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
        // this.props.setCurrentUser(result)
        let updatedUser = result
        this.props.setCurrentUser(updatedUser)
        // this.props.setUserId(updatedUser.id)
        let matchedOrAwaiting
        matchedOrAwaiting = updatedUser.matches.filter(match => match.status === "matched" || match.status === "awaiting")
        console.log("this.props.matches in EditUser", this.props.matches)
        matchedOrAwaiting = matchedOrAwaiting.filter(ma => !this.props.matches.includes(ma))
        // matchedOrAwaiting = matchedOrAwaiting.filter(ma => this.props.matches.includes(ma))
        // matchedOrAwaiting = matchedOrAwaiting.reject(ma => !this.props.matches.includes(ma))
        // matchedOrAwaiting = matchedOrAwaiting.reject(ma => this.props.matches.includes(ma))
        // matchedOrAwaiting = matchedOrAwaiting.map(ma => !this.props.matches.includes(ma))
        console.log("matchedOrAwaiting after filter in Edit User", matchedOrAwaiting)
        // const matched = updatedUser.matches.filter(match => match.status === "matched")
        const pending = updatedUser.matches.filter(match => match.status === "pending")
        console.log("pending", pending)
        const awaiting = updatedUser.matches.filter(match => match.status === "awaiting")
        console.log("awaiting", awaiting)
        const accepted = updatedUser.matches.filter(match => match.status === "accepted")
        const declined = updatedUser.matches.filter(match => match.status === "declined")
        // declined.map(d => this.props.declineMatch(d.matched_user))
        this.props.findMatches(matchedOrAwaiting)
        // matched.map(m => this.props.findMatchedUsers(m.matched_user))
        matchedOrAwaiting.map(m => this.props.findMatchedUsers(m.matched_user))
        this.props.findAccepted(accepted)
        accepted.map(a => this.props.findAcceptedUsers(a.matched_user))
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


  deleteUser = (userId) => {
    // fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    fetch(`${usersAPI}${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // user: {
          id: `${userId}`
        // }
      })
    })
    .then(r => r.json())
    .then(response => {
      console.log(response)
      let nonExistentUser = {first_name: "", last_name: "", birth_date: " - - ", location: " , "}
      // this.props.deleteUser(this.props.currentUser)
      this.props.deleteUser(nonExistentUser)
      this.props.setUsers(response)
      this.setState({
        // updated: false,
        deleted: true
      })
      // this.props.deleteUser(this.props.currentUser)
    })
  }

  // landingRedirect = () => {
  //   console.log(this.state.deleted)
  //   console.log(this.props.currentUser)
  //   if (this.state.deleted) {
  //     return <Redirect to="/" />
  //   }
  // }

  userRedirect = () => {
    console.log("this.state.deleted in userRedirect", this.state.deleted)
    console.log("this.props.currentUser in userRedirect", this.state.pudated)
    console.log("this.state.updated in userRedirect", this.state.updated)
    if (this.state.deleted === true) {
      return <Redirect to="/" />
    } else if (this.state.updated === true) {
      return <Redirect to="/profile" />
    }
  }

  render() {
    console.log("this.state.uploadedFileCloudinaryUrl", this.state.uploadedFileCloudinaryUrl)
    console.log("this.props.currentUser.photo", this.props.currentUser.photo)
    console.log("this.state.updated in render", this.state.updated)
    // let genderPref = this.state.gender_pref
    // let city = this.props.currentUser.location.split(", ")[0]
    // let usstate = this.props.currentUser.location.split(", ")[1]
    return (
      <Fragment>
        <div style={{"marginTop": "10px"}}>
          <Link to='/profile' className="form-link"> ◁ Back</Link>
        </div>
        <div className="form-container">
          <h1 className="signupHeader">edit profile</h1>
          <div className="form">
            {/* <form onSubmit={event => this.handleSubmit(event)}> */}
            <form className="col s12" onSubmit={event => this.handleSubmit(event)}>
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
            </form>
            <span style={{"lineHeight": "0px"}}><button className="delete-button" onClick={() => this.deleteUser(this.props.currentUser.id)}>Delete</button></span>
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
    // matchedUsers: state.users.matchedUsers,
    matchedUsers: state.matches.matchedUsers,
    matches: state.matches.matches,
    gender: state.users.currentUser.gender,
    genderPref: state.users.currentUser.gender_pref,
    userId: state.users.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
    // findMatches: (matches) => dispatch(findMatches(matches)),
    // findMatchedUsers: (matchedUsers) => dispatch(findMatches(matchedUsers))
    setUsers: (users) => dispatch(setUsers(users)),
    setCurrentUser: (updatedUser) => dispatch(setCurrentUser(updatedUser)),
    findMatches: (matches) => dispatch(findMatches(matches)),
    findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
    findAccepted: (accepted) => dispatch(findAccepted(accepted)),
    findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
    // declineMatch: (declinedMatch) => dispatch(declineMatch(declinedMatch)),
    // setUserId: (userId) => dispatch(mapDispatchToProps(userId)),
    deleteUser: (currentUser) => dispatch(deleteUser(currentUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
