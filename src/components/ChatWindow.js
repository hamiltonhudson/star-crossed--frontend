import React, { Component } from 'react';

import ChatsContainer from  './ChatsContainer'

class ChatWindow extends Component {
    render() {
        return (
            <div className="aside-container-messaging">
              <ChatsContainer />
            </div>
        );
    }
}

export default ChatWindow;
