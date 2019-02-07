import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  currentUser: {},
  matches: [],
  // credentials: {},
  userDetails: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      // console.log(action.payload)
      return {
        ...state,
        users: action.payload
      }
    // case types.GET_EMAIL_AND_PW:
    //   return {
    //     ...state,
    //     credentials: action.payload
    //   }
    case types.GET_CURRENT_USER:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
        // current: state.users.find(user => user.id === 1)
      }
    // case types.ADD_USER_DETAILS:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     currentUser: action.payload
    //   }
    case types.GET_USER_DETAILS:
      console.log(action.payload)
      return {
        ...state,
        userDetails: action.payload
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
