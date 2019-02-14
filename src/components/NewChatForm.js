// import React, { Fragment } from 'react';
// import { connect } from 'react-redux';
// import ActionCableConsumer from 'actioncable';
// import { ActionCableProvider } from 'react-actioncable-provider';
// import { API_ROOT, HEADERS } from '../constants/ActionTypes';
// import { viewMatch } from '../actions';
// import Cable from 'actioncable';
// import ConversationsArea from './ConversationsArea'
//
// class NewChatForm extends React.Component {
//   state = {
//     chatWith: '',
//     user_receiver_id: ''
//   }
//
//   handleChange = (event) => {
//     this.setState({ id: event.target.value })
//   }
//
//   static getChats
//
//   chatExists = (userReceiverId) => {
//       let chatFound = this.props.chats.filter((chat) => chat.users.map((i)=> i.id).includes(userReceiverId));
//
//       if (chatFound.length > 0) {
//           this.props.saveSelectedChat(chatFound[0]);
//           return true;
//       }
//   }
//
//   fetchToWebSocket = (route, bodyData) => {
//     // `${API_ROOT}?user=${this.props.userId}`
//        fetch(`${API_ROOT}/{route}`, {
//        // fetch(`${API_ROOT}/chats`, {
//            method: 'POST',
//            headers: {
//                "Accept": "application/json",
//                "Content-Type": "application/json",
//             },
//            body: JSON.stringify(bodyData)
//          })
//        }
//
//   handleStartChat = () => {
//       let body = {
//         title: "PRIVATE",
//           sender_id: this.props.currentUser.id,
//            receiver_id: this.props.match.id
//        };
//
//        // If the conversation already exists, execute exit function or do nothing. Otherwise, fetch conversation to WebSockets.
//        if (this.chatExists(this.props.match.id)) {
//            this.props.exit();
//        } else {
//           this.fetchToWebsocket("conversations", body);
//           this.props.exit();
//        }
//    };
//
//   render = () => {
//     console.log("props.currentUser", this.props.currentUser)
//     console.log("props.acceptedUsers", this.props.acceptedUsers)
//     console.log("props.match", this.props.match)
//
//     const generateAccepted = () => {
//       return this.props.acceptedUsers.map(acceptedUser => {
//         return (
//           <div onClick={() => this.handleStartChat(acceptedUser.id)}
//             key={acceptedUser.id} className="users-header">
//             {acceptedUser.first_name} ☀︎ {acceptedUser.sun.sign}
//           </div>
//         )
//       })
//     }
//     return(
//       <Fragment>
//         <div className="newChatForm">
//           {/* <form onSubmit={this.handleSubmit}>
//             <label>New Chat ⌲ </label>
//             <br />
//             <input
//               type="text"
//               value={this.state.id}
//               onChange={this.handleChange}
//             />
//             <input type="submit" />
//             </form>
//           </div> */}
//           {generateAccepted()}
//         </div>
//       </Fragment>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.users.currentUser,
//     acceptedUsers: state.matches.acceptedUsers,
//     accepted: state.matches.accepted,
//     match: state.matches.match
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch)),
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(NewChatForm);
