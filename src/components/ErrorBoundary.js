import React from 'react'
import { Redirect } from 'react-router-dom';
import '../styling/Form.css'

class ErrorBoundary extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    // logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div align="center">
            <br/><br/>
            <a href="#loginScreen" class="error-button">Please enter details correctly</a>
          </div>
          <div id="loginScreen">
            <a href="#" class="cancel">&times;</a>
          </div>
          <Redirect to="/signin" />
        </div>
      )
    }
  }
  
}

export default ErrorBoundary
