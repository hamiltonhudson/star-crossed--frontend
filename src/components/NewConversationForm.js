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

  handleSubmit = () => {
    let body = {
      message: this.state.message,
      chat: this.props.currentChat,
      chat_id: this.props.currentChat.id
    }
    this.fetchToWebSocket("messages", body)
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
    return (
      <div className="NewConversationForm">
        {/* <textarea
          className="newConvo"
          type="text"
          value={this.state.message}
          // onKeyDown={this.responseiveEnterKey}
          placeholder="....type something"
          />
          <div className="sendButton">
          onClick={this.handleSubmit}
          <p className="send">Submit</p>
        </div> */}
        <div className="form-container" style={{"paddingLeft": "50px", "marginRight": "5px"}}>
          <h1 style={{"color": "white"}}>NEW CONVERSATOIN FORM</h1>
          <div className="form" style={{"width": "85%"}}>
            <form className="col s12" onSubmit={this.handleSubmit}>
              {/* <form> */}
              <textarea
                type="text"
                placeholder="....type something"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                onKeyDown={this.responseiveEnterKey}
                className="newConvo"
              />
              {/* <input
                type="submit"
                className="submit-button"
              /> */}
              <button className="sendButton"
                onClick={this.handleSubmit}>
                ⌲ ➤ ➢ ➣
            </button>
          </form>
        </div>
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
