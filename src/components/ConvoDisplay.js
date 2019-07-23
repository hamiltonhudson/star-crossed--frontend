import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ConversationForm from './ConversationForm'

class ConvoDisplay extends React.Component {

  state = {
    id: '',
    conversations: ''
  }

     display = (id, conversations) => {
      console.log("id in ConvoDisplay:", id, "conversations in ConvoDisplay", conversations)
      return (
        <Fragment>
          <h6 className="chat-with"> Chat with: {this.props.receiver.first_name}</h6>
          <div className="convo-display">
            {conversations.length > 0 ?
              <ul>{this.orderedConversations(conversations)}</ul>
            :
            null}
          </div>
          <div className="row">
            <ConversationForm chat_id={id} />
          </div>
        </Fragment>
      )
    }

     orderedConversations = (conversations) => {
      const sortedConversations = conversations.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
      return sortedConversations.map(conversation => {
        return <li className="convo-response" key={conversation.id}><span className="convo-name">{conversation.user_name}</span> : <span className="convo-text">{conversation.message}</span></li>;
      })
    }

    render() {
    let chat = this.props.currentChat
     return (
       <Fragment>
         {chat? (
           this.display(chat.id, chat.conversations)
         ) : null}
       </Fragment>
     )
    }

}

// const orderedConversations = (conversations) => {
//   const sortedConversations = conversations.sort(
//     (a, b) => new Date(a.created_at) - new Date(b.created_at)
//   )
//   return sortedConversations.map(conversation => {
//     console.log("conversation in orderedconvos", conversation)
//     // return <li className="convo-response" key={conversation.id}>{conversation.user_name} : {conversation.message}</li>;
//     return <li className="convo-response" key={conversation.id}><span className="convo-name">{conversation.user_name}</span> : <span className="convo-text">{conversation.message}</span></li>;
//   })
// }

const mapStateToProps = (state) => {
  return {
    currentChat: state.chats.currentChat,
    currentUser: state.users.currentUser,
    receiver: state.chats.receiver,
    conversations: state.chats.conversations,
  }
}

// export default ConvoDisplay
export default connect(mapStateToProps)(ConvoDisplay);

//
// const checkConvoUser = (userId) => {
//   if (userId === props.userId) {
//     return currentUserStyle
//   } else {
//     return acceptedMatchStyle
//   }
// }
//
// const currentUserStyle = {
//    background: 'rgba(148, 176, 224, 0.51)',
//    textAlign: 'right',
//    color: "#ffffff",
//  }
// const acceptedMatchStyle = {
//    background: 'rgba(121, 246, 193, 0.33)'
//  }
//
// const acceptedMatchUser = () => {
//   return props.currentChat.conversations.users.find(user => user.id !== props.userId)
// }

// const orderedConversations = (conversations) => {
//   const sortedConversations = conversations.sort(
//     (a, b) => new Date(a.created_at) - new Date(b.created_at)
//   )
//   return sortedConversations.map(conversation => {
//     console.log("conversation in orderedconvos", conversation)
//     // return <li className="convo-response" key={conversation.id}>{conversation.user_name} : {conversation.message}</li>;
//     return <li className="convo-response" key={conversation.id}><span className="convo-name">{conversation.user_name}</span> : <span className="convo-text">{conversation.message}</span></li>;
//   })
// }
