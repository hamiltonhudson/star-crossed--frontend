import * as types from '../constants/ActionTypes'

const initialState = {
  match: {},
  matches: [],
  inverseMatches: [],
  // currentUser: [],
  pending: [],
  awaiting: [],
  relations: []
}

//pending is that currentUser is waiting for matched_user
//to accept or decline; awating is that matched_user is
//waiting for currentUser to accept or decline, so
//different validation checks/conditional renders
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_MATCHES:
      return {
        ...state,
        matches: action.payload
      }
    case types.VIEW_MATCH:
      return {
        ...state,
        match: action.payload
      }
    case types.ACCEPT_MATCH:
      return {
        ...state,
        // remove from matches
        matches: state.matches.filter(match => match !== action.payload),
        // push into pending if matched_user has not also accepted
        //can spread of concat to add
        pending: [...state.pending.action.payload]
        // pending: state.pending.concat(action.payload.match)
      }
    case types.DECLINE_MATCH:
      return {
        ...state,
        // matches: 'remove from matches'
        // **same as above in acceptMatch but no adding to pending**
        matches: state.matches.filter(match => match !== action.payload)
      }
    case types.ACCEPT_PENDING:
      return {
        ...state,
        pending: 'remove from pending',
        relations: 'push into relations'
      }
    case types.DECLINE_PENDING:
      return {
        pending: 'remove from pending'
      }
    case types.ACCEPT_RELATION:
      return {
        ...state,
        pending: 'push into pending'
      }
    case types.DECLINE_RELATION:
      return {
        pending: 'remove from pending'
      }

    default:
      return state
  }
};

// //pending is that currentUser is waiting for matched_user
// //to accept or decline; awating is that matched_user is
// //waiting for currentUser to accept or decline, so
// //different validation checks/conditional renders
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'ACCEPT_':
//       return {
//         ...state,
//         matches: 'remove from matches',
//         pending: 'push into pending'
//       }
//     case 'DECLINE_':
//       return {
//         matches: 'remove from matches'
//       }
//     default:
//       return state
//   }
// };
