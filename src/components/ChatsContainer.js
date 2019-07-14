import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants/ActionTypes'
import '../styling/Accepted.css';
import '../styling/App.css';
import NewChatForm from './NewChatForm';
import Chat from './Chat'
import ConversationsArea from './ConversationsArea';
import ConversationsCable from './ConversationsCable';
import ChatsCable from './ChatsCable';
import { thunkSaveChats, saveCurrentChat } from '../actions'
// import App from '../App';

class ChatsContainer extends React.Component {
  //
  // componentDidMount = () => {
  //   this.props.thunkSaveChats()
  // }
  //
  // responsiveChatDisplay = () => {
  //   this.props.chats.map(chat => {
  //     return (
  //       <div key={chat.id} className="chatBox"
  //         onClick = {() => this.props.saveCurrentChat(chat)}>
  //         <Chat chat={chat} />
  //       </div>
  //     )
  //   })
  // }

  render() {
    console.log("ChatsContainer PROPS", this.props)
    return (
      // <div className="chatsBox">
      <div className="ChatsContainer">
        { this.props.chats.length ? <ConversationsCable /> : null }
        {/* <h2 className="users-header" style={{paddingLeft: 40, paddingTop: 10, paddingBottom: 10}}> Accepted </h2> */}
        <div className="chats-container">
          {/* {this.responsiveChatDisplay()} */}
        </div>
        { this.props.currentChat ? <ConversationsArea /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.users.currentUser.id,
    chats: state.chats.chats,
    currentChat: state.chats.currentChat,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // thunkSaveChats: () => dispatch(thunkSaveChats()),
    // saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId)),
    saveCurrentChat: (currentChat) => dispatch(saveCurrentChat(currentChat))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer)
