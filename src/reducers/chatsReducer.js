import * as types from '../constants/ActionTypes'

const initialState = {
  chats: [],
  currentChat: undefined,
  conversations: [],
  messagedUsers: [],
  appendedChat: {},
  chatEnabled: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CHATS:
    console.log("getChats action.payload", action.payload)
      return {
        ...state,
        chats: action.payload
      }
    case types.SAVE_CHATS:
    console.log("getConvos action.payload", action.payload)
      return {
        ...state,
        // chats: action.payload
        chats: action.payload.chats
    }
    // case types.SAVE_CHATS/SAVE_UPDATED_CHATS ?
    case types.ADD_NEW_CHAT:
    console.log("addnewchat action.payload", action.payload)
      return {
        ...state,
        // chats: [...state.chats, action.payload],

        // appendedChat: [...state.chats, action.payload],
        chats: [...state.chats, action.payload.appendedChat]
      }
    case types.SAVE_CURRENT_CHAT:
    console.log("savecurrent action.payload", action.payload)
      return {
        ...state,
        // currentChat: [...state.chats, action.payload]
        currentChat: action.payload.currentChat
        // chats: [...state.chats, action.payload.currentChat]
      }
    case types.ERASE_CURRENT_CHAT:
    console.log("erasechat action.payload", action.payload)
      return {
        ...state,
        currentChat: undefined
      }
    case types.ENABLE_CHAT:
      return {...state,
        chatEnabled: action.payload.chatEnabled
      }

      default:
        return state
    }
  };
