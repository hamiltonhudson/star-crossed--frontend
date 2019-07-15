import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ActionCableConsumer from 'actioncable';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { viewMatch, setReceiverId } from '../actions';
// import Cable from 'actioncable';
import ConversationsArea from './ConversationsArea'

class NewChatForm extends React.Component {
  state = {
    chatWith: '',
    receiver_id: ''
  }

  handleChange = (event) => {
    this.setState({ id: event.target.value })
  }

  static getChats

  chatExists = (userReceiverId) => {
    console.log("this.props.chats in chatExists function newchatform", this.props.chats)
      let chatFound = this.props.chats.filter((chat) => chat.users.map((i)=> i.id).includes(userReceiverId));

      if (chatFound.length > 0) {
          this.props.saveSelectedChat(chatFound[0]);
          return true;
      }
  }

  fetchToWebSocket = (route, bodyData) => {
    fetch(`${API_ROOT}/{route}`, {
    // fetch(`${API_ROOT}/chats`, {
    // fetch(`${API_ROOT}?user=${this.props.userId}`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Authorization": localStorage.getItem('token'),
        "X-Authorization": document.cookie,
        'Credentials': 'include'
      },
      body: JSON.stringify(bodyData)
    })
  }

  handleStartChat = () => {
    this.props.setReceiverId(this.props.match.id)
    let body = {
      title: "PRIVATE",
      sender_id: this.props.currentUser.id,
      receiver_id: this.props.match.id
    }
    if (this.chatExists(this.props.match.id)) {
      this.props.exit();
     } else {
      this.fetchToWebsocket("conversations", body);
      this.props.exit();
     }
   }

  render = () => {
    console.log("this.props in NewChatForm render!", this.props)
    // console.log("props.currentUser in NewChatForm render!", this.props.currentUser)
    // console.log("props.acceptedUsers in NewChatForm render!", this.props.acceptedUsers)
    // console.log("props.match in NewChatForm render!", this.props.match)
    const generateAccepted = () => {
      return this.props.acceptedUsers.map(acceptedUser => {
        return (
          <div onClick={() => this.handleStartChat(acceptedUser.id)}
            key={acceptedUser.id} className="users-header">
            {acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}
          </div>
        )
      })
    }
    return(
        <div className="NewChatForm">
          {/* <form onSubmit={this.handleSubmit}>
            <label>New Chat ⌲ </label>
            <br />
            <input
              type="text"
              value={this.state.id}
              onChange={this.handleChange}
            />
            <input type="submit" />
            </form>
          </div> */}
          {generateAccepted()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    acceptedUsers: state.matches.acceptedUsers,
    accepted: state.matches.accepted,
    match: state.matches.match,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
    setReceiverId: (receiverId) => dispatch(setReceiverId(receiverId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChatForm);
