import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Chat = (props) => {
  console.log("Chat PROPS", props)

  const findChatUser = () => {
    return props.chat.users.find(user => user.id !== props.userId)
  }

  const initalizeChat = () => {
    return this.props.chat.conversations.length === 0
    ? <div className="initial-convo">
      <p>Start chatting</p>
    </div>
    : <div className="initial-convo">
      {/* {(this.props.conversation.messages[(this.props.conversation.messages.length)-1].user.username)}: {`${this.props.conversation.messages[(this.props.conversation.messages.length)-1].text.substring(0, 15)}...`} */}
      {(props.chat.conversations[(props.chat.conversations.length)-1].user.first_name)}: {`${props.chat.conversations[(props.chat.conversations.length)-1].message.substring(0, 15)}...`}
    </div>
    }

  return (
    <Fragment>
      <div className="chats-textBox">
        <div className="chats-title">
          {findChatUser().first_name}
        </div>
        {initalizeChat()}
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userId: state.users.currentUser.id,
    chats: state.chats.chats
  }
}

export default connect(mapStateToProps)(Chat);
