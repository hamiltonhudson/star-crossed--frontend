import * as types from '../constants/ActionTypes'

const initialState = {
  match: {},
  matches: [],
  matchedUsers: [],
  undeclinedMatches: [],
  undeclinedMatchedUsers: [],
  accepted: [],
  acceptedUsers: [],
  declined: [],
  declinedUsers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_MATCHES:
      return {
        ...state,
        matches: action.payload
      }
    case types.FIND_MATCHED_USERS:
      return {
        ...state,
        matchedUsers: [...state.matchedUsers, action.payload]
      }
    case types.ALL_UNDECLINED_MATCHES:
      return {
        ...state,
        undeclinedMatches: action.payload
      }
    case types.ALL_UNDECLINED_MATCHED_USERS:
      return {
        ...state,
        undeclinedMatchedUsers: action.payload
      }
    case types.VIEW_MATCH:
      return {
        ...state,
        match: action.payload
      }
    case types.FIND_ACCEPTED:
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
        undeclinedMatches: state.undeclinedMatches.filter(match => match.id !== action.payload.id),
        declined: [...state.declined, action.payload],
      }
    case types.DECLINE_MATCHED_USER:
      return {
        ...state,
        matchedUsers: state.matchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
        undeclinedMatchedUsers: state.undeclinedMatchedUsers.filter(matchedUser => matchedUser.id !== action.payload.id),
        declinedUsers: [...state.declinedUsers, action.payload]
      }
    case types.UPDATE_MATCHES:
      return {
        ...state,
        matches: [...state.matches, action.payload]
      }
    case types.UPDATE_MATCHED_USERS:
      return {
        ...state,
        matchedUsers: action.payload
      }
    default:
      return state
  }
};
