import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styling/Profile.css'
import EditUser from './EditUser'
import ProfileDetail from './ProfileDetail'
import Matches from './Matches'
// import Tooltip from '@material-ui/core/Tooltip';

class ProfileContainer extends React.Component {
  state = {
    clicked: '',
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({
      clicked: event.target.dataset.name
    })
  }
  // correctUserDetails = () => {
  //   const userId = this.props.userId
  //   fetch(`http://localhost:3000/api/v1/${userId}`)
  //   .then(r => r.json())
  //   .then(result => {
  //     const currentUser = this.props.setCurrentUser(result)
  //   })
  // }
  render () {
    console.log("PROFILECONTAINER PROPS", this.props)
    console.log("PROFILECONTAINER STATE", this.state)

    const generateMatches = () => {
      return this.props.matches.map((match) => {
        return <Matches key={match.id} matchedDisplay={match} allMatches={this.props.matches}/>
      })
    }

    return (
      <div>
        <div className="prof-container">
          <Link to='/edit'>Edit</Link>
          <div className="prof-card">
            <h1 className="card-title">Profile</h1>
            <p className="prof-name" data-name="name" onClick={(event) => this.handleClick(event)}> {this.props.currentUser.first_name} </p>
            <br/><br/>
            <img src="" alt="ProfilePhoto" className="prof-photo"/>
            <br/><br/>
            <span className="prof-sun" data-name="sun" onClick={(event) => this.handleClick(event)}> {this.props.currentUser.sun.sign} </span>
            <br/><br/><br/>
            <ProfileDetail clicked={this.state.clicked} user={this.props.currentUser}/>
            {generateMatches()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // userDetails: state.users.userDetails,
    currentUser: state.users.currentUser,
    matches: state.matches.matches
    // users: state.users.users,
    // userId: state.userId.userId,
    // matches: state.matches.matches
  }
}
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser))
  //   }
  // }

export default connect(mapStateToProps)(ProfileContainer);
