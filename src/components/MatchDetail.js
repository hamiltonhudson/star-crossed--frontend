import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'



class MatchDetail extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail">
          <h5>{this.props.viewedMatch.sun.sign}</h5>
          <span> ------ </span>
          <p>Vibe  |  {this.props.viewedMatch.sun.vibe}</p>
          <p>Symbol  |  {this.props.viewedMatch.sun.symbol}</p>
          <p>Element  |  {this.props.viewedMatch.sun.element}</p><br></br>
          <p>Qualities  |  {this.props.viewedMatch.sun.keywords}</p>
        </div>
    )} else if (this.props.clicked === "name" || this.props.clicked === "photo") {
    let ntdmn = require('number-to-date-month-name');
      return (
        <div className="prof-name-detail">
          <p>{ntdmn.toMonth(this.props.viewedMatch.birth_month)} {ntdmn.toDate(parseInt(this.props.viewedMatch.birth_day))}</p>
          <p>{this.props.viewedMatch.gender}</p>
          <p>{this.props.viewedMatch.age}</p>
          <p>{this.props.viewedMatch.location}</p>
          <span> ------ </span>
          <p>{this.props.viewedMatch.bio}</p>
        </div>
    )}
  }
  render() {
    return (
      <div>
        {this.renderDetail()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // match: state.matches.match,
    viewedMatch: state.matches.match
  }
}
export default connect(mapStateToProps)(MatchDetail);
