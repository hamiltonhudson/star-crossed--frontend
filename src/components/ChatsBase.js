import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import '../styling/App.css';
import '../styling/Accepted.css';
import ChatParticle from './ChatParticle';
// import Particles from 'react-particles-js';
import ChatsContainer from './ChatsContainer';
import Chat from './Chat';
import ChatsCable from './ChatsCable'
import { API_WS_ROOT, API_ROOT } from '../constants/ActionTypes';
import { viewMatch, enableChat } from '../actions';
// import Cable from 'actioncable';
import App from '../App';
import Display from './Display';
import Adapter from './Adapter';
import ChatDisplayContainer from './ChatDisplayContainer';
import NewChatForm from './NewChatForm';
import ConversationsArea from './ConversationsArea';

class ChatsBase extends React.Component {

  state = {
    chats: [],
    chatWith: ''
  }

//   handleStartChat = (selectedUser) => {
//   // this.props.selectUser(this.props.acceptedUsers.find(acceptedUser.id === selectedUser.id))
//     console.log(selectedUser)
//     this.props.viewMatch(selectedUser)
//     this.setState({
//       chatWith: selectedUser.first_name
//   })
// }

  // chatUser = () => {
  //   return this.props.chat.users.find(user => user.id !== this.props.userId)
  // }
  //
  // initalizeConvo = () => {
  //   return this.props.chat.conversations.length === 0
  //   ? <div className="initial-convo">
  //     <p>Start chatting</p>
  //   </div>
  //   : <div className="initial-convo">
  //     {/* {(this.props.conversation.messages[(this.props.conversation.messages.length)-1].user.username)}: {`${this.props.conversation.messages[(this.props.conversation.messages.length)-1].text.substring(0, 15)}...`} */}
  //     {(this.props.chat.conversations[(this.props.chat.conversations.length)-1].user.first_name)}: {`${this.props.chat.conversations[(this.props.chat.conversations.length)-1].message.substring(0, 15)}...`}
  //   </div>
  //   }

  componentDidMount = () => {
    // const fetchToWebSocket = (route, bodyData) => {
      console.log("document cookie", document.cookie)
      console.log(`Bearer ${localStorage.getItem('token')}`)
      console.log("this.props.userId in ChatsBase", this.props.userId)
      fetch(`${API_ROOT}/chats`, {
    // fetch(`${API_ROOT}/chats/?user_id=${this.props.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": localStorage.getItem("token"),
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "X-Authorization": document.cookie,
        "Credentials": "include"
      }
    })
      .then(r => r.json())
      .then(chats => {
        console.log(chats)
        this.setState({ chats })
      })
    }
  // }

  handleClick = id => {
    this.setState({ activeChat: id })
  }

  handleReceivedChat = response => {
    const { chat } = response
    this.setState({
      chats: [...this.state.chats, chat]
    })
  }

  render() {
    console.log("ChatsBase PROPS", this.props)
    return (
      // <ActionCableProvider url={API_WS_ROOT+`?token=${localStorage.getItem('token')}`}>
        <div className="accepted">
          <div className="Accepted-header row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
            <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
            <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
            <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
            <div>
              {/* <Display /> */}
              {/* <ChatDisplayContainer /> */}
              {/* {this.props.userId */}
              {/* {this.props.currentUser.id
                ? <ActionCableConsumer
                  className='ChatsCable'
                  channel={{channel: 'ChatsChannel'}}
                  onReceived={(response) => this.handleReceivedChat(response)}
                  />
                : null
              } */}
              {this.fetchToWebSocket}
              <ActionCableConsumer
                channel={{ channel: 'ChatsChannel' }}
                headers={{"credentials": "include"}}
                onReceived={this.handleReceivedChat}
              />
              {/* {this.state.chats.length ? ( */}
              {/* <Cable */}
              <ChatsCable
                // chats={this.state.chats} currentUser={this.props.currentUser}
                handleReceivedUserChat={this.handleReceivedUserChat}
              />
              {/* ) : null } */}
              <ChatDisplayContainer />
              <ConversationsArea />
            </div>
          </div>
          <ChatParticle className="snow" />
        </div>
      // </ActionCableProvider>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase);
