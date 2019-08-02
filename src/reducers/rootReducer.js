import { combineReducers } from 'redux';
import suns from './sunReducer';
import users from './userReducer';
import matches from './matchReducer';
import chats from './chatsReducer';

const rootReducer = combineReducers({
  suns,
  users,
  matches,
  chats,
})

export default rootReducer;
