import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import AcceptedList from './AcceptedList'
import AcceptedMatchesList from './AcceptedMatchesList'
import ChatsCable from './ChatsCable'
import ChatWindow from './ChatWindow'

const Display = (props) => {
  console.log("Display PROPS", props)
  return (
    <Fragment>
      <div className="chat-display-container">
        <ChatsCable />
        {props.chatEnabled}
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

export default connect(mapStateToProps)(Display);
