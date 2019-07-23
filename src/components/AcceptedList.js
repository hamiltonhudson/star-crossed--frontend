import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/ActionTypes';
import { ActionCableConsumer } from 'react-actioncable-provider'
import { setReceiver, setReceiverId, setChats, addNewChat, saveCurrentChat } from '../actions';
import ConversationForm from './ConversationForm';
import ConversationsCable from './ConversationsCable';
import ConvoDisplay from './ConvoDisplay';


class AcceptedList extends React.Component {

  state = {
    convoOpened: false,
    currentChat: '',
    currentChatId: null,
    // currentChatId: '',
    exists: '',
    conversations: []
  }

  findOrStartChat = (receiver) => {
    this.props.setReceiver(receiver)
    this.props.setReceiverId(receiver.id)
    switch((this.props.chats.length === 0 || !(this.props.chats.map(chat => chat.user_ids.includes(receiver.id))).includes(true))) {
      case true:
      console.log("in true case: length is zero or doesn't exist, create new")
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
          this.props.setChats(result)
          this.props.addNewChat(result)
          this.props.saveCurrentChat(result)
        })
      break;
      case false:
        console.log("in false case: chat exists, find and proceed?")
        // let existingChats = this.props.chats.filter(chat => chat.user_ids.includes(receiver.id))
        // console.log("existingChats", existingChats)
        // let existingChat = this.props.chats.find(chat => chat.user_ids.includes(receiver.id))
        // console.log("existingChat", existingChat)
        let existingChat = this.props.chats.find(chat => chat.users.filter(user => user.id === receiver.id))
        this.setState({
          convoOpened: true,
          currentChat: existingChat,
          currentChatId: existingChat.id
        })
        this.props.saveCurrentChat(existingChat)
      break;
      default:
      return null
    }
  }

  handleClick = (receiver) => {
    console.log(`user ${receiver.first_name} clicked!`)
    console.log(this.props.chats)
    this.props.setReceiver(receiver)
    this.props.setReceiverId(receiver.id)
    if ((this.props.chats.length === 0 || !(this.props.chats.map(chat => chat.user_ids.includes(receiver.id))).includes(true))) {
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
          sender_id: this.props.currentUser.id,
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
        this.props.setChats(result)
        this.props.addNewChat(result)
        this.props.saveCurrentChat(result)
      })
    } else if ((this.props.chats.map(chat => chat.user_ids.includes(receiver.id))).includes(true)) {
      let existingChat = this.props.chats.find(chat => chat.users.filter(user => user.id === receiver.id))
      console.log("existingChat", existingChat)
      this.setState({
        convoOpened: true,
        currentChat: existingChat,
        currentChatId: existingChat.id
      })
      this.props.saveCurrentChat(existingChat)
    }
  }

  handleReceivedConversation = (response) => {
    console.log("resonse for receive convo in acceptedlist", response)
    console.log("resonse for receive convo in acceptedlist", response)
    const conversation = response
    // const chats = [...this.state.chats]
    const chats = this.props.chats
    const chat = chats.find(chat => chat.id === conversation.chat_id)
    // chat.conversations = [...chat.conversations, conversation]
    this.setState({
        conversations: [...this.state.conversations, conversation]
    })
    this.props.saveCurrentChat(chat)
    if (conversation.length > 0) {
      this.props.saveConvoMsgs(conversation)
    }
  }

  generateAccepted = () => {
    let accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
    let acceptedUsers = accepted.map(a => a.matched_user)
    return acceptedUsers.map(acceptedUser => {
      return (
        <div className="accepted-list" key={acceptedUser.id}>
          <button onClick={() => this.handleClick(acceptedUser)} key={acceptedUser.id}>
            {/* <button onClick={() => this.findOrStartChat(acceptedUser)} key={acceptedUser.id}> */}
            <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
          </button>
        </div>
      )
    })
  }

  render() {
    console.log("this.props in AcceptedList", this.props)
    console.log("this.props.chats in acceptedlist", this.props.chats)
    console.log("this.props.currentChat", this.props.currentChat)
    return (
      <div className="row">
        <div className="col s3">
          {this.generateAccepted()}
        </div>
        {this.props.currentUser.id ?
          <ActionCableConsumer
            channel={{channel: 'ChatsChannel'}}
            onReceived={this.handleReceivedConversation}
          />
        : null
        }
        {/* {this.props.chats.length ? */}
        {/* {this.props.conversations.length ?
          <ConversationsCable
            chats={this.props.chats} currentUser={this.props.currentUser}
            // handleReceivedConversation={this.handleReceivedConversation}
            // handleReceivedUserChat={this.handleReceivedUserChat}
            // handleReceivedChat={this.handleReceivedChat}
          />
        :null} */}
        {/* {this.state.currentChat ?
          <ConvoDisplay
            chat={this.state.currentChat}
            currentChat={this.props.currentChat}
            currentUser={this.props.currentUser}
          />
        : null} */}
        {/* {this.state.currentChat ? */}
        <div className="col s9">
          <ConvoDisplay ref={this.props.chatRef}/>
        </div>
          {/* : null} */}
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    chats: state.chats.chats,
    receiverId: state.chats.receiverId,
    currentChat: state.chats.currentChat,
    conversations: state.chats.conversations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReceiverId: (receiverId) => dispatch(setReceiverId(receiverId)),
    setReceiver: (receiver) => dispatch(setReceiver(receiver)),
    setChats: (chat) => dispatch(setChats(chat)),
    addNewChat: (chat) => dispatch(addNewChat(chat)),
    saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedList)
