import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { saveChats } from '../actions'

class ConversationsCable extends React.Component {

  handleReceivedConversation = (response) => {
    const { conversation } = response
    const chats = [...this.props.chats]
    const chat = chats.find(chat => chat.id === conversation.chat_id)
    chat.converstaions = [...chat.conversations, conversation]
    this.props.saveChats(chats)
  }

  render() {
    console.log("ConversationsCable PROPS", this.props)
    return (
      // <Fragment>
      <div className="ConversationsCable">
        {/*ConversationsCable */}
        {this.props.chats.map(chat => {
          return (
            <ActionCableProvider key={chat.id}
              channel={{channel: "ConversationsChannel", chat: chat.id}}
              onReceived={this.handleReceivedConversation}
            />
          )
        })}
      </div>
      // </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chats: state.chats.chats,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveChats: (chats) => dispatch(saveChats(chats)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCable)
