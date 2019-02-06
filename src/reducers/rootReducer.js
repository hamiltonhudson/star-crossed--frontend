import { combineReducers } from 'redux';
import suns from './sunReducer'
import users from './userReducer'
import currentUser from './usersReducer'
// import { loginReducer } from './loginReducer';
// import { manageNewUser } from './manageNewUser';

const rootReducer = combineReducers({
  suns,
  users,
  currentUser
})

// const rootReducer = combineReducers({
//   currentUser: loginReducer,
//   newUser: manageNewUser
// })

export default rootReducer;
