// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import '../styling/Form.css'
// // import { reduxForm, Field, propTypes } from 'redux-form';
// // import ProfileContainer from './ProfileContainer'
// import { setUsers, setCurrentUser, findMatches } from '../actions'
//
// const usersAPI = 'http://localhost:3000/api/v1/users/'
//
// class NewUser extends React.Component {
//   state = {
//     first_name: '',
//     last_name: '',
//     birth_year: '',
//     birth_month: '',
//     birth_day: '',
//     signedUp: false
//   }
//
//   handleChange = (event) => {
//     console.log(event.target.name, event.target.value)
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//     console.log(this.state)
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault()
//     console.log(this.state)
//     console.log(this.props)
//     const newUserConfig = {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         user: {
//           first_name: this.state.first_name,
//           last_name: this.state.last_name,
//           birth_year: this.state.birth_year,
//           birth_month: this.state.birth_month,
//           birth_day: this.state.birth_day
//         }
//       })
//     }
//     fetch(usersAPI, newUserConfig)
//     .then(r => r.json())
//     .then(result => {
//       if (result.errors){
//         alert('Please check your details')
//         return <Redirect to="/newuser" />
//       } else {
//         // const userDetails = result
//         this.props.getUser(result)
//         // fetch(usersAPI)
//         // .then(r => r.json())
//         // .then(results => {
//         //   this.props.setUsers(results)
//         // })
//         this.setState({
//           signedUp: true
//         })
//       }
//     })
//   }
//
//   profileRedirect = () => {
//     if (this.state.signedUp) {
//       return <Redirect to="/profile" />
//     }
//   }
//
//   render() {
//     return(
//       // const newUserForm =
//       <div className="form-container">
//         <h1 className="signupHeader">Create New Account</h1>
//         <div className="signupform">
//           <div>
//             <form onSubmit={event => this.handleSubmit(event)}>
//               <label>First Name</label>
//               <input
//                 type='text'
//                 name='first_name'
//                 value={this.state.first_name}
//                 onChange={event => this.handleChange(event)}
//                 className="input-field"
//               />
//               <label>Last Name</label>
//               <input
//                 type='text'
//                 name='last_name'
//                 value={this.state.last_name}
//                 onChange={event => this.handleChange(event)}
//                 className="input-field"
//               />
//               <label>Birth Year</label>
//               <input
//                 type='number'
//                 name='birth_year'
//                 value={this.state.birth_year}
//                 onChange={event => this.handleChange(event)}
//                 className="input-field"
//               />
//               <label>Birth Month</label>
//               <input
//                 type='number'
//                 name='birth_month'
//                 value={this.state.birth_month}
//                 onChange={event => this.handleChange(event)}
//                 className="input-field"
//               />
//               <label>Birth Day</label>
//               <input
//                 type='number'
//                 name='birth_day'
//                 value={this.state.birth_day}
//                 onChange={event => this.handleChange(event)}
//                 className="input-field"
//               />
//               <input className="submit-button"
//                 type="submit"
//                 placeholder="Submit"
//               />
//             </form>
//             <br/>
//           </div>
//           {this.profileRedirect()}
//         </div>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     // email: state.email.email,
//     // password: state.password.password,
//     currentUser: state.users.userDetails,
//     // users: state.users.users,
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUser: (userDetails) => dispatch(getUser(userDetails)),
//     // setUsers: (users) => dispatch(setUsers(users)),
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
