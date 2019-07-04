import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ActionCable from 'actioncable';
// import { ActionCableProvider } from 'actioncable';
import '../styling/App.css';
import '../styling/Accepted.css';
import ChatParticle from './ChatParticle';
// import Particles from 'react-particles-js';
import ChatsContainer from './ChatsContainer';
import Chat from './Chat';
import { ActionCableProvider } from 'react-actioncable-provider';
import { ActionCable } from 'react-actioncable-provider';
import { API_WS_ROOT } from '../constants/ActionTypes';
import { viewMatch, enableChat } from '../actions';
// import Cable from 'actioncable';
import App from '../App';
import Display from './Display';
import Adapter from './Adapter';

class ChatsBase extends React.Component {

  // state = {
  //   chatWith: ''
  // }

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

  render() {
    console.log("ChatsBase PROPS", this.props)
    // const generateAccepted = () => {
    //   return this.props.acceptedUsers.map(acceptedUser => {
    //     return (
    //       <div onClick={() => this.handleStartChat(acceptedUser)} key={acceptedUser.id} className="users-header">
    //         {acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}
    //       </div>
    //     )
    //   })
    // }
    return (
      <ActionCableProvider url={`${API_WS_ROOT}+?user=${this.props.userId}`}>
        <div className="accepted">
          <div className="Accepted-header row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
            <Link to='/' onClick={() => {Adapter.signOut(); this.props.history.push("/")}} className="left-link col l4 m4 s3"> ◀︎ Logout</Link>
            <Link to='/matches' className="center-link col l4 m4 s6"> △ Matches △  </Link>
            <Link to='/profile' className="right-link col l4 m4 s3"> Profile ▶︎ </Link>
            <div className="accepted-container">
              {/* Accepted */}
              <div className="users-card">
                {/* {generateAccepted()} */}
                <div className="App">
                  <div style={{"fontColor": "white"}}>
                    {/* <ActionCableProvider url={API_WS_ROOT+`?user=${this.props.currentUser.id}`}> */}
                    {/* { this.initializeConvo()} */}
                    <Display />
                    {/* </ActionCableProvider> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChatParticle className="snow" />
        </div>
      </ActionCableProvider>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    userId: state.users.currentUser.id,
    acceptedUsers: state.matches.acceptedUsers,
    chats: state.chats.chats,
    // chatEnabled: state.users.chatEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatsBase);
