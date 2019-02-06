import { combineReducers } from 'redux';
import suns from './sunReducer'
import users from './userReducer'
import currentUser from './userReducer'
// import loginReducer from './loginReducer';
// import manageNewUser from './manageNewUser';

const rootReducer = combineReducers({
  suns,
  users,
  currentUser,
  // email,
  // password,
})

// const rootReducer = combineReducers({
//   currentUser: loginReducer,
//   newUser: manageNewUser
// })

export default rootReducer;
