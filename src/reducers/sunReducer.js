import {
  SET_SUNS,
} from '../constants/ActionTypes'

const initialState = {
  suns: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUNS:
      // console.log(action.payload)
      return {
        ...state,
        suns: action.payload
      }
      
    default:
      return state;
  }
};
