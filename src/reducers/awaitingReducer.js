// const initialState = {
//   matches: [],
//   // matchedUsers: [],
//   // currentUser: [],
//   awaiting: [],
//   relations: []
// }
//
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
