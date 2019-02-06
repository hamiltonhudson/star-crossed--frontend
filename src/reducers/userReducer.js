import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  currentUser: {},
  credentials: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      // console.log(action.payload)
      return {
        ...state,
        users: action.payload
      }
    case types.GET_EMAIL_AND_PW:
      return {
        ...state,
        credentials: action.payload
      }
    case types.GET_CURRENT_USER:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
      }
    case types.ADD_USER_DETAILS:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
      }
    // case types.EDIT_USER_DETAILS:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     currentUser: action.payload
    //   }
    // case types.DELETE_CURRENT_USER:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     currentUser: action.payload
    //   }

    default:
      return state;
  }
};
