import * as types from '../constants/ActionTypes'

export const setSuns = (suns) => {
  return {
    type: types.SET_SUNS,
    payload: suns
  }
}

export const setUsers = (users) => {
  return {
    type: types.SET_USERS,
    payload: users
  }
}

export const getEmailAndPW = (email, password) => {
  return {
    type: types.GET_EMAIL_AND_PW,
    payload: email, password
  }
}

export const setCurrentUser = (currentUser) => {
  return {
    type: types.SET_CURRENT_USER,
    payload: currentUser
  }
}

export const editUserDetails = (currentUser) => {
  return {
    type: types.EDIT_USER_DETAILS,
    payload: currentUser
  }
}

export const deleteUser = (currentUser) => {
  return {
    type: types.DELETE_USER,
    payload: currentUser
  }
}

export const findMatches = (matchedUsers) => {
  console.log(matchedUsers)
  return {
    type: types.FIND_MATCHES,
    payload: matchedUsers
  }
}

export const viewMatch = (match) => {
  return {
    type: types.VIEW_MATCH,
    payload: match
  }
}

export const acceptMatch = (clickedMatch) => {
  return {
    type: types.ACCEPT_MATCH,
    payload: clickedMatch,
     // matches
    // (add to pending, should remove from matches [hit crud C for pending, D for matches, patch for json])
  }
}

export const declineMatch = (match) => {
  return {
    type: types.DECLINE_MATCH,
    payload: match
    // payload: pending, matches
    // (remove from pending, should not go back to matches [hit crud D for pending])
  }
}

export const acceptPending = (pending) => {
  return {
    // type: types.ACCEPT_PENDING,
    // paylod: relations
    // (add to relations, should remove from pending [hit crud C for relations,
    //   D for pending, (patch or post for json? post to C, patch to D?
    //     or is there a json "DELETE"?)])

  }
}

export const declinePending = (pending) => {
  // type: types.DECLINE_PENDING,
  // paylod: relations, pending
  // (remove from relations, should not go back to pending, [hit crud D for matches,
  //   patch/delete? for json], also should have method somewhere, probably in
  //   database that prevents these two users from ever being matched again
  // ie. upon return login))
}

export const acceptRelation = (relation) => {
  // type: types.ACCEPT_RELATION,
  // payload: relation
}

export const declineRelation = (relation) => {
  // type: types.DECLINE_RELATION,
  // payload: relation
}
