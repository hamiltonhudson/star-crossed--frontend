import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';
import '../styling/App.css';
import '../styling/Accepted.css';
import ChatParticle from './ChatParticle';
import AcceptedList from './AcceptedList';
// import Chat from './Chat';
import ChatsCable from './ChatsCable';
import ConversationsCable from './ConversationsCable';
import { API_WS_ROOT, API_ROOT } from '../constants/ActionTypes';
import { viewMatch, enableChat, getChats, addNewChat, saveChats, saveConvoMsgs } from '../actions';
import Adapter from './Adapter';

class ChatsBase extends React.Component {

  state = {
    chats: [],
    chatWith: '',
    activeChat: '',
    conversations: []
  }


  componentDidMount = () => {
    console.log("document cookie", document.cookie)
    console.log("this.props.userId in ChatsBase", this.props.userId)
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
    .then(r => r.json())
    .then(chats => {
      console.log(chats)
      this.props.getChats(chats)
      this.setState({ chats })
    })
  }

  handleReceivedChat = (response) => {
    console.log(response)
    const { chat } = response
    // if (chat.users.map((user) => user.id).includes(this.props.userId)) {
    //   this.props.addNewChat(chat)
    // }
      this.setState({
        chats: [...this.state.chats, chat]
      })
  }

  // handleReceivedChat = () => {
  //   // const conversation
  //   if (this.props.chats.users.map(user => user.id.includes(this.props.receiverId))) {
  //     let activeChat = this.props.chats.find(chat => chat.users.map(user => user.id.includes(this.props.receiverId)))
  //     this.setState({
  //       activeChat: activeChat
  //     })
  //   }
  // }

  handleReceivedConversation = (response) => {
    const conversation = response.conversation
    const chats = [...this.state.chats]
    const chat = chats.find(chat => chat.id === conversation.chat_id)
    chat.conversations = [...chat.conversations, conversation]
    this.setState({
        conversations: [...this.state.conversations, conversation]
    })
    // this.props.saveConvoMsgs(chat.conversations)
  }

  initalizeConvo = () => {
    return this.props.chat.conversations.length === 0
    ? <div className="initial-convo">
      <p>Start chatting</p>
    </div>
    : <div className="initial-convo">
      {(this.props.chat.conversations[(this.props.chat.conversations.length)-1].user.first_name)}: {`${this.props.chat.conversations[(this.props.chat.conversations.length)-1].message.substring(0, 15)}...`}
    </div>
    }

  render() {
    console.log("this.state in ChatsBase", this.state)
    console.log("this.props.conversations in ChatsBase", this.state.props)
    return (
      <div className="accepted" style={{"borderColor": "#40b144"}}>
        <div className="Accepted-header row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
          <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
          <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
          <div>
            <h5 style={{"color":"#ffffff"}}>Chat file</h5>
          </div>
          <div>
            {this.props.currentUser.id
              ? <ActionCableConsumer
                channel={{channel: 'ChatsChannel'}}
                onReceived={this.handleReceivedChat}
                />
              : null
            }
            {this.state.chats.length ? (
              <ChatsCable
                chats={this.state.chats} currentUser={this.props.currentUser}
                handleReceivedChat={this.handleReceivedChat}
              />)
            : null}
            <AcceptedList />
            <ConversationsCable
              chats={this.state.chats} currentUser={this.props.currentUser}
              handleReceivedConversation={this.handleReceivedConversation}
            />
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
    receiverId: state.chats.receiverId,
    conversations: state.chats.conversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: (chats) => dispatch(getChats(chats)),
    saveChats: (chats) => dispatch(saveChats(chats)),
    saveConvoMsgs: (conversations) => dispatch(saveConvoMsgs(conversations))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase)
