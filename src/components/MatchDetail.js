import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'



class MatchDetail extends React.Component {
  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail">
          Sign Details! | {this.props.clickedMatch.sun.sign}
        </div>
    )} else if (this.props.clicked === "name") {
    // )} else if (event.target.dataset.name === "name" || event.target.dataset.name === "photo") {
      return (
        <div className="prof-name-detail">
          Name Details! | {this.props.clickedMatch.first_name}
        </div>
    )}
  }
  render() {
      console.log(this.props)
    return (
      <div>
        {this.renderDetail()}
      </div>
    )
  }
}
export default MatchDetail;
