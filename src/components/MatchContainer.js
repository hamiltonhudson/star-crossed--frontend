import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styling/Profile.css'
import MatchDetail from './MatchDetail'

class MatchContainer extends React.Component {
  handleDetailClick = (event) => {
    event.preventDefault()
    console.log("name clicked", event.target.dataset.name)
    return (
      <div className="prof-container"> Match Detail: Bio
        <span className="prof-user-detail"> Match Detail: Bio>
          {/* <span>
            <MatchDetail />
          </span> */}
        </span>
      </div>
    )
  }

  handleSignClick = () => {
    console.log("sign clicked")
    return (
      <div className="prof-sun-detail"> Match Detail: Sun Sign
        {/* <span>
          <MatchDetail />
        </span> */}
      </div>
    )
  }

  render() {
      // const handleMatchDetail = () => {
      //   // this.props.matchedUser.map((m) => {
      //   //   <span>{m.birth_month}</span>
      //   // })
      //   return <MatchDetail key={this.props.match.id}/>
      // }
    console.log(this.props)
    return (
      <div>
        <div className="prof-container">
          <Link to='/profile'>Back</Link>
          <div className="prof-card">
            <h1 className="card-title">Match Profile</h1>
            <p className="prof-name" data-name="name" onClick={this.handleDetailClick}> {this.props.match.first_name} </p>
            <br/><br/>
            <img src="" alt="ProfilePhoto" className="prof-photo"/>
            <br/><br/>
            <span className="prof-sun" data-name="sun" onClick={this.handleSignClick}> {this.props.match.sun.sign} </span>
            <br/><br/><br/>
          </div>
          {/* {this.renderProfileDetails()} */}
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
