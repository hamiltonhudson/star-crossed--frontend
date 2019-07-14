import React, { Component } from 'react';

import ChatsContainer from  './ChatsContainer'

class ChatWindow extends Component {
    render() {
        return (
            // <div className="aside-container-messaging">
            <div className="ChatWindow">
              <ChatsContainer />
            </div>
        );
    }
}

export default ChatWindow;
