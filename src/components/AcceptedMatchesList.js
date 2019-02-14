import React, { Fragment } from 'react';
// import { Button } from 'react-materialize';
import { connect } from 'react-redux'
// import { API_ROOT, HEADERS } from '../constants/ActionTypes';
// import { saveCurrentChat } from '../actions';
import ChatOpenBtn from './ChatOpenBtn'
// import App from '../App';

class AcceptedMatchesList extends React.Component {

  generateAccepted = (acceptedUsers) => {
  // generateAccepted = () => {
  //   this.props.acceptedUsers.map(acceptedUser => {
    acceptedUsers.map(acceptedUser => {
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
  }

  render() {
    return (
      <div>
        {/* <ChatOpenBtn /> */}
        {this.generateAccepted(this.props.acceptedUsers)}
        {/* {this.generateAccepted()} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    // userId: state.users.currentUser.id,
    acceptedUsers: state.matches.acceptedUsers,
    // chats: state.chats.chats,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     saveCurrentChat: (currentChatId) => dispatch(saveCurrentChat(currentChatId))
//   }
// }
export default connect(mapStateToProps)(AcceptedMatchesList);
