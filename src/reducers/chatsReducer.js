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
        chatEnabled: action.payload.chatEnabled
      }
    case types.SET_CHATS:
      console.log("setChats action.payload chatsReducer", action.payload)
      return {
        ...state,
        chats: action.payload
      }
    case types.SAVE_CHATS:
      console.log("getConvos action.payload chatsReducer", action.payload)
      return {
        ...state,
        chats: [...this.state.chats, action.payload]
        // conversations: action.payload.conversations
      }
    case types.SET_RECEIVER:
      console.log("setReceiver action.payload chatsReducer", action.payload)
      return {
        ...state,
        receiver: action.payload
      }
    case types.SET_RECEIVER_ID:
      console.log("setReceiverId action.payload chatsReducer", action.payload)
      return {
        ...state,
        receiverId: action.payload
      }
    case types.ADD_NEW_CHAT:
      console.log("addnewchat action.payload chatsReducer", action.payload)
      return {
        ...state,
        chats: [...state.chats, action.payload],
        // appendedChat: action.payload,
      }
    case types.SAVE_CURRENT_CHAT:
    console.log("savecurrent action.payload chatsReducer", action.payload)
      return {
        ...state,
        currentChat: action.payload.currentChat,
      }
    case types.SAVE_CONVO_MSGS:
    console.log("saveConvoMsgs action.payload chatsReducer", action.payload)
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      }
    case types.ERASE_CURRENT_CHAT:
    console.log("erasechat action.payload chatsReducer", action.payload)
      return {
        ...state,
        currentChat: undefined
      }
      default:
        return state
    }
  };
