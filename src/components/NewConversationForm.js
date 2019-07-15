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
    // chat_id: this.props.chat_id
  }

  // componentWillReceiveProps = nextProps => {
  //   this.setState({ chat_id: nextProps.chat_id })
  // }

  fetchToWebSocket = (route, bodyData) => {
    console.log(document.cookie)
    fetch(`${API_ROOT}/${route}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
            'X-Authorization': document.cookie,
            'Credentials': 'include'
          },
        body: JSON.stringify(bodyData)
    })
  }

  handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let body = {
      message: this.state.message,
      // chat: this.props.currentChat,
      user_id: this.props.currentUser.id,
      chat_id: this.props.currentChat.id
    }
    this.fetchToWebSocket("conversations", body)
    this.setState({ message: '' })
  }

  responsiveEnterKey = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit()
    }
  }

  render() {
    console.log("NewConversationForm PROPS", this.props)
    console.log("this.props.currentChat", this.props.currentChat)
    console.log("this.props.thisChat", this.props.thisChat)
    console.log("this.state.message", this.state.message)
    return (
      <div className="NewConversationForm">
        {/* <div className="form-container" style={{"paddingLeft": "50px", "marginRight": "5px"}}> */}
        <h1 style={{"color": "white"}}>NEW CONVERSATION FORM</h1>
        <form onSubmit={this.handleSubmit} className=" col s12 new-convo-form">
          <textarea
            type="text"
            placeholder="....type something"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyDown={this.responseiveEnterKey}
            className="newConvo"
          />
          <input
            type="submit"
            className="submit-buttom"
          />
          {/* <button className="sendButton"
            onClick={this.handleSubmit}>
            ⌲ ➤ ➢ ➣
          </button> */}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    currentChat: state.chats.currentChat,
    chatId: state.chats.chatId
  }
}

export default connect(mapStateToProps)(NewConversationForm);
