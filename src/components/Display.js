import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS, GET_CHATS } from '../constants/ActionTypes'
import { getChats } from '../actions'
import AcceptedList from './AcceptedList'
import AcceptedMatchesList from './AcceptedMatchesList'
import ChatsCable from './ChatsCable'
import ChatWindow from './ChatWindow';
import '../styling/Accepted.css'

const Display = (props) => {
  console.log("Display PROPS", props)

  const retrieveChats = () => {
    return (dispatch) => {
      fetch(`${API_ROOT}/chats`, {
        method: 'GET',
        headers: HEADERS,
    })
    .then(r => r.json())
    .then(response => dispatch(
      {
        type: GET_CHATS,
        payload: {
        chats: response,
        }
      }
    ))
  }
}
  return (
    <Fragment>
      <div className="chat-display-container">
        <span id="chat"> ↡ · Chat · ↡ </span>
        <ChatsCable />
        {props.chatEnabled}
        {retrieveChats()}
        {/* <AcceptedList /> */}
        {/* <AcceptedMatchesList /> */}
      </div>
      <div>
        <AcceptedList />
        <ChatWindow />
        {/* <AcceptedMatchesList /> */}
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
  chatEnabled: state.users.chatEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: (chats) => dispatch(getChats(chats))
  }
}

export default connect(mapStateToProps)(Display);
