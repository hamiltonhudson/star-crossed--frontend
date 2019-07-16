import React from 'react';
import ConversationForm from './ConversationForm'

const ConvoDisplay = ({
  chat: { id, conversations },
}) => {
  return (
    <div className="convosArea">
      {/* <h2>Chat with: {chat_id}</h2> */}
      <ul>{orderedConversations(conversations)}</ul>
      <ConversationForm chat_id={id} />
    </div>
  )
}

export default ConvoDisplay;

const orderedConversations = conversations => {
  const sortedConversations = conversations.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedConversations.map(conversation => {
    console.log("conversationin orderedconvos", conversation)
    return <li style={{"color":"#ffffff"}} key={conversation.id}>{conversation.user_name} : {conversation.message}</li>;
    // return <li style={{"color":"#ffffff"}} key={conversation.id}> : {conversation.message}</li>;
  })
}
