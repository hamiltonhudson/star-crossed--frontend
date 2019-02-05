export default function reducer(
  state = {
    suns: [],
    // users: [],
    // compatibilities: [],
    // matches: []
  },
  action) {
    switch (action.type) {
      case "GET_SUNS":
      return {
        ...state,
        suns: [...state.suns, action.sun]
      }
      default:
        return state;
    }
  };
