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
    // .then(response => dispatch(
    //   {
    //     type: GET_CHATS,
    //     payload: {
    //       chats: response,
    //     }
    //   }
    // ))
  }

  render() {
    return (
      <div style={{"borderColor": "green"}} className="Display">
        <h2>Chat Display Container</h2>
        {/* <AcceptedMatchesList /> */}
        {this.retrieveChats()}
        <AcceptedList />
      </div>
        )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: (chats) => dispatch(getChats(chats))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDisplayContainer)
