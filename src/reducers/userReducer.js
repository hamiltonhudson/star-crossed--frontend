const initialState = {
  users: [],
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      // console.log(action.payload)
      return {
        ...state,
        users: action.payload
      }
    case 'FIND_USERNAME':
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
};
