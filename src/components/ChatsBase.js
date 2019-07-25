import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants/Roots';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { setChats, addNewChat, saveChats, saveCurrentChat, saveConvoMsgs } from '../actions';
import Adapter from './Adapter';
import ChatParticle from './ChatParticle';
import AcceptedList from './AcceptedList';
import ChatsCable from './ChatsCable';
import ConversationsCable from './ConversationsCable';
import '../styling/Accepted.css';
import '../styling/App.css';


class ChatsBase extends React.Component {

  state = {
    chats: [],
    chatWith: '',
    activeChat: '',
    conversations: []
  }


  componentDidMount = () => {
    fetch(`${API_ROOT}/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.getItem("token"),
        "X-Authorization": document.cookie,
        "Credentials": "include"
      }
    })
    .then(response => response.json())
    .then(result => {
      let chats = result
      this.props.setChats(chats)
      this.setState({ chats })
    })
  }

  handleReceivedChat = (response) => {
    const { chat } = response
    // let activeChat = this.props.chats.find(chat => chat.users.map(user => user.id.includes(this.props.receiverId)))
    this.setState({
      chats: [...this.state.chats, chat],
      // activeChat: activeChat
    })
    // this.props.saveCurrentChat(chat)
  }

  handleReceivedConversation = (response) => {
    const conversation = response
    const chat = this.props.chats.find(chat => chat.id === conversation.chat_id)
    chat.conversations = [...chat.conversations, conversation]
    this.setState({ conversations: [...this.state.conversations, conversation] })
    // this.props.saveCurrentChat(chat)
    if (conversation.lenth > 0) {
      this.props.saveConvoMsgs(chat.conversations)
    }
  }

  initalizeConvo = () => {
    return this.props.chat.conversations.length === 0 ? (
      <div className="initial-convo">
        <p>Start chatting</p>
      </div>
    ) : (
      <div className="initial-convo">
        {(this.props.chat.conversations[(this.props.chat.conversations.length)-1].user.first_name)}: {`${this.props.chat.conversations[(this.props.chat.conversations.length)-1].message.substring(0, 15)}...`}
      </div>
    )
  }

  render() {
    return (
      <div className="Chats" style={{"borderColor": "#40b144"}}>
        <div className="chats-base row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
          <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
          <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
          <br/>
          <div className="row">
            <h5 className="col s10 offset-s2 chat-header glow3"> Chat With {this.props.receiver? (<span className="chat-with">{this.props.receiver.first_name}</span>) : null} </h5>
          </div>
          <div>
            {this.props.currentUser.id
              ? <ActionCableConsumer
                channel={{channel: 'ChatsChannel'}}
                onReceived={this.handleReceivedChat}
                />
              : null
            }
            {this.props.chats.length ? (
              <ChatsCable
                chats={this.props.chats} currentUser={this.props.currentUser}
                userId={this.props.currentUser.id} receiverId={this.props.receiverId}
                handleReceivedChat={this.handleReceivedChat}
              />)
            : null}
            <AcceptedList />
          </div>
        </div>
        <ChatParticle className="snow" />
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      userId: state.users.currentUser.id,
      acceptedUsers: state.matches.acceptedUsers,
      chats: state.chats.chats,
      chatEnabled: state.chats.chatEnabled,
      receiver: state.chats.receiver,
      receiverId: state.chats.receiverId,
      conversations: state.chats.conversations
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      setChats: (chats) => dispatch(setChats(chats)),
      saveChats: (chats) => dispatch(saveChats(chats)),
      saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat)),
      // saveConvoMsgs: (conversations) => dispatch(saveConvoMsgs(conversations))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase);
