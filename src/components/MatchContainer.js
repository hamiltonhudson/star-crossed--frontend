import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styling/Profile.css'
import MatchDetail from './MatchDetail'

class MatchContainer extends React.Component {
  state = {
    clicked: '',
    clickedMatch: ''
  }

  handleDetailClick = (event) => {
    event.preventDefault()
    console.log("event.target.datset = sign", event.target.dataset.name)
    this.setState({
      clicked: event.target.dataset.name,
      clickedMatch: this.props.match
    })
  }

  handleSignClick = (event) => {
    event.preventDefault()
    console.log("event.target.dataset = name", event.target.dataset.name)
    this.setState({
      clicked: event.target.dataset.name,
      clickedMatch: this.props.match
    })
  }

  acceptMatch = (event) => {
    event.preventDefault()
    console.log("clicked accept")
    // console.log("matchId", matchId)
    // const match = this.props.matches.find(match => match.id === matchId)
    // this.props.addrecipe(match)
  }

  declineMatch = (event) => {
    event.preventDefault()
    console.log("clicked decline")
    // console.log("matchId", matchId)
    // const match = this.props.matches.find(match => match.id === matchId)
    // this.props.declineMatch(match)
  }

  render() {
    console.log(this.props.clicked)
    console.log(this.props)
    return (
      <div>
        <div className="prof-container">
          <Link to='/profile' className="prof-link"> ◁ Back</Link>
          <div className="prof-card">
            <h2 className="card-title" id="prof-name" data-name="name"
              onClick={(event) => this.handleDetailClick(event)}
            > {this.props.match.first_name} </h2>
            <MatchDetail clicked={this.state.clicked} clickedMatch={this.props.match}/>
            <br/><br/>
            <img src="" alt="ProfilePhoto" className="prof-photo"/>
            <br/><br/>
            <span className="prof-sun" data-name="sun"
              onClick={(event) => this.handleSignClick(event)}
            > {this.props.match.sun.sign} </span>
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
    match: state.matches.match
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
