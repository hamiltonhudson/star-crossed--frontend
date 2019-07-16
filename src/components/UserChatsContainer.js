import React from 'react';
import '../styling/Accepted.css';
import '../styling/App.css';

class UserChatsContainer extends React.Component {

  render() {
    console.log("ChatsContainer PROPS", this.props)
    return (
      <div className="ChatsContainer">
        <h4 style={{"color": "white"}}>User Chats Container</h4>
        <div className="chats-container">
        </div>
      </div>
    )
  }
}

export default UserChatsContainer
