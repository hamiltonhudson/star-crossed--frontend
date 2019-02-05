export default function loginReducer(
  state = {
    email: '',
    password: ''
  },
  action) {
    switch (action.type) {
      // case "GET_SUNS":
      // return {
      //   ...state,
      //   suns: [...state.suns, action.sun]
      // },
      case 'ADD_EMAIL_AND_PW':
        console.log({
          email: state.email.concat(action.payload.email),
          password: state.password.concat(action.payload.password)
      });

      default:
        return state;
    }
  }

export { loginReducer };
