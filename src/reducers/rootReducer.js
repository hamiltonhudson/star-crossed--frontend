import { combineReducers } from 'redux';
import suns from './sunReducer';
import users from './userReducer';
import currentUser from './userReducer';
import matches from './userReducer';
import email from './loginReducer';
import password from './loginReducer';
// import credentials from './userReducer';
import userDetails from './newUserReducer';
import match from './matchReducer';
import pending from './matchReducer';
import awaiting from './matchReducer';
import relation from './matchReducer';

const rootReducer = combineReducers({
  suns,
  email,
  password,
  // credentials,
  userDetails,
  users,
  currentUser,
  matches,
  match,
  pending,
  awaiting,
  relation

})

// const rootReducer = combineReducers({
//   currentUser: loginReducer,
//   newUser: manageNewUser
// })

export default rootReducer;
