import * as types from '../constants/ActionTypes'

const initialState = {
  match: {},
  matches: [],
  matchedUsers: [],
  accepted: [],
  acceptedUsers: [],
  declined: [],
  declinedUsers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_MATCHES:
    console.log("findMatches action.payload", action.payload)
      return {
        ...state,
        matches: action.payload
      }
      case types.FIND_MATCHED_USERS:
        return {
          ...state,
          matchedUsers: [...state.matchedUsers, action.payload]
      }
    case types.VIEW_MATCH:
    console.log("viewMatch action.payload", action.payload)
      return {
        ...state,
        match: action.payload
      }
      case types.FIND_ACCEPTED:
      console.log("findAccepted action.payload", action.payload)
        return {
          ...state,
          accepted: action.payload
        }
      case types.FIND_ACCEPTED_USERS:
        return {
          ...state,
          acceptedUsers: [...state.acceptedUsers, action.payload]
        }
    case types.ACCEPT_MATCH:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload.id),
        accepted: [...state.accepted, action.payload],
      }
      case types.ACCEPT_MATCHED_USER:
        return {
          ...state,
          matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
          acceptedUsers: [...state.acceptedUsers, action.payload]
        }
    case types.DECLINE_MATCH:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload.id),
        declined: [...state.declined, action.payload],
      }
    case types.DECLINE_MATCHED_USER:
      return {
        ...state,
        matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
      }
    case types.UPDATE_MATCHED_USERS:
      return {
        ...state,
        matchedUsers: action.payload
      }
    case types.UPDATE_MATCHES:
    console.log("action.payload in matchReducer", action.payload)
      return {
        ...state,
        matches: [...state.matches, action.payload]
      }

    default:
      return state
  }
};
