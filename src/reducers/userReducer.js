import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  email: '',
  password: '',
  userDetails: {},
  currentUser: {},
  // updatedMatches: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case types.GET_EMAIL_AND_PW:
      return {
        email: action.payload.email,
        password: action.payload.password
      }
    // case types.SET_USER_ID:
    //   return {
    //     ...state,
    //     userId: action.payload
    //   }
    case types.SET_CURRENT_USER:
      return {
        ...state,
        // users: ,
        currentUser: action.payload
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
        // users: ,
        currentUser: action.payload
      }

    default:
      return state;
  }
};

// case types.GET_USER_DETAILS:
//   // console.log(action.payload)
//   return {
//     ...state
//     userDetails: action.payload
//   }
