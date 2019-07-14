import * as types from '../constants/Constants';

const initialState = {
  convos: [],
  messages: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SET_CONVOS:
      return {
        ...state,
        convos: action.payload
      }
    case types.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    default:
      return state;
  }
}
