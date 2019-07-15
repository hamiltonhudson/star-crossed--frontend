import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { ActionCableConsumer } from 'actioncable';
import { API_ROOT } from '../constants/ActionTypes';
// import '../styling/Accepted.css';
// import '../styling/App.css';
import NewConversationForm from './NewConversationForm';
import { eraseCurrentChat } from '../actions'

const ConversationsArea = (props) => {
  console.log("ConversationsArea PROPS", props)

  const checkConvoUser = (userId) => {
    if (userId === props.userId) {
      return currentUserStyle
    } else {
      return acceptedMatchStyle
    }
  }

  const currentUserStyle = {
     background: 'rgba(148, 176, 224, 0.51)',
     textAlign: 'right',
     color: "#ffffff",
   }
  const acceptedMatchStyle = {
     background: 'rgba(121, 246, 193, 0.33)'
   }

  const acceptedMatchUser = () => {
    return props.currentChat.conversations.users.find(user => user.id !== props.userId)
  }

  const orderedChats = () => {
    return props.currentChat.conversations.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  const displayConvos = () => {
    return orderedChats().map(conversation => {
      return (
        <div key={conversation.id} className="convo-box"
          style={checkConvoUser(conversation.user.id)}>
          <div>
            {/* <div className="convo-time">
            </div> */}
            <div className="convo-box-content">
              {conversation.message}
            </div>
          </div>
        </div>
      )
    })
  }

  console.log(props.currentChat, props.userId)
  return (
    // <div className="convo-box animated slideInUp delay-5s">
    // <div className="ConversationsArea">
    //   <div className="conversation-header">
    //     {/* <div className="message-title-header">
    //     </div> */}
    //   </div>
    //   <div className="sidebar"
    //     acceptedMatchUser={acceptedMatchUser().id}
    //     name={acceptedMatchUser().first_name}
    //     sun={acceptedMatchUser().sun.sign}
    //   >
    //     <button onClick={props.eraseCurrentChat}>Clear</button>
    //   </div>
    //   <div className="convosList">
    //     {displayConvos()}
    //   </div>
    //   <NewConversationForm chat_id={props.selectedChat.id} />
    // </div>
    <h5> style={{'color':'white'}} Conversations Area</h5>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userId: state.users.currentUser.id,
    chats: state.chats.chats,
    currentChat: state.chats.currentChat
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eraseCurrentChat: () => dispatch(eraseCurrentChat)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsArea);
