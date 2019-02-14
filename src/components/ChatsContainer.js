import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants/ActionTypes';

// import '../styling/Accepted.css';
// import '../styling/App.css';
import NewChatForm from './NewChatForm';
import Chat from './Chat'
import ConversationsArea from './ConversationsArea';
import ConversationsCable from './Cable';
import ChatsCable from './Cable';
import { thunkSaveChats, saveCurrentChat } from '../actions'
// import App from '../App';

class ChatsContainer extends React.Component {
  // state = {
  //   chats: [],
  //   activeChat: null
  // }
  //
  // // componentDidMount = () => {
  // chatDidMount = () => {
  //   fetch(`${API_ROOT}/chats`)
  //   .then(r => r.json)
  //   .then(chats => this.setState({ chats }))
  // }
  //
  // handleClick = id => {
  //   this.setState({ activeChat: id })
  // }
  //
  // handleReceivedChat = response => {
  //   const { chat } = response
  //   this.setState({
  //     chats: [...this.state.chats, chat]
  //   })
  // }
  //
  // handleReceivedConversation = response => {
  //   const { conversation } = response
  //   const chats = [...this.state.chats]
  //   const chat = chats.find(
  //     chat => chat.id === conversation.chat_id
  //   )
  //   chat.conversations = [...chat.conversations, conversation]
  //   this.setState({ chats })
  // }
  //
  // render() {
  //   //   const propState = this
  //   //   App.comments = App.cable.subscriptions.create({
  //   //     channel: ‘ConversationsChannel’,
  //   //     discussion: `${this.props.chatId}`
  //   //   }, {
  //   //     received: function(data) {
  //   //     propState.updateConversatonState(data)
  //   //   }
  //   // });
  //   const { chats, activeChat } = this.state;
  //   return (
  //     <div className="chatsList">
  //       <ActionCable
  //         channel={{ channel: 'ChatsChannel' }}
  //         onReceived={this.handleReceivedChat}
  //       />
  //       {this.state.chats.length ? (
  //         <ChatsCable
  //           chats={chats}
  //           handleReceivedConversation={this.handleReceivedConversation}
  //         />
  //       ) : null}
  //       <h2>Chats</h2>
  //       <ul>{mapChats(chats, this.handleClick)}</ul>
  //       <NewChatForm />
  //       {activeChat ? (
  //         <ConversationsArea
  //           chat={findActiveChat(
  //             chats,
  //             activeChat
  //           )}
  //         />
  //       ) : null}
  //     </div>
  //   );
  // };
  // }
  //
  // //const mapStateToProps = (state) => {
  // //   return {
  // //
  // //   }
  // // }
  // //
  // // const mapDispatchToProps = (dispatch) => {
  // //   return {
  // //
  // //   }
  // // }
  //
  // export default ChatsContainer;
  // // export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);
  //
  // //helpers
  //
  // const findActiveChat = (chats, activeChat) => {
  //   return chats.find(
  //     chat => chat.id === activeChat
  //   )
  // }
  //
  // const mapChats = (chats, handleClick) => {
  //   return chats.map(chat => {
  //     return (
  //       <li key={chat.id} onClick={() => handleClick(chat.id)}>
  //         {chat.id}
  //         {/* <div>chat with {this.props.acctedUser.first_name}</div> */}
  //       </li>
  //     )
  //   })
  // }
  componentDidMount = () => {
    this.props.thunkSaveChats()
  }

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
      <div className="chatsBox">
        { this.props.chats.length ? <ConversationsCable /> : null }
        <h2 className="sunIcon" >Chats</h2>
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
    thunkSaveChats: () => dispatch(thunkSaveChats()),
    // saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId)),
    saveCurrentChat: (currentChat) => dispatch(saveCurrentChat(currentChat))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer)
