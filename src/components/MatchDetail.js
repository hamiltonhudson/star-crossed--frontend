import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'



class MatchDetail extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "name" || this.props.clicked === "photo") {
    let ntdmn = require('number-to-date-month-name');
      return (
        <div className="prof-info-deets">
          <h5> About </h5>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p>{ntdmn.toMonth(this.props.viewedMatch.birth_month)} {ntdmn.toDate(parseInt(this.props.viewedMatch.birth_day))}</p>
          <p>{this.props.viewedMatch.gender}<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.viewedMatch.age}</p>
          <p>{this.props.viewedMatch.location}</p>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p>{this.props.viewedMatch.bio}</p>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="col l4 m3 s12 side-card">
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
