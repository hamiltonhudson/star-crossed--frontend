import { combineReducers } from 'redux';
import suns from './sunReducer';
import users from './userReducer';
import matches from './matchReducer';
import email from './userReducer';
import password from './userReducer';

const rootReducer = combineReducers({
  suns,
  users,
  matches,
  email,
  password,

})

export default rootReducer;
