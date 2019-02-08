import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  currentUser: {},
  matches: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case types.CURRENT_MATCHED_USERS:
      return {
        ...state,
        matches: action.payload
      }
    case types.EDIT_USER_DETAILS:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
      }
    case types.DELETE_USER:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
};

// import {
//   EDIT_USER_DETAILS,
//   DELETE_USER
// } from '../constants/ActionTypes'
//
// const initialState = {
//   currentUser: {},
//   matches: [],
//   users: []
//   // credential: {}
// }

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case EDIT_USER_DETAILS:
//       return {
//         currentUser: action.payload.currentUser,
//         users: action.payload.users,
//         //should update w/ new details?
//         matches: action.payload.matches
//         //should get users new matches, update in case any have changed
//         //with profile update
//     }
//     case DELETE_USER:
//       return {
//         currentUser: action.payload.currentUser,
//         //? necessary to update current User?
//         users: action.payload.users,
//         //post to all users
//         matches: action.payload.matches
//         //necessary to update others matches?
//     }
//     default:
//       return state;
//   }
// }
