import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { saveChats, saveConvoMsgs, saveCurrentChat } from '../actions';


class ConversationsCable extends React.Component {

  handleReceivedConversation = (response) => {
    console.log("response in handleReceivedConversation convocable", response)
    const { conversation } = response
    const chat = this.props.chats.find(chat => chat.id === conversation.chat_id)
    chat.conversations = [...chat.conversations, conversation]
    console.log("chat.converstions", chat.conversations)
    // this.props.saveChats(chats)
    this.props.saveCurrentChat(chat)
    this.props.saveConvoMsgs(conversation)
  }

  render() {
    console.log("ConversationsCable PROPS", this.props)
    return (
      <Fragment>
        {this.props.chats.map(chat => {
          return (
            <ActionCableConsumer
              key={chat.id}
              channel={{channel: "ConversationsChannel", chat: chat.id}}
              onReceived={(response) => this.handleReceivedConversation(response)}
            />
          )
        })}
      </Fragment>
    )
  }

}

  const mapDispatchToProps = (dispatch) => {
    return {
      saveChats: (chats) => dispatch(saveChats(chats)),
      saveConvoMsgs: (conversation) => dispatch(saveConvoMsgs(conversation)),
      saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat))
    }
  }

export default connect(null, mapDispatchToProps)(ConversationsCable);
