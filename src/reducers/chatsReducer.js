import * as types from '../constants/ActionTypes'

const initialState = {
  chats: [],
  currentChat: undefined,
  chatId: '',
  receiver: {},
  receiverId: '',
  conversations: [],
  messagedUsers: [],
  appendedChat: {},
  chatEnabled: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ENABLE_CHAT:
      return {
        ...state,
        chatEnabled: action.payload
      }
    case types.SET_CHATS:
      return {
        ...state,
        chats: action.payload
      }
    case types.SAVE_CHATS:
      return {
        ...state,
        chats: [...state.chats, action.payload]
      }
    case types.SET_RECEIVER:
      return {
        ...state,
        receiver: action.payload
      }
    case types.SET_RECEIVER_ID:
      return {
        ...state,
        receiverId: action.payload
      }
    case types.ADD_NEW_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    case types.SAVE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload,
      }
    case types.SAVE_CONVO_MSGS:
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      }
    case types.ERASE_CURRENT_CHAT:
      return {
        ...state,
        currentChat: undefined
      }
      default:
        return state
    }
  };
