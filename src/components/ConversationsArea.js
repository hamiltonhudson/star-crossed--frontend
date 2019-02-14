import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { ActionCableConsumer } from 'actioncable';
// import { ActionCableProvider} from 'react-actioncable-provider';
// import { API_ROOT, HEADERS } from '../constants/ActionTypes';
// import '../styling/Accepted.css';
// import '../styling/App.css';
import NewConversationForm from './NewConversationForm';
import { eraseCurrentChat } from '../actions'

// const ConversationsArea = ({
//   // chat: { id, title, conversations },
//   chat: { id, conversations },
//
// }) => {
//   return(
//     <div className="conversationsArea">
//       <h2>Chat Id: {id}</h2>
//       <ul>{orderedConversations(conversations)}</ul>
//       <NewConversationForm chat_id={id} />
//     </div>
//   )
// }
// export default ConversationsArea;

const ConversationsArea = (props) => {
  console.log("ConversationsArea PROPS", props)

  const checkConvoUser = (userId) => {
  // checkConvoUser = (userId) => {
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
  // function acceptedMatchUser () {
    return props.currentChat.conversations.users.find(user => user.id !== props.userId)
  }

  const orderedChats = () => {
  // function orderedChats () {
    return props.currentChat.conversations.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  }

  const displayConvos = () => {
  // function displayConvos () {
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

  const getReadableDistance = (dist) => {
  // function getReadableDistance(dist) {
    if (dist !== undefined) {
      return dist < 1 ? `${(dist * 5280).toFixed(1)} ft` : `${(dist).toFixed(1)} mi`
    } else {
      return null
    }
  }

  console.log(props.currentChat, props.userId)
  return (
    <div className="convo-box animated slideInUp delay-5s">
      <div className="conversation-header">
        {/* <div className="message-title-header">
        </div> */}
      </div>
      <div className="sidebar"
        distance={getReadableDistance().distance}
        acceptedMatchUser={acceptedMatchUser().id}
        name={acceptedMatchUser().first_name}
        sun={acceptedMatchUser().sun.sign}
      >
        <button onClick={props.eraseCurrentChat}>Clear</button>
      </div>
      <div className="convosList">
        {displayConvos()}
      </div>
      <NewConversationForm chat_id={props.selectedChat.id} />
    </div>
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


//helpers

// const orderedConversations = conversations => {
//   const sortedConversations = conversations.sort(
//     (a, b) => new Date(a.created_at) - new Date(b.created_at)
//   )
//   return sortedConversations.map(conversation => {
//     return <li key={conversation.id}>{conversation.message}</li>
//   })
// }
