import React from 'react';
// import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes'
import { saveCurrentChat } from '../actions'

const ChatOpenBtn = (props) => {
// const OpenChat = (props) => {

// fetchToWebSocket = (route, bodyData) => {
  const fetchToWebSocket = (route, bodyData) => {
    fetch(`${API_ROOT}/${route}`, {
        method: 'POST',
        headers: HEADERS,
      // headers: {
      //     "Accept": "application/json",
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${localStorage.getItem("token")}`
      //   },
        body: JSON.stringify(bodyData)
      })
    }

  function chatExists(receiverId) {
    // let foundChat = props.chats.filter(chat => chat.users.map((i) => i.id).includes(receiverId))
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
      <button onClick={() => handleClick()} style={{paddingLeft: 50, paddingTop: 15, paddingBottom: 15}}> {this.props.acceptedReceiver.first_name} ➣ </button>
    )
  }

const mapStateToProps = (state) => {
  return {
    sender_id: state.users.currentUser.id,
    chats: state.chats.chats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatOpenBtn)
