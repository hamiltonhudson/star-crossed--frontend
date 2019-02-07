import {
  GET_EMAIL_AND_PW,
} from '../constants/ActionTypes'


const initialState = {
  email: '',
  password: '',
  // credential: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EMAIL_AND_PW:
      return {
        email: action.payload.email,
        password: action.payload.password
    }
    // case types.GET_EMAIL_AND_PW:
    //   return {
    //     ...state,
    //     credentials: action.payload
    //   }
    // email: state.email.concat(action.payload.email),
    // password: state.password.concat(action.payload.password)
    default:
      return state;
  }
}

// export { loginReducer };
