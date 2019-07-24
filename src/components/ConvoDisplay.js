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
        // <div className="convos-area">
        <div className="col l9 m9 s12 convos-area">
          <div className="convo-display">
            {conversations.length > 0 ?
              <ul>{this.orderedConversations(conversations)}</ul>
            :
            null}
          </div>
          {/* <div className="row"> */}
          <ConversationForm chat_id={id} />
          {/* </div> */}
        </div>
      )
    }

     orderedConversations = (conversations) => {
      const sortedConversations = conversations.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      )
      // return sortedConversations.map(conversation => {
      //   console.log(conversation.user_name === this.props.currentUser.first_name)
      //   return <li className="convo-response" key={conversation.id}><span className="convo-name">{conversation.user_name}</span> : <span className="convo-text">{conversation.message}</span></li>;
      // })
      return sortedConversations.map(conversation => {
        if (conversation.user_name === this.props.currentUser.first_name) {
          return <li className="current-user-response" key={conversation.id}><span className="current-user-color">{conversation.message}</span></li>
        } else {
        return <li className="receiver-response" key={conversation.id}><span className="receiver-color">{conversation.message}</span></li>
        }
      })
    }


    render() {
    let chat = this.props.currentChat
     return (
       <div className="convooo">
         {chat? (
           this.display(chat.id, chat.conversations)
         ) : null}
       </div>
     )
    }

}

const mapStateToProps = (state) => {
  return {
    currentChat: state.chats.currentChat,
    currentUser: state.users.currentUser,
    receiver: state.chats.receiver,
    conversations: state.chats.conversations,
  }
}

export default connect(mapStateToProps)(ConvoDisplay);
