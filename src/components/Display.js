import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS, GET_CHATS } from '../constants/ActionTypes'
import { getChats, chatEnabled } from '../actions'
import AcceptedList from './AcceptedList'
// import AcceptedMatchesList from './AcceptedMatchesList'
import ChatsCable from './ChatsCable'
import ChatWindow from './ChatWindow';
import '../styling/Accepted.css'

const Display = (props ) => {

  const RetrieveChats = () => {
    return (dispatch) => {
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
    <div>
      <RetrieveChats />
    </div>
  )
}

export default Display
