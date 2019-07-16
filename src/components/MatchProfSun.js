import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'



class MatchProfSun extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail">
          <h5>{this.props.viewedMatch.sun.symbol}</h5>
          <hr className="profile-details-hr"/>
          <p>Dates<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.viewedMatch.sun.start_date} - {this.props.viewedMatch.sun.end_date}</p>
          <p>Symbol<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.viewedMatch.sun.glyph}</p>
          <p>Element<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.viewedMatch.sun.element}</p>
          <hr className="profile-details-hr"/>
          <p>Qualities<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.viewedMatch.sun.keywords}</p>
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
    viewedMatch: state.matches.match
    }
  }
export default connect(mapStateToProps)(MatchProfSun);
