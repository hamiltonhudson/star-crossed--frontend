import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { saveCurrentChat } from '../actions';
import App from '../App';
import '../styling/Accepted.css'

class AcceptedList extends React.Component {

  // fetchToWebSocket = (route, bodyData) => {
  fetchToWebSocket(route, bodyData) {
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


  render() {
    console.log("AcceptedList PROPS", this.props)

    const OpenChat = (props) => {
      // function chatExists(receiverId) {
      //   let foundChat = props.chats.filter(chat => chat.users.map((i) => i.id).includes(receiverId))
      //   if (foundChat.length > 0) {
      //     props.saveCurrentChat(foundChat[0])
      //     return true;
      //   }
      // }
    const handleClick = () => {
      let body = {
        title: "PRIVATE",
        sender_id: props.sender_id,
        receiver_id: props.receiver_id
      }
      // if (chatExists(props.receiver_id)) {
      //   props.onClickClose()
      // } else {
        this.fetchToWebSocket("chats", body);
        // this.fetchToWebSocket("conversations", body);
        // props.onClickClose()
      }
    const acceptedReceiver = this.props.acceptedUsers.find(acceptedUser => acceptedUser.id === props.receiverId)
    return (
      <button onClick={() => handleClick()} className="list"> {acceptedReceiver.first_name} ☀︎ {acceptedReceiver.sun.sign} ➣ </button>
    )
  }


    const generateAccepted = () => {
      return this.props.acceptedUsers.map(acceptedUser => {
        return (
          <div>
            <OpenChat
              receiverId={acceptedUser.id}
              key={acceptedUser.id}
              onClick={() => this.openChat(acceptedUser.id)}
              // {/* <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div> */}
            />
            {/* <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign} </div> */}
          </div>
      )
    })
  }
    /*
      return this.props.acceptedUsers.map(acceptedUser => {
      //   return (
      //     <div className="users-card">
      //       <div className="accepted-container">
      //         <ul>
      //           <li key={acceptedUser.id} >{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</li>
      //         </ul>
      //       </div>
      //     </div>
      // )}
    // ) */
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
