import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  email: '',
  password: '',
  currentUser: {},
  userId: '',
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
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case types.CURRENT_USER_ID:
      return {
        ...state,
        userId: action.payload
      }
    case types.SET_USER_ID:
      return {
        ...state,
        userId: action.payload
      }
    case types.EDIT_USER_DETAILS:
      return {
        ...state,
        currentUser: action.payload
      }
    case types.DELETE_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
};
