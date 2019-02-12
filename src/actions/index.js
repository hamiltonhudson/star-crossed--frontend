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

export const findMatches = (matches) => {
  console.log("findMatches action.payload: 'matches' ", matches)
  return {
    type: types.FIND_MATCHES,
    payload: matches
  }
}

export const findMatchedUsers = (matchedUsers) => {
  console.log("findMatchedUsers action.payload: 'matchedUsers' ", matchedUsers)
  return {
    type: types.FIND_MATCHED_USERS,
    payload: matchedUsers
  }
}

export const findAccepted = (accepted) => {
  console.log("findAccepted action.payload: 'accepted' ", accepted)
  return {
    type: types.FIND_ACCEPTED,
    payload: accepted
  }
}

export const findAcceptedUsers = (acceptedUsers) => {
  console.log("findAcceptedUsers action.payload: 'acceptedUsers' ", acceptedUsers)
  return {
    type: types.FIND_ACCEPTED_USERS,
    payload: acceptedUsers
  }
}

export const viewMatch = (viewedMatch) => {
  return {
    type: types.VIEW_MATCH,
    payload: viewedMatch
  }
}

export const acceptMatch = (acceptedUser) => {
  return {
    type: types.ACCEPT_MATCH,
    payload: acceptedUser,
     // matches
    // (add to pending, should remove from matches [hit crud C for pending, D for matches, patch for json])
  }
}

export const declineMatch = (declinedUser) => {
  return {
    type: types.DECLINE_MATCH,
    payload: declinedUser
    // payload: pending, matches
    // (remove from pending, should not go back to matches [hit crud D for pending])
  }
}


// export const acceptPending = (pending) => {
//   return {
//     // type: types.ACCEPT_PENDING,
//     // paylod: relations
//     // (add to relations, should remove from pending [hit crud C for relations,
//     //   D for pending, (patch or post for json? post to C, patch to D?
//     //     or is there a json "DELETE"?)])
//   }
// }
// export const declinePending = (pending) => {
//   // type: types.DECLINE_PENDING,
//   // paylod: relations, pending
//   // (remove from relations, should not go back to pending, [hit crud D for matches,
//   //   patch/delete? for json], also should have method somewhere, probably in
//   //   database that prevents these two users from ever being matched again
//   // ie. upon return login))
// }
// export const acceptRelation = (relation) => {
//   // type: types.ACCEPT_RELATION,
//   // payload: relation
// }
// export const declineRelation = (relation) => {
//   // type: types.DECLINE_RELATION,
//   // payload: relation
// }
