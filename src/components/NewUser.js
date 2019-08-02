import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { API_ROOT, CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '../constants/Roots';
import { setUsers, setCurrentUser, setUserId, findMatches, findMatchedUsers } from '../actions';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../styling/Form.css';


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
    delay: false,
    loggedIn: false
  }

  handleChange = (event) => {
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
        console.error(err)
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newUserConfig = {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.props.email,
          password: this.props.password,
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
    fetch(`${API_ROOT}/users`, newUserConfig)
    .then(r => r.json())
    .then(result => {
      if (result.errors) {
        alert('Please fill out all information')
        return <Redirect to="/new" />
      } else {
        localStorage.setItem('token', result.token)
        let newUser = result.user
        this.props.setCurrentUser(newUser)
        this.props.setUserId(newUser.id)
        const newUserMatches = newUser.matches
        this.props.findMatches(newUserMatches)
        newUserMatches.map(m => this.props.findMatchedUsers(m.matched_user))
        fetch(`${API_ROOT}/users`, {
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token'),
            'Credentials': 'include'
          }
        })
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

  matchesRedirect = () => {
    if (this.state.loggedIn) {
      return <Redirect to="/matches" />
    }
  }

  render() {
    return(
      <div className="form-container">
        <h1 className="signupHeader" style={{"fontSize": "5vw"}}>create new</h1>
        <div className="form">
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
                  name='birth_date'
                  value={this.state.birth_date}
                  onChange={event => this.handleChange(event)}
                  className="input"
                  // format="yyyy-dd-mm"
                  min="1919-01-01"
                  max="2001-01-01"
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
            <div className="row">
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
              { this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div style={{"overflowY": "scroll"}}>
                {/* {this.state.delay === false ? <p> Hang tight! </p> : <p> photo added! </p> } */}
                <img src={this.state.uploadedFileCloudinaryUrl} className="form-photo-display" alt={'profile pic'}/>
                <p  style={{"margin": "2px 0px 2px 0px"}}> Photo added! </p>
              </div> }

              <input className="submit-button"
                type="submit"
                placeholder="Submit"
              />
            </div>
          </form>
          {this.matchesRedirect()}
        </div>
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      email: state.users.email,
      password: state.users.password,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setUsers: (users) => dispatch(setUsers(users)),
      setCurrentUser: (userDetails) => dispatch(setCurrentUser(userDetails)),
      setUserId: (userId) => dispatch(setUserId(userId)),
      findMatches: (matches) => dispatch(findMatches(matches)),
      findMatchedUsers: (matchedUsers) => dispatch(findMatchedUsers(matchedUsers)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
