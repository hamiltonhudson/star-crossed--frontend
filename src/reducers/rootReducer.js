import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { manageNewUser } from './manageNewUser';

const rootReducer = combineReducers({
  currentUser: loginReducer,
  newUser: manageNewUser
})

export default rootReducer;
