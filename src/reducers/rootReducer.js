import { combineReducers } from 'redux';
import suns from './sunReducer';
import users from './userReducer';
import matches from './matchReducer';
import email from './userReducer';
import password from './userReducer';
import chats from './chatsReducer'
// import conversations from './chatReducer'

const rootReducer = combineReducers({
  suns,
  users,
  matches,
  email,
  password,
  chats,
})

export default rootReducer;
