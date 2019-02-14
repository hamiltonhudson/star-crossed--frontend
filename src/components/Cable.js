// import React, { Fragment } from 'react';
// import { connect } from 'react-redux';
// import { ActionCable } from 'react-actioncable-provider';
//
// const Cable = ({ chats, handleReceivedConversation }) => {
//   return (
//     <Fragment>
//       {chats.map(chat => {
//         return (
//           <ActionCable
//             key={chat.id}
//             channel={{ channel: 'ConversationsChannel', chat: chat.id }}
//             onReceived={handleReceivedConversation}
//           />
//         )
//       })}
//     </Fragment>
//   )
// }
//
// export default connect(Cable);
