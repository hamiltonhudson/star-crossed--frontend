export default function manageNewUser(

  state = {
    first_name: '',
    last_name: '',
    birth_year: '',
    birth_month: '',
    birth_day: '',
  },
  // state = {
  //   newUser: {
  //     first_name: '',
  //     last_name: '',
  //     birth_year: '',
  //     birth_month: '',
  //     birth_day: '',
  //   }
  // },
  action) {
    switch (action.type) {
      case 'ADD_USER_DETAILS':
        console.log({
          first_name: state.first_name.concat(action.payload.first_name),
          last_name: state.last_name.concat(action.payload.last_name),
          birth_year: state.birth_year.concat(action.payload.birth_year),
          birth_month: state.birth_month.concat(action.payload.birth_month),
          birth_day: state.birth_day.concat(action.payload.birth_day)
        });
      // case 'ADD_USER_DETAILS':
      //   console.log({ newUser: state.newUser = {
      //     // first_name: state.newUser.first_name.concat(action.payload.first_name),
      //     // last_name: state.newUser.last_name.concat(action.payload.last_name),
      //     // birth_year: state.newUser.birth_year.concat(action.payload.birth_year),
      //     // birth_month: state.newUser.birth_month.concat(action.payload.birth_month),
      //     // birth_day: state.newUser.birth_day.concat(action.payload.birth_day)
      //     first_name: action.payload.first_name,
      //     last_name: action.payload.last_name,
      //     birth_year: action.payload.birth_year,
      //     birth_month: action.payload.birth_month,
      //     birth_day: action.payload.birth_day
      //   }
      //   });

      default:
        return state;
    }
  }

export { manageNewUser };
