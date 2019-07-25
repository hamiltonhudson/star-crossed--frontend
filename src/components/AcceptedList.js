import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/Roots';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { setReceiver, setReceiverId, setChats, addNewChat, saveCurrentChat, saveConvoMsgs, setCurrentUser, findAccepted, findAcceptedUsers } from '../actions';
import ConversationForm from './ConversationForm';
import ConversationsCable from './ConversationsCable';
import ConvoDisplay from './ConvoDisplay';


class AcceptedList extends React.Component {

  state = {
    convoOpened: false,
    currentChat: '',
    currentChatId: null,
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
          // this.props.setChats(result)
          this.props.addNewChat(result)
          this.props.saveCurrentChat(result)
        })
      break;
      case false:
        console.log("in false case: chat exists, find and proceed?")
        // let existingChat = this.props.chats.find(chat => chat.users.filter(user => user.id === receiver.id))
        let existingChat = this.props.chats.find(chat => chat.user_ids.includes(receiver.id))
        console.log("existingChat", existingChat)
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

  handleReceivedConversation = (response) => {
    console.log("resonse for receive convo in acceptedlist", response)
    const conversation = response
    // const chats = [...this.state.chats]
    const chats = this.props.chats
    const chat = chats.find(chat => chat.id === conversation.chat_id)
    chat.conversations = [...chat.conversations, conversation]
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
        <div className="accepted-user-chat" key={acceptedUser.id}>
          <div onClick={() => this.findOrStartChat(acceptedUser)} key={acceptedUser.id}>
            <div><span className="sun-color"> ☀︎ </span><span className="hover-name"> {acceptedUser.first_name}</span> <span className="chat-sign">({acceptedUser.sun.sign})</span></div>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log("this.props in AcceptedList", this.props)
    console.log("this.props.chats in acceptedlist", this.props.chats)
    console.log("this.props.currentChat", this.props.currentChat)
    return (
      <div>
        <div className="col l3 m4 s12">
          {this.generateAccepted()}
        </div>
        {/* {this.props.currentUser.id ?
          <ActionCableConsumer
            channel={{channel: 'ChatsChannel'}}
            onReceived={this.handleReceivedConversation}
          />
        : null */}
        {/* {this.state.chats.length ? ( */}
        {/* {this.props.chats.length ? ( */}
        <ConversationsCable
          chats={this.props.chats} currentUser={this.props.currentUser}
          currentChat={this.props.currentChat}
          // handleReceivedConversation={this.handleReceivedConversation}
        />
        {/* : null} */}
        {/* {this.state.currentChat ? */}
        <ConvoDisplay ref={this.props.chatRef}/>
        {/* : null} */}
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      chats: state.chats.chats,
      receiver: state.chats.receiver,
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
      saveCurrentChat: (chat) => dispatch(saveCurrentChat(chat)),
      // saveConvoMsgs: (conversation) => dispatch(saveConvoMsgs(conversation)),
      setCurrentUser: (user) => dispatch(setCurrentUser(user)),
      findAccepted: (accepted) => dispatch(findAccepted(accepted)),
      findAcceptedUsers: (acceptedUsers) => dispatch(findAcceptedUsers(acceptedUsers))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedList);
