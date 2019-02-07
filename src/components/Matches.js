import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { setUsers, viewMatch, acceptMatch, declineMatch } from '../actions'
import '../styling/Profile.css'
import MatchContainer from './MatchContainer'

class Matches extends React.Component {
  // console.log(props)
  // props.matchedUser.forEach(m => {
  state = {
    clicked: false
  }

  handleViewMatch = (matchId) => {
    // event.preventDefault()
    // console.log(matchId)
    // console.log(this.props.users)
    // console.log(this.props.matches)
    // const clickedMatch = this.props.matches.find(match => match.id === matchId)
    const clickedMatch = this.props.matchedUser
    this.props.viewMatch(clickedMatch)
    this.setState({
      clicked: true
    })
    console.log(this.props.matchedUser)
  }
  // const generateMatches = () => {
  //   return this.props.currentUser.matched_users.map((matched_user) => {
  //     console.log(matched_user)
  //     return <Matches key={matched_user.id} matchedUser={matched_user} />
  //   })
  // }

  render() {
    // console.log(this.props.matchedUser)
    console.log(this.props.match)
    const matchCard =
    // return (
      <div className="Card">
        <div className="matched-users">
          <div onClick={(event) => this.handleViewMatch(this.props.matchedUser.id)}>
            <p>{this.props.matchedUser.first_name} >> {this.props.matchedUser.sun.sign}</p>
            <img src="" alt="MatchPhoto" /><br/><br/>

          </div>
        </div>
      </div>
    // )
    return this.state.clicked === true ? <Redirect to='/matchprofile' /> : matchCard

  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.matches,
    match: state.match.match,
    users: state.users.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewMatch: (clickedMatch) => dispatch(viewMatch(clickedMatch))
  }
}

// export default Matches
export default connect(mapStateToProps, mapDispatchToProps)(Matches);

// <Card header={<CardTitle reveal image={"img/office.jpg"} waves='light'/>}
//   title="Card Title"
//   reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
//   <p><a href="#">This is a link</a></p>
// </Card>
