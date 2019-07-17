import React from 'react';
import ConversationForm from './ConversationForm'

const ConvoDisplay = ({
  chat: { id, conversations },
}) => {
  console.log(id, conversations)
  return (
    <div className="convosArea">
      <h6 style={{"color":"white"}}>ConvoDisplay</h6>
      {/* <h2>Chat with: {chat_id}</h2> */}
      <div className="convo-display" style={{"overflowY":"scroll"}}>
        {conversations.length > 0 ?
          <ul>{orderedConversations(conversations)}</ul>
        :
        null}
      </div>
      <ConversationForm chat_id={id} />
    </div>
  )
}

export default ConvoDisplay;

const orderedConversations = (conversations) => {
  const sortedConversations = conversations.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedConversations.map(conversation => {
    console.log("conversation in orderedconvos", conversation)
    return <li style={{"color":"#ffffff"}} key={conversation.id}>{conversation.user_name} : {conversation.message}</li>;
  })
}
