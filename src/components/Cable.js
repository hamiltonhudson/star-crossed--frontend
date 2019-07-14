import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ chats, handleReceivedConversation }) => {
  console.log("chats", chats)
  console.log("handleReceivedConversation", handleReceivedConversation)
  return (
    <Fragment>
      {chats.map(chat => {
        // return (
        //   <ActionCable
        //     key={chat.id}
        //     channel={{ channel: 'ConversationsChannel', chat: chat.id }}
        //     onReceived={handleReceivedConversation}
        //   />
        // )
        return (
          <ActionCableConsumer
            key={chat.id}
            channel={{ channel: 'ConversationsChannel', chat: chat.id }}
            onReceived={handleReceivedConversation}
          />
        )
      })}
    </Fragment>
  )
}

export default connect(Cable);
