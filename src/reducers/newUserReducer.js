import {
  ADD_USER_DETAILS,
} from '../constants/ActionTypes'

const initialState = {
  details: {
    first_name: '',
    last_name: '',
    birth_year: '',
    birth_month: '',
    birth_day: '',
  }
}
// const initialState = {
//   newUser: {
//     first_name: '',
//     last_name: '',
//     birth_year: '',
//     birth_month: '',
//     birth_day: '',
//   }
// }

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
    console.log(action.payload.first_name,
      action.payload.last_name, action.payload.birth_year,
      action.payload.birth_month, action.payload.birth_day)
      return {
        details: {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          birth_year: action.payload.birth_year,
          birth_month: action.payload.birth_month,
          birth_day: action.payload.birth_day,
        }
      }

    default:
      return state;
    }
  }

// export { manageNewUser };
