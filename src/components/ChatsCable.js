import React from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { addNewChat, saveCurrentChat, saveChats, enableChat } from '../actions';


class ChatsCable extends React.Component {

  handleReceivedChat = (response) => {
    const { chat } = response
    if (chat.users.map((user) => user.id).includes(this.props.userId)) {
      this.props.saveCurrentChat(chat)
      this.props.enableChat(true)
    }
  }

  render() {
    return(
      this.props.userId
      ? <ActionCableConsumer
        channel={{channel: "ChatsChannel"}}
        onReceived={(response) => this.handleReceivedChat(response)}
        />
      : null
    )
  }

}

  const mapDispatchToProps = (dispatch) => {
    return {
      addNewChat: (appendedChat) => dispatch(addNewChat(appendedChat)),
      saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat)),
      saveChats: (chat) => dispatch(saveChats(chat)),
      enableChat: (status) => dispatch(enableChat(status))
    }
  }

export default connect(null, mapDispatchToProps)(ChatsCable);
