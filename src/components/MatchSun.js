import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'



class MatchSun extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail">
          <h5>{this.props.viewedMatch.sun.sign}</h5>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <br/>
          <p>Dates<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.viewedMatch.sun.start_date} - {this.props.viewedMatch.sun.end_date}</p>
          <p>Symbol<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.viewedMatch.sun.symbol}</p>
          <p>Element<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.viewedMatch.sun.element}</p>
          <span style={{"fontFamily": "Segoe UI", "letterSpacing": "-3.25px"}}> ——— </span>
          <p> Compatible With<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "1.5vw"}}> | </span> {this.props.viewedMatch.sun.compat_signs} </p>
          {/* <p>Qualities  |  {this.props.viewedMatch.sun.keywords}</p> */}
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
export default connect(mapStateToProps)(MatchSun);
