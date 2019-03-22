import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styling/Form.css'
import '../styling/FormCustom.css'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { setUsers, setCurrentUser, setUserId, findMatches, findMatchedUsers, findAccepted, findAcceptedUsers } from '../actions'

const usersAPI = 'http://localhost:3000/api/v1/users/'
const CLOUDINARY_UPLOAD_PRESET = 'h8pruce6';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ehh/image/upload';

class NewUser extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    gender_pref: '',
    city: '',
    usstate: '',
    bio: '',
    uploadedFileCloudinaryUrl: '',
    loggedIn: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    // console.log(this.state)
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
          birth_date: this.state.birth_date,
          gender: this.state.gender,
          gender_pref: this.state.gender_pref,
          location: `${this.state.city}, ${this.state.usstate}`,
          bio: this.state.bio,
          photo: this.state.uploadedFileCloudinaryUrl
        }
      })
    }
    fetch(usersAPI, newUserConfig)
    .then(r => r.json())
    .then(result => {
      console.log("result in NewUser", result)
      if (result.errors){
        alert('Please check your details')
        return <Redirect to="/newuser" />
      } else {
        this.props.setCurrentUser(result)
        this.props.setUserId(result.id)
        const newUserMatches = result.matches
        this.props.findMatches(newUserMatches)
        newUserMatches.map(m => this.props.findMatchedUsers(m.matched_user))
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
      <div className="form-container">
        <h1 className="signupHeader" style={{"marginTop": "-10px"}}>create new</h1>
        <div className="form">
          {/* <div> */}
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
            <label>Birth Date</label>
            <span className="form-label">
              <span className="input-field">
                <input
                  type='date'
                  select-years="15"
                  placeholder="Enter correctly."
                  name='birth_date'
                  value={this.state.birth_date}
                  onChange={event => this.handleChange(event)}
                  className="input"
                />
              </span>
            </span>
            <div className="row">
              <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                <span className="form-label">
                  <label>Gender</label>
                  <span className="input-field">
                    <select className="browser-default" name="gender" onChange={event => this.handleChange(event)} style={{"borderStyle": "solid", "borderColor": "#27116B !important", "fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>
                      <option value="" className="selected" id="select" type="input" style={{"borderColor": "#27116B !important"}}/>
                      <option value="F" className="input" id="select" type="input" >Female</option>
                      <option value="M" className="input" id="select" type="input">Male</option>
                    </select>
                  </span>
                </span>
              </div>
              <div className="input-field col s6" style={{"marginBottom": "-20px"}}>
                <span className="form-label">
                  <label>Gender Preference</label>
                  <span className="input-field">
                    <select className="browser-default" name="gender_pref" onChange={event => this.handleChange(event)} style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}>
                      <option value="" className="input-area" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}}></option>
                      <option value="F" className="selected" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} onChange={event => this.handleChange(event)}>Women</option>
                      <option value="M" className="selected" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} onChange={event => this.handleChange(event)}>Men</option>
                      <option value="F,M" className="selected" type="input" style={{"fontSize": "16px", "fontFamily": "'Roboto', sans-serif", "color": "#27116B"}} onChange={event => this.handleChange(event)}>Men & Women</option>
                      className="input"
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
                      <option value="">---</option><option value="AL">AL</option><option value="AK">AK</option><option value="AZ">AZ</option><option value="AR">AR</option>
                      <option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="Cuba">Cuba</option><option value="DE">DE</option>
                      <option value="DC">DC</option><option value="FL">FL</option><option value="GA">GE</option><option value="Guam">Guam</option><option value="HI">HI</option>
                      <option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="IA">IA</option><option value="KS">KS</option>
                      <option value="KY">KY</option><option value="LA">LA</option><option value="ME">ME</option><option value="MD">MD</option><option value="MA">MA</option>
                      <option value="MI">MI</option><option value="MN">MN</option><option value="MS">MS</option><option value="MO">MO</option><option value="MT">MT</option>
                      <option value="NE">NE</option><option value="NV">NV</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option>
                      <option value="NY">NY</option><option value="NC">NC</option><option value="ND">ND</option><option value="OH">OH</option><option value="OK">OK</option>
                      <option value="OR">OR</option><option value="PA">PA</option><option value="Puerto Rico">Puerto Rico</option><option value="RI">RI</option>
                      <option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option>
                      <option value="VT">VT</option><option value="VA">VA</option><option value="Virgin Islands">Virgin Islands</option><option value="WA">WA</option>
                      <option value="WV">WV</option><option value="WI">WI</option><option value="WY">WY</option>
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
            {/* </div> */}
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
      findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
      findAccepted: (accepted) => dispatch(findAccepted(accepted)),
      findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers)),
      setUserId: (userId) => dispatch(setUserId(userId))
    }
  }

export default connect(null, mapDispatchToProps)(NewUser);
