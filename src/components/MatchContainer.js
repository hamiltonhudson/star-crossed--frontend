import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styling/Profile.css'
import MatchDetail from './MatchDetail'
// import { acceptMatch, declineMatch } from '../actions';

class MatchContainer extends React.Component {
  state = {
    clicked: '',
  }

  handleDetailClick = (event) => {
    event.preventDefault()
    // console.log("event.target.datset", event.target.dataset.name)
    this.setState({
      clicked: event.target.dataset.name,
    })
  }

//
//   acceptMatch = (event) => {
//     event.preventDefault()
//     console.log("clicked accept")
//     // console.log("matchId", matchId)
//     // const match = this.props.matches.find(match => match.id === matchId)
//     // this.props.addrecipe(match)
//   }
//
//   declineMatch = (event) => {
//     event.preventDefault()
//     console.log("clicked decline")
//     // console.log("matchId", matchId)
//     // const match = this.props.matches.find(match => match.id === matchId)
//     // this.props.declineMatch(match)
//   }
//
  render() {
    const matchPhoto = this.props.viewedMatch.photo
    // console.log(this.props.clicked)
    // console.log(this.props)
    // console.log("this.props.viewedMatch in MatchContainer", this.props.viewedMatch)
    // console.log("this.state.clicked in MatchContainer", this.state.clicked)
    return (
      <div>
        <div className="prof-container">
          <Link to='/profile' className="prof-link"> ◁ Back</Link>
          <div className="prof-card">
            <h2 className="card-title" id="prof-name" data-name="name"
              onClick={(event) => this.handleDetailClick(event)}
            > {this.props.viewedMatch.first_name} </h2>
            <MatchDetail clicked={this.state.clicked}/>
            <br/><br/>
            <span onClick={(event) => this.handleDetailClick(event)}>
              {matchPhoto ? <img src={matchPhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
            </span>
            <br/><br/>
            <span className="prof-sun" data-name="sun"
              onClick={(event) => this.handleDetailClick(event)}
            > {this.props.viewedMatch.sun.sign} </span>
            <br/><br/>
            <div className="accept" onClick={this.acceptMatch}>A</div>
            <div className="decline" onClick={this.declineMatch}>D</div>
            <br/><br/>
            <span>Details About The Match</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    viewedMatch: state.matches.match
  }
}


// acceptMatch = (matchId) => {
//   const match = this.props.matches.find(match => match.id === matchId)
//   this.props.addrecipe(match)
// }
//
// declineMatch = (matchId) => {
//   const match = this.props.matches.find(match => match.id === matchId)
//   this.props.declineMatch(match)
// }

export default connect(mapStateToProps)(MatchContainer);
