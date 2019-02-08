import { combineReducers } from 'redux';
import suns from './sunReducer';
import email from './loginReducer';
import password from './loginReducer';
import userDetails from './loginReducer';
import users from './userReducer';
import currentUser from './userReducer';
import matches from './userReducer';
import match from './matchReducer';
import pending from './matchReducer';
import awaiting from './matchReducer';
import relation from './matchReducer';

const rootReducer = combineReducers({
  suns,
  email,
  password,
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
