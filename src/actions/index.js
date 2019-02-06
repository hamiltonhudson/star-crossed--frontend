import * as types from '../constants/ActionTypes'

export const setSuns = (suns) => {
  return {
    type: 'SET_SUNS',
    payload: suns
  }
}

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    payload: users
  }
}

export const getUser = (currentUser) => {
  return {
    type: 'GET_CURRENT_USER',
    payload: currentUser
  }
}

export const acceptMatch = (match) => {
  return {
    // type: 'ACCEPT_MATCH',
    // payload: pending,
     // matches
    // (add to pending, should remove from matches [hit crud C for pending, D for matches, patch for json])
  }
}

export const declineMatch = (match) => {
  return {
    // type: 'DECLINE_MATCH',
    // payload: pending, matches
    // (remove from pending, should not go back to matches [hit crud D for pending])
  }
}

export const acceptPending = () => {
  return {
    // type: 'ACCEPT_PENDING',
    // paylod: relations
    // (add to relations, should remove from pending [hit crud C for relations,
    //   D for pending, (patch or post for json? post to C, patch to D?
    //     or is there a json "DELETE"?)])

  }
}

export const declinePending = () => {
  // type: 'DECLINE_PENDING',
  // paylod: relations, pending
  // (remove from relations, should not go back to pending, [hit crud D for matches,
  //   patch/delete? for json], also should have method somewhere, probably in
  //   database that prevents these two users from ever being matched again
  // ie. upon return login))
}
