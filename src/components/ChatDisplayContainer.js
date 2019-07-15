import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants/ActionTypes';
import { getChats } from '../actions';
// import AcceptedMatchesList from './AcceptedMatchesList'
import AcceptedList from './AcceptedList'


class ChatDisplayContainer extends React.Component {

  retrieveChats = () => {
    fetch(`${API_ROOT}/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token'),
        'Credentials': 'include'
      },
    })
    .then(r => r.json())
    .then(response => {
      console.log(response)
      this.props.getChats(response)
    })
  }

  render() {
    console.log("ChatDisplayContainer props", this.props)
    return (
      <div style={{"borderColor": "green"}} className="Display">
        <h2 style={{"color": "#ffffff"}}>Chat Display Container</h2>
        {this.retrieveChats()}
        <AcceptedList />
      </div>
        )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: (chats) => dispatch(getChats(chats))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDisplayContainer)
