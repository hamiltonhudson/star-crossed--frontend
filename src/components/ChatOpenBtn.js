import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes'
import { saveCurrentChat } from '../actions'

const ChatOpenBtn = (props) => {
  console.log("props in ChatOpenBtn", props)
// const OpenChat = (props) => {

  const saveTokenAsCookie = () => {
   // document.cookie = 'X-Authorization=' + this.getToken() + '; path=/';
    document.cookie = 'X-Authorization=' + localStorage.getItem('token') + '; path=/';
  }

// fetchToWebSocket = (route, bodyData) => {
  const fetchToWebSocket = (route, bodyData) => {
    saveTokenAsCookie()
    console.log(document.cookie)
    fetch(`${API_ROOT}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Authorization': localStorage.getItem('token'),
          'X-Authorization': document.cookie,
          'Credentials': 'include'
        },
        body: JSON.stringify(bodyData)
      })
    }

  function chatExists(receiverId) {
    let foundChat = props.chats.filter(chat => chat.users.map((user) => user.id).includes(receiverId))
    if (foundChat.length > 0) {
      props.saveCurrentChat(foundChat[0])
      return true;
    }
  }

  const handleClick = () => {
    let body = {
      chat: {
        title: "PRIVATE",
        sender_id: props.sender_id,
        receiver_id: props.receiver_id
      }
    }
    if (chatExists(props.receiver_id)) {
      props.onClickClose()
    } else {
    fetchToWebSocket("chats", body);
      // this.fetchToWebSocket("conversations", body);
      props.onClickClose()
    }
  }
  return (
    // <button onClick={() => handleClick()}> {this.props.acceptedUser.first_name} ➣ </button>
      <button className="ChatOpenBtn" onClick={() => handleClick()} style={{size: 30, paddingLeft: 50, paddingTop: 15, paddingBottom: 15}}> {this.props.acceptedReceiver.first_name} ➣ </button>
    )
  }

const mapStateToProps = (state) => {
  return {
    sender_id: state.users.currentUser.id,
    receiver_id: state.users.receiverId,
    chats: state.chats.chats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatOpenBtn)
