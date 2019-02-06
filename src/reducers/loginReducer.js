// import {
//   ADD_EMAIL_AND_PW
// } from '../constants/ActionTypes'
//
const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMAIL_AND_PW':
      return {
        // email: state.email.concat(action.payload.email),
        // password: state.password.concat(action.payload.password)
    };
    default:
      return state;
  }
}

// export { loginReducer };
