import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { saveCurrentChat } from '../actions';
import App from '../App';
import NewConversationForm from './NewConversationForm';
import '../styling/Accepted.css'

class AcceptedList extends React.Component {

  state = {
    currentChat: ''
  }

  fetchToWebSocket = (route, bodyData) => {
    fetch(`${API_ROOT}/${route}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Authorization': localStorage.getItem('token'),
            'Credentials': 'include'
          },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
  }


  render() {
    console.log("AcceptedList PROPS", this.props)
    console.log("this.props.receiver_id", this.props.receiver_id)
    const handleClick = (receiverId) => {
      console.log("receiver_id", receiverId)
      let body = {
        title: "PRIVATE",
        receiver_id: receiverId,
        sender_id: this.props.currentUser.id
      }
      // if (chatExists(props.receiver_id)) {
        // console.log("exists")
        // props.onClickClose()
      // } else {
      this.fetchToWebSocket("chats", body);
      return (
        <NewConversationForm />
      )
      // this.fetchToWebSocket("conversations", body);
      // props.onClickClose()
    }


    const generateAccepted = () => {
      const accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
      const acceptedUsers = accepted.map(a => a.matched_user)
      return acceptedUsers.map(acceptedUser => {
        return (
          <div className="AcceptedList" key={acceptedUser.id}>
            <button onClick={() => handleClick(acceptedUser.id)} key={acceptedUser.id}>
              {/* receiverId={acceptedUser.id} */}
              <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
            </button>
          </div>
        )
      })
    }

    return (
      <div>
        {generateAccepted()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    sender_id: state.users.currentUser.id,
    acceptedUsers: state.matches.acceptedUsers,
    chats: state.chats.chats,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AcceptedList);
