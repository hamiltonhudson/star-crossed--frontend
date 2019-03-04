import React, { Fragment } from 'react';
// import { Button } from 'react-materialize';
import { connect } from 'react-redux'
// import { API_ROOT, HEADERS } from '../constants/ActionTypes';
import { saveCurrentChat, findAccepted } from '../actions';
import ChatOpenBtn from './ChatOpenBtn'
// import App from '../App';

class AcceptedMatchesList extends React.Component {

  // fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}/current_users`)
  // .then(r => r.json())
  // .then(data => {
  //   console.log(data)
  //   this.props.findAccepted(data)
  //   const acceptedUsers = this.props.users.map(user => user.id === data.map(data.matched_user_id))
  //   acceptedUsers.map(acceptedUser => {

  generateAccepted = () => {
    const accepted = this.props.currentUser.matches.filter(match => match.status === "accepted")
    const acceptedUsers = accepted.map(a => a.matched_user)
    acceptedUsers.map(acceptedUser => {
      // this.props.acceptedUsers.map(acceptedUser => {
      // active_user = {user.active_user}
      return (
        <div>
          <ChatOpenBtn receiverId={acceptedUser.id} key={acceptedUser.id} acceptedUser={acceptedUser}
          />
          {/* receiverId={acceptedUser.id} key={acceptedUser.id} */}
          {/* receiver_id={this.props.acceptedUser.id} */}
          {/* onClick={() => this.openChat(acceptedUser.id)} */}
          {/* onClick=<ChatOpenBtn/> */}
          {/* acceptedUser={acceptedUser} */}
        </div>
      )
    })
  // })
}

  render() {
    return (
      <div>
        {this.generateAccepted()}
      </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    // userId: state.users.currentUser.id,
    users: state.users.users,
    // acceptedUsers: state.matches.acceptedUsers,
    // chats: state.chats.chats,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // findAccepted: (acceptedMatches) => dispatch(findAccepted(acceptedMatches)),
    saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AcceptedMatchesList);
