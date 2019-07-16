import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmailAndPW } from '../actions';
import '../styling/Form.css';


class SignUp extends React.Component {

  state = {
    email: '',
    password: '',
    validated: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.getEmailAndPW({email: this.state.email, password: this.state.password})
      this.setState({
        validated: true
      })
    }


  render () {
    const signUpForm =
    <div>
      <div style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
        <Link to='/' className="form-link"> ◀︎ Back </Link>
      </div>
      <div className="form-container" style={{"paddingLeft": "50px", "marginRight": "5px"}}>
        <h1 className="loginHeader">sign up</h1>
        <div className="form" style={{"width": "85%"}}>
          <form className="col s12" onSubmit={this.handleSubmit}>
            <br/>
            <span className="form-label">
              <label> Email </label>
              <div className="input-field s6">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="input"
                />
              </div>
            </span>
            <span className="form-label">
              <label> Password </label>
              <div className="input-field col s6">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="input"
                />
              </div>
            </span>
            <br/><br/>
            <input
              type="submit"
              className="submit-button"
            />
          </form>
        </div>
      </div>
    </div>
    return this.state.validated === true ? <Redirect to='/newuser'/> : signUpForm
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmailAndPW: (email, password) => dispatch(getEmailAndPW(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
