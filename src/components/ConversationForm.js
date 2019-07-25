import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Roots';


class ConversationForm extends React.Component {

  state = {
    message: ''
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token'),
        'Credentials': 'include'
      },
      body: JSON.stringify({
        chat_id: this.props.currentChat.id,
        user_id: this.props.currentUser.id,
        message: this.state.message
      })
    })
    this.setState({ message: '' })
  }

  responsiveEnterKey = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit(event)
    }
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className="new-convo-form">
          <textarea
            type="text"
            placeholder="....type something"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.responsiveEnterKey}
            className="new-convo"
            style={{"borderRadius": "15px"}}
          />
          <br/>
          <input
            type="submit"
            value="⌲"
            className="send-chat-button"
          />
        </form>
      </Fragment>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      currentChat: state.chats.currentChat
    }
  }

export default connect(mapStateToProps)(ConversationForm);
