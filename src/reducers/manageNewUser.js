import {
  ADD_USER_DETAILS,
} from '../constants/ActionTypes'

const initialState = {
  userDetails: {
    // first_name: '',
    // last_name: '',
    // birth_year: '',
    // birth_month: '',
    // birth_day: '',
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
      //setState=-- not using this method, but setState
      return {
      userDetail: {}
    }
      // console.log({
      //   first_name: state.first_name.concat(action.payload.first_name),
      //   last_name: state.last_name.concat(action.payload.last_name),
      //   birth_year: state.birth_year.concat(action.payload.birth_year),
      //   birth_month: state.birth_month.concat(action.payload.birth_month),
      //   birth_day: state.birth_day.concat(action.payload.birth_day)
      // });
      
    default:
      return state;
    }
  }

// export { manageNewUser };
