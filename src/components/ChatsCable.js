import React from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { addNewChat } from '../actions';

class ChatsCable extends React.Component {

  handleReceivedChat = (response) => {
    const { chat } = response
    if (chat.users.map((user) => user.id).includes(this.props.userId)) {
      this.props.addNewChat(chat)
    }
  }

  render() {
    console.log("ChatsCable PROPS", this.props)
    return(
      this.props.userId
      ? <ActionCableConsumer
        className="ChatsCable"
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
    userId: state.users.currentUser.id,
    chats: state.chats.chats,
    receiverId: state.chats.receiverId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewChat: (appendedChat) => dispatch(addNewChat(appendedChat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsCable)
