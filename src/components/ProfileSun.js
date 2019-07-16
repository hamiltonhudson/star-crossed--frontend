import React from 'react';
import { connect } from 'react-redux';
import '../styling/Profile.css'

class ProfileSun extends React.Component {

  renderDetail = () => {
    if (this.props.clicked === "sun") {
      return (
        <div className="prof-sun-detail" >
          <h5>{this.props.currentUser.sun.symbol}</h5>
          <hr className="profile-details-hr"/>
          <p> Dates<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.currentUser.sun.start_date} - {this.props.currentUser.sun.end_date} </p>
          <p> Symbol<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.currentUser.sun.glyph} </p>
          <p> Element<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.currentUser.sun.element} </p>
          <hr className="profile-details-hr"/>
          <p>Qualities<span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(.65em + .65vw"}}> | </span> {this.props.currentUser.sun.keywords}</p>
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
    currentUser: state.users.currentUser
  }
}
export default connect(mapStateToProps)(ProfileSun);
