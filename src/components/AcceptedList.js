import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { saveCurrentChat } from '../actions';
import App from '../App';

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
      function chatExists(receiverId) {
        let foundChat = props.chats.filter(chat => chat.users.map((i) => i.id).includes(receiverId))
        if (foundChat.length > 0) {
          props.saveCurrentChat(foundChat[0])
          return true;
        }
      }

    const handleClick = () => {
      let body = {
        title: "PRIVATE",
        sender_id: props.sender_id,
        receiver_id: props.receiver_id
      }
      if (chatExists(props.receiver_id)) {
        props.onClickClose()
      } else {
        this.fetchToWebSocket("conversations", body);
        // this.fetchToWebSocket("conversations", body);
        props.onClickClose()
      }
    }
    const acceptedReceiver = this.props.acceptedUsers.find(acceptedUser => acceptedUser.id === props.receiverId)
    return (
      <button onClick={() => handleClick()} id="chatBTN"> {acceptedReceiver.first_name} ➣ </button>
        )
  }

    const generateAccepted = () => {
      return this.props.acceptedUsers.map(acceptedUser => {
        return (
          <Fragment>
            receiverId={acceptedUser.id}
            {/* receiverId={this.props.acceptedUser.id} */}
            key={acceptedUser.id} className="users-header"
            onClick={() => this.openChat(acceptedUser.id)}
            <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
          </Fragment>
        )
      })
    }
    // return this.props.acceptedUsers.map(acceptedUser => {
    //   return (
    //     <div className="users-card">
    //       <div className="accepted-container">
    //         <ul>
    //           <li key={acceptedUser.id} >{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</li>
    //         </ul>
    //       </div>
    //     </div>
      // )}
    // )
    return (
      <div className="accepted-container">
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


// // fetchToWebSocket = (route, bodyData) => {
// fetchToWebSocket(route, bodyData) {
//   fetch(`${API_ROOT}/${route}`, {
//       method: 'POST',
//       headers: HEADERS,
//       // headers: {
//       //     "Accept": "application/json",
//       //     "Content-Type": "application/json",
//       //     "Authorization": `Bearer ${localStorage.getItem("token")}`
//       //   },
//       body: JSON.stringify(bodyData)
//   })
// }
//
//
// render() {
//   console.log("AcceptedList PROPS", this.props)
//
//   const OpenChat = (props) => {
//     function chatExists(receiverId) {
//       let foundChat = props.chats.filter(chat => chat.users.map((i) => i.id).includes(receiverId))
//       if (foundChat.length > 0) {
//         props.saveCurrentChat(foundChat[0])
//         return true;
//       }
//     }
//
//   const handleClick = () => {
//     let body = {
//       title: "PRIVATE",
//       sender_id: props.sender_id,
//       receiver_id: props.receiver_id
//     }
//     if (chatExists(props.receiver_id)) {
//       props.onClickClose()
//     } else {
//       this.fetchToWebSocket("conversations", body);
//       // this.fetchToWebSocket("conversations", body);
//       props.onClickClose()
//     }
//   }
//   return (
//     <button onClick={() => handleClick()}> chatBTN ➣ </button>
//   )
// }
//
// // const OpenChat = () => {
// //   function chatExists(receiverId) {
// //     let foundChat = this.props.chats.filter(chat => chat.users.map((i) => i.id).includes(receiverId))
// //     if (foundChat.length > 0) {
// //       this.props.saveCurrentChat(foundChat[0])
// //       return true;
// //     }
// //   }
// //
// // const handleClick = () => {
// //   let body = {
// //     title: "PRIVATE",
// //     sender_id: this.props.sender_id,
// //     receiver_id: this.props.receiver_id
// //   }
// //     if (chatExists(this.props.receiver_id)) {
// //       this.props.onClickClose()
// //     } else {
// //       this.fetchToWebSocket("conversations", body);
// //     // this.fetchToWebSocket("conversations", body);
// //       this.props.onClickClose()
// //     }
// //   }
// //   return (
// //     <button onClick={() => handleClick()}> chatBTN ➣ </button>
// //   )
// // }
