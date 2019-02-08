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

  render() {
    console.log(this.props.clicked)
    console.log(this.props)
    return (
      <div>
        hi from match container
        <div className="prof-container">
          <Link to='/profile'>Back</Link>
          <div className="prof-card">
            <h1 className="card-title">Match Profile</h1>
            <span data-name="name" onClick={(event) => this.handleDetailClick(event)}> {this.props.match.first_name} </span>
            <br/><br/>
            <img src="" alt="ProfilePhoto" className="prof-photo"/>
            <br/><br/>
            <span data-name="sun" onClick={(event) => this.handleSignClick(event)}> {this.props.match.sun.sign} </span>
            <br/><br/><br/>
          </div>
          <MatchDetail clicked={this.state.clicked} clickedMatch={this.props.match}/>
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


//

export default connect(mapStateToProps)(MatchContainer);
