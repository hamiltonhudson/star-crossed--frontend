import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { saveCurrentChat } from '../actions';
import App from '../App';
import NewConversationForm from './NewConversationForm';
import NewChatForm from './NewChatForm';
import '../styling/Accepted.css'

class AcceptedList extends React.Component {

  state = {
    thisChat: '',
    receiver: '',
    convoOpened: false
  }

  // fetchToWebSocket = (route, bodyData) => {
  //   fetch(`${API_ROOT}/${route}`, {
  //       method: 'POST',
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //           'Authorization': localStorage.getItem('token'),
  //           'Credentials': 'include'
  //         },
  //       body: JSON.stringify(bodyData)
  //   })
  //   .then(response => response.json())
  //   .then(result => {
  //     console.log(result)
  //   })
  // }

  // clickChatForm = (receiverId) => {
  //   return (
  //     <NewChatForm
  //       receiverId={receiverId}
  //     />
  //   )
  // }

   handleClick = (receiver) => {
    console.log("receiver", receiver)
    let receiverId = receiver.id
    console.log("receiverId", receiverId)
    let bodyData = {
      title: "PRIVATE",
      receiver_id: receiver.id,
      sender_id: this.props.currentUser.id
    }
    // if (chatExists(props.receiver_id)) {
    //   console.log("exists")
    //   props.onClickClose()
    // } else {
    // this.fetchToWebSocket("chats", body);
    fetch(`${API_ROOT}/chats`, {
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
      this.setState({
        thisChat: result,
        convoOpened: true,
        receiver: receiver
      })
      this.props.saveCurrentChat(result)
    })
    // return (
    //   <div>
    //     {/* <NewConversationForm receiver={receiver}/> */}
    //   </div>
    // )

    // this.fetchToWebSocket("conversations", body);
    // props.onClickClose()
  }

  generateAccepted = () => {
    const accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
    const acceptedUsers = accepted.map(a => a.matched_user)
    return acceptedUsers.map(acceptedUser => {
      return (
        <div className="AcceptedList" key={acceptedUser.id}>
          {/* <button onClick={() => this.handleClick(acceptedUser.id)} key={acceptedUser.id}> */}
            <button onClick={() => this.handleClick(acceptedUser)} key={acceptedUser.id}>
            <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
          </button>
          {/* {this.state.convoOpened !== true ? null : <NewConversationForm receiver={this.state.receiver} currentChat={this.state.currentChat} /> } */}
          {/* <NewConversationForm convoOpened={this.state.convoOpened} /> */}
        </div>
      )
    })
  }


  render() {
    console.log("AcceptedList PROPS", this.props)
    console.log("this.props.receiver_id", this.props.receiver_id)
    // const generateAccepted = () => {
    //   const accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
    //   const acceptedUsers = accepted.map(a => a.matched_user)
    //   return acceptedUsers.map(acceptedUser => {
    //     return (
    //       <div className="AcceptedList" key={acceptedUser.id}>
    //         <button onClick={() => handleClick(acceptedUser.id)} key={acceptedUser.id}>
    //           {/* receiverId={acceptedUser.id} */}
    //           <div>{acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}</div>
    //         </button>
    //       </div>
    //     )
    //   })
    // }

    return (
      <div>
        {/* {generateAccepted()} */}
        {this.generateAccepted()}
        {this.state.convoOpened !== true ? null : <NewConversationForm receiver={this.state.receiver} thisChat={this.state.thisChat} /> }
        {/* <NewConversationForm convoOpened={this.state.convoOpened} /> */}
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
    // receiver_id: this.props.receiver_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCurrentChat: (currentChat) => dispatch(saveCurrentChat(currentChat))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AcceptedList);
