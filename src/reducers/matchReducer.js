import * as types from '../constants/ActionTypes'

const initialState = {
  match: {},
  matches: [],
  matchedUsers: [],
  accepted: [],
  acceptedUsers: [],
  declined: [],
  declinedUsers: []
  // pending: [],
  // awaiting: [],
  // relations: []
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
        // console.log(state.matches.matchedUsers)
        // console.log("findMatchedUsers action.payload", action.payload)
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
        // console.log(state.matches.acceptedUsers)
      console.log("findAcceptedUsers action.payload", action.payload)
        return {
          ...state,
          acceptedUsers: [...state.acceptedUsers, action.payload]
        }
    case types.ACCEPT_MATCH:
      return {
        ...state,
        // matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
        matches: state.matches.filter(match => match.id !== action.payload.id),
        // accepted: [...state.accepted, action.payload.accdeptedMatch],
        accepted: [...state.accepted, action.payload],
        // acceptedUsers: [...state.acceptedUsers, action.payload]
      }
      case types.ACCEPT_MATCHED_USER:
        return {
          ...state,
          matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
          // accepted: [...state.accepted, action.payload.accdeptedMatch],
          acceptedUsers: [...state.acceptedUsers, action.payload]
        }
    case types.DECLINE_MATCH:
      return {
        ...state,
        // matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
        matches: state.matches.filter(match => match.id !== action.payload.id),
        declined: [...state.declined, action.payload],
      }
      case types.DECLINE_MATCHED_USER:
        return {
          ...state,
        matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
        // declinedUsers: [...state.declinedUsers, action.payload]
        }

    default:
      return state
  }
};
