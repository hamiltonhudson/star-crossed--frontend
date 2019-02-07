import { combineReducers } from 'redux';
import suns from './sunReducer';
import users from './userReducer';
import currentUser from './userReducer';
import matches from './userReducer';
import email from './loginReducer';
import password from './loginReducer';
// import credentials from './userReducer';
import details from './newUserReducer';
// import loginReducer from './loginReducer';
// import manageNewUser from './manageNewUser';
// import match from './matchReducer'

const rootReducer = combineReducers({
  suns,
  email,
  password,
  // credentials,
  details,
  users,
  currentUser,
  matches,

})

// const rootReducer = combineReducers({
//   currentUser: loginReducer,
//   newUser: manageNewUser
// })

export default rootReducer;
