import React from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
// import '../styling/Chats.css'
import { addNewChat } from '../actions';

class ChatsCable extends React.Component {

  handleReceivedChat = (response) => {
    const { chat } = response
    if (chat.users.map((user) => user.id).includes(this.props.userId)) {
    // if (chat.users.map((i) => i.id).includes(this.props.userId)) {
      this.props.addNewChat(chat)
    }
  }

  render() {
    console.log("ChatsCable PROPS", this.props)
    return(
      this.props.userId
      ? <ActionCable
        channel={{channel: "ChatsChannel"}}
        onReceived={(response) => this.handleReceivedChat(response)}
        />
      : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userId: state.users.currentUser.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewChat: (appendedChat) => dispatch(addNewChat(appendedChat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsCable)
