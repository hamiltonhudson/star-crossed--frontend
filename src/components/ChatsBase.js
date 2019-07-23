import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_WS_ROOT, API_ROOT } from '../constants/ActionTypes';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { viewMatch, enableChat, setChats, addNewChat, saveChats, saveCurrentChat, saveConvoMsgs } from '../actions';
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
    .then(response => response.json())
    .then(result => {
      console.log("chats (response.json) in ChatBase componentDidMount", result)
      let chats = result
      this.props.setChats(chats)
      this.setState({ chats })
    })
  }

  handleReceivedChat = (response) => {
    console.log("response in handleReceivedChat", response)
    const { chat } = response
    // if (chat.users.map((user) => user.id).includes(this.props.userId)) {
    //   this.props.addNewChat(chat)
    // let activeChat = this.props.chats.find(chat => chat.users.map(user => user.id.includes(this.props.receiverId)))
      this.setState({
        chats: [...this.state.chats, chat],
        // activeChat: activeChat
      })
      this.props.saveCurrentChat(chat)
  }

  handleReceivedConversation = (response) => {
    console.log("resonse for receive convo in chatsbase", response)
    const conversation = response
    // const chats = [...this.state.chats]
    // const chat = chats.find(chat => chat.id === conversation.chat_id)
    const chat = this.props.chats.find(chat => chat.id === conversation.chat_id)
    chat.conversations = [...chat.conversations, conversation]
    this.setState({
        conversations: [...this.state.conversations, conversation]
    })
    this.props.saveCurrentChat(chat)
    if (conversation.lenth > 0) {
    this.props.saveConvoMsgs(chat.conversations)
    }
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
    console.log("this.state.chats in ChatsBase", this.state.chats)
    console.log("this.props.chats in ChatsBase", this.props.chats)
    console.log("this.props.conversations in ChatsBase", this.props.conversations)
    return (
      <div className="Chats" style={{"borderColor": "#40b144"}}>
        <div className="chats-base row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
          <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
          <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
          <div className="row">
            <h6 className="column s6 chat-header glow3">↡ · Chat · ↡ </h6>
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
            {this.state.chats.length ? (
              <ConversationsCable
                chats={this.state.chats} currentUser={this.props.currentUser}
                handleReceivedConversation={this.handleReceivedConversation}
              />)
            : null}
            {/* <div className="col s3"> */}
            <AcceptedList />
            {/* </div> */}
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
    // getChats: (chats) => dispatch(getChats(chats)),
    setChats: (chats) => dispatch(setChats(chats)),
    saveChats: (chats) => dispatch(saveChats(chats)),
    saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat)),
    saveConvoMsgs: (conversations) => dispatch(saveConvoMsgs(conversations))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase)
