import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/ActionTypes';
import { setReceiverId, saveCurrentChat } from '../actions';
import ConversationForm from './ConversationForm';
import ConversationsCable from './ConversationsCable';
import ConvoDisplay from './ConvoDisplay';


class AcceptedList extends React.Component {

  state = {
    convoOpened: false,
    currentChat: '',
    currentChatId: null,
  }

  chatExists = (receiverId) => {
    if (this.props.chats.map(chat => chat.users.includes(receiverId))) {
      console.log("chat exists!")
    } else {
      console.log("start chatting")
    }
  }

  handleClick = (receiver) => {
    // event.preventDefault()
    console.log(`user ${receiver.first_name} clicked!`)
    console.log(this.props.chats)
    this.props.setReceiverId(receiver.id)
    let existingChatUsers = this.props.chats.map(chat => chat.users)
    console.log("existingchatUsers", existingChatUsers)
    if (this.props.chats.map(chat => chat.users.includes(receiver))) {
      console.log("yes")
      let existingChat = this.props.chats.find(chat => chat.users.filter(user => user.id === receiver.id))
      console.log(existingChat)
      this.setState({
        convoOpened: true,
        currentChat: existingChat,
        currentChatId: existingChat.id
      })
      this.props.saveCurrentChat(existingChat)
    } else {
      fetch(`${API_ROOT}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token'),
          'Credentails': 'include'
        },
        body: JSON.stringify({
          title: "PRIVATE",
          receiver_id: receiver.id,
          sender_id: this.props.currentUser.id
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          convoOpened: true,
          currentChat: result,
          currentChatId: result.id
        })
        this.props.saveCurrentChat(result)
      })
    }
  }

  generateAccepted = () => {
    let accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
    let acceptedUsers = accepted.map(a => a.matched_user)
    return acceptedUsers.map(acceptedUser => {
      return (
        <div className="AcceptedList" key={acceptedUser.id}>
          <button onClick={() => this.handleClick(acceptedUser)} key={acceptedUser.id}>
            <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
          </button>
        </div>
      )
    })
  }

  render() {
    console.log("this.props in AcceptedList", this.props)
    return (
      <div>
        <h5 style={{"color":"#ffffff"}}> User Accepted List </h5>
        {this.generateAccepted()}
        {this.props.chats.length ?
          <ConversationsCable
            chats={this.state.chats} currentUser={this.props.currentUser}
            // handleReceivedUserChat={this.handleReceivedUserChat}
            handleReceivedChat={this.handleReceivedChat}/>
        : null}
        {this.state.currentChat ?
          <ConvoDisplay
            chat={this.state.currentChat}
            currentUser={this.props.currentUser}
          />
        : null}
        {/* {this.state.convoOpened !== true ? null : <ConversationForm />  */}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    chats: state.chats.chats,
    receiverId: state.chats.receiverId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReceiverId: (receiverId) => dispatch(setReceiverId(receiverId)),
    saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedList)
