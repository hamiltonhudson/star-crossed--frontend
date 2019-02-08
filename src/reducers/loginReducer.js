import {
  GET_EMAIL_AND_PW,
  GET_USER_DETAILS,
} from '../constants/ActionTypes'


const initialState = {
  email: '',
  password: '',
  userDetails: {}
  // credential: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMAIL_AND_PW:
      return {
        email: action.payload.email,
        password: action.payload.password
    }
    case GET_USER_DETAILS:
    console.log(action.payload)
      return {
        userDetails: action.payload
      }
    default:
      return state;
  }
}
