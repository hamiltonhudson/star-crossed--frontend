import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants/ActionTypes';

class NewConversationForm extends React.Component {
//   state = {
//     message: '',
//     chat_id: this.props.chat_id
//   }
//
//   componentWillReceiveProps = nextProps => {
//     this.setState({ chat_id: nextProps.chat_id })
//   }
//
//   handleChange = (event) => {
//     event.preventDefault()
//     fetch(`${API_ROOT}/conversations`, {
//       method: "POST",
//       headers: HEADERS,
//       body: JSON.stringify(this.state)
//     })
//     this.setState({ message: '' })
//   }
//
//   render = () => {
//     return(
//       <div className="NewConversationForm">
//         <form onSubmit={this.handleSubmit}>
//           <label>New Message</label>
//           <br />
//           <input
//             type="text"
//             value={this.state.message}
//             onChange={this.handleChange}
//           />
//           <input type="submit" />
//         </form>
//       </div>
//     )
//   }
// }
//
// export default NewConversationForm;
  state = {
    message: '',
  }

  fetchToWebSocket = (route, bodyData) => {
    fetch(`${API_ROOT}/${route}`, {
        method: 'POST',
        // headers: {
        //     "Accept": "application/json",
        //     "Content-Type": "application/json",
        //   },
        headers: HEADERS,
        body: JSON.stringify(bodyData)
    })
  }

  handleSubmit = () => {
    let body = {
      message: this.state.message,
      chat: this.props.currentChat,
      chatId: this.props.currentChat.id
    }
    this.fetchToWebSocket("messages", body)
    this.setState({ message: '' })
  }
  // responsiveEnterKey = (event) => {
  //   if (event.key === "Enter") {
  //     this.handleSubmit()
  //   }
  // }

  render() {
    console.log("NewConversationForm PROPS", this.props)
    return (
      <div className="newChatForm">
        <textarea
          className="newConvo"
          type="text"
          value={this.state.message}
          // onKeyDown={this.responseiveEnterKey}
          placeholder="....type something"
        />
        <div className="sendButton">
          onClick={this.handleSubmit}
          <p className="send">Submit</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    currentChat: state.chats.currentChat,
  }
}

export default connect(mapStateToProps)(NewConversationForm);
