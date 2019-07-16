import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { saveChats, saveConvoMsgs } from '../actions'

class ConversationsCable extends React.Component {

  handleReceivedConversation = (response) => {
    console.log(response)
    const { conversation } = response
    const chats = [...this.props.chats]
    const chat = chats.find(chat => chat.id === conversation.chat_id)
    chat.converstaions = [...chat.conversations, conversation]
    this.props.saveChats(chats)
    this.props.saveConvoMsgs(chat.conversations)
  }

  render() {
    console.log("ConversationsCable PROPS", this.props)
    return (
      // <Fragment>
      <div className="ConversationsCable">
        {/*ConversationsCable */}
        {this.props.chats.map(chat => {
          return (
            <ActionCableConsumer key={chat.id}
              channel={{channel: "ConversationsChannel", chat: chat.id}}
              onReceived={(response) => this.handleReceivedConversation(response)}
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
    saveConvoMsgs: (conversations) => dispatch(saveConvoMsgs(conversations))
  }
}

// export default connect(mapStateToProps)(ConversationsCable);

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCable)
